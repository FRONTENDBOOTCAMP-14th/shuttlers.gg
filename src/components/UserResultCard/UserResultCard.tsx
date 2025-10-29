'use client';

import { Badge } from '@/components/Badge/Badge';
import * as styles from '@/components/UserResultCard/UserResultCard.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import type { ReactNode } from 'react';

export type PersonalGrade = 'beginner' | 'D' | 'C' | 'B' | 'A';

type Grade =
  | { national: string; local?: never }
  | { national?: never; local: string }
  | { national: string; local: string }
  | null;

export type UserResultCardProps = {
  id: string;
  name: string;
  grade: Grade | null;
  gender?: 'male' | 'female';
  variant?: 'result' | 'history';
  onClick?: () => void;
  onRemove?: () => void;
  searchQuery?: string;
  icon?: ReactNode;
};

function formatGrade(grade: Grade | null) {
  if (!grade) return null;

  const parts = [];

  if (grade.local) {
    parts.push(`지역${grade.local}`);
  }

  if (grade.national) {
    parts.push(`전국${grade.national}`);
  }

  return parts.join(' ');
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightQuery(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(escapeRegExp(query), 'gi');
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text))) {
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }
    parts.push(
      <span key={m.index} className={styles.highlight}>
        {m[0]}
      </span>
    );
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function UserResultCard({
  id,
  name,
  grade,
  gender = 'male',
  variant = 'result',
  onClick,
  onRemove,
  searchQuery = '',
}: UserResultCardProps) {
  const gradeText = formatGrade(grade);
  const genderText = gender === 'male' ? '남자' : '여자';
  const showRemove = variant === 'history' && !!onRemove;

  return (
    <Link
      href={`/user-stats/${encodeURIComponent(id)}`}
      className={styles.userResultCard}
      onClick={onClick}
      aria-label={onClick ? `${name} 전적 보기` : undefined}
    >
      <div className={styles.userResultCardUserName}>
        {highlightQuery(name, searchQuery)}
      </div>

      <div className={styles.badgeGroup}>
        {showRemove ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove?.();
            }}
            aria-label={`${name} 검색 이력 삭제`}
            title="삭제"
          >
            <XMarkIcon className={styles.icon} aria-hidden />
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
    </Link>
  );
}
