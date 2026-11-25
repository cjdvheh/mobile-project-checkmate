# 체크메이트(CheckMate) — 할 일 앱 (MP1: 화면 만들기)

React Native(Expo Router)로 만든 할 일 앱 1단계 결과물입니다.
목록·추가 입력·완료 토글·빈 상태 화면과 상태 관리에 집중하며, 저장·동기화·AI 기능은 이후 단계(MP2~MP4)에서 추가합니다.

## 화면 구성

앱은 한 화면(`src/app/index.jsx`)이며, 위쪽 고정 영역과 아래쪽 스크롤 목록으로 나뉩니다.

| 영역 | 컴포넌트 | 설명 |
|---|---|---|
| 고정 | `Header` | 오늘 날짜와 인사 문구 |
| 고정 | `ProgressCard` | 완료 개수, 진행률(%), 진행 바 |
| 고정 | `FilterTabs` | 상태 필터(전체 / 할 일 / 완료)와 현재 항목 수 |
| 고정 | `CategoryFilter` | 카테고리 칩(가로 스크롤). "전체 카테고리"를 누르면 관리 창이 열림 |
| 고정 | `TaskInput` | 할 일 입력창 + 카테고리 선택 + 추가 버튼 |
| 스크롤 | `TaskList` / `TaskItem` | 할 일 카드(완료 토글, 제목, 카테고리, 삭제) |
| 스크롤 | `EmptyState` | 항목이 없을 때 안내 화면 |
| 모달 | `CategoryManager` | 카테고리 이름 수정, 순서 이동, 삭제, 추가 |

- 빈 상태는 두 가지입니다. 할 일이 하나도 없으면 "아직 할 일이 없어요", 필터 결과만 없으면 "조건에 맞는 할 일이 없어요"가 표시됩니다.
- 위쪽은 고정되고 목록만 스크롤됩니다. 하단 시스템 바에 가려지지 않도록 안전 영역(SafeArea) 여백을 적용했습니다.

## 구현 기능

- 할 일 추가(빈 값 방지, 100자 제한), 완료 토글(취소선과 진행률 즉시 반영), 삭제
- 상태 필터(전체 / 할 일 / 완료)와 카테고리 필터
- 할 일이 없을 때 빈 상태 안내 화면
- 카테고리 관리: 이름 수정(해당 할 일에도 반영), 위/아래 순서 이동, 삭제(할 일은 남은 첫 카테고리로 이동), 추가

## 더미 데이터

`src/constants/tasks.js`에 정의되어 있으며, 앱 시작 시 `useState`의 초기값으로 쓰입니다.
저장 기능은 MP2에서 구현하므로 앱을 다시 켜면 이 초기값으로 돌아갑니다.
더미 데이터에는 실명·연락처 등 실제 개인정보가 없습니다.

**카테고리 (`INITIAL_CATEGORIES`)**

| 이름 | 색상 |
|---|---|
| 업무 | #ff7657 |
| 개인 | #7e75ef |
| 생활 | #36a887 |

**할 일 (`INITIAL_TASKS`)**

| id | 제목 | 카테고리 | 완료 |
|---|---|---|---|
| 1 | 주간 회의 자료 정리하기 | 업무 | X |
| 2 | 서점에서 여행 에세이 찾기 | 개인 | X |
| 3 | 세탁물 찾아오기 | 생활 | X |
| 4 | 친구에게 생일 메시지 보내기 | 개인 | O |

## 실행 절차

**환경**

- 프레임워크/SDK: Expo SDK 58 (expo 58.0.23 / React Native 0.88.1 / React 19.2.3), Expo Router
- Node.js 22.13 이상, npm
- 실행 기기: [실기기 모델명과 OS 버전, 예: Galaxy S24 / Android 16] + Expo Go (SDK 58 지원 버전)

**실행 명령**

```bash
# 1) 저장소 받기
git clone https://github.com/cjdvheh/moblie-project-checkmate.git
cd moblie-project-checkmate

# 2) 패키지 설치 (package-lock.json 기준)
npm install

# 3) 개발 서버 실행 (캐시 초기화)
npx expo start -c
```

4. 터미널에 표시되는 QR 코드를 휴대폰의 **Expo Go**로 스캔합니다. (PC와 휴대폰이 같은 Wi-Fi여야 합니다.)
5. 에뮬레이터는 터미널에서 `a`(Android) 또는 `i`(iOS), 웹은 `w`를 누릅니다.

**문제가 생기면**

- 연결이 안 되면 `npx expo start -c --tunnel`로 실행합니다.
- 파일을 옮기거나 지운 뒤 "Unable to resolve" 오류가 나면 서버를 끄고 `npx expo start -c`로 다시 실행합니다.
- `@expo/vector-icons`를 찾지 못하면 `npx expo install @expo/vector-icons`를 실행합니다.

## 확인 방법

### 항목 추가·완료 토글

- 조작: 앱을 실행해 할 일 목록을 확인한 뒤, 입력창에 "장보기"를 입력하고 카테고리를 고른 다음 화살표 버튼을 누른다. 이어서 그 할 일의 동그라미 체크 버튼을 누른다
- 기대 결과: 새 할 일이 목록 맨 위에 추가되고, 체크하면 제목에 취소선이 생기며 진행률 카드의 완료 개수와 %가 바로 바뀐다. 다시 누르면 원래대로 돌아간다
- 스크린샷: 01_list.png, 02_add.png, 03_done.png

### 빈 상태 안내

- 조작: 모든 할 일의 휴지통 버튼을 눌러 삭제한다. 할 일이 있는 상태에서 결과가 없는 필터(예: 할 일을 모두 완료하지 않은 채 "완료" 탭)를 고른다
- 기대 결과: 할 일이 하나도 없으면 "아직 할 일이 없어요", 필터 결과만 없으면 "조건에 맞는 할 일이 없어요" 안내가 표시된다
- 스크린샷: 04_empty.png, 05_empty_filter.png

### 실행 절차·기능 목록 문서

- 조작: 이 README의 "실행 절차"대로 설치·실행하고 "구현 기능" 목록과 비교한다
- 기대 결과: 오류 없이 앱이 실행되고 목록의 기능이 모두 동작한다
- 스크린샷: 01_list.png

### 민감정보·개인정보 없음

- 조작: 소스, 더미 데이터(`src/constants/tasks.js`), 스크린샷을 확인한다
- 기대 결과: API 키·비밀번호가 없고, 앱 데이터와 스크린샷에 실명·연락처 등 실제 개인정보가 없다
- 스크린샷: 01_list.png

시험 데이터: `src/constants/tasks.js` (앱 시작 시 더미 할 일 4개, 카테고리 3개)

네트워크: 불필요 (개발 서버 연결을 위해 PC와 휴대폰이 같은 Wi-Fi에만 있으면 됨)

## 폴더 구조

```
src/
├─ app/
│  ├─ _layout.jsx          SafeAreaProvider + Stack
│  └─ index.jsx            상태 관리와 화면 조립
├─ components/             Header, ProgressCard, FilterTabs, CategoryFilter, CategoryChip,
│                          CategoryManager, TaskInput, TaskList, TaskItem, EmptyState
├─ constants/tasks.js      더미 데이터, 필터, 카테고리 색상
└─ utils/taskUtils.js      colorOf
```

## 개발 방식

기능별 브랜치(`feat/...`)에서 개발하고 풀 리퀘스트(PR)로 `main`에 병합합니다.
커밋 메시지는 `feat:`, `fix:`, `refactor:`, `docs:`, `chore:` 접두어를 사용합니다.

| 담당 | 브랜치 | 파일 |
|---|---|---|
| 박규현 | `feat/foundation` | `constants/tasks.js`, `utils/taskUtils.js`, 의존성 |
| 장홍준 | `feat/header-filter` | `Header`, `ProgressCard`, `FilterTabs`, `CategoryChip`, `CategoryFilter` |
| 박승철 | `feat/task-list` | `TaskInput`, `TaskList`, `TaskItem`, `EmptyState` |
| 이승헌 | `feat/category-manager` | `CategoryManager`, `index.jsx`, 문서 |

## AI 사용

이 프로젝트의 코드는 AI 도구(Claude)의 도움을 받아 작성했습니다.
사용한 프롬프트와 채택/수정 판단은 `prompts_log.md`에 기록했습니다.

## 참고 자료

Expo 개발에 도움이 되는 공식 자료입니다. (이 저장소의 기본 템플릿 README 안내를 한글로 옮긴 것입니다.)

- [Expo 공식 문서](https://docs.expo.dev/): 기본 개념부터 심화 주제까지
- [Expo Router(파일 기반 라우팅)](https://docs.expo.dev/router/introduction): `src/app` 폴더의 파일이 곧 화면 경로가 됩니다.
- [Expo Go](https://expo.dev/go): 휴대폰에서 앱을 바로 실행해 볼 수 있는 앱
- [Android 에뮬레이터](https://docs.expo.dev/workflow/android-studio-emulator/), [iOS 시뮬레이터](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo GitHub](https://github.com/expo/expo), [Expo 디스코드 커뮤니티](https://chat.expo.dev)

## 제출 파일

- `app/`: 앱 소스 전체 (`node_modules/`, `.expo/`, `android/`, `ios/` 등 생성 폴더 제외)
- `package.json`, `package-lock.json`: 의존성과 잠금 파일
- `README.md`: 화면 구성, 구현 기능, 실행 절차, 확인 방법
- `screenshots/`: `01_list.png`(목록), `02_add.png`(추가), `03_done.png`(완료), `04_empty.png`(빈 상태), `05_empty_filter.png`(필터 빈 상태) — 각 2MB 이하
- `prompts_log.md`: AI 도구 사용 이력과 채택/수정 판단 (선택 제출)

민감정보(API 키·비밀번호)와 실제 개인정보는 포함되어 있지 않습니다.