import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const partnersList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const partnerItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '16px 0',
});

export const partnerGrade = style([
  textStyle.body.bold,
  {
    minWidth: 60,
    color: tokens.color.text.title,
  },
]);

export const partnerBar = style({
  flex: 1,
  height: 32,
  borderRadius: 8,
  background: tokens.color.surface.brand,
  position: 'relative',
  overflow: 'hidden',
});

export const partnerBarFill = style({
  height: '100%',
  background: 'linear-gradient(90deg, #4A90E2 0%, #4ECDC4 100%)',
  borderRadius: 8,
  transition: 'width 0.3s ease',
});

export const partnerStats = style([
  textStyle.body.semibold,
  {
    minWidth: 80,
    textAlign: 'right',
    color: tokens.color.text.body,
    fontVariantNumeric: 'tabular-nums',
  },
]);

export const emptyMessage = style([
  textStyle.body.regular,
  {
    textAlign: 'center',
    padding: '40px 0',
    color: tokens.color.text.caption,
  },
]);
