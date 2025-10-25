import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const registerPage = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: 50,
  width: '100%',
  height: '100%',
  maxWidth: 700,
  marginInline: 'auto',
});

export const registerHeader = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 12,
  alignItems: 'center',
});

globalStyle(`${registerHeader} > h2`, {
  ...textStyle.subtitle.bold,
});

globalStyle(`${registerHeader} > p`, {
  ...textStyle.heading.semibold,
  color: tokens.color.text.body,
  textAlign: 'center',
});
