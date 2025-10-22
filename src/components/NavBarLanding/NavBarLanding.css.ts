import { style } from '@vanilla-extract/css';

export const navBar = style({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  width: '100%',
  background: 'transparent',
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
});

export const navList = style({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  margin: 0,
  padding: 0,
});

export const navItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  fontSize: '16px',
  lineHeight: '30px',
  minWidth: '75px',
  minHeight: '30px',
  paddingInline: '8px',
  transition: 'color 0.2s ease',
  position: 'relative',
  cursor: 'pointer',

  selectors: {
    // Dark theme - primary variant (대회일정, 모임찾기) - 기본 볼드
    '[data-theme="dark"] &[data-variant="primary"]': {
      color: '#DDE5E9',
      fontWeight: '700',
    },
    '[data-theme="dark"] &[data-variant="primary"]:hover': {
      color: '#FFFFFF',
    },
    '[data-theme="dark"] &[data-variant="primary"][data-active="true"]': {
      color: '#FFFFFF',
      fontWeight: '700',
    },

    '[data-theme="dark"] &[data-variant="secondary"]': {
      color: '#8F90A6',
      fontWeight: '400',
    },
    '[data-theme="dark"] &[data-variant="secondary"]:hover': {
      color: '#DDE5E9',
    },
    '[data-theme="dark"] &[data-variant="secondary"][data-active="true"]': {
      color: '#DDE5E9',
      fontWeight: '700',
    },

    '[data-theme="light"] &[data-variant="primary"]': {
      color: '#3A3A3C',
      fontWeight: '700',
    },
    '[data-theme="light"] &[data-variant="primary"]:hover': {
      color: '#000000',
    },
    '[data-theme="light"] &[data-variant="primary"][data-active="true"]': {
      color: '#000000',
      fontWeight: '700',
    },

    '[data-theme="light"] &[data-variant="secondary"]': {
      color: '#8F90A6',
      fontWeight: '400',
    },
    '[data-theme="light"] &[data-variant="secondary"]:hover': {
      color: '#3A3A3C',
    },
    '[data-theme="light"] &[data-variant="secondary"][data-active="true"]': {
      color: '#3A3A3C',
      fontWeight: '700',
    },

    '&[data-active="true"]::after': {
      content: '',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      right: 0,
      height: '2px',
    },
    '[data-theme="dark"] &[data-active="true"]::after': {
      background: '#DDE5E9',
    },
    '[data-theme="light"] &[data-active="true"]::after': {
      background: '#3A3A3C',
    },

    '&:focus-visible': {
      outline: '2px solid currentColor',
      outlineOffset: '4px',
      borderRadius: '4px',
    },
  },
});

export const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
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
  cursor: 'pointer',
  transition: 'background 0.2s ease, color 0.2s ease',

  selectors: {
    '[data-theme="dark"] &': {
      color: '#DDE5E9',
    },
    '[data-theme="dark"] &:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    '[data-theme="light"] &': {
      color: '#3A3A3C',
    },
    '[data-theme="light"] &:hover': {
      background: 'rgba(0, 0, 0, 0.05)',
    },
    '&:focus-visible': {
      outline: '2px solid currentColor',
      outlineOffset: '2px',
    },
  },
});
