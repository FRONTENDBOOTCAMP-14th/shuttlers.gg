'use client';

import * as styles from '@/app/mypage/MyPage.css';
import { MyPageForm } from '@/components/MyPageForm/MyPageForm';
import MyPageMeetup from '@/components/MyPageMeetup/MyPageMeetup';
import MyPageTabs from '@/components/MyPageTab/MyPageTab';
import UserCard from '@/components/UserCard/UserCard';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

export function MyPage() {
  const [tab, setTab] = useState<'profile' | 'group'>('profile');
  const { name, email, gender, grade } = useUser(
    '02a687fb-561b-4bf2-a96a-1734a1610417'
  );

  return (
    <div className={styles.MyPage}>
      <div className={styles.MyPageHeader}>
        <div className={styles.HeaderTitle}>마이페이지</div>
        <div className={styles.HeaderDescription}>
          내 정보 및 모임 관리가 가능합니다.
        </div>
      </div>

      <UserCard variant="personal" name={name} gender={gender} email={email} />

      <MyPageTabs
        tabs={[
          { value: 'profile', label: '정보 수정' },
          { value: 'group', label: '모임 관리' },
        ]}
        value={tab}
        onChange={(v) => setTab(v as any)}
      >
        {tab === 'profile' ? (
          <MyPageForm userId="02a687fb-561b-4bf2-a96a-1734a1610417" />
        ) : (
          <MyPageMeetup />
        )}
      </MyPageTabs>
    </div>
  );
}
