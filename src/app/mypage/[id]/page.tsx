'use client';

import { MyPage } from '@/app/mypage/MyPage';
import { useParams } from 'next/navigation';

// export const metadata = {
//   title: 'MyPage | Shuttlers',
//   description: '마이페이지',
// };

export default function MyPagePage() {
  const params = useParams<{ id: string }>();

  return <MyPage id={params.id} />;
}
