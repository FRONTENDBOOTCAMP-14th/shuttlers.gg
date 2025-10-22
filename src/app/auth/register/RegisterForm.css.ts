import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const registerForm = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 40,
  justifyContent: 'space-between',
});

export const checkBox = style({
  ':focus-visible': {
    outline: `2px solid ${tokens.color.field.border.focus}`,
    outlineOffset: 1,
    borderRadius: 2,
  },
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
