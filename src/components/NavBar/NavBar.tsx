import Input from '@/components/Input/Input';
import { Logo } from '@/components/Logo';
import { Users } from '@/libs/supabase/client';
import {
  ArrowRightEndOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ReactNode } from 'react';
import * as styles from './NavBar.css';

type Menu = {
  label: string;
  icon?: ReactNode;
  path: string;
};

type NavBarProps = {
  navItems?: Menu[];
  user?: Pick<Users, 'id'>;
  theme: 'light' | 'dark';
  variant?: 'primary' | 'secondary' | 'minimal';
  activePath?: string;
  showSearch?: boolean;
  onToggleTheme?: () => void;
};

export default function NavBar({
  navItems,
  user = undefined,
  theme = 'light',
  variant = 'primary',
  activePath = '/',
  showSearch = false,
  onToggleTheme,
}: NavBarProps) {
  return (
    <header className={styles.navBar}>
      {variant === 'primary' && <Logo size="small" />}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: `${variant === 'primary' ? 'flex-end' : 'space-between'}`,
          columnGap: 24,
          width: '100%',
        }}
      >
        {navItems && (
          <ul style={{ display: 'flex', columnGap: 16 }}>
            {navItems.map((item) => {
              const isActive = item.path === activePath;
              return (
                <li key={item.label} className={styles.navItem({ isActive })}>
                  <Link href={item.path}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        )}

        <div style={{ display: 'flex', columnGap: 24 }}>
          {showSearch && <Input type="search" />}

          <div style={{ display: 'flex', columnGap: 16 }}>
            {user ? (
              <Link
                href={`mypage/${user.id}`}
                aria-label="마이페이지"
                className={styles.menuIcon}
              >
                <UserCircleIcon width={28} />
              </Link>
            ) : (
              <Link
                href="auth/login"
                aria-label="로그인"
                className={styles.menuIcon}
              >
                <ArrowRightEndOnRectangleIcon width={28} />
              </Link>
            )}
            <button
              onClick={onToggleTheme}
              aria-label="테마 바꾸기"
              className={styles.menuIcon}
            >
              {theme === 'dark' ? (
                <SunIcon width={28} aria-label="라이트 테마로" />
              ) : (
                <MoonIcon width={28} aria-label="다크 테마로" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
