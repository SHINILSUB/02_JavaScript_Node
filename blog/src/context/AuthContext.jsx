import { createContext } from 'react';

// 관리자 인증 상태 공유용 컨텍스트 — 빈 껍데기.
// Provider 는 추후 authService.onAuthChange 를 구독해 user 를 주입한다.
export const AuthContext = createContext({ user: null, loading: true });

export default AuthContext;
