'use client';

import { UserResultCard } from '../components/UserResultCard/UserResultCard';

export default function HomePage() {
  return (
    <>
      <UserResultCard
        id="123213"
        name="김길규"
        grade={{ national: 'A', local: 'B' }}
        gender="male"
        variant="history"
        onRemove={() => {
          // 여기에 삭제 로직
          console.log('검색 이력에서 제거');
        }}
      ></UserResultCard>
    </>
  );
}
