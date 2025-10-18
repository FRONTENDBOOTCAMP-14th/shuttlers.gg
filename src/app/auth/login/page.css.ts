import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const formContainer = style({
  width: '100%',
});

export const loginForm = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 40,
});

export const loginOptions = style({
  ...textStyle.body.regular,
  color: tokens.color.text.caption,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 36,
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
