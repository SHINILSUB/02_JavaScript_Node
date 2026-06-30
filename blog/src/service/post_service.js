// 글 서비스 — posts 컬렉션 CRUD. firebaseApp 을 주입받는다 (DI).
class PostService {
  constructor(firebaseApp) {
    this.firebaseApp = firebaseApp;
  }

  async getPosts(/* { category } */) {
    throw new Error('not implemented');
  }

  async getPost(/* slug */) {
    throw new Error('not implemented');
  }

  async createPost(/* post */) {
    throw new Error('not implemented');
  }

  async updatePost(/* id, patch */) {
    throw new Error('not implemented');
  }

  async deletePost(/* id */) {
    throw new Error('not implemented');
  }
}

export default PostService;
