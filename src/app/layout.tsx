import ThemeProvider from '@/store/ThemeProvider';
import ThemeToggler from '@/store/ThemeToggler';
import '@/styles/global.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shuttlers.GG',
  description: '전국 배드민턴 대회 전적 검색 사이트',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body>
        <Toaster />

        <ThemeProvider>
          <ThemeToggler>
            <main>{children}</main>
            <div id="modal-root"></div>
          </ThemeToggler>
        </ThemeProvider>
      </body>
    </html>
  );
}
