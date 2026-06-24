# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 폴더 성격

각 하위 폴더가 독립 npm 패키지인 학습용 프로젝트 모음이다. 폴더 간 코드 공유나 공통 빌드 스크립트는 없다. 작업 전 반드시 해당 프로젝트 폴더로 이동 후 명령을 실행한다.

## 실행 명령

### React 앱 (CARD_MAKER, findYrStrt, habit-tracker, apollo2019)
```bash
cd <project>
yarn install   # 최초 1회
yarn start     # dev server
yarn test      # jest
yarn build     # production
```

### dwitter (풀스택 분리 구조)
```bash
# 서버 (Express + ESM, port 8080)
cd dwitter/server && npm install && npm start

# 클라이언트 (React)
cd dwitter/client && yarn install && yarn start
```

### mvql (GraphQL 서버)
```bash
cd mvql && yarn install && yarn start
# babel-node로 트랜스파일 후 graphql-yoga 실행
```

### React Native (myhoneytip, wegramPracRN)
```bash
cd <project> && yarn install
npx expo start   # Expo Go 앱 또는 에뮬레이터 연결 필요
```

### TDD-basic
```bash
# 루트 기초 버전
cd TDD-basic && npm install && npm test

# 심화 버전
cd TDD-basic/5.3-tdd-2 && npm install && npm test

# 단일 파일만
npx jest src/test/calculator.test.js
```

### JsAlgorythm / node/
```bash
node JsAlgorythm/binarySearch.js
node node/2-console/...
```

## Firebase 환경변수

React 앱들은 프로젝트 루트에 `.env` 파일 필요 (`.gitignore`로 제외됨):
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DB_URL=
REACT_APP_FIREBASE_PROJECT_ID=
```

## 주요 아키텍처 패턴

### 의존성 주입 (CARD_MAKER, findYrStrt)
`index.js`에서 서비스 객체를 생성해 `App` props로 주입한다. 컴포넌트 내부에서 `firebase`를 직접 import하지 않는다.

```
index.js → new AuthService(firebaseApp)
         → new CardRepository(firebaseApp)   # findYrStrt만
         → new ImageUploader()
         → <App authService={...} FileInput={...} />
```

### 서비스 레이어
- React 앱: `src/service/` 폴더에 Firebase 호출 집중
- React Native (wegramPracRN): `config/firebaseFunctions.js` 한 파일에 집중
- React Native (myhoneytip): `firebaseConfig.js` + 각 페이지에서 직접 호출

### CSS Modules
`.module.css`를 컴포넌트와 동일 폴더에 1:1로 배치. 전역 스타일은 `common/colors.css`, `common/size.css`.

## 알려진 버그 — 손대기 전에 확인

### CARD_MAKER

- `card_add_form.jsx:26-30` — `companyRefnameRef`, `themeRefnameRef` 등 ref 이름 오타. 올바른 이름: `companyRef`, `themeRef`, `titleRef`, `emailRef`, `messageRef`
- `card_add_form.jsx:61` — `placeholder={title}` 에서 `title`이 이 컴포넌트 스코프에 없음 → undefined
- `card_add_form.jsx:2` — `import styles from './card_edit_form.module.css'` 오기입. `'./card_add_form.module.css'`가 없어 edit form 스타일을 공유 중
- `card_edit_form.jsx:4` — `unstable_concurrentAct` import 미사용. 삭제 대상
- `maker.jsx:51-57` — `useEffect` deps 배열 없음 → 매 렌더마다 `onAuthChange` 재등록. `[authService]` 추가 필요

### dwitter 서버

- `data/tweet.js:31` — `create()` 함수에 `return tweet` 누락. 현재 controller는 항상 `undefined` 수신
- `controller/tweet.js:27` + `router/tweets.js:10` — 함수명 `upadate` 오타 (동작은 하나 양쪽 동일하게 오타)

### dwitter 클라이언트

- `service/tweet.js:8` — `` `?username={$username}` `` → `` `?username=${username}` `` (달러 위치 오류, 쿼리스트링 전달 안 됨)
- `service/tweet.js:32,41` — `/tweets${tweetId}` → `/tweets/${tweetId}` (슬래시 누락)
- `service/auth.js` — 전체 학습용 stub. 모든 메서드가 `{ username: 'ellie', token: 'abc1234' }` 하드코딩. 실제 API 연동 미구현 상태
