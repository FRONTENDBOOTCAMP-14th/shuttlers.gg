import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 6,
    borderRadius: 12,
    fontWeight: 700,
  },

  variants: {},
});
