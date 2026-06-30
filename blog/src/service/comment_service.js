// 댓글 서비스 — comments 컬렉션 CRUD. firebaseApp 을 주입받는다 (DI).
class CommentService {
  constructor(firebaseApp) {
    this.firebaseApp = firebaseApp;
  }

  async getComments(/* postId */) {
    throw new Error('not implemented');
  }

  async addComment(/* postId, { nickname, content } */) {
    throw new Error('not implemented');
  }

  async deleteComment(/* commentId */) {
    throw new Error('not implemented');
  }
}

export default CommentService;
