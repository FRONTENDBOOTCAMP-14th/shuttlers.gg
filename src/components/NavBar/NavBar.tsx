import Input from '@/components/Input/Input';
import Logo from '@/components/Logo/Logo';
import { Users } from '@/libs/supabase/client';
import {
  ArrowLeftIcon,
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import * as styles from './NavBar.css';

type Menu = {
  label: string;
  icon?: ReactNode;
  path: string;
  variant?: 'primary' | 'secondary';
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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.navBar}>
      {variant === 'primary' && <Logo size="small" />}
      <nav className={styles.navContainer({ variant })}>
        {variant === 'minimal' ? (
          <>
            <button
              onClick={() => router.back()}
              className={styles.navItem({})}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 8,
                  lineHeight: 1,
                }}
              >
                <ArrowLeftIcon width={24} aria-hidden />
                이전으로
              </div>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? '메뉴 닫기' : '메뉴 펼치기'}
              className={styles.hamburger}
            >
              {isOpen ? <XMarkIcon width={24} /> : <Bars3Icon width={24} />}
            </button>

            <div className={styles.navMenu({ isOpen })}>
              {navItems && (
                <ul
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: 16,
                  }}
                >
                  {navItems.map((item) => {
                    const isActive = item.path === activePath;
                    return (
                      <li
                        key={item.label}
                        className={styles.navItem({ isActive })}
                      >
                        <Link href={item.path}>{item.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              {showSearch && (
                <Input
                  type="search"
                  name="search-player"
                  placeholder="전적 검색"
                  variant="secondary"
                />
              )}
            </div>

            <div style={{ display: 'flex', columnGap: 16 }}>
              {user ? (
                <Link
                  href={`/mypage/${user.id}`}
                  aria-label="마이페이지"
                  className={styles.menuIcon}
                >
                  <UserCircleIcon width={24} />
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  aria-label="로그인"
                  className={styles.menuIcon}
                >
                  <ArrowRightEndOnRectangleIcon width={24} />
                </Link>
              )}
              <button
                onClick={onToggleTheme}
                aria-label="테마 바꾸기"
                className={styles.menuIcon}
              >
                {theme === 'dark' ? (
                  <SunIcon width={24} aria-hidden />
                ) : (
                  <MoonIcon width={24} aria-hidden />
                )}
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
