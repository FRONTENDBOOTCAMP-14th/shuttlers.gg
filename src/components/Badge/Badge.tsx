import clsx from 'clsx';
import React from 'react';
import * as style from './Badge.css.ts';

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
        style.badgeBase,
        style.themeVariant['dark'],
        style.widthVariant[withIcon ? 'withIcon' : 'noIcon'],
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
          <img src={iconSrc} alt="" aria-hidden className={style.iconCls} />
        ) : null)}
      <span className={style.textCls}>{text}</span>
    </span>
  );
}
