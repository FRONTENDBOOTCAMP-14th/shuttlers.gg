import { style } from '@vanilla-extract/css';

export const loginForm = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 30,

  '@media': {
    'screen and (min-width: 768px)': {
      rowGap: 40,
    },
  },
});
