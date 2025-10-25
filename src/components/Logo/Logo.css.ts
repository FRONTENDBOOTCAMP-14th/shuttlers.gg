import { tokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const logo = style({
  transition: 'filter 0.3s ease',

  ':hover': {
    filter: `drop-shadow(${tokens.elevation.shadow.primary})`,
  },
});
