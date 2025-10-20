'use client';

import NavBar from '@/components/NavBar/NavBar';
import { useTheme } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function ThemeToggler({ children }: PropsWithChildren) {
  const { theme, setTheme } = useTheme();

  const menus = [
    { label: '대회일정', path: '/calendar' },
    { label: '모임찾기', path: '/' },
  ];

  return (
    <>
      <NavBar
        navItems={menus}
        theme={theme === 'dark' ? 'dark' : 'light'}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      {children}
    </>
  );
}
