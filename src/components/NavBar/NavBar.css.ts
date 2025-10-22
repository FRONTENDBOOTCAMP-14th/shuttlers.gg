import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const navBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  margin: '0 auto',
  height: 56,
  maxWidth: 1080,
  background: tokens.color.bg,
  transition: 'background 0.2s ease',
  zIndex: 999,

  '@media': {
    'screen and (min-width: 768px)': {
      height: 72,
    },
  },
});

export const hamburger = style({
  display: 'grid',
  placeItems: 'center',
  color: tokens.color.text.title,

  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
});

export const navContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 16,
    width: '100%',

    '@media': {
      'screen and (min-width: 768px)': {
        columnGap: 24,
      },
      // '&:focus-visible': {
      //   outline: `2px solid ${tokens.color.text.info}`,
      //   outlineOffset: '2px',
      //   borderRadius: '4px',
      // },
    },
  },
  variants: {
    variant: {
      primary: {
        justifyContent: 'flex-end',
      },
      secondary: {},
      minimal: {},
    },
  },
});

export const navMenu = recipe({
  base: {
    display: 'none',
    overflow: 'hidden',
    background: tokens.color.surface.base,
    transition: 'max-width 0.2s ease',
    borderRadius: 8,

    '@media': {
      'screen and (min-width: 768px)': {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 30,
        maxWidth: 999,
        background: 'none',
      },
    },
  },

  variants: {
    isOpen: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 24,
        position: 'absolute',
        top: 20,
        right: 0,
        padding: 24,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: 999,
        zIndex: 999,
      },
      false: {
        maxWidth: 0,
      },
    },
  },
});

export const navItem = recipe({
  base: {
    ...textStyle.heading.medium,
    color: tokens.color.text.body,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

export const menuIcon = style({
  display: 'grid',
  placeItems: 'center',
  color: tokens.color.text.title,
});
