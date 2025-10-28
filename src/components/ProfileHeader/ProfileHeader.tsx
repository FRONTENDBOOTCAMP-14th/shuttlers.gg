import { Badge } from '@/components/Badge/Badge';
import * as styles from './ProfileHeader.css';

type ProfileHeaderProps = {
  playerName: string;
  tags: string[];
  localGrade?: string;
  nationalGrade?: string;
};

export function ProfileHeader({
  playerName,
  tags,
  localGrade,
  nationalGrade,
}: ProfileHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInfo}>
        <h1 className={styles.playerName}>{playerName}</h1>
        {tags.length > 0 && (
          <ul className={styles.tagList}>
            {tags.map((tag) => (
              <li key={tag}>
                <Badge text={tag} variant="outline" color="white" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {(localGrade || nationalGrade) && (
        <div className={styles.gradeButtons}>
          {localGrade && (
            <div
              className={styles.gradeButton}
              role="img"
              aria-label={`지역 ${localGrade}급`}
            >
              <span className={styles.gradeLabel}>지역</span>
              <span className={styles.gradeValue}>{localGrade}</span>
            </div>
          )}
          {nationalGrade && (
            <div
              className={styles.gradeButton}
              role="img"
              aria-label={`전국 ${nationalGrade}급`}
            >
              <span className={styles.gradeLabel}>전국</span>
              <span className={styles.gradeValue}>{nationalGrade}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
