import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const verifyPage = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  maxWidth: 700,
  marginInline: 'auto',
  textAlign: 'center',
});

export const statusIcon = style({
  fontSize: '64px',
  marginBottom: '24px',
});

globalStyle(`${verifyPage} > h2`, {
  ...textStyle.subtitle.bold,
  color: tokens.color.text.title,
  marginBottom: 12,
});

globalStyle(`${verifyPage} > p`, {
  ...textStyle.body.regular,
  color: tokens.color.text.body,
  marginBottom: 24,
});
