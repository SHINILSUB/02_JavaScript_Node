# blog — CLAUDE.md

이 파일은 Claude Code가 블로그 프로젝트를 다룰 때 따르는 지침이다.

---

## 프로젝트 개요

브랜드 전문 지식(브랜딩, 마케팅, HCI 등)을 아카이빙·공유하는 개인 블로그.
방문자는 글을 읽고 댓글을 남길 수 있으며, 관리자(작성자)만 글을 작성·수정·삭제한다.
SEO·AEO·GEO 노출 최적화가 핵심 비기능 요구사항이다.

---

## 기술 스택

| 레이어 | 선택 |
|--------|------|
| 프론트엔드 | React (JavaScript, CRA) |
| 인증 | Firebase Authentication (이메일/비밀번호) |
| DB | Firebase Firestore |
| 파일 스토리지 | Firebase Storage (이미지 업로드) |
| 호스팅 | Firebase Hosting |
| 스타일 | CSS Modules |
| 라우팅 | React Router v6 |

---

## 실행 명령

```bash
cd blog
npm install        # 최초 1회 (CRA 프로젝트)
npm start          # 개발 서버 (port 3000)
npm test           # Jest
npm run build      # 프로덕션 빌드
firebase deploy    # Firebase Hosting 배포
```

---

## 기능 범위 (MVP)

### 공개 기능 (비로그인)
- 글 목록 페이지 (`/`) — 최신순, 카테고리 필터
- 글 상세 페이지 (`/posts/:slug`) — 본문, 태그, 댓글 목록
- 댓글 작성 — 닉네임 + 내용 (비회원 허용)
- 카테고리/태그 페이지 (`/category/:name`, `/tag/:name`)
- 검색 (`/search?q=`)

### 관리자 기능 (로그인 필요)
- 로그인 (`/login`) — Firebase Auth 이메일/비밀번호
- 글 작성 (`/write`) — 마크다운 에디터
- 글 수정/삭제 (`/posts/:slug/edit`)
- 댓글 삭제 (관리자 전용)
- 대시보드 (`/admin`) — 글 목록 관리

---

## 아키텍처 원칙

### 의존성 주입 (DI) 패턴 — 이 프로젝트 필수 규칙
`index.js`에서 서비스 인스턴스를 생성해 `App` props로 주입한다.
컴포넌트 내부에서 `firebase`를 직접 import하지 않는다.

```
index.js
  → new AuthService(firebaseApp)
  → new PostService(firebaseApp)
  → new CommentService(firebaseApp)
  → new ImageUploader(firebaseApp)
  → <App authService={...} postService={...} ... />
```

### 서비스 레이어
모든 Firebase 호출은 `src/service/`에 집중한다.

| 파일 | 역할 |
|------|------|
| `auth_service.js` | signIn, signOut, onAuthChange |
| `post_service.js` | getPosts, getPost, createPost, updatePost, deletePost |
| `comment_service.js` | getComments, addComment, deleteComment |
| `image_uploader.js` | upload(file) → URL 반환 |

### CSS Modules
컴포넌트와 같은 폴더에 `ComponentName.module.css` 1:1 배치.
전역 스타일은 `src/common/global.css`만 허용.

---

## SEO / AEO / GEO 지침

### SEO (Search Engine Optimization)
- 각 페이지에 `<title>`, `<meta name="description">` 필수
- OpenGraph 태그 (`og:title`, `og:description`, `og:image`, `og:url`) 필수
- Twitter Card 태그 포함
- `<h1>` 은 페이지당 1개, 계층 구조 엄수 (h1 → h2 → h3)
- URL slug는 영문 소문자 + 하이픈 (`/posts/brand-identity-guide`)
- `robots.txt` + `sitemap.xml` 생성 (Firebase Hosting 정적 파일로 제공)
- 이미지에 `alt` 속성 필수, WebP 형식 권장

### AEO (Answer Engine Optimization — AI 검색 대응)
- 글 본문 첫 단락에 핵심 답변을 요약 (질문 → 즉답 구조)
- FAQ 섹션에 `application/ld+json` Schema.org `FAQPage` 마크업 삽입
- 정의·개념 설명글은 `DefinedTerm` 구조화 데이터 사용
- 문장은 짧고 명료하게, 능동태 우선

### GEO (Generative Engine Optimization — LLM 검색 대응)
- 각 글 상단에 `<article>` 태그 + `itemscope itemtype="https://schema.org/Article"`
- `author`, `datePublished`, `dateModified`, `publisher` 메타 필수
- 글의 핵심 주장을 명시적 소제목(h2)으로 구조화
- 인용·출처는 `<cite>` 태그 또는 외부 링크로 명확히 표기
- 브랜드 전문 지식 글은 `ProfessionalService` 또는 `HowTo` 스키마 고려

### 공통
- `react-helmet-async`로 페이지별 메타 태그 관리
- SSR이 없으므로 Firebase Hosting의 `__prerender__` 또는 pre-rendering 라이브러리 검토

---

## 디렉토리 구조 (목표)

```
blog/
├── public/
│   ├── robots.txt
│   └── sitemap.xml        ← 빌드 후 자동 생성 스크립트 예정
├── src/
│   ├── index.js           ← DI 진입점
│   ├── App.jsx
│   ├── firebase.js        ← firebaseApp 초기화만 담당
│   ├── service/
│   │   ├── auth_service.js
│   │   ├── post_service.js
│   │   ├── comment_service.js
│   │   └── image_uploader.js
│   ├── components/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── PostCard/
│   │   └── Comment/
│   ├── pages/
│   │   ├── Home/
│   │   ├── PostDetail/
│   │   ├── Write/
│   │   ├── Login/
│   │   └── Admin/
│   ├── hooks/
│   │   └── useAuth.js
│   ├── context/
│   │   └── AuthContext.jsx
│   └── common/
│       └── global.css
├── .env                   ← git 제외 (Firebase 환경변수)
├── .firebaserc
├── firebase.json
└── CLAUDE.md
```

---

## Firebase 환경변수

프로젝트 루트 `.env` 파일 필요 (`.gitignore` 제외):

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

---

## Firestore 데이터 모델

### `posts` 컬렉션
```
posts/{postId}
  title: string
  slug: string          ← URL용 고유 식별자
  content: string       ← 마크다운 원문
  excerpt: string       ← SEO description용 요약 (160자 이내)
  category: string
  tags: string[]
  authorId: string
  published: boolean
  createdAt: timestamp
  updatedAt: timestamp
  metaTitle: string     ← SEO 커스텀 타이틀 (없으면 title 사용)
  metaDescription: string
  ogImage: string       ← 대표 이미지 URL
```

### `comments` 컬렉션
```
comments/{commentId}
  postId: string
  nickname: string
  content: string
  createdAt: timestamp
  deletedAt: timestamp | null
```

---

## 하지 말 것

| 금지 | 이유 |
|------|------|
| 컴포넌트 내 `import { db } from '../firebase'` | DI 패턴 위반 |
| 전역 CSS 클래스명 직접 사용 | CSS Modules만 사용 |
| `<h1>` 복수 사용 | SEO 원칙 위반 |
| 이미지 `alt` 생략 | 접근성·SEO 위반 |
| slug에 한글·공백 사용 | URL 인코딩 문제 |
| `dangerouslySetInnerHTML` 남용 | XSS 위험; 마크다운 렌더러(react-markdown)로 처리 |

---

## 개발 순서 (권장)

1. CRA 초기화 + Firebase 프로젝트 연결 + `.env` 설정
2. `firebase.js` 초기화 + `AuthService` 구현 + 로그인 페이지
3. `PostService` 구현 + 글 목록/상세 페이지
4. `CommentService` 구현 + 댓글 UI
5. 글 작성/수정 에디터 + `ImageUploader`
6. 메타 태그 (`react-helmet-async`) + 구조화 데이터 삽입
7. `sitemap.xml` 자동 생성 스크립트
8. Firebase Hosting 배포
