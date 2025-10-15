'use client';

import { Badge } from '@/components/Badge/Badge';
import * as styles from '@/components/UserResultCard/UserResultCard.css';

type Grade = { national: string; local: string };

export type UserResultCardProps = {
  name: string;
  grade: Grade | null;
  gender?: 'male' | 'female';
  variant?: 'result' | 'history';
  onClick?: () => void;
  onRemove?: () => void;
};

function formatGrade(grade: Grade | null) {
  if (!grade) return null;
  return `지역${grade.local} 전국${grade.national}`;
}

export function UserResultCard({
  name,
  grade,
  gender = 'male',
  variant = 'result',
  onClick,
  onRemove,
}: UserResultCardProps) {
  const gradeText = formatGrade(grade);
  const genderText = gender === 'male' ? '남자' : '여자';
  const showRemove = variant === 'history' && !!onRemove;

  return (
    <div
      className={styles.userResultCard}
      onClick={onClick}
      aria-label={onClick ? `${name} 전적 보기` : undefined}
    >
      <div className={styles.userResultCardUserName}>{name}</div>

      <div className={styles.badgeGroup}>
        {showRemove ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            aria-label={`${name} 검색 이력 삭제`}
            title="삭제"
          >
            ×
          </button>
        ) : (
          <>
            {gradeText && (
              <Badge text={gradeText} variant="filled" color="primary" />
            )}
            <Badge text={genderText} variant="outline" color="primary" />
          </>
        )}
      </div>
    </div>
  );
}
