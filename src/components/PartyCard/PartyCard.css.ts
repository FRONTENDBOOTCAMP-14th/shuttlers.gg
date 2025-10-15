import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens.css';

export const partyCard = recipe({
  base: {
    padding: 24,
    borderRadius: 12,
    background: tokens.color.surface.base,
    boxShadow: tokens.elevation.shadow.primary,
    width: '100%',
  },

  variants: {
    status: {
      joinable: {},
      full: {
        background: tokens.color.surface.raised,
      },
      joined: {},
      readonly: {},
    },
    view: {
      detailed: {},
      compact: {},
    },
  },
});

export const thumbnailWrapper = style({
  position: 'relative',
  width: '100%',
  aspectRatio: 2 / 1,
  marginBottom: 18,
  overflow: 'hidden',
});

export const partyContent = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
  },
});
