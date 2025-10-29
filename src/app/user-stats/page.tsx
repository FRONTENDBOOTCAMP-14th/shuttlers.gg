'use client';

import * as styles from '@/app/user-stats/[id]/UserStats.css';
import { MatchHistorySection } from '@/components/MatchHistorySection/MatchHistorySection';
import { PartnersSection } from '@/components/PartnersSection/PartnersSection';
import { ProfileFilters } from '@/components/ProfileFilters/ProfileFilters';
import { StatsCard } from '@/components/StatsCard/StatsCard';
import { WinRateChart } from '@/components/WinRateChart/WinRateChart';
import type { CompetitionType, EventType, Grade } from '@/hooks/usePlayerStats';
import { usePlayerStats } from '@/hooks/usePlayerStats';
import {
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function UserStatsPage() {
  const params = useParams();
  const playerId = params.id as string;

  const [competition, setCompetition] = useState<CompetitionType | undefined>();
  const [event, setEvent] = useState<EventType | undefined>();
  const [grade, setGrade] = useState<Grade | undefined>();

  const { summary, isLoading, isError } = usePlayerStats({
    playerId,
    competition,
    event,
    grade,
  });

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
    <article className={styles.profile}>
      <section className={styles.section()}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <ChartBarIcon
              className={styles.sectionTitleIcon}
              aria-hidden="true"
            />
            출전 기록
          </h2>
          <ProfileFilters
            competition={competition}
            event={event}
            grade={grade}
            onCompetitionChange={setCompetition}
            onEventChange={setEvent}
            onGradeChange={setGrade}
          />
        </header>
        <StatsCard summary={summary} />
      </section>

      <section className={styles.section()}>
        <h2 className={styles.sectionTitle}>
          <TrophyIcon className={styles.sectionTitleIcon} aria-hidden="true" />
          승률
        </h2>
        <WinRateChart
          winRate={summary.winRate}
          wins={summary.wins}
          losses={summary.losses}
        />
      </section>

      <section className={styles.section()}>
        <h2 className={styles.sectionTitle}>
          <UsersIcon className={styles.sectionTitleIcon} aria-hidden="true" />
          함께한 파트너
        </h2>
        <PartnersSection partners={undefined} />
      </section>

      <section className={styles.section()}>
        <h2 className={styles.sectionTitle}>
          <ClockIcon className={styles.sectionTitleIcon} aria-hidden="true" />
          경기 히스토리
        </h2>
        <MatchHistorySection matches={undefined} />
      </section>
    </article>
  );
}
