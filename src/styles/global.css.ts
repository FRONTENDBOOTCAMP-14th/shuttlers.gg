import { globalStyle } from '@vanilla-extract/css';

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
  fontFamily: 'var(--font-pretendard)',
});

globalStyle('#root, main', {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
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
  color: 'var(--color-text-title)',
  fontWeight: '700',
  lineHeight: '136.4%',
  letterSpacing: '-0.025em',
});

globalStyle('button', {
  cursor: 'pointer',
});

globalStyle('input::placeholder', {
  color: 'var(--color-text-placeholder)',
});
