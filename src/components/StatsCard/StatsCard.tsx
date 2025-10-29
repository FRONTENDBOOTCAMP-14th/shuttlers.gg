import * as styles from '@/components/StatsCard/StatsCard.css';
import type { PlayerStatsSummary } from '@/hooks/usePlayerStats';

type StatsCardProps = {
  summary: PlayerStatsSummary;
};

export function StatsCard({ summary }: StatsCardProps) {
  const { wins, losses, bestRank, games } = summary;
  const total = wins + losses;
  const winRate = total === 0 ? 0 : Math.round((wins / total) * 100);

  return (
    <dl>
      <div className={styles.statItem}>
        <dt className={styles.statLabel}>승률</dt>
        <dd className={styles.statValue} aria-label={`승률 ${winRate}퍼센트`}>
          {winRate}%
        </dd>
      </div>

      <div className={styles.statItem}>
        <dt className={styles.statLabel}>최고 성적</dt>
        <dd className={styles.statValue}>{bestRank ? `${bestRank}위` : '-'}</dd>
      </div>

      {typeof games === 'number' && (
        <div className={styles.statItem}>
          <dt className={styles.statLabel}>경기 수</dt>
          <dd className={styles.statValue}>{games}</dd>
        </div>
      )}
    </dl>
  );
}
