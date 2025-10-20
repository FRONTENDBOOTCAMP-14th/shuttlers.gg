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
  display: 'flex',
  alignItems: 'center',
});

export const competitionCardTitle = style([
  textStyle.heading.semibold,
  {
    maxWidth: 700,
    marginRight: 8,
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
  },
]);

export const competitionCardTagList = style({
  display: 'flex',
  gap: 6,
});
