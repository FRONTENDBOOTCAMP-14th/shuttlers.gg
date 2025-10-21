'use client';

import { darkTheme, lightTheme } from '@/styles/theme.css';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: lightTheme,
        dark: darkTheme,
      }}
    >
      {children}
    </ThemeProvider>
  );
}
