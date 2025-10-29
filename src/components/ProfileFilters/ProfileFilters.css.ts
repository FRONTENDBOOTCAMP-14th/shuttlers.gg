import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
});

export const filterItem = style({
  position: 'relative',
  display: 'inline-block',
});

export const trigger = style({
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
});

export const chevron = style({
  display: 'inline-block',
  transition: 'transform 0.2s ease',
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  zIndex: 10,
  minWidth: 140,
  marginTop: 8,
  padding: 8,
  borderRadius: 8,
  background: 'var(--surface, #fff)',
  boxShadow: '0 6px 24px rgba(0,0,0,.12)',
  listStyle: 'none',
});

export const option = styleVariants({
  default: {
    padding: '6px 8px',
    cursor: 'pointer',
    selectors: {
      '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
    },
  },
  selected: {
    fontWeight: 700,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
});
