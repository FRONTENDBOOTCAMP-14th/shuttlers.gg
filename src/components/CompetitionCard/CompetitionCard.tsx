import { Badge } from '@/components/Badge/Badge';
import * as styles from '@/components/CompetitionCard/CompetitionCard.css';
import Link from 'next/link';

type CompetitionCardProps = {
  tnmtId: string;
  title: string;
  date: string;
  tags: string[];
};

const STATUS_BADGES = {
  종료: { variant: 'filled' as const, color: 'dark' as const },
  접수중: { variant: 'filled' as const, color: 'primary' as const },
  '진행 중': { variant: 'filled' as const, color: 'primary' as const },
  접수예정: { variant: 'filled' as const, color: 'primary' as const },
} as const;

function getBadgeProps(tag: string) {
  return (
    STATUS_BADGES[tag as keyof typeof STATUS_BADGES] || {
      variant: 'outline' as const,
      color: 'primary' as const,
    }
  );
}

export function CompetitionCard({
  tnmtId,
  title,
  date,
  tags,
}: CompetitionCardProps) {
  return (
    <Link href={`/tournaments/${tnmtId}`} className={styles.competitionCard}>
      <div className={styles.competitionCardHeader}>
        <span className={styles.competitionCardTitle}>{title}</span>
        <span className={styles.competitionCardDate}>{date}</span>
      </div>
      <div className={styles.competitionCardTagList}>
        {tags.map((tag, index) => {
          const { variant, color } = getBadgeProps(tag);
          return (
            <Badge
              key={`${tag}-${index}`}
              text={tag}
              variant={variant}
              color={color}
            />
          );
        })}
      </div>
    </Link>
  );
}
