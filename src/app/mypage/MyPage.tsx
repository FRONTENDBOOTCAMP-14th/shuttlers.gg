'use client';

import * as styles from '@/app/mypage/MyPage.css';
import { MyPageForm } from '@/components/MyPageForm/MyPageForm';
import MyPageMeetup from '@/components/MyPageMeetup/MyPageMeetup';
import MyPageTabs from '@/components/MyPageTab/MyPageTab';
import UserCard from '@/components/UserCard/UserCard';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import { supabase } from '@/libs/supabase/client';
import { useRouter } from 'next/navigation';

export function MyPage(id: string) {
  const router = useRouter();
  const [tab, setTab] = useState<'profile' | 'group'>('profile');

  const {
    name,
    email,
    gender,
    localGrade,
    nationalGrade,
    loading,
    refresh,
  } = useUser(id);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/landing');
      router.refresh();
    } catch (e) {
      console.error('logout failed', e);
      alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

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
        onClick={handleLogout}
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
          <MyPageForm userId={id} onSaveSuccess={refresh} />
        ) : (
          <MyPageMeetup />
        )}
      </MyPageTabs>
    </div>
  );
}
