import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './common/global.css';
import App from './App';
import { firebaseApp } from './firebase';
import AuthService from './service/auth_service';
import PostService from './service/post_service';
import CommentService from './service/comment_service';
import ImageUploader from './service/image_uploader';

// DI 진입점 — 서비스 인스턴스를 생성해 App props 로 주입한다.
const authService = new AuthService(firebaseApp);
const postService = new PostService(firebaseApp);
const commentService = new CommentService(firebaseApp);
const imageUploader = new ImageUploader(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App
          authService={authService}
          postService={postService}
          commentService={commentService}
          imageUploader={imageUploader}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
