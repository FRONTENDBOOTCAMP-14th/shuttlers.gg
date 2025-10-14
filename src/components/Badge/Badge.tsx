import clsx from 'clsx';
import React from 'react';
import * as styles from './Badge.css.ts';

export type BadgeProps = {
  text: string;
  withIcon?: boolean;
  icon?: React.ReactNode;
  iconSrc?: string;
  className?: string;
};

export function Badge({
  text,
  withIcon = false,
  icon,
  iconSrc,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        styles.badgeBase,
        styles.themeVariant['dark'],
        styles.widthVariant[withIcon ? 'withIcon' : 'noIcon'],
        className
      )}
      role="status"
      aria-label={text}
      title={text}
    >
      {withIcon &&
        (icon ? (
          icon
        ) : iconSrc ? (
          <img src={iconSrc} alt="" aria-hidden className={styles.iconCls} />
        ) : null)}
      <span className={styles.textCls}>{text}</span>
    </span>
  );
}
