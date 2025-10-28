import * as styles from './PartnersSection.css';

type Partner = {
  grade: string;
  wins: number;
  losses: number;
};

type PartnersSectionProps = {
  partners?: Partner[];
};

export function PartnersSection({ partners }: PartnersSectionProps) {
  if (!partners || partners.length === 0) {
    return (
      <p className={styles.emptyMessage} role="status" aria-live="polite">
        파트너 데이터를 불러올 수 없습니다.
      </p>
    );
  }

  const maxGames = Math.max(...partners.map((p) => p.wins + p.losses));

  return (
    <ul className={styles.partnersList}>
      {partners.map((partner) => {
        const totalGames = partner.wins + partner.losses;
        const percentage = maxGames > 0 ? (totalGames / maxGames) * 100 : 0;

        return (
          <li key={partner.grade} className={styles.partnerItem}>
            <span className={styles.partnerGrade}>{partner.grade}</span>

            <div
              className={styles.partnerBar}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${partner.grade} 파트너 전적`}
            >
              <div
                className={styles.partnerBarFill}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <span className={styles.partnerStats}>
              {partner.wins}승 {partner.losses}패
            </span>
          </li>
        );
      })}
    </ul>
  );
}
