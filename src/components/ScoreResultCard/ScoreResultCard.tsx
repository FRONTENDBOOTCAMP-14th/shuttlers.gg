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
    <article 
      className={`${styles.scoreResultCard} ${styles.cardBackgroundVariants[result]}`}
      role="listitem"
    >
      <header className={styles.titleArea}>
        <h3 className={styles.matchTitle}>{title}</h3>
        <div className={styles.titleRightSection}>
          <span className={styles.matchType}>{matchType}</span>
          <span 
            className={styles.resultBadgeVariants[result]}
            aria-label={`경기 결과: ${result === 'win' ? '승리' : '패배'}`}
          >
            {result === 'win' ? '승' : '패'}
          </span>
        </div>
      </header>

      <section className={styles.scoreArea} aria-labelledby="score-info">
        <div className={styles.scoreContainer}>
          {round && (
            <div className={styles.roundInfo}>
              <span className={styles.roundText}>{round}</span>
            </div>
          )}

          <div className={styles.scoreMainContainer} role="group" aria-label="경기 점수">
            <div className={styles.leftTeamArea}>
              <h4 className={styles.teamNameLeft}>{teamA}</h4>
              <span 
                className={styles.scoreText}
                aria-label={`${teamA} 점수: ${scoreA}점`}
              >
                {scoreA}
              </span>
            </div>

            <span className={styles.vsText} aria-hidden="true">VS</span>

            <div className={styles.rightTeamArea}>
              <span 
                className={styles.scoreText}
                aria-label={`${teamB} 점수: ${scoreB}점`}
              >
                {scoreB}
              </span>
              <h4 className={styles.teamNameRight}>{teamB}</h4>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
