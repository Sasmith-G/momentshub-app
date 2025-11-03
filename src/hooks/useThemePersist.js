import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'momentshub_theme';
const THEME_VALUES = {
  LIGHT: 'light',
  DARK: 'dark',
};

/**
 * Custom hook to manage theme persistence
 * Handles localStorage and system preference fallback
 */
export const useThemePersist = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) return stored;

      if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        return THEME_VALUES.DARK;
      }
      return THEME_VALUES.LIGHT;
    } catch {
      return THEME_VALUES.LIGHT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      const root = document.documentElement;
      
      if (theme === THEME_VALUES.DARK) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (error) {
      console.error('Theme persist error:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === THEME_VALUES.LIGHT ? THEME_VALUES.DARK : THEME_VALUES.LIGHT);
  };

  return { theme, toggleTheme };
};

export default useThemePersist;
