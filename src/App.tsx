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
import { isFirebaseConfigured } from "./lib/firebase"

function App() {
  return (
    <div className="background">
      <BGEffect />
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

          {/* 안내사항 (NOTICE_TABS에 내용이 있을 때만 표시) */}
          <Notice />

          {/* 방명록 (Firebase 설정 시 표시) */}
          {isFirebaseConfigured && <GuestBook />}
        </LazyDiv>

        <ShareButton />
      </div>
      <MusicPlayer />
    </div>
  )
}

export default App
