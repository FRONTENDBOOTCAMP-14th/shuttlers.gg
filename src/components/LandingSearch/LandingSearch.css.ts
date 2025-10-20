// LandingSearch.css.ts
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  maxWidth: '710px',
});

export const inputWrapper = style({
  width: '100%',
});

export const resultsContainer = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: tokens.color.surface.base,
  border: `1px solid ${tokens.color.surface.brand}`,
  borderRadius: '8px',
  boxShadow: tokens.elevation.shadow.primary,
  zIndex: 1000,
  maxHeight: '400px',
  overflowY: 'auto',
});

export const historyHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: `1px solid ${tokens.color.surface.muted}`,
  backgroundColor: tokens.color.surface.muted,
  ...textStyle.heading.semibold,
  color: tokens.color.text.caption,
});

export const clearButton = style({
  background: 'none',
  border: 'none',
  color: tokens.color.bg,
  fontSize: '12px',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  
  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.surface.base,
    },
  },
});

export const resultItem = style({
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  borderBottom: `1px solid ${tokens.color.surface.muted}`,
  
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
    
    '&:hover': {
      backgroundColor: tokens.color.surface.muted,
    },
  },
});

export const selected = style({
  backgroundColor: tokens.color.bg,
  outline: `2px solid ${tokens.color.field.border.focus}`,
  outlineOffset: '-2px',
  
  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.bg,
    },
  },
});

export const noResults = style({
  padding: '24px 20px',
  textAlign: 'center',
  color: tokens.color.text.caption,
});

export const noResultsSubtext = style({
  fontSize: '14px',
  color: tokens.color.bg,
  marginTop: '8px',
});