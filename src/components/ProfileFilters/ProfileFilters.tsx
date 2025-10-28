import type { CompetitionType, EventType, Grade } from '@/hooks/usePlayerStats';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import * as styles from './ProfileFilters.css';

type ProfileFiltersProps = {
  competition: CompetitionType | undefined;
  event: EventType | undefined;
  grade: Grade | undefined;
  onCompetitionChange: (value: CompetitionType | undefined) => void;
  onEventChange: (value: EventType | undefined) => void;
  onGradeChange: (value: Grade | undefined) => void;
};

export function ProfileFilters({
  competition,
  event,
  grade,
}: ProfileFiltersProps) {
  const competitionLabel =
    competition === 'local'
      ? '지역'
      : competition === 'national'
        ? '전국'
        : '대회';
  const eventLabel =
    event === 'single' ? '단식' : event === 'double' ? '복식' : '종목';
  const gradeLabel = grade || '급수';

  return (
    <div className={styles.filtersContainer} role="group" aria-label="필터">
      <button
        type="button"
        className={styles.filterButton({ active: !!competition })}
        aria-label={`대회 필터: ${competitionLabel}`}
      >
        {competitionLabel}
        <ChevronDownIcon className={styles.filterIcon} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={styles.filterButton({ active: !!event })}
        aria-label={`종목 필터: ${eventLabel}`}
      >
        {eventLabel}
        <ChevronDownIcon className={styles.filterIcon} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={styles.filterButton({ active: !!grade })}
        aria-label={`급수 필터: ${gradeLabel}`}
      >
        {gradeLabel}
        <ChevronDownIcon className={styles.filterIcon} aria-hidden="true" />
      </button>
    </div>
  );
}
