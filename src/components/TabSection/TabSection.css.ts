import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
});

export const tabs = style({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  background: 'none',
});

export const tabButton = style({
  flex: '0 0 auto',
  minWidth: 'fit-content',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  height: '77px',
  whiteSpace: 'nowrap',
});

export const tabInactive = style({
  color: 'var(--Gray-600, #8F90A6)',
  fontWeight: '600',
  fontSize: '28px',
  lineHeight: '133.4%',
  letterSpacing: '-0.7px',
  padding: '20px 45px 20px 45px',
});

export const tabActive = style({
  color: 'var(--Gray-700, #3A3A3C)',
  fontWeight: '700',
  fontSize: '28px',
  lineHeight: '133.4%',
  letterSpacing: '-0.7px',
  background: 'var(--Gray-300, #EBEBF0)',
  borderRadius: '20px 20px 0 0',
  padding: '20px 45px 20px 45px',
});

export const tabContent = style({
  height: 'auto',
  padding: '80px',
  background: 'var(--Gray-300, #EBEBF0)',
  borderRadius: '0 20px 20px 20px',
});

export const contentAllRounded = style({
  borderRadius: '20px',
});
