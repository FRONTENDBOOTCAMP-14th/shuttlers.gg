import { tokens } from '@/styles/tokens.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { textStyle } from '../../styles/typography.css';

export const modal = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 60,
    position: 'relative',
    padding: 60,
    background: tokens.color.surface.base,
    boxShadow: tokens.elevation.shadow.primary,
    border: 'none',
    borderRadius: 20,
  },

  variants: {
    variant: {
      alert: {},
      confirm: {},
    },

    visible: {
      true: {},
      false: {},
    },
  },
});

export const modalContent = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 20,
});

globalStyle(`${modalContent} > h2`, {
  ...textStyle.subtitle.bold,
  color: tokens.color.text.title,
  textAlign: 'center',
});

globalStyle(`${modalContent} > div`, {
  ...textStyle.heading.semibold,
  color: tokens.color.text.body,
});

export const modalButtons = recipe({
  base: {
    display: 'flex',
  },

  variants: {
    variant: {
      alert: {},
      confirm: {
        columnGap: 20,
      },
    },
  },
});

export const closeModal = style({
  position: 'absolute',
  top: 24,
  right: 24,
  color: tokens.color.text.body,
  transition: 'scale 0.2s ease',
  ':hover': {
    scale: 1.1,
  },
});
