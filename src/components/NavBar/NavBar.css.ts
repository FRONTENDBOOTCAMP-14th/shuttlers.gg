import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const navBar = style({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  width: '100%',
  background: tokens.color.surface.base,
  borderBottom: `1px solid ${tokens.color.surface.muted}`,
  backdropFilter: 'blur(8px)',

  selectors: {
    '&[data-variant="compact"]': {
      paddingBlock: '0',
    },
  },
});

export const navBarContainer = style({
  maxWidth: '1440px',
  marginInline: 'auto',
  paddingBlock: '20px',
  paddingInline: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
  minHeight: '36px',

  selectors: {
    '&[data-variant="compact"]': {
      paddingBlock: '3px',
      minHeight: '36px',
    },
  },
});

export const navBarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '48px',

  selectors: {
    '&[data-variant="compact"]': {
      gap: '0',
    },
  },
});

export const desktopNav = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
    },
  },
});

export const compactNav = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
    },
  },
});

export const navList = style({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  margin: 0,
  padding: 0,
});

export const navItem = style([
  textStyle.body.regular,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.color.text.caption,
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '30px',
    height: '30px',
    paddingInline: '12px',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease',
    position: 'relative',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        color: tokens.color.text.body,
      },
      '&[data-active="true"]': {
        color: tokens.color.text.body,
        fontWeight: '700',
      },
      '&[data-active="true"]::after': {
        content: '',
        position: 'absolute',
        bottom: '-4px',
        left: 0,
        right: 0,
        height: '2px',
        background: tokens.color.text.body,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.color.text.info}`,
        outlineOffset: '4px',
        borderRadius: '4px',
      },
    },
  },
]);

export const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const iconButton = style({
  appearance: 'none',
  border: 0,
  background: 'transparent',
  width: '36px',
  height: '36px',
  padding: 0,
  borderRadius: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  color: tokens.color.text.body,
  transition: 'background 0.2s ease, color 0.2s ease',
  selectors: {
    '&:hover': {
      background: tokens.color.surface.muted,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.text.info}`,
      outlineOffset: 2,
    },
  },
});

export const hamburger = style({
  display: 'inline-flex',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
});

export const mobilePanel = style({
  display: 'grid',
  gap: '8px',
  padding: '20px 40px 24px',
  borderTop: `1px solid ${tokens.color.surface.muted}`,
  background: tokens.color.surface.base,
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
});

export const mobileNavItem = style([
  textStyle.body.regular,
  {
    paddingBlock: '12px',
    color: tokens.color.text.body,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        color: tokens.color.text.info,
      },
      '&[data-active="true"]': {
        color: tokens.color.text.info,
        fontWeight: '600',
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.color.text.info}`,
        outlineOffset: '2px',
        borderRadius: '4px',
      },
    },
  },
]);
