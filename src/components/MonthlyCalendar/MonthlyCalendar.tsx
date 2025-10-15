'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import * as styles from './MonthlyCalendar.css';

type EventRange = { start: string; end: string };

type Props = {
  year: number;
  month: number;
  events?: EventRange[];
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

export function MonthlyCalendar({ year, month, events = [], setMonth }: Props) {
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  const startWeekday = first.getDay();
  const daysInMonth = last.getDate();

  const todayKey = toKey(new Date());
  const hasEvent = (d: Date) => isInRanges(d, events);

  const cells: Array<Date | null> = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month - 1, day));
  }
  while (cells.length < 42) cells.push(null);

  const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.calendarCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {year}년 {month}월
        </h2>
        <div className={styles.navArea}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="이전 달"
            onClick={() => setMonth(month - 1)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="다음 달"
            onClick={() => setMonth(month + 1)}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {weekLabels.map((w) => (
          <div key={w} className={styles.weekday}>
            {w}
          </div>
        ))}

        {cells.map((d, i) => {
          const key = d ? toKey(d) : `empty-${i}`;
          const isToday = d ? key === todayKey : false;
          const event = d ? hasEvent(d) : false;

          return (
            <div key={key} className={styles.cell}>
              {d && (
                <>
                  <div
                    className={styles.dayNumber}
                    data-today={isToday || undefined}
                  >
                    {d.getDate()}
                  </div>
                  {event && <div className={styles.eventBar} />}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function toKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isInRanges(date: Date, ranges: EventRange[]) {
  const t = date.setHours(0, 0, 0, 0);
  return ranges.some((r) => {
    const s = parseKey(r.start);
    const e = parseKey(r.end);
    return s <= t && t <= e;
  });
}

function parseKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).setHours(0, 0, 0, 0);
}
