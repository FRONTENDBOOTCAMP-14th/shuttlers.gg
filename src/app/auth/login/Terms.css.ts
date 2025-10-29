import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const terms = style({
  ...textStyle.body.regular,
  color: tokens.color.text.body,
  maxHeight: 400,
  overflowY: 'auto',
});

globalStyle(`${terms} > h1`, {
  ...textStyle.subtitle.bold,
  marginBottom: 16,
});

globalStyle(`${terms} > h2`, {
  ...textStyle.heading.semibold,
  marginTop: 24,
  marginBottom: 12,
});

globalStyle(`${terms} > p`, {
  marginBottom: 12,
  lineHeight: 1.5,
});

globalStyle(`${terms}  ul, ${terms} ol`, {
  paddingLeft: 20,
  marginBottom: 12,
});

globalStyle(`${terms} li`, {
  marginBottom: 4,
});

globalStyle(`${terms} hr`, {
  margin: '20px 0',
  border: 'none',
  borderTop: `1px solid ${tokens.color.text.caption}`,
});
