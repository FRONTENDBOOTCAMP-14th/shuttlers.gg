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
      <header className={styles.header}>
      {icon && <span className={styles.icon}>{icon}</span>} 
        <h3 className={styles.title}>{title}</h3>              
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
