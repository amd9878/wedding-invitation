import { BRIDE_INFO, GROOM_INFO, NOTICE_IMAGE, PARKING_INFO } from "../../const"
import { STATIC_ONLY } from "../../env"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { AttendanceInfo } from "./attendance"

export const Information1 = () => {
  const { openModal, closeModal } = useModal()

  return (
    <>
      <h2 className="english">Information</h2>
      {NOTICE_IMAGE && (
        <div className="info-card notice-image-card">
          <img
            src={NOTICE_IMAGE}
            alt="안내사항"
            className="notice-image"
            onClick={() =>
              openModal({
                className: "notice-image-modal",
                closeOnClickBackground: true,
                content: (
                  <img src={NOTICE_IMAGE} alt="안내사항" style={{ width: "100%" }} />
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
            }
          />
        </div>
      )}
      <div className="info-card">
        <div className="label">식사 안내</div>
        <div className="content">
          식사시간 : 11시 ~ 14시
          <br />
          장소 : 지하 1층 식당 12th ST
        </div>
      </div>
    </>
  )
}

export const Information2 = () => {
  const { openModal, closeModal } = useModal()

  return (
    <>
      <div className="info-card">
        <div className="label">주차 안내</div>
        <div className="content">
          {PARKING_INFO.split("\n").map((line, i) =>
            line === "" ? <br key={i} /> : <span key={i}>{line}<br /></span>
          )}
        </div>
      </div>
      <div className="info-card">
        <div className="label">마음 전하기</div>
        <div className="content">
          참석이 어려워 직접 축하해주지 못하는
          <br />
          분들을 위해 계좌번호를 기재하였습니다.
          <br />
          넓은 마음으로 양해 부탁드립니다.
        </div>

        <div className="break" />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">신랑측 계좌번호</div>,
              content: (
                <>
                  {GROOM_INFO.filter(({ account }) => !!account).map(
                    ({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            if (account) {
                              try {
                                navigator.clipboard.writeText(account)
                                alert(account + "\n복사되었습니다.")
                              } catch {
                                alert("복사에 실패했습니다.")
                              }
                            }
                          }}
                        >
                          복사하기
                        </Button>
                      </div>
                    ),
                  )}
                </>
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
          }}
        >
          신랑측 계좌번호 보기
        </Button>
        <div className="break" />
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">신부측 계좌번호</div>,
              content: (
                <>
                  {BRIDE_INFO.map(
                    ({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          {account && <div>{account}</div>}
                        </div>
                        {account && (
                          <Button
                            className="copy-button"
                            onClick={async () => {
                              try {
                                navigator.clipboard.writeText(account)
                                alert(account + "\n복사되었습니다.")
                              } catch {
                                alert("복사에 실패했습니다.")
                              }
                            }}
                          >
                            복사하기
                          </Button>
                        )}
                      </div>
                    ),
                  )}
                </>
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
          }}
        >
          신부측 계좌번호 보기
        </Button>
      </div>
    </>
  )
}

export const Information = () => {
  if (STATIC_ONLY) {
    return (
      <LazyDiv className="card information">
        <Information1 />
        <Information2 />
      </LazyDiv>
    )
  }

  return (
    <LazyDiv className="card information">
      <Information1 />
      <Information2 />
      <AttendanceInfo />
    </LazyDiv>
  )
}
