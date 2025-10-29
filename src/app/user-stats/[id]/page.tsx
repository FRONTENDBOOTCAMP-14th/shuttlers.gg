'use client';

import * as styles from '@/app/user-stats/[id]/UserStats.css';
import { MatchHistorySection } from '@/components/MatchHistorySection/MatchHistorySection';
import { PartnersSection } from '@/components/PartnersSection/PartnersSection';
import { StatsCard } from '@/components/StatsCard/StatsCard';
import UserCard from '@/components/UserCard/UserCard';
import { WinRateChart } from '@/components/WinRateChart/WinRateChart';
import { usePlayerStats } from '@/hooks/usePlayerStats';
import {
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';

export default function UserStatsPage() {
  const params = useParams();
  const playerId = params.id as string;

  const { isLoading, isError, summary } = usePlayerStats({
    playerId: playerId,
  });

  const user = {
    playerName: '김민수',
    tags: ['남자', '아마추어'],
    localGrade: 'C',
    nationalGrade: 'D',
  };

  if (isLoading) {
    return (
      <div className={styles.profile}>
        <p className={styles.errorMessage} role="status" aria-live="polite">
          데이터를 불러오는 중...
        </p>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className={styles.profile}>
        <p className={styles.errorMessage} role="alert">
          데이터를 불러올 수 없습니다. 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.topSection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>조회 결과</h2>
      </div>

      <article className={styles.profile}>
        <section className={styles.section()}>
          <UserCard
            variant="public"
            name={user.playerName}
            gender={user.tags.includes('남자') ? 'male' : 'female'}
            // @ts-expect-error: 
            grade={{ local: user.localGrade, national: user.nationalGrade }}
            email="kimminsu@example.com"
            role={user.tags.includes('아마추어') ? 'amateur' : 'pro'}
          />
        </section>

        <section className={styles.section()}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <ChartBarIcon
                className={styles.sectionTitleIcon}
                aria-hidden="true"
              />
              출전 기록
            </h2>
          </header>
          <StatsCard summary={summary} />
        </section>

        <div style={{ display: 'flex', columnGap: 24 }}>
          <section className={styles.section()}>
            <h2 className={styles.sectionTitle}>
              <TrophyIcon
                className={styles.sectionTitleIcon}
                aria-hidden="true"
              />
              승률
            </h2>
            <WinRateChart wins={summary.wins} losses={summary.losses} />
          </section>

          <section className={styles.section()} style={{ display: 'none' }}>
            <h2 className={styles.sectionTitle}>
              <UsersIcon
                className={styles.sectionTitleIcon}
                aria-hidden="true"
              />
              함께한 파트너
            </h2>
            <PartnersSection partners={undefined} />
          </section>
        </div>

        <section className={styles.section()} style={{ display: 'none' }}>
          <h2 className={styles.sectionTitle}>
            <ClockIcon className={styles.sectionTitleIcon} aria-hidden="true" />
            경기 히스토리
          </h2>
          <MatchHistorySection matches={undefined} />
        </section>
      </article>
    </div>
  );
}
