import clsx from 'clsx';
import { Badge } from '../Badge/Badge.tsx';
import * as styles from './CompetitionCard.css.ts';

type CompetitionCardProps = {
  title: string;
  date: string;
  tags?: any;
};

export function CompetitionCard({ title, date, tags }: CompetitionCardProps) {
  return (
    <div className={clsx(styles.competitionCard)}>
      <div className={clsx(styles.competitionCardHeader)}>
        <span className={clsx(styles.competitionCardTitle)}>{title}</span>
        <span className={clsx(styles.competitionCardDate)}>{date}</span>
      </div>
      <div>
        {tags.map((tag: string) => {
          return <Badge text={tag} variant="outline" color="primary"></Badge>;
        })}
      </div>
    </div>
  );
}
