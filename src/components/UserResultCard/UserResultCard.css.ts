import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/tokens.css';

export const userResultCard = style({
  maxWidth: '710px',
  height: '70px',
  background: tokens.color.surface.base,
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:hover': {
      background: tokens.color.surface.raised,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  '@media': {
    'screen and (max-width: 767px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: 'auto',
      gap: '10px',
    },
  },
});

export const userResultCardUserName = style(textStyle.heading.medium);

export const badgeGroup = style({
  marginLeft: 'auto',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',

  '@media': {
    'screen and (max-width: 767px)': {
      justifyContent: 'start',
      marginLeft: 0,
    },
  },
});

export const highlight = style({
  color: tokens.color.text.error,
});

export const icon = style({ width: 20, height: 20 });

export const iconWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '4px',
});
