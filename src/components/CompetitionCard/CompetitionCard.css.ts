import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const competitionCard = style({
  padding: 20,
  borderRadius: 8,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  background: tokens.color.surface.base,
  transition: 'box-shadow 0.2s ease',
  selectors: {
    '&:hover': { boxShadow: tokens.elevation.shadow.primary },
  },
});

export const competitionCardHeader = style({
  marginBottom: 10,
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  columnGap: 8,
});

export const competitionCardTitle = style([
  textStyle.heading.semibold,
  {
    minWidth: 0,
    color: tokens.color.text.title,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  },
]);

export const competitionCardDate = style([
  textStyle.body.regular,
  {
    color: tokens.color.text.body,
    whiteSpace: 'nowrap',
    overflow: 'visible',
    textOverflow: 'clip',
  },
]);

export const competitionCardTagList = style({
  display: 'flex',
  gap: 6,
  flexWrap: 'wrap',
});

export const competitionCardHeaderNarrow = style({
  '@media': {
    '(max-width: 420px)': {
      gridTemplateColumns: '1fr',
      rowGap: 4,
    },
  },
});
