import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: tokens.color.bg,
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  width: '100%',
  backgroundColor: tokens.color.bg,
  position: 'sticky', // ✅ 스크롤 시 상단 고정 (선택사항)
  top: 0,
  zIndex: 100,
});

export const mainSection = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 20px',
  gap: '40px',
  background: tokens.color.bg,
  paddingTop: '120px', // ✅ NavBar 높이 고려한 여백 추가
});

export const logoContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const mainTitle = style({
  color: tokens.color.text.body,
  ...textStyle.subtitle.semibold,
  textAlign: 'center',
  maxWidth: '800px',
});

export const searchContainer = style({
  position: 'relative',
  width: '100%',
  maxWidth: '710px', // ✅ 데스크톱 기준
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  margin: '0 auto', // ✅ 중앙 정렬

  // ✅ 모바일에서는 좀 더 작게
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
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#ffffffff',
  borderRadius: '12px', // ✅ UserCard와 일치하는 border-radius
  boxShadow: tokens.elevation.shadow.primary,
  zIndex: 10,
  maxHeight: '500px', // ✅ UserCard 높이를 고려해 충분히 크게
  overflowY: 'auto',
  padding: '12px', // ✅ UserCard 간격을 위한 패딩
});

export const searchResultItem = style({
  width: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '8px', // ✅ UserCard 간 간격
  selectors: {
    '&:hover': {
      transform: 'translateY(-2px)', // ✅ 호버 시 살짝 위로
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    '&:active': {
      transform: 'translateY(0)', // ✅ 클릭 시 원래 위치
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

export const selected = style({
  backgroundColor: tokens.color.text.body,
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  outline: `2px solid ${tokens.color.text}`,
  outlineOffset: '2px',

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
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
