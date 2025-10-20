'use client';

import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { Logo } from '../Logo';
import * as styles from './NavBar.css';

type NavItem = {
  label: string;
  path: string;
  variant?: 'primary' | 'secondary';
};

type NavBarProps = {
  navItems: NavItem[];
  activePath?: string;
  onNavigate?: (path: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  user?: { name: string } | null;
  onUserClick?: () => void;
  variant?: 'default' | 'compact';
};

export default function NavBar({
  navItems,
  activePath = '/',
  onNavigate,
  theme = 'light',
  onToggleTheme,
  user = null,
  onUserClick,
  variant = 'default',
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (e: MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    } else {
      e.preventDefault();
      router.push(path);
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.navBar} data-variant={variant}>
      <nav
        className={styles.navBarContainer}
        data-variant={variant}
        aria-label="주요 탐색"
        role="navigation"
      >
        <div className={styles.navBarLeft} data-variant={variant}>
          <Logo size="small" />
        </div>

        <div className={styles.right}>
          {variant === 'compact' ? (
            <div className={styles.compactNav}>
              <ul className={styles.navList}>
                {navItems.map((item) => (
                  <li key={item.path}>
                    {onNavigate ? (
                      <a
                        href={item.path}
                        className={styles.navItem}
                        aria-current={
                          activePath === item.path ? 'page' : undefined
                        }
                        data-active={activePath === item.path}
                        onClick={(e) => handleNavigate(e, item.path)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.path}
                        className={styles.navItem}
                        aria-current={
                          activePath === item.path ? 'page' : undefined
                        }
                        data-active={activePath === item.path}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.desktopNav}>
              <ul className={styles.navList}>
                {navItems.map((item) => (
                  <li key={item.path}>
                    {onNavigate ? (
                      <a
                        href={item.path}
                        className={styles.navItem}
                        aria-current={
                          activePath === item.path ? 'page' : undefined
                        }
                        data-active={activePath === item.path}
                        onClick={(e) => handleNavigate(e, item.path)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.path}
                        className={styles.navItem}
                        aria-current={
                          activePath === item.path ? 'page' : undefined
                        }
                        data-active={activePath === item.path}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            className={styles.iconButton}
            aria-label={user ? `${user.name} 계정 열기` : '로그인 메뉴 열기'}
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
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? (
              <SunIcon width={36} height={36} />
            ) : (
              <MoonIcon width={36} height={36} />
            )}
          </button>

          <button
            type="button"
            className={`${styles.iconButton} ${styles.hamburger}`}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-controls="mobile-nav"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <Bars3Icon width={22} height={22} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-nav" className={styles.mobilePanel}>
          {navItems.map((item) =>
            onNavigate ? (
              <a
                key={item.path}
                href={item.path}
                className={styles.mobileNavItem}
                aria-current={activePath === item.path ? 'page' : undefined}
                data-active={activePath === item.path}
                onClick={(e) => handleNavigate(e, item.path)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.path}
                href={item.path}
                className={styles.mobileNavItem}
                aria-current={activePath === item.path ? 'page' : undefined}
                data-active={activePath === item.path}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
