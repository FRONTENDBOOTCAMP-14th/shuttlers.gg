import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const MyPage = style({
  margin: 'auto',
  maxWidth: 1080,
  marginTop: 80,
  display: 'flex',
  flexDirection: 'column',
  gap: 50,
});

export const MyPageHeader = style({
  //   border: '1px solid',
});

export const HeaderTitle = style([textStyle.title.bold, {}]);

export const HeaderDescription = style([textStyle.subtitle.semibold]);

export const Form = style({
  borderRadius: 20,
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

export const itemFull = style({ gridColumn: '1 / -1' });

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
