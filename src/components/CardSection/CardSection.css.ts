import { style } from '@vanilla-extract/css';

export const container = style({
  borderRadius: '20px',
  boxShadow: '0 8px 24px 0 rgba(51, 119, 255, 0.12)',
  padding: '40px',
  width: '100%',
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '40px',
  background: 'var(--White, #FFF)',
});

export const primaryBg = style({
  background: 'var(--White, #FFF)',
});

export const noBg = style({
  background: 'none',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  gap: '6px',
});

export const icon = style({
  display: 'flex',
  width: '28px',
  height: '28px',
  aspectRatio: '1/1',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#37F',
});

export const title = style({
  fontWeight: '700',
  fontSize: '28px',
  color: 'var(--Gray-800, #101012)',
  lineHeight: '133.4%',
  letterSpacing: '-0.7px',
});

export const content = style({
  width: 'auto',
  height: 'auto',
  backgroundColor: 'var(--Brand-Subtle, #E3EDFF)', // 연한 회색 배경
  padding: '24px 40px',
  borderRadius: '8px', // 둥근 모서리 추가
});
