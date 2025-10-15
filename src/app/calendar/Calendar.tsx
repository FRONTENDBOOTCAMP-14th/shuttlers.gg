import * as styles from '@/app/calendar/Calendar.css.ts';
import { CompetitionCard } from '@/components/CompetitionCard/CompetitionCard';
import { MonthlyCalendar } from '@/components/MonthlyCalendar/MonthlyCalendar';

export function Calendar() {
  return (
    <div className={styles.calendar}>
      <header className={styles.calendarHeader}>
        <div className={styles.calendarHeaderTitle}>대회 일정</div>
        <div className={styles.calendarHeaderSubTitle}>
          전국의 배드민턴 대회 정보를 확인해보세요
        </div>
      </header>

      <div className={styles.calendarMain}>
        <MonthlyCalendar year={2025} month={10}></MonthlyCalendar>
      </div>

      <div className={styles.calendarListSection}>
        <div className={styles.listHeader}>2025년 n월 대회 리스트</div>
        <ul className={styles.eventList}>
          <li>
            <CompetitionCard
              title="2025 수원배 전국 배드민턴 대회"
              date="25.09.06-25.09.07"
              tags={['전국대회', '지역대회']}
            />
          </li>
          <li>
            <CompetitionCard
              title="2025 수원배 전국 배드민턴 대회"
              date="25.09.06-25.09.07"
              tags={['전국대회', '지역대회']}
            />
          </li>
          <li>
            <CompetitionCard
              title="2025 수원배 전국 배드민턴 대회"
              date="25.09.06-25.09.07"
              tags={['전국대회', '지역대회']}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
