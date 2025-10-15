import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const badgeBase = style([
  textStyle.body.bold,
  {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: '32px',
    padding: '6px 16px',
    borderRadius: 9999,
    border: '1px solid transparent',
    userSelect: 'none',
    backgroundColor: 'transparent',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
]);

export const gradientText = style({
  backgroundImage: tokens.color.badge.filled.bg.brand,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
});

export const iconStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const filled = styleVariants({
  primary: {
    background: tokens.color.badge.filled.bg.brand,
    color: tokens.color.badge.filled.text.brand,
  },
  dark: {
    background: tokens.color.badge.filled.bg.gray,
    color: tokens.color.badge.filled.text.gray,
  },
  white: {
    background: tokens.color.badge.filled.bg.white,
    color: tokens.color.badge.filled.text.white,
  },
});

export const outline = styleVariants({
  primary: {
    background: `linear-gradient(white, white) padding-box, ${tokens.color.badge.outline.border.brand} border-box`,
    backgroundOrigin: 'border-box',
    color: tokens.color.badge.outline.text.brand,
  },
  white: {
    border: `1px solid ${tokens.color.badge.outline.border.white}`,
    color: tokens.color.badge.outline.text.white,
  },
});
