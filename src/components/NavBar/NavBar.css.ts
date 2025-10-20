import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const navBar = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    maxWidth: 1440,
    background: tokens.color.bg,
  },

  variants: {
    variant: {
      primary: {},
      secondary: {},
      minimal: {},
    },
  },
});

export const navItems = style({
  ...textStyle.heading.medium,
  color: tokens.color.text.body,
  display: 'flex',
  columnGap: 24,
});

export const activeMenu = style({
  ...textStyle.heading.bold,
  color: tokens.color.text.title,
});

export const menuIcon = style({
  display: 'grid',
  placeItems: 'center',
  color: tokens.color.text.title,
});
