import clsx from 'clsx';
import { ReactNode } from 'react';
import * as styles from './CardSection.css';

type CardSectionProps = {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  background?: 'primary' | 'none';
};

export default function CardSection({
  title = '소제목',
  icon,
  children,
  background = 'primary',
}: CardSectionProps) {
  return (
    <section
      className={clsx(styles.container, {
        [styles.primaryBg]: background === 'primary',
        [styles.noBg]: background === 'none',
      })}
    >
      <div className={styles.header}>
        {icon && <h3 className={styles.icon}>{icon}</h3>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
