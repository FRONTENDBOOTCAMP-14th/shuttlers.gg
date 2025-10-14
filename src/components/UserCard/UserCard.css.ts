import { tokens } from '@/styles/tokens.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { textStyle } from '../../styles/typography.css';

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

    '@media': {
      'screen and (max-width: 375px)': {
        paddingBlock: 30,
        paddingInline: 20,
      },
    },
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

export const logOut = style({
  display: 'grid',
  placeContent: 'center',
  width: 28,
  height: 28,
  transition: 'transform 0.2s ease',
  ':hover': {
    transform: 'scale(1.05)',
  },
  ':focus': {
    outline: `1px solid ${tokens.color.text.warning}`,
  },
});

export const userCardGrades = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: 20,
  '@media': {
    'screen and (max-width: 768px)': {
      columnGap: 12,
    },
  },
});

globalStyle(`${userCardGrades} > div`, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 8,
});

globalStyle(`${userCardGrades} > div > div`, {
  display: 'grid',
  placeContent: 'center',
  width: 70,
  aspectRatio: '1',
  borderRadius: '50%',
  backgroundColor: tokens.color.surface.base,
  '@media': {
    'screen and (max-width: 375px)': {
      width: 50,
    },
  },
});

export const grade = recipe({
  base: {
    ...textStyle.title.bold,
    '@media': {
      'screen and (max-width: 375px)': {
        ...textStyle.heading.bold,
      },
    },
  },

  variants: {
    variant: {
      public: {
        backgroundImage: tokens.color.badge.filled.bg.brand,
        color: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      personal: {
        color: tokens.color.action.bg.secondary,
      },
    },
  },
});
