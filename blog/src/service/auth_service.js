// 인증 서비스 — Firebase Auth 호출 집중. firebaseApp 을 주입받는다 (DI).
class AuthService {
  constructor(firebaseApp) {
    this.firebaseApp = firebaseApp;
  }

  // 이메일/비밀번호 로그인
  async signIn(/* email, password */) {
    throw new Error('not implemented');
  }

  async signOut() {
    throw new Error('not implemented');
  }

  // 인증 상태 변화 구독. unsubscribe 함수를 반환.
  onAuthChange(/* onUserChanged */) {
    throw new Error('not implemented');
  }
}

export default AuthService;
