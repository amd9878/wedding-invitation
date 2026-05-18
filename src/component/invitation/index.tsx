import {
  BRIDE_FULLNAME,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

export const Invitation = () => {
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Invitation</h2>

      <div className="break" />

      <div className="content">"우리는 모두 조금씩 다르지만,</div>
      <div className="content">그래서 서로에게 더 특별합니다."</div>
      <div className="break" />
      <div className="content">서로 다른 두 사람이 만나</div>
      <div className="content">평생의 한 팀이 되기로 했습니다.</div>
      <div className="break" />
      <div className="content">저희의 첫 페이지를 함께해 주세요.</div>
      <div className="break" />

      <div className="name">
        {GROOM_FATHER} · {GROOM_MOTHER}
        <span className="relation">
          의 <span className="relation-name">{GROOM_TITLE}</span>
        </span>{" "}
        {GROOM_FULLNAME}
      </div>
      <div className="name">
        {BRIDE_FATHER} · {BRIDE_MOTHER}
        <span className="relation">
          의 <span className="relation-name">{BRIDE_TITLE}</span>
        </span>{" "}
        {BRIDE_FULLNAME}
      </div>

      <div className="break" />
    </LazyDiv>
  )
}
