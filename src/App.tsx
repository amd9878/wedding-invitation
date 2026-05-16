import { useEffect } from "react"
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Information } from "./component/information"
import { GuestBook } from "./component/guestbook"
import { Notice } from "./component/notice"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { MusicPlayer } from "./component/musicPlayer"
import { useModal } from "./component/modal"
import { Button } from "./component/button"
import { isFirebaseConfigured } from "./lib/firebase"
import {
  NOTICE_TABS,
  KMAP_PLACE_ID,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
  LOCATION,
} from "./const"

const hasNotice = NOTICE_TABS.some((t) => t.content.trim())

// 카카오 공유의 "위치 보기" 클릭 시 ?map=1 파라미터로 진입 → 지도 선택 모달 자동 표시
const MapSelectTrigger = () => {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("map") !== "1") return

    // URL에서 파라미터 제거 (새로고침 없이)
    const url = new URL(window.location.href)
    url.searchParams.delete("map")
    window.history.replaceState({}, "", url.toString())

    const [goalx, goaly] = WEDDING_HALL_POSITION

    openModal({
      className: "map-select-modal",
      closeOnClickBackground: true,
      header: (
        <div className="title-group">
          <div className="title">오시는 길</div>
          <div className="subtitle">지도 앱을 선택해주세요.</div>
        </div>
      ),
      content: (
        <div className="map-select-content">
          <Button
            buttonStyle="style2"
            onClick={() =>
              window.open(`https://place.map.kakao.com/${KMAP_PLACE_ID}`, "_blank")
            }
          >
            카카오맵
          </Button>
          <Button
            buttonStyle="style2"
            onClick={() =>
              window.open(
                `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                "_blank",
              )
            }
          >
            네이버지도
          </Button>
          <Button
            buttonStyle="style2"
            onClick={() => {
              window.location.href = `tmap://route?goalx=${goalx}&goaly=${goaly}&goalName=${encodeURIComponent(LOCATION)}`
            }}
          >
            티맵
          </Button>
        </div>
      ),
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
  }, [openModal, closeModal])

  return null
}

function App() {
  return (
    <div className="background">
      <BGEffect />
      <MapSelectTrigger />
      <div className="card-view">
        <LazyDiv className="card-group">
          {/* 표지 */}
          <Cover />

          {/* 모시는 글 */}
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 결혼식 날짜 (달력) */}
          <Calendar />

          {/* 겔러리 */}
          <Gallery />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 오시는길 */}
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 마음 전하기 */}
          <Information />
        </LazyDiv>

        {/* 안내사항 — 내용이 있을 때만 독립 섹션으로 표시 */}
        {hasNotice && (
          <LazyDiv className="card-group">
            <Notice />
          </LazyDiv>
        )}

        {/* 방명록 — Firebase 설정 시 독립 섹션으로 표시 */}
        {isFirebaseConfigured && (
          <LazyDiv className="card-group">
            <GuestBook />
          </LazyDiv>
        )}

        <ShareButton />
      </div>
      <MusicPlayer />
    </div>
  )
}

export default App
