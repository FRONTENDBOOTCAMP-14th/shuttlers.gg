import '@/styles/global.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Shuttlers.GG',
  description: '전국 배드민턴 대회 전적 검색 사이트',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>{children}글로벌스타일</body>
    </html>
  );
}
