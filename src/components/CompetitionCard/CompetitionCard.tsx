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
    <div className={clsx(styles.CompetitionCard)}>
      <div className={clsx(styles.CompetitionCardHeader)}>
        <span className={clsx(styles.CompetitionCardTitle)}>{title}</span>
        <span className={clsx(styles.CompetitionCardDate)}>{date}</span>
      </div>
      <div>
        {tags.map((tag: string) => {
          return <Badge text={tag} variant="outline" color="primary"></Badge>;
        })}
      </div>
    </div>
  );
}
