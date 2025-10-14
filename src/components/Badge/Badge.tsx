import type { ReactNode } from 'react';
import * as styles from './Badge.css.ts';

type FilledColor = 'primary' | 'dark' | 'white';
type OutlineColor = 'primary' | 'white';

type BaseProps = {
  text?: string;
  icon?: ReactNode;
  className?: string;
  active?: boolean;
};

export type BadgeProps =
  | ({ variant?: 'filled'; color?: FilledColor } & BaseProps)
  | ({ variant: 'outline'; color?: OutlineColor } & BaseProps);

export function Badge(props: BadgeProps) {
  const { text = '태그', icon, className, active } = props;

  const variant = props.variant ?? 'filled';
  const color =
    ('color' in props && props.color) ??
    (variant === 'filled' ? 'primary' : 'primary');

  const variantClass =
    variant === 'filled'
      ? styles.filled[color as FilledColor]
      : styles.outline[color as OutlineColor];

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
