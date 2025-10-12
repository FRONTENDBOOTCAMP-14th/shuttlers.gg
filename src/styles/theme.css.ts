import { createTheme } from '@vanilla-extract/css';
import { colors } from './colorPalette.css';
import { tokens } from './tokens.css';

export const lightTheme = createTheme(tokens, {
  color: {
    bg: colors.gray[100],

    surface: {
      base: colors.white,
      brand: colors.brand.subtle,
      raised: colors.gray[300],
      muted: colors.gray[200],
    },

    action: {
      bg: {
        primary: colors.brand.linear,
        secondary: colors.brand.main,
        dark: colors.gray[600],
        disabled: colors.gray[500],
      },

      hover: {
        primary: colors.brand.linear,
        secondary: colors.brand.dark,
        dark: colors.gray[700],
        disabled: colors.gray[500],
      },

      text: {
        primary: colors.white,
        secondary: colors.white,
        dark: colors.white,
        disabled: colors.white,
      },
    },

    badge: {
      filled: {
        bg: {
          brand: colors.brand.linear,
          gray: colors.gray[700],
          white: colors.white,
        },
        text: {
          brand: colors.white,
          gray: colors.white,
          white: colors.brand.main,
        },
      },

      outline: {
        border: {
          brand: colors.brand.linear,
          white: colors.white,
        },
        text: {
          brand: colors.brand.main,
          white: colors.white,
        },
      },
    },

    field: {
      bg: {
        base: colors.white,
        search: colors.gray[300],
        disabled: colors.gray[500],
      },
      border: {
        base: colors.brand.linear,
        search: colors.transparent,
        error: colors.red[200],
        focus: colors.brand.dark,
        disabled: colors.transparent,
      },
    },

    text: {
      title: colors.gray[800],
      body: colors.gray[700],
      caption: colors.gray[600],
      placeholder: colors.gray[600],
      inverse: colors.white,
      info: colors.brand.main,
      success: colors.green[200],
      warning: colors.yellow[200],
      error: colors.red[200],
    },
  },

  elevation: {
    shadow: {
      primary: '0px 8px 24px rgba(51, 119, 255, 0.12)',
    },
  },
});

export const darkTheme = createTheme(tokens, {
  color: {
    bg: colors.gray[800],

    surface: {
      base: colors.gray[700],
      brand: colors.brand.dark,
      raised: colors.gray[600],
      muted: colors.gray[500],
    },

    action: {
      bg: {
        primary: colors.brand.linear,
        secondary: colors.brand.light,
        dark: colors.gray[500],
        disabled: colors.gray[600],
      },

      hover: {
        primary: colors.brand.linear,
        secondary: colors.brand.main,
        dark: colors.gray[400],
        disabled: colors.gray[600],
      },

      text: {
        primary: colors.white,
        secondary: colors.white,
        dark: colors.white,
        disabled: colors.gray[400],
      },
    },

    badge: {
      filled: {
        bg: {
          brand: colors.brand.main,
          gray: colors.gray[600],
          white: colors.white,
        },
        text: {
          brand: colors.white,
          gray: colors.white,
          white: colors.brand.main,
        },
      },

      outline: {
        border: {
          brand: colors.brand.light,
          white: colors.gray[300],
        },
        text: {
          brand: colors.brand.light,
          white: colors.gray[300],
        },
      },
    },

    field: {
      bg: {
        base: colors.gray[700],
        search: colors.gray[600],
        disabled: colors.gray[500],
      },
      border: {
        base: colors.gray[500],
        search: colors.transparent,
        error: colors.red[100],
        focus: colors.brand.light,
        disabled: colors.transparent,
      },
    },

    text: {
      title: colors.white,
      body: colors.gray[200],
      caption: colors.gray[400],
      placeholder: colors.gray[500],
      inverse: colors.gray[800],
      info: colors.brand.light,
      success: colors.green[100],
      warning: colors.yellow[100],
      error: colors.red[100],
    },
  },

  elevation: {
    shadow: {
      primary: '0px 8px 24px rgba(51, 119, 255, 0.12)',
    },
  },
});
