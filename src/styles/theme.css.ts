import { createTheme, layer } from '@vanilla-extract/css';
import { tokens } from './tokens.css';

const themelayer = layer();

export const lightTheme = createTheme(tokens, {
  '@layer': themelayer,
  color: {
    text: {
      primary: '#111111',
      secondary: '#666666',
    },
    bg: {
      main: '#f8f8fa',
      content: '#ffffff',
    },
    border: {
      light: '#e5e7eb',
      dark: '#9ca3af',
    },
  },
});

export const darkTheme = createTheme(tokens, {
  '@layer': themelayer,
  color: {
    text: {
      primary: '#ffffff',
      secondary: '#ffffffb3',
    },
    bg: {
      main: '#0f1724',
      content: '#111827',
    },
    border: {
      light: '#374151',
      dark: '#1f2937',
    },
  },
});
