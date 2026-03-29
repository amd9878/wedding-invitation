import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  NMAP_PLACE_ID,
  KMAP_PLACE_ID,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL

const KAKAO_MAP_URL = `https://place.map.kakao.com/${KMAP_PLACE_ID}`
const NAVER_MAP_URL = `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`

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
                WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
              imageUrl: pageUrl + "/preview_image.jpg",
              link: {
                mobileWebUrl: pageUrl,
                webUrl: pageUrl,
              },
            },
            buttons: [
              {
                title: "카카오맵 오시는 길",
                link: {
                  mobileWebUrl: KAKAO_MAP_URL,
                  webUrl: KAKAO_MAP_URL,
                },
              },
              {
                title: "네이버지도 오시는 길",
                link: {
                  mobileWebUrl: NAVER_MAP_URL,
                  webUrl: NAVER_MAP_URL,
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
