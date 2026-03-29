// 욕설 및 선정적 단어 필터
const BAD_WORDS = [
  // 한국어 욕설
  "씨발", "시발", "씨팔", "시팔", "씨바", "시바", "씨벌", "시벌",
  "개새끼", "개새", "새끼", "개년", "개놈", "개쌍",
  "병신", "창녀", "보지", "자지", "섹스", "성교", "야동",
  "지랄", "엿먹", "꺼져", "죽어", "미친놈", "미친년", "미친새",
  "존나", "졸라", "ㅅㅂ", "ㅂㅅ", "ㅈㄹ", "ㄱㅅㄲ", "ㅆㅂ",
  "애미", "애비", "느금마",
  // 영어 욕설
  "fuck", "shit", "bitch", "cunt", "dick", "cock",
  "pussy", "bastard", "whore", "slut", "asshole", "ass",
  "nigger", "nigga", "faggot",
]

export function containsProfanity(text: string): boolean {
  const normalized = text.toLowerCase().replace(/\s+/g, "")
  return BAD_WORDS.some((word) => normalized.includes(word))
}
