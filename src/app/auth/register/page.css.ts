import { style } from '@vanilla-extract/css';

export const registerPage = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 700,
  marginTop: 24,
  marginInline: 'auto',

  '@media': {
    'screen and (min-width: 768px)': {
      height: 'calc(100vh - 72px)',
      marginTop: 40,
    },
  },
});
