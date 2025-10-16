import NavBar from '@/components/NavBar/NavBar';
import '@/styles/global.css';
import { lightTheme } from '@/styles/theme.css';
import ThemeProvider from '@/styles/ThemeProvider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';

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
  return (
    <html lang="ko" className={`${pretendard.variable} ${lightTheme}`}>
      <body>
        <h1 className="sr-only">Shuttlers</h1>
        <NavBar
          navItems={[
            { label: 'Home', path: '/' },
            { label: 'Calendar', path: '/calendar' },
            { label: 'Ranking', path: '/ranking' },
          ]}
          // theme, onToggleTheme, user, onUserClick 등 필요시 주입
        />
        <ThemeProvider>{children}</ThemeProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
