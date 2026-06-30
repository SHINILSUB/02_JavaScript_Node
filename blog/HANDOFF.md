# HANDOFF — 블로그 작업 인계 노트

> 다른 PC로 옮겨 작업을 이어가기 위한 상태 요약. 새 PC에서 새 Claude 세션을 열면 이 파일과 `CLAUDE.md`로 맥락을 인계받는다.

## 현재 상태 (요약)

블로그 프로젝트의 **스켈레톤(뼈대)까지** 완료. 개별 화면 내용은 미구현.

- CRA 구조 + React Router v6 라우팅 + react-helmet-async + firebase 설치 기준
- 디자인 시스템 토큰을 전역 스타일로 설정 (`src/common/global.css`)
- 공통 레이아웃(Header/Footer/컨테이너)은 **빈 껍데기**
- Firebase 초기화 + 에뮬레이터 연결 파일 작성

## 완료된 범위

| 항목 | 위치 | 상태 |
|------|------|------|
| 라우팅 (글목록/상세/작성) | `src/App.jsx` | `/`, `/posts/:slug`, `/write` |
| DI 진입점 (서비스 주입) | `src/index.js` | auth/post/comment/imageUploader 주입 |
| 공통 레이아웃 | `src/components/Layout` | Header+Outlet+Footer 골격 |
| Header / Footer | `src/components/Header`, `Footer` | 빈 껍데기 (토큰만 적용) |
| 페이지 3종 | `src/pages/PostList`, `PostDetail`, `Write` | 빈 껍데기 (TODO 주석) |
| 서비스 레이어 골격 | `src/service/*.js` | 메서드 시그니처만, 미구현 |
| 인증 컨텍스트/훅 | `src/context/AuthContext.jsx`, `src/hooks/useAuth.js` | 골격 |
| 디자인 토큰 | `src/common/global.css` | 색/타이포/간격/radius/shadow CSS 변수 |
| Firebase 초기화 + 에뮬레이터 | `src/firebase.js` | `REACT_APP_USE_EMULATOR=true`로 에뮬레이터 연결 |
| Firebase 프로젝트 설정 | `firebase.json`, `.firebaserc`, `firestore.rules`, `storage.rules` | 에뮬레이터 포트 + 규칙 골격(전체 차단) |
| 환경변수 템플릿 | `.env.example` | Firebase 키 6종 + USE_EMULATOR |

디자인 출처: claude.ai/design 프로젝트(`HIMPEL 블로그 글목록.dc.html` + `docs/design/post-list.md`, HIMPEL Design System v2.0). 이 명세서들은 **repo에 없고** claude.ai/design MCP에 있다 — 새 세션에서 글목록 화면 구현 시 design MCP(`/design-login` 후 DesignSync)로 다시 읽어와야 한다. repo 안의 `# Himpel design system/` 폴더에는 디자인 시스템 HTML 시안이 들어있다.

## 새 PC에서 시작하기

```bash
git clone https://github.com/SHINILSUB/02_JavaScript_Node.git
cd 02_JavaScript_Node/blog
cp .env.example .env      # Firebase 실제 값 채우기
npm install
npm start                 # http://localhost:3000
```

## ⚠️ 이전 PC에서 막혔던 이슈 (알약 백신)

이전 PC(Windows + 알약/ALYac)에서는 `Development` 폴더가 알약의 랜섬웨어/행위기반 보호 대상이라 **`node.exe`의 파일 쓰기가 EPERM으로 차단**됐다. 그래서 `npm install`이 추출 중 스크립트 파일(react-scripts.js, .bin 셔임 등)을 잃고, `npm run build`도 산출물 쓰기에서 실패했다.

- **새 PC에 알약이 없으면**: 그냥 `npm install` 하면 된다.
- **새 PC에도 알약이 있으면**: 랜섬웨어 보호 → 신뢰 프로그램에 `node.exe` 추가, 또는 프로젝트 폴더를 보호 대상에서 제외. (정밀검사 예외만으로는 안 풀림)
- 우회 설치법: `%TEMP%`에 설치 후 `robocopy <temp>\node_modules .\node_modules /E /MOVE` (robocopy는 신뢰 프로세스라 보존됨). 단 build/start는 결국 node.exe 쓰기 권한 필요.

## 다음 할 일 (권장 순서)

1. 글 목록 화면 구현 (PostCard 그리드 / 카테고리 필터칩 / 페이지네이션 / 로딩·빈·에러 상태) — 명세서 `docs/design/post-list.md` 기준
2. PostService 등 서비스 레이어 실제 구현 (Firestore 연동)
3. 글 상세 / 댓글 UI
4. 글 작성 에디터 + ImageUploader
5. 메타 태그(react-helmet-async) + 구조화 데이터, sitemap, 배포
