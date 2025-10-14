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
});

export const container = style({
  maxWidth: '1200px',
  marginInline: 'auto',
  paddingBlock: '20px',
  paddingInline: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: '48px',
});

export const logo = style([
  textStyle.heading.bold,
  {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: tokens.color.text.info,
    transition: 'opacity 0.2s ease',
    selectors: {
      '&:hover': {
        opacity: 0.8,
      },
    },
  },
]);

export const desktopNav = style({
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
  gap: '32px',
  margin: 0,
  padding: 0,
});

export const navItem = style([
  textStyle.body.regular,
  {
    display: 'inline-flex',
    alignItems: 'center',
    color: tokens.color.text.caption,
    textDecoration: 'none',
    paddingInline: '8px',
    paddingBlock: '8px',
    transition: 'color 0.2s ease',
    position: 'relative',
    selectors: {
      '&:hover': {
        color: tokens.color.text.body,
      },
      '&[data-active="true"]': {
        color: tokens.color.text.body,
        fontWeight: '600',
      },
      '&[data-active="true"]::after': {
        content: '',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: tokens.color.text.body,
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
  padding: '8px',
  borderRadius: '8px',
  lineHeight: 0,
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
    selectors: {
      '&:hover': {
        color: tokens.color.text.info,
      },
      '&[data-active="true"]': {
        color: tokens.color.text.info,
        fontWeight: '600',
      },
    },
  },
]);
