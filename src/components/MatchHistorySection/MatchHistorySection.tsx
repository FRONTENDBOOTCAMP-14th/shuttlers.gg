import * as styles from './MatchHistorySection.css';

type Match = {
  id: string;
  tournamentName: string;
  date: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  result: 'win' | 'loss';
  round?: string;
};

type MatchHistorySectionProps = {
  matches?: Match[];
};

export function MatchHistorySection({ matches }: MatchHistorySectionProps) {
  if (!matches || matches.length === 0) {
    return (
      <p className={styles.emptyMessage} role="status" aria-live="polite">
        경기 히스토리 데이터를 불러올 수 없습니다.
      </p>
    );
  }

  return (
    <ul className={styles.matchList}>
      {matches.map((match) => (
        <li key={match.id}>
          <article className={styles.matchCard({ result: match.result })}>
            <header className={styles.matchHeader}>
              <h3 className={styles.matchTitle}>{match.tournamentName}</h3>
              <time className={styles.matchDate} dateTime={match.date}>
                {match.date}
              </time>
            </header>

            <div className={styles.matchDetails}>
              <div className={styles.matchTeams}>
                <span className={styles.teamInfo}>{match.team1}</span>
                <span className={styles.versus}>VS</span>
                <span className={styles.teamInfo}>{match.team2}</span>
              </div>

              <div className={styles.matchScore}>
                {match.round && (
                  <span className={styles.roundInfo}>{match.round}</span>
                )}
                <span className={styles.scoreText}>
                  {match.score1} : {match.score2}
                </span>
                <span
                  className={styles.resultBadge({ result: match.result })}
                  aria-label={match.result === 'win' ? '승리' : '패배'}
                >
                  {match.result === 'win' ? '승' : '패'}
                </span>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
