'use client';

import NavBar from '@/components/NavBar/NavBar';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function ThemeToggler({ children }: PropsWithChildren) {
  const { theme, setTheme } = useTheme();
  const path = usePathname();

  const variant =
    path === '/landing'
      ? 'secondary'
      : path.startsWith('/auth')
        ? path.startsWith('/auth/verify')
          ? 'secondary'
          : 'minimal'
        : 'primary';
  const showSearch = !(path === '/landing' || path.startsWith('/auth'));

  const menus = [
    { label: '대회일정', path: '/calendar' },
    { label: '모임찾기', path: '/party' },
  ];

  return (
    <>
      <NavBar
        navItems={menus}
        theme={theme === 'dark' ? 'dark' : 'light'}
        variant={variant}
        activePath={path}
        showSearch={showSearch}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      {children}
    </>
  );
}
