import { style } from '@vanilla-extract/css';
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
  width: 28,
  height: 28,
  borderRadius: 8,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: '#1f2937',
  selectors: { '&:hover': { background: '#e5e7eb' } },
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 8,
  // 위칸(요일) + 6주(42칸) 합쳐 49칸
});

export const weekday = style({
  textAlign: 'center',
  fontSize: 12,
  color: '#9ca3af',
  padding: '8px 0',
});

export const cell = style({
  position: 'relative',
  aspectRatio: '1.4 / 1', // 가로가 넓은 느낌 (이미지 감성)
  minHeight: 72,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8,
});

export const dayNumber = style({
  fontSize: 12,
  color: '#6b7280',
  position: 'relative',
  selectors: {
    // 오늘: 검은색 원
    '&[data-today]::after': {
      content: '',
      position: 'absolute',
      top: -2,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: '#111827', // black
      zIndex: -1,
    },
    '&[data-today]': {
      color: '#fff',
      fontWeight: 700,
      padding: '0 6px',
    },
  },
});

// 대회 있는 날: 파란 밑줄
export const eventBar = style({
  position: 'absolute',
  left: '12%',
  right: '12%',
  bottom: 10,
  height: 8,
  borderRadius: 6,
  background: 'rgba(99, 102, 241, .45)', // indigo-500 with opacity
});
