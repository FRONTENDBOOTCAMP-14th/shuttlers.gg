import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/tokens.css';

export const textBox = style([
  textStyle.body.regular,
  {
    width: '100%',
    background: tokens.color.surface.raised,
    color: tokens.color.text.placeholder,
    padding: '20px',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    borderRadius: '8px',
    outline: 'none',
    resize: 'none',
    selectors: {
      '&:focus': { border: `1px solid ${tokens.color.field.border.focus}` },
    },
  },
]);
