export const CATEGORY_COLORS = [
  "#ff7657",
  "#7e75ef",
  "#36a887",
  "#e5a823",
  "#3b8fd9",
  "#d9548f",
];

export const INITIAL_CATEGORIES = [
  { name: "업무", color: CATEGORY_COLORS[0] },
  { name: "개인", color: CATEGORY_COLORS[1] },
  { name: "생활", color: CATEGORY_COLORS[2] },
];

export const FILTERS = ["전체", "미완료", "완료"];

export const INITIAL_TASKS = [
  { id: 1, title: "주간 회의 자료 정리하기", category: "업무", done: false },
  { id: 2, title: "서점에서 여행 에세이 찾기", category: "개인", done: false },
  { id: 3, title: "세탁물 찾아오기", category: "생활", done: false },
  { id: 4, title: "민지에게 생일 메시지 보내기", category: "개인", done: true },
];