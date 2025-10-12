import React, { ReactNode } from 'react';
import * as styles from './CardSection.css';

interface CardSectionProps {
  title?: string;
  icon?: ReactNode; // 명세서에 맞게 ReactNode만 허용
  children: ReactNode;
  background?: 'primary' | 'none';
}

export const CardSection: React.FC<CardSectionProps> = ({
  title = '소제목',
  icon,
  children,
  background = 'primary',
}) => {
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
};
export default CardSection;
