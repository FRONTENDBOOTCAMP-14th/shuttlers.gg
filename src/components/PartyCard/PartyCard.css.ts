import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens.css';
import { textStyle } from '../../styles/typography.css';

globalStyle('button:focus-visible', {
  outline: `2px solid ${tokens.color.field.border.focus}`,
  outlineOffset: 2,
});

export const partyCard = recipe({
  base: {
    padding: 24,
    borderRadius: 12,
    background: tokens.color.surface.base,
    boxShadow: tokens.elevation.shadow.primary,
    width: '100%',
    ':focus-visible': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
    },
  },

  variants: {
    status: {
      joinable: {},
      full: {
        background: tokens.color.surface.raised,
      },
      joined: {},
      readonly: {},
    },
    view: {
      detailed: {},
      compact: {},
    },
  },
});

export const thumbnailWrapper = style({
  position: 'relative',
  width: '100%',
  paddingTop: '40%',
  marginBottom: 20,
  overflow: 'hidden',
});

export const partyContent = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 12,
  marginBottom: 24,
  color: tokens.color.text.body,
});

export const schedule = style({
  ...textStyle.body.regular,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  columnGap: 4,
});

export const condition = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 4,
});

globalStyle(`${condition} > span`, {
  ...textStyle.body.semibold,
});
