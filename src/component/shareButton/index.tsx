import { KMAP_PLACE_ID, NMAP_PLACE_ID } from "../../const"
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

          kakao.Share.sendScrap({
            requestUrl: pageUrl,
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
