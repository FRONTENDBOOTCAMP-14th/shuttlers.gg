import type { ReactNode } from 'react';
import * as styles from './Badge.css.ts';

export type BadgeProps = {
  text: string;
  icon?: ReactNode;
  variant: 'filled' | 'outline';
  color: 'primary' | 'dark' | 'white';
  className?: string;
  active?: boolean;
};

export function Badge({
  text = '태그',
  icon,
  variant = 'filled',
  color = 'primary',
  className,
}: BadgeProps) {
  const variantClass =
    variant === 'filled' ? styles.filled[color] : styles.outline[color];

  const textClass =
    variant === 'outline' && color === 'primary'
      ? styles.gradientText
      : undefined;

  return (
    <span
      className={[styles.badgeBase, variantClass, className]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      <span className={textClass}>{text}</span>
    </span>
  );
}
