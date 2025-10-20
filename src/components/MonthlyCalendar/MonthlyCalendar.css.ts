import { style } from '@vanilla-extract/css';
import { colors } from '../../styles/colorPalette.css';
import { tokens } from '../../styles/tokens.css';
import { textStyle } from '../../styles/typography.css';

export const calendarCard = style({
  background: tokens.color.surface.muted,
  borderRadius: 8,
  padding: 40,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 40,
});

export const title = style([textStyle.heading.bold, {}]);

export const navArea = style({
  display: 'flex',
  gap: 8,
});

export const navBtn = style({
  width: 24,
  height: 24,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  selectors: { '&:hover': { background: tokens.color.action.hover.disabled } },
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 8,
});

export const weekday = style([
  textStyle.caption.regular,
  {
    textAlign: 'center',
    padding: '5px 0',
  },
]);

export const cell = style({
  position: 'relative',
  aspectRatio: '1.4 / 1',
  borderRadius: 4,
  minHeight: 72,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8,
  selectors: {
    '&[data-selected]': {
      background: tokens.color.action.bg.disabled,
    },
  },
});

export const dayNumber = style([
  textStyle.caption.regular,
  {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    lineHeight: '24px',
    borderRadius: '9999px',
    boxSizing: 'border-box',
    fontSize: 12,
    selectors: {
      '&[data-today]': {
        color: tokens.color.badge.filled.text.gray,
        background: tokens.color.badge.filled.bg.gray,
      },
    },
  },
]);

export const eventBar = style({
  position: 'absolute',
  width: '90%',
  height: 14,
  top: 32,
  borderRadius: 2,
  background: colors.brand.light,
});
