import { style } from '@vanilla-extract/css';

export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
});

export const input = style({
  width: '100%',
  height: 'auto',
  padding: '24px 30px', // 우측 아이콘 공간
  borderRadius: '8px',
  border: '1px solid var(--Brand-Linear, #3377FF);',
  background: '#fff',
  color: '#8F90A6',
  fontSize: '22px',
  outline: 'none',
  fontWeight: '500',
  lineHeight: '136.4%',
  letterSpacing: '-0.55px',
  selectors: {
    '&:focus': {
      border: '2px solid var(--Brand-Dark, #3568D4)',
    },
    "&[aria-invalid='true']": {
      border: '1px solid var(--Error-Medium, #FF3B3B)',
    },
    // search input의 기본 clear 버튼 제거
    '&::-webkit-search-cancel-button': {
      WebkitAppearance: 'none',
      appearance: 'none',
    },
    '&::-webkit-search-decoration': {
      WebkitAppearance: 'none',
      appearance: 'none',
    },
  },
});

export const iconButton = style({
  position: 'absolute',
  right: '16px',
  display: 'flex',
  background: 'none',
  border: 'none',
  alignItems: 'center',
  height: '24px',
  width: '24px',
  cursor: 'pointer',
  zIndex: 2,
  color: '#3a3a3c',
  padding: 0,
  selectors: {
    '&:hover:not(:disabled)': {
      color: '#3687FF',
    },
    '&:disabled': {
      color: '#c3c5d0',
      cursor: 'not-allowed',
    },
  },
});

export const icon = style({
  width: '24px',
  height: '24px',
  position: 'absolute',
  right: '16px',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
  color: '#3a3a3c',
});
