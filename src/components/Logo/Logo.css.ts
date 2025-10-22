import { tokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const logo = style({
  ':hover': {
    filter: `drop-shadow(${tokens.elevation.shadow.primary})`,
  },
});
