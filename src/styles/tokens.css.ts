import { createThemeContract } from '@vanilla-extract/css';

export const tokens = createThemeContract({
  color: {
    text: {
      primary: null,
      secondary: null,
    },
    bg: {
      main: null,
      content: null,
    },
    border: {
      light: null,
      dark: null,
    },
  },
});
