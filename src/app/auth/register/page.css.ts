import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
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

export const registerForm = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 40,
  justifyContent: 'space-between',
});

export const optionLink = style({
  ...textStyle.body.semibold,
  color: tokens.color.text.info,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: 6,
  ':hover': {
    color: tokens.color.action.hover.secondary,
  },
});
