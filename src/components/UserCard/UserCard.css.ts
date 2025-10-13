import { tokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { textStyle } from '../../styles/typography.css';

export const userCardGrades = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: 24,
});

export const flexCol = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 8,
});

export const userCard = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 40,
    borderRadius: 20,
    color: tokens.color.text.inverse,
    boxShadow: tokens.elevation.shadow.primary,
  },

  variants: {
    variant: {
      public: {
        background: tokens.color.action.bg.primary,
      },
      personal: {
        background: tokens.color.action.bg.secondary,
      },
    },
  },
});

export const userCardInfo = style({
  display: 'flex',
  flexDirection: 'column',
  columnGap: 20,
});

export const userCardDetail = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 6,
  },

  variants: {
    variant: {
      public: {},
      personal: {
        ...textStyle.subtitle.semibold,
      },
    },
  },
});

export const userCardGrade = recipe({
  base: {
    ...textStyle.title.bold,
    display: 'grid',
    placeContent: 'center',
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: tokens.color.surface.base,
  },

  variants: {
    variant: {
      public: {
        color: tokens.color.action.bg.secondary,
      },
      personal: {
        color: tokens.color.action.bg.secondary,
      },
    },
  },
});
