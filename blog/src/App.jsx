import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PostList from './pages/PostList/PostList';
import PostDetail from './pages/PostDetail/PostDetail';
import Write from './pages/Write/Write';

// 라우팅 골격. 서비스는 props로 주입받아 각 페이지에 전달한다 (DI 패턴).
// 컴포넌트 내부에서 firebase 를 직접 import 하지 않는다.
function App(/* { authService, postService, commentService, imageUploader } */) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:slug" element={<PostDetail />} />
        <Route path="/write" element={<Write />} />
      </Route>
    </Routes>
  );
}

export default App;
