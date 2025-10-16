'use client';

import * as styles from '@/app/calendar/Calendar.css.ts';
import { CompetitionCard } from '@/components/CompetitionCard/CompetitionCard';
import { MonthlyCalendar } from '@/components/MonthlyCalendar/MonthlyCalendar';
import { useMonthlyTournaments } from '@/hooks/useMonthlyTournaments';
import { useState } from 'react';
import { extractRegionTags } from './utils/regionUtils';
import { getTournamentStatus } from './utils/tournamentStatus';

export function Calendar() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState<number>(10);

  const { data, events, isLoading, error } = useMonthlyTournaments(year, month);

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
          setYear={setYear}
          events={events}
        />
      </div>

      <div className={styles.calendarListSection}>
        <div className={styles.listHeader}>
          {year}년 {month}월 대회 리스트
        </div>

        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>오류가 발생했습니다</div>
        ) : data.length === 0 ? (
          <div>대회가 없습니다</div>
        ) : (
          <ul className={styles.eventList}>
            {data.map((item) => {
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
