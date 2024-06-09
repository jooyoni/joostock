'use client';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';
import Hamburger from '@/assets/hamburger.svg';
import Image from 'next/image';
import { useState } from 'react';
import Close from '@/assets/close.svg';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <header className={styles.container}>
        <div className={styles.logoWrap}>
          <Logo />
        </div>
        <button className={styles.mobileSidebarBtn} onClick={() => setSidebarOpen(true)}>
          {/* <Image src={Hamburger} alt='사이드바'></Image> */}
          <Hamburger />
        </button>
      </header>
      {sidebarOpen && (
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContainer}>
            <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}>
              {/* <Image src={Close} alt='닫기'></Image> */}
              <Close viewBox='0 0 36 36' />
            </button>
            <nav>
              <Link href='/search'>STOCK SEARCH</Link>
              <Link href='/portfolio'>OWNER&apos;S PORTFOLIO</Link>
              <Link href='/donate'>DONTATE</Link>
            </nav>
          </div>
        </aside>
      )}
    </>
  );
}
export default Header;
