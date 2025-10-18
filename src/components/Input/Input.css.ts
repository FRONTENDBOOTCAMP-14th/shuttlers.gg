import { tokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';
import { textStyle } from '../../styles/typography.css';

export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '8px',
      padding: '2px',
      background: tokens.color.action.bg.primary,
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'xor',
      WebkitMask:
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      pointerEvents: 'none',
      opacity: 1, 
      transition: 'opacity 0.2s ease',
    },
    '&[data-input-focused="true"]::before': {
      opacity: 0,
    },
 
    '&[data-error="true"]::before': {
      opacity: 0,
    },
    
  },
});

export const input = style({
  width: '100%',
  height: 'auto',
  padding: '24px 30px 24px 30px',
  borderRadius: '8px',
  border: '2px solid transparent',
  background: tokens.color.field.bg.base,
  color: tokens.color.text.body,
  outline: 'none',
  transition: 'border-color 0.2s ease',
  ...textStyle.heading.medium,
  selectors: {
    "&[aria-invalid='true']": {
      border: `2px solid ${tokens.color.field.border.error} !important`,
    },
    '&:focus:not([aria-invalid="true"])': {
      border: `2px solid ${tokens.color.field.border.focus} !important`,
    },
    ':focus-within:not(:has(button:focus)) &:focus:not([aria-invalid="true"])': {
      border: `2px solid ${tokens.color.field.border.focus} !important`,
    },
    '&::-webkit-search-cancel-button': {
      WebkitAppearance: 'none',
      appearance: 'none',
    },
    '&::-webkit-search-decoration': {
      WebkitAppearance: 'none',
      appearance: 'none',
    },
    '&:not(:focus)': {
      border: '2px solid transparent',
    },
  },
});

export const iconButton = style({
  position: 'absolute',
  right: '16px',
  display: 'flex',
  background: 'none',
  border: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  height: '24px',
  width: '24px',
  cursor: 'pointer',
  zIndex: 2,
  color: tokens.color.badge.filled.bg.gray,
  padding: 0,
  borderRadius: '4px',
  selectors: {
    '&:hover:not(:disabled)': {
      color: tokens.color.field.border.focus,
    },
    '&:disabled': {
      color: tokens.color.action.bg.disabled,
      cursor: 'not-allowed',
    },
    '&:active': {
      color: tokens.color.field.border.focus,
    },
    '&:focus': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

export const icon = style({
  width: '24px',
  height: '24px',
  position: 'absolute',
  right: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  color: tokens.color.badge.filled.bg.gray,
  borderRadius: '4px',
  transition: 'all 0.2s ease',
  zIndex: 2,

  selectors: {
    '&:hover': {
      color: tokens.color.field.border.focus,
    },
    '&:active': {
      color: tokens.color.field.border.focus,
    },
    '&:focus': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

export const searchIcon = style({
  width: '24px',
  height: '24px',
  position: 'absolute',
  right: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.color.badge.filled.bg.gray,
  borderRadius: '4px',
  padding: '2px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  zIndex: 2,

  selectors: {
    '&:hover': {
      color: tokens.color.field.border.focus,
    },
    '&:active': {
      color: tokens.color.field.border.focus,
    },
    '&:focus': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: '2px',
    },
  },
});
