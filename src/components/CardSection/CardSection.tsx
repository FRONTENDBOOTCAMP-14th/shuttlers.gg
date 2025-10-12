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
      className={[
        styles.container,
        background === 'primary' ? styles.primaryBg : styles.noBg,
      ].join(' ')}
    >
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
