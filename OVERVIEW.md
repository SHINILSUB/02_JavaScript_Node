# 02_JavaScript_Node — 개발 참조 Overview

## 프로젝트 정체성

React, React Native, Node.js, GraphQL을 체계적으로 학습하면서 만든 실습 프로젝트 모음이다. 각 프로젝트는 Firebase 인증·Realtime DB, GraphQL 서버, 모바일 네비게이션, TDD 등 특정 개념 하나를 집중적으로 구현하는 방식으로 설계되어 있다. 공유 의존성이 없는 독립 npm 패키지의 집합이며, 프로젝트 간 코드 공유나 import는 존재하지 않는다. 동일한 기능(명함 제작기)을 CARD_MAKER(Firebase v8)와 findYrStrt(Firebase v9 modular)로 두 번 구현해 버전 차이를 직접 비교한 구조도 포함된다.

---

## 아키텍처 한눈에

| 프로젝트 | 스택 | 구조 요약 |
|---------|------|----------|
| **CARD_MAKER** | React 17, Firebase v8 | Login → `/maker`(Editor+Preview) 2-route SPA. DI 패턴: index.js에서 서비스 생성 → App props 주입 |
| **findYrStrt** | React 17, Firebase v9 | CARD_MAKER 리팩토링 버전. v9 modular API, CardRepository 추가 |
| **habit-tracker** | React 17 | 단일 페이지, Firebase 없음. `Habits → Habit` 컴포넌트 트리, 상태는 App에서 관리 |
| **dwitter** | React + Express(ESM) | `server/`(router→controller→data 3계층, port 8080) + `client/`(AuthContext, pages, service) |
| **apollo2019** | React, Apollo Client | GraphQL 클라이언트 학습 스텁. App.js에 최소 코드만 존재 |
| **mvql** | graphql-yoga, Babel | schema.graphql → resolvers.js → db.js(yts API) 단방향 파이프라인 |
| **myhoneytip** | Expo RN SDK 41 | pages / components / navigation 3단. data.json이 콘텐츠 소스, Firebase Firestore로 좋아요 저장 |
| **wegramPracRN** | Expo RN SDK 41 | Firebase Auth+Firestore. 모든 Firebase 로직이 `config/firebaseFunctions.js`에 집중. Stack+Tab 중첩 네비게이션 |
| **TDD-basic** | Jest | 루트 `src/`(기초: add, calculator) + `5.3-tdd-2/src/`(심화: mock, stub, DI) 두 레벨 |
| **JsAlgorythm** | 순수 JS | 패키지 없는 독립 .js 파일 모음 (이진탐색, 팩토리얼 등 22개) |
| **node/** | Node.js | 번호순 개념 폴더(2~14): console, module, OS, process, timer, path, file, buffer, stream, pipe, event. + `express/` 별도 |

---

## 핵심 용어집

| 용어 | 정의 |
|------|------|
| `authService` | Firebase Auth 래퍼 객체. `auth_service.js`(CARD_MAKER) / `authservice.js`(findYrStrt). `signIn`, `signOut`, `onAuthChange` 메서드 보유 |
| `cardRepository` | findYrStrt 전용. Firebase Realtime DB CRUD: `syncCard`(실시간 구독), `saveCard`, `removeCard` |
| `imageUploader` / `image_uploader.js` | Firebase Storage 업로드 담당. `upload(file)` → URL 반환 |
| `FileInput` | `<input type="file">`을 React 컴포넌트로 래핑한 것. `index.js`에서 생성해 props로 주입 |
| `maker` 컴포넌트 | CARD_MAKER/findYrStrt의 메인 레이아웃. 에디터(왼쪽)와 프리뷰(오른쪽)를 나란히 배치 |
| `firebaseFunctions.js` | wegramPracRN의 Firebase 전담 모듈. `registration`, `signIn`, `logout`, `addPost`, `deletePost` 등 모든 비즈니스 로직이 여기에 집중 |
| `StackNavigator` / `TabNavigator` | React Navigation v5 기반 네비게이션. wegramPracRN은 TabNavigator 내에 StackNavigator 중첩 구조 |
| `5.3-tdd-2` | TDD-basic 안의 심화 버전 하위 폴더. `package.json`이 별도로 있는 독립 프로젝트 |
| `AuthContext` (dwitter) | React Context로 구현한 인증 상태 관리. `AuthContext.jsx`에 정의, 앱 전체에 user 정보 공급 |
| DI 패턴 (CARD_MAKER, findYrStrt) | `index.js`에서 서비스 인스턴스를 생성해 `App` props로 전달. 컴포넌트 내부에서 firebase를 직접 import하지 않아 테스트 용이성 확보 |

---

## 자주 묻는 것

**Q. CARD_MAKER와 findYrStrt는 뭐가 다른가?**  
A. 기능은 동일한 명함 제작기. CARD_MAKER는 Firebase v8 compat API, findYrStrt는 v9 modular API로 리팩토링한 버전이다. findYrStrt에는 `CardRepository` 클래스가 추가되어 DB 로직이 서비스로 분리되어 있다.

**Q. dwitter 서버와 클라이언트를 어떻게 연결하나?**  
A. 서버는 `dwitter/server/` 에서 port 8080으로 실행. 클라이언트 `src/service/tweet.js`에 `http://localhost:8080`이 하드코딩되어 있다. 두 터미널에서 각각 실행해야 한다.

**Q. mvql이 바로 실행 안 된다면?**  
A. Babel 설정(`babel-node`, `babel-preset-env`, `babel-preset-stage-3`)이 필요하다. `yarn install` 후 `yarn start`가 package.json scripts를 통해 `babel-node`로 실행된다.

**Q. Firebase 키가 없어서 React 앱이 실행 안 된다면?**  
A. 각 프로젝트 루트에 `.env` 파일을 만들고 `REACT_APP_FIREBASE_*` 변수를 채워야 한다. `.env` 파일은 git에 없다.

**Q. myhoneytip/data.json의 텍스트가 깨져 보이는데?**  
A. EUC-KR로 작성된 한국어가 UTF-8로 잘못 읽혀 보이는 인코딩 아티팩트다. 앱 실행 시에는 정상 표시된다.

**Q. TDD-basic의 `src/`와 `5.3-tdd-2/src/`는 어떤 관계인가?**  
A. `5.3-tdd-2`가 심화 버전으로, mock/stub/DI까지 다룬다. 두 폴더 모두 독립 `package.json`을 가진 별개 프로젝트다.

**Q. wegramPracRN의 한국어 Alert 문자열이 깨진 이유는?**  
A. `config/firebaseFunctions.js` 내 Alert 문자열이 인코딩 아티팩트다. 런타임에는 정상 동작한다.

---

## TDD 테스트 활용법 (TDD-basic)

### 레벨 구조

```
TDD-basic/
├── src/               ← 기초: test(), expect(), describe(), beforeEach
└── 5.3-tdd-2/src/     ← 심화: mock, stub, DI, async
    ├── basic/         ← 동기·비동기 함수 테스트
    ├── mock/          ← jest.fn(), jest.mock(), StubClient
    └── stack/         ← 자료구조 단위 테스트
```

### 기초 레벨 패턴 (`src/`)

| 파일 | 보여주는 패턴 |
|------|-------------|
| `add.test.js` | 가장 기본: `test()` + `expect().toBe()` |
| `calculator.test.js` | `describe()` 중첩, `beforeEach`로 인스턴스 격리, `expect(() => ...).toThrow()` |

핵심 규칙: **`beforeEach`에서 항상 새 인스턴스 생성** → 테스트 간 상태 오염 차단.

### 심화 레벨 패턴 (`5.3-tdd-2/src/`)

**1. 비동기 테스트 5가지 방법** (`basic/async.test.js`)

```js
// 방법 1: done 콜백 (구식, 오류 시 타임아웃으로만 실패 감지)
it('done', (done) => { fetchProduct().then(item => { expect(item)...; done(); }); });

// 방법 2: Promise return (체인 끊기면 테스트 통과되는 함정 있음)
it('return', () => { return fetchProduct().then(...); });

// 방법 3: async/await (가장 명확)
it('await', async () => { const p = await fetchProduct(); expect(p)...; });

// 방법 4,5: resolves / rejects matcher
it('resolves', () => expect(fetchProduct()).resolves.toEqual({...}));
it('rejects',  () => expect(fetchProduct('error')).rejects.toBe('network error'));
```

**2. jest.fn() — 콜백 검증** (`mock/check/check.test.js`)

```js
const onSuccess = jest.fn();
check(() => true, onSuccess, onFail);
expect(onSuccess).toHaveBeenCalledTimes(1);
expect(onSuccess).toHaveBeenCalledWith('yes');
```

**3. Stub vs jest.mock() — 두 가지 모킹 전략 비교** (`mock/product/`)

| 전략 | 파일 | 방법 | 권장 상황 |
|------|------|------|----------|
| **Stub** | `product_service.test.js` | `new StubProductClient()` 직접 주입 | DI가 가능한 구조. 명시적이고 단순 |
| **jest.mock** | `product_service_no_di.test.js` | `jest.mock('../product_client')` + `mockImplementation()` | DI 없는 레거시 코드. `mockClear()` 필수 |

> DI가 있으면 Stub, 없으면 jest.mock — 이 코드베이스가 DI를 선호하는 이유가 여기에 있다.

**4. 상태 기반 로직 검증** (`mock/user/user_service.test.js`)

`isLogedIn` 플래그로 중복 로그인을 막는 로직 검증:
```js
await userService.login('abc', 'abc');
await userService.login('abc', 'abc');  // 두 번 호출
expect(login.mock.calls.length).toBe(1); // 실제 API는 1회만 호출
```

---

## 코드 재사용성 · 리팩토링 분석

### CARD_MAKER — 발견된 버그 및 코드 냄새

| 위치 | 문제 | 비고 |
|------|------|------|
| `card_add_form.jsx:26-30` | `companyRefnameRef`, `themeRefnameRef` 등 오타 — 모두 `companyRef`, `themeRef`… 여야 함 | **런타임 오류** (존재하지 않는 ref) |
| `card_add_form.jsx:61` | `placeholder={title}` — `title` 변수가 이 컴포넌트에 정의되지 않음 | **undefined 참조** |
| `card_add_form.jsx:2` | `import styles from './card_edit_form.module.css'` — 자신의 CSS 모듈이 아닌 edit form의 것을 가져옴 | 의도치 않은 스타일 공유 |
| `card_edit_form.jsx:4` | `unstable_concurrentAct` import 후 미사용 | 삭제 대상 |
| `maker.jsx:51-57` | `useEffect`에 deps 배열 없음 → 매 렌더마다 `onAuthChange` 재등록 | `[]` 또는 `[authService]` 추가 필요 |
| `maker.jsx:15-49` | 초기 state에 하드코딩된 더미 카드 3개 | Firebase 연동 시 제거 필요 |

**재사용 가능한 추출 포인트**: `CardEditForm`과 `CardAddForm`의 폼 필드(name/company/theme/title/email/message)가 동일. 공통 `CardForm` 컴포넌트로 추출하면 중복 제거 가능.

`createOrUpdateCard`가 `addCard`와 `updateCard` 두 prop 이름으로 전달되는 구조 — 추가와 수정이 동일 로직임을 명시적으로 보여주는 의도된 설계.

---

### dwitter — 발견된 버그 및 재사용 분석

**서버 (`server/`)**

| 위치 | 문제 |
|------|------|
| `controller/tweet.js:27` + `router/tweets.js:10` | `upadate` 오타 (양쪽 동일하게 오타 → 동작은 하나 오해 유발) |
| `data/tweet.js:22-31` | `create()` 함수가 tweet을 배열에 추가하지만 `return`이 없음 → controller에서 항상 `undefined` 수신 |

**인메모리 data 레이어의 설계 의도**: `data/tweet.js`가 순수 CRUD 역할만 담당하므로, DB 연결 시 이 파일만 교체하면 `controller/`, `router/` 는 수정 없이 그대로 사용 가능 — 잘 분리된 구조.

**클라이언트 (`client/`)**

| 위치 | 문제 |
|------|------|
| `service/tweet.js:8` | `` `?username={$username}` `` → `` `?username=${username}` `` (달러 위치 오류, 쿼리스트링 미동작) |
| `service/tweet.js:32,41` | `/tweets${tweetId}` → `/tweets/${tweetId}` (슬래시 누락, 잘못된 URL) |
| `service/auth.js` | 모든 메서드가 `{ username: 'ellie', token: 'abc1234' }` 하드코딩 반환. 실제 HTTP 호출 없는 학습용 stub |

**재사용성이 잘 된 패턴**:
- `AllTweets`와 `MyTweets` 두 페이지가 `<Tweets addable={true/false} username={...} />` 하나로 처리 — prop 하나로 두 화면을 재사용하는 좋은 예시
- `Tweets.jsx`, `TweetCard.jsx` 모두 `memo()` 적용으로 리렌더링 최적화
- `AuthContext` + `useAuth()` 훅 조합 — 인증 상태를 전역으로 공유하면서 컴포넌트는 `const { user } = useAuth()`만으로 구독

---

### node/ — 재사용 관점 메모

`14-event/logger.js`의 `Logger extends EventEmitter` 패턴이 실제 재사용 가능한 구조를 보여주는 유일한 파일. 나머지 번호 폴더(2~13)는 개념 확인용 단독 스크립트.

---

## 하지 말 것

| 대상 | 이유 |
|------|------|
| `dwitter/27_dwitter_5a4a855f8f/`, `dwitter/28_dwitter_server_bc150438f5/` | 특정 커밋 시점의 스냅샷 폴더. 현재 개발 대상은 `dwitter/server/`와 `dwitter/client/` |
| `myhoneytip/data.json`의 한국어 텍스트 수정 | 인코딩 아티팩트이며 앱 실행 시 정상 동작. "수정"하면 실제로 내용이 깨짐 |
| `wegramPracRN/config/firebaseFunctions.js` Alert 문자열 수정 | 동일한 이유 |
| `apollo2019/src/App.js` 에 로직 추가 | Apollo Client 연동 학습 스텁. 내용이 없는 것이 의도된 상태 |
| `node/` 하위 번호 폴더 통합·재구성 | 각 폴더가 특정 Node.js 개념을 독립적으로 실습하는 단위. 합치면 학습 맥락이 사라짐 |
| CARD_MAKER 컴포넌트 내에서 `firebase` 직접 import | DI 패턴을 의도적으로 사용 중. 서비스는 props로 받아야 함 |
