import { style, styleVariants } from '@vanilla-extract/css';

export const badgeBase = style({
  display: 'flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  height: '32px',
  borderRadius: '50px',
  fontSize: '14px',
  lineHeight: 1,
  fontWeight: 600,
  userSelect: 'none',
  whiteSpace: 'nowrap',
  gap: '6px',
});

export const themeVariant = styleVariants({
  light: {
    background: 'linear-gradient(-36deg, #3377FF 0%, #46E2A8 100%)',
    color: '#ffffff',
  },
  dark: {
    background: '#3A3A3C',
    color: '#ffffff',
  },
});

export const widthVariant = styleVariants({
  noIcon: { width: '60px' },
  withIcon: { width: '82px' },
});

export const iconCls = style({
  display: 'block',
  width: '16px',
  height: '16px',
  flexShrink: 0,
});

export const textCls = style({
  display: 'block',
  lineHeight: 1,
});
