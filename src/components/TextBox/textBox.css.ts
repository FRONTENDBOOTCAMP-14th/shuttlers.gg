import { colors } from '@/styles/colorPalette.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const TextBox = style([
  textStyle.body.regular,
  {
    width: '545px',
    height: '140px',
    background: colors.gray[300],
    color: colors.gray[600],
    padding: '20px',
    boxSizing: 'border-box',
    border: 'none',
    borderRadius: '8px',
    outline: 'none',
    resize: 'none',
  },
]);
