import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// 로그인 사용자/인증 상태에 접근하는 훅 — 빈 껍데기.
export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
