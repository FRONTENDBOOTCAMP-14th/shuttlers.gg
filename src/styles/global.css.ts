import { globalStyle } from '@vanilla-extract/css';
import { tokens } from './tokens.css';
import { typography } from './typography.css';

globalStyle('*, *::before, *::after', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('html, body', {
  height: '100%',
  width: '100%',
  fontFamily: typography.font.family.base,
  letterSpacing: typography.font.letterSpacing.tight,
});

globalStyle('#root, main', {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  paddingInline: 20,
  '@media': {
    'screen and (min-width: 768px)': {
      paddingInline: 24,
    },
    'screen and (min-width: 1024px)': {
      paddingInline: 40,
    },
  },
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('ul, ol', {
  listStyle: 'none',
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
  background: 'none',
  border: 'none',
  outline: 'none',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  color: tokens.color.text.title,
  fontWeight: '700',
  lineHeight: '136.4%',
  letterSpacing: '-0.025em',
});

globalStyle('button', {
  cursor: 'pointer',
});

globalStyle('input::placeholder', {
  color: tokens.color.text.placeholder,
});

globalStyle('.sr-only', {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
