import React from 'react';
import { useParams } from 'react-router-dom';

// 글 상세 페이지 (/posts/:slug) — 빈 껍데기. 본문/태그/댓글은 추후 구현.
function PostDetail() {
  const { slug } = useParams();
  return <article aria-label="글 상세">{/* TODO: {slug} 글 상세 구현 */}</article>;
}

export default PostDetail;
