import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS, SHUTTLE_INFO } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        {SHUTTLE_INFO.length > 0 && (
          <div className="location-info">
            <div className="transportation-icon-wrapper">
              <BusIcon className="transportation-icon" />
            </div>
            <div className="heading">셔틀버스</div>
            <div />
            <div className="content">
              {SHUTTLE_INFO.map((info, i) => (
                <span key={i}>
                  {info}
                  {i < SHUTTLE_INFO.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          {/* TODO: 실제 교통편 정보로 업데이트해 주세요 */}
          <div className="content">
            * 지하철 이용 시
            <br />
            신분당선 <b>양재시민의숲역</b> 4번 출구
            <br />
            → 도보 600m
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            {/* TODO: 실제 버스 노선 및 정류장으로 업데이트해 주세요 */}
            네이버/카카오맵에서 <b>{LOCATION}</b> 검색 후
            <br />
            대중교통 경로를 확인하세요.
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            <b>현대자동차 본사</b> 검색
            <br />
            ※ 아래 주차 안내 부분 참고해주세요
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
