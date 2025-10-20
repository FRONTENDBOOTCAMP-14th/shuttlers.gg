import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const tablist = style({});

export const tab = recipe({
  base: {
    appearance: 'none',
    border: 0,
    outline: 'none',
    cursor: 'pointer',
    padding: '10px 16px',
    borderRadius: '10px',
    fontSize: 14,
    lineHeight: '20px',
    transition: 'background 120ms, color 120ms, box-shadow 120ms',
    background: '#E5E7EB',
    color: '#6B7280',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
    selectors: {
      '&:hover': { background: '#E2E6EF' },
      '&:focus-visible': {
        boxShadow: '0 0 0 2px white, 0 0 0 4px rgba(59,130,246,0.6)',
      },
    },
  },
  variants: {
    selected: {
      true: {
        background: '#3167FF',
        color: 'white',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
      },
      false: {},
    },
  },
  defaultVariants: { selected: false },
});

export const panel = style({
  marginTop: 16,
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)',
  padding: 20,
});
