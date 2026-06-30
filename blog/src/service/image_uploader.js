// 이미지 업로더 — Firebase Storage 업로드. firebaseApp 을 주입받는다 (DI).
class ImageUploader {
  constructor(firebaseApp) {
    this.firebaseApp = firebaseApp;
  }

  // 파일을 업로드하고 다운로드 URL 을 반환한다.
  async upload(/* file */) {
    throw new Error('not implemented');
  }
}

export default ImageUploader;
