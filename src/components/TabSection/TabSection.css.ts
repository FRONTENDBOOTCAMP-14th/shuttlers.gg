import { tokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';
import { textStyle } from '../../styles/typography.css';

export const container = style({
  width: '100%',
});

export const tabs = style({
  display: 'flex',
  alignItems: 'center',
  overflow: 'visible',
  background: 'none',
  padding: '4px 0',
  margin: '-4px 0',
});

export const tabButton = style({
  padding: '12px 24px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  borderRadius: '8px 8px 0 0',
  outline: 'none',
  position: 'relative',
  selectors: {
    '&:focus': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: '2px', // ✅ outline이 요소 밖으로 나가도록
      zIndex: 10, // ✅ 다른 요소 위에 outline 표시
    },
  },
});

export const tabInactive = style({
  color: tokens.color.text.caption,
  ...textStyle.title.semibold,
  padding: '20px 45px 20px 45px',
  selectors: {
    '&:focus': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: '2px',
      zIndex: 10,
    },
  },
});

export const tabActive = style({
  color: tokens.color.text.body,
  ...textStyle.title.semibold,
  background: tokens.color.surface.raised,
  borderRadius: '20px 20px 0 0',
  padding: '20px 45px 20px 45px',
  selectors: {
    '&:focus': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: '2px',
      zIndex: 10,
    },
  },
});

export const tabContent = style({
  height: 'auto',
  padding: '80px',
  background: tokens.color.surface.raised,
  borderRadius: '0 20px 20px 20px',
  marginTop: '-1px', // ✅ 탭과 컨텐츠 사이 간격 제거 (outline 고려)
  selectors: {
    '&:focus': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

export const contentAllRounded = style({
  borderRadius: '20px',
});
