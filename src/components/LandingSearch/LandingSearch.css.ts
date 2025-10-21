import { tokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  maxWidth: '710px',
});

export const inputWrapper = style({
  width: '100%',
   position: 'relative',
  zIndex: 100, 
  boxShadow: tokens.elevation.shadow.primary,
  
});

export const resultsContainer = style({
  position: 'absolute',
  maxWidth: '710px',
  top: 70,
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: tokens.color.surface.base,
  border: `1px solid ${tokens.color.surface.brand}`,
  borderRadius: '0px 0px 8px 8px',
  boxShadow: tokens.elevation.shadow.primary,
  zIndex: 10,
  height: '260px',
  overflow: 'hidden',
  paddingTop: '10px',
  outline: 'none',
});

export const resultItem = style({
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  borderBottom: `1px solid ${tokens.color.surface.muted}`,
  outline: 'none',


  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.surface.muted,
    },
  },
});     

export const selected = style({
  backgroundColor: tokens.color.bg,
  
  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.bg,
    },
  },
});
