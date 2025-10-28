import { colors } from '@/styles/colorPalette.css';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const filtersContainer = style({
  display: 'flex',
  gap: 12,
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});

export const filterButton = recipe({
  base: [
    textStyle.body.semibold,
    {
      padding: '10px 20px',
      borderRadius: 24,
      border: '2px solid',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: 6,

      ':hover': {
        transform: 'translateY(-1px)',
      },

      ':focus-visible': {
        outline: `2px solid ${tokens.color.field.border.focus}`,
        outlineOffset: 2,
      },

      ':disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  ],
  variants: {
    active: {
      true: {
        borderColor: colors.brand.main,
        background: colors.brand.main,
        color: tokens.color.text.inverse,
      },
      false: {
        borderColor: tokens.color.field.border.base,
        color: tokens.color.text.body,

        ':hover': {
          borderColor: colors.brand.main,
          color: colors.brand.main,
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const filterIcon = style({
  width: 16,
  height: 16,
});
