import { colors } from '@/styles/colorPalette.css';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  padding: '32px 40px',
  borderRadius: 20,
  background: `linear-gradient(135deg, ${colors.brand.main} 0%, #4ECDC4 100%)`,
  color: tokens.color.text.inverse,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
});

export const headerInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const playerName = style([textStyle.title.bold]);

export const tagList = style({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
});

export const gradeButtons = style({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
});

export const gradeButton = style({
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.color.text.inverse,
  cursor: 'default',
});

export const gradeLabel = style([
  textStyle.caption.regular,
  {
    fontSize: 11,
  },
]);

export const gradeValue = style([
  textStyle.heading.bold,
  {
    fontSize: 20,
  },
]);
