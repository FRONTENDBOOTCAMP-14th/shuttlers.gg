import { style } from '@vanilla-extract/css';
import { colors } from '../../styles/colorPalette.css';
import { tokens } from '../../styles/tokens.css';
import { textStyle } from '../../styles/typography.css';

export const calendarCard = style({
  background: tokens.color.surface.muted,
  borderRadius: 8,
  padding: 40,
  '@media': {
    '(max-width: 1024px)': { padding: 28 },
    '(max-width: 768px)': { padding: 20 },
    '(max-width: 480px)': { padding: 12 },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 40,
  '@media': {
    '(max-width: 1024px)': { marginBottom: 28 },
    '(max-width: 768px)': { marginBottom: 20 },
    '(max-width: 480px)': { marginBottom: 12 },
  },
});

export const title = style([
  textStyle.heading.bold,
  {
    '@media': {
      '(max-width: 1024px)': { fontSize: 20, lineHeight: '26px' },
      '(max-width: 768px)': { fontSize: 18, lineHeight: '24px' },
      '(max-width: 480px)': { fontSize: 16, lineHeight: '22px' },
    },
  },
]);

export const navArea = style({
  display: 'flex',
  gap: 8,
});

export const navBtn = style({
  width: 28,
  height: 28,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  selectors: { '&:hover': { background: tokens.color.action.hover.disabled } },
  '@media': {
    '(max-width: 1024px)': { width: 24, height: 24 },
    '(max-width: 480px)': { width: 22, height: 22 },
  },
});

export const gridWrap = style({
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: 8,
  minWidth: 420,
  '@media': {
    '(max-width: 1024px)': { gap: 6, minWidth: 378 },
    '(max-width: 768px)': { gap: 4, minWidth: 350 },
    '(max-width: 480px)': { gap: 2, minWidth: 320 },
  },
});

export const weekday = style([
  textStyle.caption.regular,
  {
    textAlign: 'center',
    padding: '4px 0',
    '@media': {
      '(max-width: 1024px)': { fontSize: 12 },
      '(max-width: 768px)': { fontSize: 11 },
      '(max-width: 480px)': { fontSize: 10, padding: '2px 0' },
    },
  },
]);

export const cell = style({
  position: 'relative',
  aspectRatio: '1.2 / 1',
  borderRadius: 4,
  minHeight: 72,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8,
  cursor: 'pointer',
  selectors: {
    '&[data-selected]': { background: tokens.color.action.bg.disabled },
    '&:hover': { background: tokens.color.action.bg.disabled },
  },
  '@media': {
    '(max-width: 1024px)': {
      aspectRatio: '1.1 / 1',
      minHeight: 64,
      paddingTop: 6,
    },
    '(max-width: 768px)': {
      aspectRatio: '1 / 1',
      minHeight: 56,
      paddingTop: 6,
    },
    '(max-width: 480px)': {
      aspectRatio: '0.9 / 1',
      minHeight: 44,
      paddingTop: 4,
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
    '@media': {
      '(max-width: 1024px)': {
        width: 22,
        height: 22,
        lineHeight: '22px',
        fontSize: 11,
      },
      '(max-width: 768px)': {
        width: 20,
        height: 20,
        lineHeight: '20px',
        fontSize: 10,
      },
      '(max-width: 480px)': {
        width: 18,
        height: 18,
        lineHeight: '18px',
        fontSize: 9,
      },
    },
  },
]);

export const eventBar = style({
  position: 'absolute',
  left: '6%',
  right: '6%',
  height: 14,
  top: 32,
  borderRadius: 2,
  background: colors.brand.light,
  '@media': {
    '(max-width: 1024px)': { top: 28, height: 12, left: '7%', right: '7%' },
    '(max-width: 768px)': { top: 24, height: 10, left: '8%', right: '8%' },
    '(max-width: 480px)': { top: 20, height: 8, left: '9%', right: '9%' },
  },
});
