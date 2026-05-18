import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  SHARE_LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL

export const ShareButton = () => {
  const kakao = useKakao()
  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          if (!kakao) {
            return
          }

          const pageUrl =
            window.location.origin +
            baseUrl.replace(/\/$/, "")

          kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              description:
                WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + SHARE_LOCATION,
              imageUrl: "https://i.imgur.com/5uxI60Z.jpeg",
              imageWidth: 800,
              imageHeight: 800,
              link: {
                mobileWebUrl: pageUrl,
                webUrl: pageUrl,
              },
            },
            buttons: [
              {
                title: "초대장 보기",
                link: {
                  mobileWebUrl: pageUrl,
                  webUrl: pageUrl,
                },
              },
              {
                title: "위치 보기",
                link: {
                  mobileWebUrl: pageUrl + "?map=1",
                  webUrl: pageUrl + "?map=1",
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
