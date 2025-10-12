import clsx from 'clsx';
import React from 'react';
import * as s from './badge.css.ts';

export type BadgeProps = {
  text: string;
  withIcon?: boolean;
  icon?: React.ReactNode;
  iconSrc?: string;
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  text,
  withIcon = false,
  icon,
  iconSrc,
  className,
}) => {
  return (
    <span
      className={clsx(
        s.badgeBase,
        s.themeVariant['dark'],
        s.widthVariant[withIcon ? 'withIcon' : 'noIcon'],
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
          <img src={iconSrc} alt="" aria-hidden className={s.iconCls} />
        ) : null)}
      <span className={s.textCls}>{text}</span>
    </span>
  );
};
