import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-08-24 13:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 예: 예식일 8월 -> 8월 15일 광복절
export const HOLIDAYS = [15]

export const LOCATION = "현대자동차 본사 로비"
export const LOCATION_ADDRESS = "서울시 서초구 헌릉로 12 현대자동차 본사 8층 로비 -"

// 카카오톡 공유 시 위치 정보로 사용할 주소.
// LOCATION 과 동일하게 설정해도 무방하나, 필요에 따라 좀 더 상세히 작성 가능.
export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

// 네이버 지도 및 카카오 네비게이션에 사용할 좌표. [경도, 위도] 형식.
export const WEDDING_HALL_POSITION = [127.042837, 37.464351]

// 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/13321741 -> 13321741
export const NMAP_PLACE_ID = 12104862

// 카카오 지도의 웨딩홀 장소 ID
// 카카오 지도 웹페이지에서 웨딩홀 검색 후 해당 장소에서 상세보기 클릭 시 URL에서 확인 가능.
// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 8622892

export const BRIDE_FULLNAME = "신태정"
export const BRIDE_FIRSTNAME = "태정"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "신용성"
export const BRIDE_MOTHER = "허난영"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-7407-3250",
    account: "우리은행 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000000",
  },
]

export const GROOM_FULLNAME = "박성준"
export const GROOM_FIRSTNAME = "성준"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "박덕유"
export const GROOM_MOTHER = "최복희"

// 배경음악. 파일은 public/music/ 폴더에 추가한 뒤 파일명을 입력하세요.
// 사용하지 않으려면 빈 문자열("")로 설정하세요.
export const MUSIC_URL = ""  // 예: "/music/wedding-bgm.mp3"
export const MUSIC_TITLE = "Wedding BGM"

// 셔틀버스 운행 정보. 탑승 장소와 시간을 한 줄씩 입력하세요.
// 셔틀이 없으면 빈 배열([])로 설정하세요.
export const SHUTTLE_INFO: string[] = [
  // 예: "양재역 5번 출구 앞 / 12:00부터 10분 간격 운행",
]

// 안내사항 탭. label과 content를 입력하면 페이지에 표시됩니다.
// content가 비어있는 탭은 자동으로 숨겨집니다.
// 탭이 하나도 없거나 모든 content가 비어있으면 안내사항 섹션 자체가 표시되지 않습니다.
// 예: { label: "주차", content: "지하 2층~5층 주차 가능\n2시간 무료 (접수대에서 등록)" }
export const NOTICE_TABS: Array<{ label: string; content: string }> = [
  // { label: "주차", content: "" },
  // { label: "식사", content: "" },
  // { label: "기타", content: "" },
]

export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-5138-5510",
    account: "하나은행 121-910486-66207",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "국민은행 000000000000",
  },
]
