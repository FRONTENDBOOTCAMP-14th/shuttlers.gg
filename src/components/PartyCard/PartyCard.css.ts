import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens.css';

export const partyCard = recipe({
  base: {
    padding: 24,
    borderRadius: 12,
    background: tokens.color.surface.base,
    boxShadow: tokens.elevation.shadow.primary,
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

export const partyContent = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});
