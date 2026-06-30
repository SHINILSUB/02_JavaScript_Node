import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

// 공통 레이아웃 — Header / 본문 컨테이너 / Footer 골격.
// 라우트의 자식 페이지는 <Outlet /> 자리에 렌더된다.
function Layout() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
