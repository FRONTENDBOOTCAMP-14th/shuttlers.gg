import { style } from '@vanilla-extract/css';
import { colors } from '../../styles/colorPalette.css';
import { textStyle } from '../../styles/typography.css';

export const CompetitionCard = style({
  background: colors.white,
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
    color: colors.gray[800],
    marginRight: '8px',
  },
]);

export const CompetitionCardDate = style([
  textStyle.body.regular,
  {
    color: colors.gray[700],
  },
]);
