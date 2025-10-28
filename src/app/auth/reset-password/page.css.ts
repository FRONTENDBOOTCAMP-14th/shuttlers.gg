import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const resetPasswordPage = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: 50,
  width: '100%',
  height: '100%',
  maxWidth: 700,
  marginInline: 'auto',
});

export const resetPasswordHeader = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 12,
  alignItems: 'center',
});

globalStyle(`${resetPasswordHeader} > h2`, {
  ...textStyle.subtitle.bold,
});

globalStyle(`${resetPasswordHeader} > p`, {
  ...textStyle.heading.semibold,
  color: tokens.color.text.body,
  textAlign: 'center',
});

export const resetForm = style({
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
