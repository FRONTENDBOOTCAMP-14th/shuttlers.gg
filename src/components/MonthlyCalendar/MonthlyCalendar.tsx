'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useMemo } from 'react';
import * as styles from './MonthlyCalendar.css';

type EventRange = { start: string; end: string };

type Props = {
  year: number;
  month: number;
  selectedDate: Date | null;
  events?: EventRange[];
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const WEEK_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const CALENDAR_CELLS = 42;

function toKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseKey(key: string): number {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day).setHours(0, 0, 0, 0);
}

function isInRanges(date: Date, ranges: EventRange[]): boolean {
  const targetTime = date.setHours(0, 0, 0, 0);
  return ranges.some((range) => {
    const startTime = parseKey(range.start);
    const endTime = parseKey(range.end);
    return startTime <= targetTime && targetTime <= endTime;
  });
}

function generateCalendarCells(
  year: number,
  month: number
): Array<Date | null> {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const cells: Array<Date | null> = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month - 1, day));
  }

  while (cells.length < CALENDAR_CELLS) {
    cells.push(null);
  }

  return cells;
}

export function MonthlyCalendar({
  year,
  month,
  selectedDate,
  events = [],
  setMonth,
  setYear,
  setDate,
}: Props) {
  const todayKey = useMemo(() => toKey(new Date()), []);

  const cells = useMemo(
    () => generateCalendarCells(year, month),
    [year, month]
  );

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const selectedKey = useMemo(
    () => (selectedDate ? toKey(selectedDate) : null),
    [selectedDate]
  );

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
            onClick={handlePrevMonth}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="다음 달"
            onClick={handleNextMonth}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {WEEK_LABELS.map((label) => (
            <div key={label} className={styles.weekday}>
              {label}
            </div>
          ))}

          {cells.map((date, index) => {
            const key = date ? toKey(date) : `empty-${index}`;
            const isToday = date ? key === todayKey : false;
            const hasEvent = date ? isInRanges(date, events) : false;
            const isSelected = !!date && selectedKey === key;

            return (
              <div
                key={key}
                className={styles.cell}
                onClick={() => setDate(date)}
                data-selected={isSelected || undefined}
              >
                {date && (
                  <>
                    <div
                      className={styles.dayNumber}
                      data-today={isToday || undefined}
                    >
                      {date.getDate()}
                    </div>
                    {hasEvent && <div className={styles.eventBar} />}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
