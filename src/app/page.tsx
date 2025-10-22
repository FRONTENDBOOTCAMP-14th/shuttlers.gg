'use client';

import type { User } from '@/components/LandingSearch/LandingSearch';
import LandingSearch from '@/components/LandingSearch/LandingSearch';
import { useState } from 'react';

export default function Page() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main
      style={{
        width: 1920,
        height: 500,
        margin: '0 auto',
        padding: 32,
        overflow: 'hidden', // ✅ 스크롤 방지
      }}
    >
      <h2>Landing Search 컴포넌트</h2>
      <LandingSearch
        onUserSelect={(user) => setSelectedUser(user)}
        placeholder="누구의 전적이 궁금하신가요?"
      />
    </main>
  );
}
