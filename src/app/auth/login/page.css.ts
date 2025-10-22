import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const loginPage = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  maxWidth: 700,
  marginInline: 'auto',
});

globalStyle(`${loginPage} > section`, {
  width: '100%',
});

export const loginHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 24,
});

globalStyle(`${loginHeader} > p`, {
  ...textStyle.heading.semibold,
  color: tokens.color.text.body,
  textAlign: 'center',
  marginBottom: 48,
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
  ':focus-visible': {
    outline: `2px solid ${tokens.color.field.border.focus}`,
    outlineOffset: 1,
    borderRadius: 2,
  },
});

export const resetForm = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 30,
  width: '90%',
  marginInline: 'auto',
});

globalStyle(`${resetForm} > p`, {
  ...textStyle.heading.medium,
  lineHeight: 1.5,
  textAlign: 'center',
});
