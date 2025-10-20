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
import * as styles from './NavBar.css';

type Menu = {
  label: string;
  path: string;
};

type NavBarProps = {
  navItems?: Menu[];
  user?: Pick<Users, 'id'>;
  theme?: 'light' | 'dark';
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
    <header className={styles.navBar({ variant })}>
      {variant === 'primary' && <Logo size="small" />}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {navItems && (
          <ul className={styles.navItems}>
            {navItems.map((item) => {
              const isActive = item.path === activePath;

              return (
                <li
                  key={item.label}
                  className={isActive ? styles.activeMenu : undefined}
                >
                  <Link href={item.path}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        )}

        {showSearch && <Input type="search" />}

        <div style={{ display: 'flex', columnGap: 24 }}>
          {user ? (
            <Link href={`mypage/${user.id}`} aria-label="마이페이지">
              <div className={styles.menuIcon}>
                <UserCircleIcon width={28} />
              </div>
            </Link>
          ) : (
            <Link href="auth/login" aria-label="로그인">
              <div className={styles.menuIcon}>
                <ArrowRightEndOnRectangleIcon width={28} />
              </div>
            </Link>
          )}
          <button onClick={onToggleTheme} aria-label="테마 바꾸기">
            <div className={styles.menuIcon}>
              {theme === 'light' ? (
                <SunIcon width={28} aria-label="다크 테마로" />
              ) : (
                <MoonIcon width={28} aria-label="라이트 테마로" />
              )}
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
