// Badge.tsx
'use client';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import * as styles from './Badge.css.ts';

type FilledColor = 'primary' | 'dark' | 'white';
type OutlineColor = 'primary' | 'white';

type BaseProps = {
  text?: string;
  icon?: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  tabIndex?: number;
};

export type BadgeProps =
  | ({ variant?: 'filled'; color?: FilledColor } & BaseProps)
  | ({ variant: 'outline'; color?: OutlineColor } & BaseProps);

export function Badge(props: BadgeProps) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === 'dark' ? 'dark' : 'light';

  const { text = '태그', icon, className } = props;
  const isOutline = props.variant === 'outline';

  const color = isOutline
    ? (props.color ?? 'primary')
    : ((('color' in props ? props.color : undefined) as FilledColor) ??
      'primary');

  const variantClass = isOutline
    ? styles.outline[color as OutlineColor]
    : styles.filled[color as FilledColor];

  const wantGradientText = isOutline && color === 'primary' && mode === 'light';

  const textClass =
    wantGradientText && props.active
      ? styles.textSolid
      : wantGradientText
        ? styles.gradientText
        : styles.textSolid;

  const outlineBorderModeClass =
    isOutline && color === 'primary'
      ? styles.outlinePrimaryMode[mode]
      : undefined;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      props.onClick?.();
    }
  };

  return (
    <span
      className={[
        styles.badgeBase,
        variantClass,
        outlineBorderModeClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={props.onClick}
      onKeyDown={handleKeyDown}
      data-active={props.active ? 'true' : undefined}
      tabIndex={props.tabIndex ?? 0}
    >
      {icon ? (
        <span aria-hidden className={styles.iconStyle}>
          {icon}
        </span>
      ) : null}
      <span className={textClass}>{text}</span>
    </span>
  );
}
