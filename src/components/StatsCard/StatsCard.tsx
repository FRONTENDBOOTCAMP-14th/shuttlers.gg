import type { PlayerStatsSummary } from '@/hooks/usePlayerStats';
import * as styles from './StatsCard.css';

type StatsCardProps = {
  summary: PlayerStatsSummary;
};

export function StatsCard({ summary }: StatsCardProps) {
  const { games, wins, losses, winRate, bestRank } = summary;

  return (
    <dl className={styles.statsCard}>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <dt className={styles.statLabel}>총 경기수</dt>
          <dd className={styles.statValue}>{games}경기</dd>
        </div>

        <div className={styles.statItem}>
          <dt className={styles.statLabel}>전적</dt>
          <dd className={styles.statValue}>
            {wins}승{losses}패
          </dd>
        </div>

        <div className={styles.statItem}>
          <dt className={styles.statLabel}>승률</dt>
          <dd className={styles.statValue}>{winRate}%</dd>
        </div>

        <div className={styles.statItem}>
          <dt className={styles.statLabel}>최고 성적</dt>
          <dd className={styles.statValue}>
            {bestRank ? `${bestRank}위` : '-'}
          </dd>
        </div>
      </div>
    </dl>
  );
}
