'use client';

import { useThemeStore } from '@/store/useThemeStore';
import { darkTheme, lightTheme } from '@/styles/theme.css';
import { useEffect } from 'react';

export default function ThemeEffect() {
  const { mode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(lightTheme, darkTheme);
    root.classList.add(mode === 'dark' ? darkTheme : lightTheme);
  }, [mode]);

  return null;
}
