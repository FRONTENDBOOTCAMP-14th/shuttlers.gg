import { tokens } from '@/styles/tokens.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { textStyle } from '../../styles/typography.css';

export const modal = recipe({
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    margin: 0,
    width: 'min(90vw, 600px)',
    maxHeight: '80vh',
    padding: 60,
    border: 'none',
    borderRadius: 16,
    background: tokens.color.surface.base,
    boxShadow: tokens.elevation.shadow.primary,
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.95)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    zIndex: 9999,
    '::backdrop': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(12px)',
      transition: 'opacity 0.2s ease',
    },
  },

  variants: {
    visible: {
      true: {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)',
      },
      false: {
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(0.95)',
      },
    },
  },
});

export const modalContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

globalStyle(`${modalContent} > h2`, {
  ...textStyle.subtitle.bold,
  color: tokens.color.text.title,
  textAlign: 'center',
  marginBottom: 20,
});

globalStyle(`${modalContent} > div`, {
  ...textStyle.heading.semibold,
  color: tokens.color.text.body,
});

export const modalButtons = recipe({
  base: {
    display: 'flex',
    marginTop: 60,
    width: '100%',
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
  width: 24,
  height: 24,
  color: tokens.color.text.body,
  transition: 'scale 0.2s ease',
  ':hover': {
    scale: 1.1,
  },
  ':focus': {
    outline: `1px solid ${tokens.color.field.border.focus}`,
  },
});
