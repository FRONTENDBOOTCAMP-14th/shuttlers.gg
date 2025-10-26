'use client';

import * as styles from '@/app/mypage/MyPage.css';
import { MyPageForm } from '@/components/MyPageForm/MyPageForm';
import MyPageMeetup from '@/components/MyPageMeetup/MyPageMeetup';
import MyPageTabs from '@/components/MyPageTab/MyPageTab';
import UserCard from '@/components/UserCard/UserCard';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

const USER_ID = '02a687fb-561b-4bf2-a96a-1734a1610417';

export function MyPage() {
  const [tab, setTab] = useState<'profile' | 'group'>('profile');
  const { name, email, gender, localGrade, nationalGrade, loading, refresh } =
    useUser(USER_ID);

  if (loading) {
    return (
      <div className={styles.MyPage}>
        <div className={styles.MyPageHeader}>
          <div className={styles.HeaderTitle}>마이페이지</div>
          <div className={styles.HeaderDescription}>
            내 정보 및 모임 관리가 가능합니다.
          </div>
        </div>
        <div>불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.MyPage}>
      <div className={styles.MyPageHeader}>
        <div className={styles.HeaderTitle}>마이페이지</div>
        <div className={styles.HeaderDescription}>
          내 정보 및 모임 관리가 가능합니다.
        </div>
      </div>

      <UserCard
        variant="personal"
        name={name}
        gender={gender}
        email={email}
        grade={{ local: localGrade, national: nationalGrade }}
      />

      <MyPageTabs
        tabs={[
          { value: 'profile', label: '정보 수정' },
          { value: 'group', label: '모임 관리' },
        ]}
        value={tab}
        onChange={(v) => setTab(v as 'profile' | 'group')}
      >
        {tab === 'profile' ? (
          <MyPageForm userId={USER_ID} onSaveSuccess={refresh} />
        ) : (
          <MyPageMeetup />
        )}
      </MyPageTabs>
    </div>
  );
}
