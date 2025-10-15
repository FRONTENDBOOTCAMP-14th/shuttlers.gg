import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/tokens.css';

export const competitionCard = style({
  background: tokens.color.surface.base,
  height: '112px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  selectors: {
    '&:hover': { boxShadow: tokens.elevation.shadow.hover },
  },
});

export const competitionCardHeader = style({
  width: '660px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

export const competitionCardTitle = style([
  textStyle.heading.semibold,
  {
    color: tokens.color.text.title,
    marginRight: '8px',
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
  gap: '6px',
});
