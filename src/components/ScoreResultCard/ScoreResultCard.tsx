type ScoreResultCardProps = {
  title?: string;
  round?: string;
  matchType?: string;
  teamA?: string;
  teamB?: string;
  scoreA?: number;
  scoreB?: number;
  result?: 'win' | 'lose';
};

import * as styles from './ScoreResultCard.css';

export default function ScoreResultCard({
  title = '대회명',
  round = '',
  matchType = '',
  teamA = 'A팀',
  teamB = 'B팀',
  scoreA = 0,
  scoreB = 0,
  result = 'win',
}: ScoreResultCardProps) {
  return (
    <section
      className={`${styles.scoreResultCard} ${styles.cardBackgroundVariants[result]}`}
    >
      <div className={styles.titleArea}>
        <span>{title}</span>
        <div className={styles.titleRightSection}>
          <span className={styles.matchType}>{matchType}</span>
          <span className={styles.resultBadgeVariants[result]}>
            {result === 'win' ? '승' : '패'}
          </span>
        </div>
      </div>

      <div className={styles.scoreArea}>
        <div className={styles.scoreContainer}>
          <span className={styles.roundText}>{round}</span>

          <div className={styles.scoreMainContainer}>
            <div className={styles.leftTeamArea}>
              <span className={styles.teamNameLeft}>{teamA}</span>
              <span className={styles.scoreText}>{scoreA}</span>
            </div>

            <span className={styles.vsText}>VS</span>

            <div className={styles.rightTeamArea}>
              <span className={styles.scoreText}>{scoreB}</span>
              <span className={styles.teamNameRight}>{teamB}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
