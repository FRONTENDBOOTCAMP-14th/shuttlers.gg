'use client';

import { useThemeStore } from '@/store/useThemeStore';
import '@/styles/global.css';
import { darkTheme, lightTheme } from '@/styles/theme.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren, useEffect } from 'react';

export const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shuttlers.GG',
  description: '전국 배드민턴 대회 전적 검색 사이트',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: 'favicon.icon', type: 'any' },
    ],
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  const { mode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(lightTheme, darkTheme);
    root.classList.add(mode === 'dark' ? darkTheme : lightTheme);
  }, [mode]);

  return (
    <html lang="ko" className={`${pretendard.variable} ${lightTheme}`}>
      <body>
        <h1 className="sr-only">Shuttlers</h1>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
