'use client';

import * as styles from '@/app/calendar/Calendar.css';
import { CompetitionCard } from '@/components/CompetitionCard/CompetitionCard';
import { MonthlyCalendar } from '@/components/MonthlyCalendar/MonthlyCalendar';
import { useMonthlyTournaments } from '@/hooks/useMonthlyTournaments';
import { useMemo, useState } from 'react';
import { extractRegionTags } from './utils/regionUtils';
import { getTournamentStatus } from './utils/tournamentStatus';

const titleOf = (date: Date | null, year: number, month: number) =>
  `${
    date
      ? new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(date)
      : new Intl.DateTimeFormat('ko-KR', {
          year: 'numeric',
          month: 'long',
        }).format(new Date(year, month - 1))
  } 대회 리스트`;

export function Calendar() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState<number>(10);
  const [date, setDate] = useState<Date | null>(null);

  const { data, events, isLoading, error, getByDate } = useMonthlyTournaments(
    year,
    month
  );

  const list = useMemo(() => getByDate(date), [date, getByDate]);

  return (
    <div className={styles.calendar}>
      <header className={styles.calendarHeader}>
        <div className={styles.calendarHeaderTitle}>대회 일정</div>
        <div className={styles.calendarHeaderSubTitle}>
          전국의 배드민턴 대회 정보를 확인해보세요
        </div>
      </header>

      <div className={styles.calendarMain}>
        <MonthlyCalendar
          year={year}
          month={month}
          selectedDate={date}
          setMonth={(m) => {
            setMonth(m);
            setDate(null);
          }}
          setYear={(y) => {
            setYear(y);
            setDate(null);
          }}
          setDate={setDate}
          events={events}
        />
      </div>

      <div className={styles.calendarListSection}>
        <div className={styles.listHeader}>{titleOf(date, year, month)}</div>

        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>오류가 발생했습니다</div>
        ) : list.length === 0 ? (
          <div>대회가 없습니다</div>
        ) : (
          <ul className={styles.eventList}>
            {list.map((item) => {
              const regionTags = extractRegionTags(item.region);
              const status = getTournamentStatus(
                item.start_date,
                item.end_date,
                item.apply_period
              );
              const tags = [...regionTags, status.label];

              return (
                <li key={item.tnmt_id}>
                  <CompetitionCard
                    tnmtId={item.tnmt_id}
                    title={item.title}
                    date={`${item.start_date} ~ ${item.end_date}`}
                    tags={tags}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
