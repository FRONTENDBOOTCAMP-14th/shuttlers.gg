import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: {
    ...textStyle.heading.bold,
    paddingInline: 24,
    paddingBlock: 14,
    minHeight: 52,
    lineHeight: 1,
    transition:
      'background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
    ':focus-visible': {
      outline: `2px solid ${tokens.color.field.border.focus}`,
      outlineOffset: 1,
    },
  },

  variants: {
    variant: {
      primary: {
        background: tokens.color.action.bg.primary,
        boxShadow: tokens.elevation.shadow.primary,
        backgroundSize: '200% 200%',
        backgroundPosition: '80% 30%',
        ':hover': {
          boxShadow: tokens.elevation.shadow.hover,
          backgroundPosition: '50% 50%',
          transform: 'translateY(-1px)',
        },
      },
      secondary: {
        background: tokens.color.action.bg.secondary,
        ':hover': { background: tokens.color.action.hover.secondary },
      },
      dark: {
        background: tokens.color.action.bg.dark,
        ':hover': { background: tokens.color.action.hover.dark },
      },
    },

    size: {
      short: {
        width: 'fit-content',
      },
      long: {
        width: '100%',
      },
    },

    rounded: {
      true: { borderRadius: 999 },
      false: { borderRadius: 12 },
    },

    disabled: {
      true: { cursor: 'not-allowed', opacity: 0.9 },
      false: {},
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'short',
    rounded: false,
    disabled: false,
  },

  compoundVariants: [
    {
      variants: { disabled: true },
      style: {
        ...textStyle.heading.semibold,
        lineHeight: 1,
        background: tokens.color.action.bg.disabled,
        boxShadow: 'none',
        transform: 'none',
        ':hover': { boxShadow: 'none', transform: 'none' },
      },
    },
  ],
});

export const buttonContent = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    color: tokens.color.text.inverse,
  },

  variants: {
    icon: {
      true: { columnGap: 8 },
      false: {},
    },
    iconPosition: {
      left: {},
      right: {
        flexDirection: 'row-reverse',
      },
    },
  },
});

export const iconWrapper = style({
  display: 'grid',
  placeItems: 'center',
  width: 24,
  height: 24,
});
