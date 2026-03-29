import { useEffect, useMemo, useRef, useState } from "react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"
import { signInAnonymously } from "firebase/auth"
import { Button } from "../button"
import { dayjs } from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { firebaseAuth, firebaseDb } from "../../lib/firebase"
import { containsProfanity } from "./profanityFilter"

const COOLDOWN_MS = 30_000
const COOLDOWN_KEY = "guestbook_last_submit_at"

const RULES = {
  name: { maxLength: 10 },
  content: { maxLength: 100 },
}

const POSTS_PER_PAGE = 5
const PAGES_PER_BLOCK = 5

type Post = {
  id: string
  uid: string
  name: string
  content: string
  createdAt: number
}

function useFirebaseAuth() {
  const [uid, setUid] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!firebaseAuth) return
    signInAnonymously(firebaseAuth)
      .then(() => {
        setUid(firebaseAuth!.currentUser?.uid ?? null)
        setReady(true)
      })
      .catch(console.error)
  }, [])

  return { uid, ready }
}

function usePosts(previewLimit?: number) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (!firebaseDb) return
    const q = query(
      collection(firebaseDb, "guestbook"),
      orderBy("createdAt", "desc"),
    )
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          uid: data.uid ?? "",
          name: data.name ?? "",
          content: data.content ?? "",
          createdAt: data.createdAt?.seconds ?? 0,
        }
      })
      setPosts(previewLimit ? all.slice(0, previewLimit) : all)
    })
    return unsub
  }, [previewLimit])

  return posts
}

async function deletePost(postId: string) {
  if (!firebaseDb) return
  if (!window.confirm("삭제하시겠습니까?")) return
  await deleteDoc(doc(firebaseDb, "guestbook", postId))
}

// ─── 메인 카드 ────────────────────────────────────────────────
export const GuestBook = () => {
  const { openModal, closeModal } = useModal()
  const { uid, ready } = useFirebaseAuth()
  const previewPosts = usePosts(3)

  return (
    <LazyDiv className="card guestbook">
      <h2 className="english">Guest Book</h2>
      <div className="break" />

      {previewPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          currentUid={uid}
          onDelete={() => deletePost(post.id)}
        />
      ))}

      <div className="break" />

      {ready && (
        <Button
          onClick={() =>
            openModal({
              className: "write-guestbook-modal",
              closeOnClickBackground: false,
              header: (
                <div className="title-group">
                  <div className="title">방명록 작성하기</div>
                  <div className="subtitle">
                    신랑, 신부에게 축하의 마음을 전해주세요.
                  </div>
                </div>
              ),
              content: <WriteModal uid={uid} />,
              footer: (
                <>
                  <Button
                    buttonStyle="style2"
                    type="submit"
                    form="guestbook-write-form"
                  >
                    저장하기
                  </Button>
                  <Button
                    buttonStyle="style2"
                    className="bg-light-grey-color text-dark-color"
                    onClick={closeModal}
                  >
                    닫기
                  </Button>
                </>
              ),
            })
          }
        >
          방명록 작성하기
        </Button>
      )}

      <div className="break" />

      <Button
        onClick={() =>
          openModal({
            className: "all-guestbook-modal",
            closeOnClickBackground: true,
            header: <div className="title">방명록 전체보기</div>,
            content: <AllModal currentUid={uid} />,
            footer: (
              <Button
                buttonStyle="style2"
                className="bg-light-grey-color text-dark-color"
                onClick={closeModal}
              >
                닫기
              </Button>
            ),
          })
        }
      >
        방명록 전체보기
      </Button>
    </LazyDiv>
  )
}

// ─── 게시글 아이템 ─────────────────────────────────────────────
const PostItem = ({
  post,
  currentUid,
  onDelete,
}: {
  post: Post
  currentUid: string | null
  onDelete: () => void
}) => (
  <div className="post">
    <div className="heading">
      {currentUid && post.uid === currentUid && (
        <button className="close-button" onClick={onDelete} />
      )}
    </div>
    <div className="body">
      <div className="title">
        <div className="name">{post.name}</div>
        <div className="date">
          {post.createdAt
            ? dayjs.unix(post.createdAt).format("YYYY-MM-DD")
            : ""}
        </div>
      </div>
      <div className="content">{post.content}</div>
    </div>
  </div>
)

// ─── 작성 모달 ─────────────────────────────────────────────────
const WriteModal = ({ uid }: { uid: string | null }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="guestbook-write-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        if (loading || !firebaseDb || !uid) return
        setLoading(true)
        try {
          const name = nameRef.current?.value.trim() ?? ""
          const content = contentRef.current?.value.trim() ?? ""

          if (!name) {
            alert("닉네임을 입력해주세요.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`닉네임을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
            return
          }
          if (containsProfanity(name)) {
            alert("닉네임에 사용할 수 없는 단어가 포함되어 있습니다.")
            return
          }

          if (!content) {
            alert("내용을 입력해주세요.")
            return
          }
          if (content.length > RULES.content.maxLength) {
            alert(`내용을 ${RULES.content.maxLength}자 이하로 입력해주세요.`)
            return
          }
          if (containsProfanity(content)) {
            alert("내용에 사용할 수 없는 단어가 포함되어 있습니다.")
            return
          }

          const last = Number(localStorage.getItem(COOLDOWN_KEY) || "0")
          const remain = COOLDOWN_MS - (Date.now() - last)
          if (remain > 0) {
            alert(
              `잠시만요! ${Math.ceil(remain / 1000)}초 후에 작성할 수 있어요.`,
            )
            return
          }

          await addDoc(collection(firebaseDb, "guestbook"), {
            uid,
            name: name.slice(0, RULES.name.maxLength),
            content: content.slice(0, RULES.content.maxLength),
            createdAt: serverTimestamp(),
          })

          localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
          alert("방명록 작성이 완료되었습니다.")
          closeModal()
        } catch {
          alert("방명록 작성에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      닉네임
      <input
        disabled={loading}
        type="text"
        placeholder="닉네임을 입력해주세요. (최대 10자)"
        className="name"
        ref={nameRef}
        maxLength={RULES.name.maxLength}
      />
      내용
      <textarea
        disabled={loading}
        placeholder="축하 메세지를 100자 이내로 입력해주세요."
        className="content"
        ref={contentRef}
        maxLength={RULES.content.maxLength}
      />
    </form>
  )
}

// ─── 전체보기 모달 ─────────────────────────────────────────────
const AllModal = ({ currentUid }: { currentUid: string | null }) => {
  const allPosts = usePosts()
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE))

  const pagePosts = useMemo(
    () =>
      allPosts.slice(
        currentPage * POSTS_PER_PAGE,
        (currentPage + 1) * POSTS_PER_PAGE,
      ),
    [allPosts, currentPage],
  )

  const pageBlock = useMemo(() => {
    const start =
      Math.floor(currentPage / PAGES_PER_BLOCK) * PAGES_PER_BLOCK
    const end = Math.min(start + PAGES_PER_BLOCK, totalPages)
    return Array.from({ length: end - start }, (_, i) => i + start)
  }, [currentPage, totalPages])

  return (
    <>
      {pagePosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          currentUid={currentUid}
          onDelete={() => deletePost(post.id)}
        />
      ))}

      <div className="break" />

      <div className="pagination">
        {pageBlock[0] > 0 && (
          <div
            className="page"
            onClick={() => setCurrentPage(pageBlock[0] - 1)}
          >
            이전
          </div>
        )}
        {pageBlock.map((page) => (
          <div
            key={page}
            className={`page${page === currentPage ? " current" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </div>
        ))}
        {pageBlock[pageBlock.length - 1] < totalPages - 1 && (
          <div
            className="page"
            onClick={() =>
              setCurrentPage(pageBlock[pageBlock.length - 1] + 1)
            }
          >
            다음
          </div>
        )}
      </div>
    </>
  )
}
