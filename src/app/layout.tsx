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
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${lightTheme}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
