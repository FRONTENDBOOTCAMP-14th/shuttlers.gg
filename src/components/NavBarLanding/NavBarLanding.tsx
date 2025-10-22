'use client';

import { MoonIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { MouseEvent, useState } from 'react';
import * as styles from './NavBarLanding.css';

type NavItem = {
  label: string;
  path: string;
  variant?: 'primary' | 'secondary';
};

type NavBarLandingProps = {
  navItems?: NavItem[];
  activePath?: string;
  onNavigate?: (path: string) => void;
  initialTheme?: 'light' | 'dark';
  onUserClick?: () => void;
};

export default function NavBarLanding({
  navItems = [
    { label: '대회일정', path: '/events', variant: 'primary' },
    { label: '모임찾기', path: '/meetings', variant: 'primary' },
    { label: '매장검색', path: '/stores', variant: 'secondary' },
    { label: '대관하기', path: '/booking', variant: 'secondary' },
  ],
  activePath = '/',
  onNavigate,
  initialTheme = 'light',
  onUserClick,
}: NavBarLandingProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  const handleNavigate = (e: MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className={styles.navBar} data-theme={theme}>
      <nav
        className={styles.navBarContainer}
        aria-label="주요 탐색"
        role="navigation"
      >
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className={styles.navItem}
                aria-current={activePath === item.path ? 'page' : undefined}
                data-active={activePath === item.path}
                data-variant={item.variant || 'primary'}
                onClick={(e) => handleNavigate(e, item.path)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="로그인 메뉴 열기"
            onClick={onUserClick}
          >
            <UserCircleIcon width={36} height={36} />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label={
              theme === 'dark' ? '라이트 테마로 전환' : '다크 테마로 전환'
            }
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <SunIcon width={36} height={36} />
            ) : (
              <MoonIcon width={36} height={36} />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
