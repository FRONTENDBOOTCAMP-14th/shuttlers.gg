import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const Form = style({
  borderRadius: '0px 20px 20px 20px',
  background: tokens.color.surface.raised,
  maxWidth: 1080,
  padding: 80,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 50,
});

export const Item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minHeight: 120,
  borderRadius: 20,
});

export const itemFull = style({
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const formSubmit = style({
  gridColumn: '1 / -1',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const ItemLabel = style([textStyle.heading.semibold]);

export const GenderButtonGroup = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 12,
});

export const GradeButtonGroup = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  gap: 12,
});

export const errorText = style({});

export const helperText = style({});
