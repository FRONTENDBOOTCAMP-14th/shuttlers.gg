import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const tablist = style({});

export const tab = recipe({
  base: [
    textStyle.subtitle.semibold,
    {
      appearance: 'none',
      border: 0,
      outline: 'none',
      cursor: 'pointer',
      padding: '20px 45px',
      borderRadius: '20px 20px 0 0',
      color: tokens.color.text.caption,
      selectors: {
        '&:hover': {},
        '&:focus-visible': {},
      },
    },
  ],
  variants: {
    selected: {
      true: [
        textStyle.subtitle.bold,
        {
          background: tokens.color.surface.raised,
          color: tokens.color.text.body,
        },
      ],
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
