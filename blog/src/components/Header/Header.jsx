import React from 'react';
import styles from './Header.module.css';

// 공통 상단 헤더 — 빈 껍데기. 내비/검색/로고 등 내용은 추후 구현.
function Header() {
  return <header className={styles.header} />;
}

export default Header;
