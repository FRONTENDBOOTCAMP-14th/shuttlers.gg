import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const statsCard = style({
  background: tokens.color.surface.brand,
  borderRadius: 16,
  padding: '32px 40px',
});

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 24,

  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
});

export const statItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const statLabel = style([
  textStyle.body.semibold,
  {
    color: tokens.color.text.body,
  },
]);

export const statValue = style([
  textStyle.heading.bold,
  {
    color: tokens.color.text.title,
    fontSize: 24,
    fontVariantNumeric: 'tabular-nums',
  },
]);
