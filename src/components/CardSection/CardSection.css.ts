import { tokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';
import { textStyle } from '../../styles/typography.css';

export const container = style({
  borderRadius: '20px',
  boxShadow: tokens.elevation.shadow.primary,
  padding: '40px',
  width: '100%',
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '40px',
  background: 'none',
});

export const primaryBg = style({
  background: tokens.color.badge.filled.bg.white,
});

export const noBg = style({
  background: 'none',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '6px',
});

export const icon = style({
  display: 'flex',
  width: '28px',
  height: '28px',
  aspectRatio: '1/1',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.color.badge.filled.text.white,
});

export const title = style({
  color: tokens.color.text.title,
  ...textStyle.subtitle.bold,
  margin: 0,
  flex: 1,
});

export const content = style({
  width: 'auto',
  height: 'auto',
  backgroundColor: tokens.color.surface.brand,
  padding: '24px 40px',
  borderRadius: '8px',
});
