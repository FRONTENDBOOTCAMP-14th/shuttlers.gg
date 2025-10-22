import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { recipe } from '@vanilla-extract/recipes';

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
    },
  },
  defaultVariants: { selected: false },
});
