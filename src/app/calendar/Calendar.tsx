'use client';

import * as styles from '@/app/calendar/Calendar.css.ts';
import { CompetitionCard } from '@/components/CompetitionCard/CompetitionCard';
import { MonthlyCalendar } from '@/components/MonthlyCalendar/MonthlyCalendar';
import { useState } from 'react';
import { useMonthlyTournaments } from '../../hooks/useMonthlyTournaments';

export function Calendar() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState<number>(10);

  const { data, events, isLoading, error, refetch } = useMonthlyTournaments(
    year,
    month
  );

  data.forEach((data) => {
    console.log(data);
  });

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
          setMonth={setMonth}
          events={events}
        />
      </div>

      <div className={styles.calendarListSection}>
        <div className={styles.listHeader}>
          {year}년 {month}월 대회 리스트
        </div>
        <ul className={styles.eventList}>
          {data.map((data) => {
            return (
              <li>
                <CompetitionCard
                  title={data.title}
                  date={`${data.start_date}-${data.end_date}`}
                  tags={['전국대회', '지역대회']}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
