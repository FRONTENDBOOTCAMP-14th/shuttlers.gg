import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  backgroundColor: tokens.color.bg,
  display: 'flex',
  flexDirection: 'column',
});

export const mainSection = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  background: tokens.color.bg,
  paddingTop: '230px',
});

export const logoContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom:'18px',
});

export const mainTitle = style({
  color: tokens.color.text.body,
  ...textStyle.subtitle.semibold,
  textAlign: 'center',
  maxWidth: '800px',
  marginBottom: '60px',
});

export const searchContainer = style({
  position: 'relative',
  width: '100%',
  maxWidth: '710px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  margin: '0 auto',
  zIndex: 10,


  '@media': {
    '(max-width: 768px)': {
      maxWidth: '90vw',
      padding: '0 20px',
    },
    '(max-width: 480px)': {
      maxWidth: '95vw',
      padding: '0 16px',
    },
  },
});

export const searchInputWrapper = style({
  width: '100%',
});

export const searchResults = style({
  position: 'absolute',
  top: '70px',
  left: 0,
  right: 0,
  backgroundColor: '#ffffffff',
  borderRadius: '0px 0px 8px 8px',
  boxShadow: tokens.elevation.shadow.primary,
  zIndex: 5,
  height: '260px',
  overflowY: 'auto',

  
});

export const searchResultItem = style({
  width: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  overflow: 'hidden',
  borderBottom: `1px solid ${tokens.color.surface.brand}`,
});

export const selected = style({
  backgroundColor: tokens.color.text.body,

  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.text.body,
    },
  },
});

export const noResults = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#8F90A6',
  border: '1px solid #8F90A6',
  borderRadius: '8px',
  padding: '40px 20px',
  textAlign: 'center',
  zIndex: 10,
  color: '#8F90A6',
  ...textStyle.heading.semibold,
});

globalStyle(`${searchInputWrapper} button`, {
  pointerEvents: 'none',
  cursor: 'default ',
  outline: 'none ', // 포커스 아웃라인 제거
});

globalStyle(`${searchInputWrapper} button:focus`, {
  outline: 'none ',
  boxShadow: 'none ',
});

globalStyle(`${searchInputWrapper} svg`, {
  opacity: 0.6,
  pointerEvents: 'none',
});
