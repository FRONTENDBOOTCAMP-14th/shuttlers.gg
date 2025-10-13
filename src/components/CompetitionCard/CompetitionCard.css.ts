import { style } from '@vanilla-extract/css';
import { textStyle } from '../../styles/typography.css';

export const CompetitionCard = style({
  width: '660px',
  height: '112px',
  boxSizing: 'border-box',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
});

export const CompetitionCardHeader = style({
  width: '660px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

export const CompetitionCardTitle = style([
  textStyle.heading.semibold,
  {
    marginRight: '8px',
  },
]);

export const CompetitionCardDate = textStyle.body.regular;
