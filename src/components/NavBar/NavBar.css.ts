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
    margin: '0 auto',
    paddingBlock: 24,
    maxWidth: 1080,
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

export const menuIcon = style({
  display: 'grid',
  placeItems: 'center',
  color: tokens.color.text.title,
});

export const navItem = recipe({
  base: {
    ...textStyle.heading.medium,
    color: tokens.color.text.body,
    transition: 'all 0.2s ease',
    ':hover': {
      ...textStyle.heading.bold,
      color: tokens.color.text.title,
    },
  },
  variants: {
    isActive: {
      true: {
        ...textStyle.heading.bold,
        color: tokens.color.text.title,
      },
    },
  },
});
