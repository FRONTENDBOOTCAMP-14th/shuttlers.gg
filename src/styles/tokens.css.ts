import { createThemeContract } from '@vanilla-extract/css';

export const tokens = createThemeContract({
  color: {
    bg: null,

    surface: {
      base: null,
      brand: null,
      raised: null,
      muted: null,
    },

    action: {
      bg: {
        primary: null,
        secondary: null,
        dark: null,
        disabled: null,
      },

      hover: {
        primary: null,
        secondary: null,
        dark: null,
        disabled: null,
      },
    },

    badge: {
      filled: {
        bg: {
          brand: null,
          gray: null,
          white: null,
        },
        text: {
          brand: null,
          gray: null,
          white: null,
        },
      },

      outline: {
        border: {
          brand: null,
          white: null,
        },
        text: {
          brand: null,
          white: null,
        },
      },
    },

    field: {
      bg: {
        base: null,
        search: null,
        disabled: null,
      },
      border: {
        base: null,
        search: null,
        error: null,
        focus: null,
        disabled: null,
      },
    },

    text: {
      title: null,
      body: null,
      caption: null,
      placeholder: null,
      inverse: null,
      info: null,
      success: null,
      warning: null,
      error: null,
    },
  },

  elevation: {
    shadow: {
      primary: null,
    },
  },
});
