'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { THEME_STORAGE_KEY } from '@/lib/constants';
import { isThemePreference, resolveEffectiveTheme } from '@/lib/theme';
import type { EffectiveTheme, ThemePreference } from '@/types/theme';

interface ThemeContextValue {
  theme: ThemePreference;
  effectiveTheme: EffectiveTheme;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(preference: ThemePreference, systemPrefersDark: boolean) {
  const effectiveTheme = resolveEffectiveTheme(preference, systemPrefersDark);
  const root = document.documentElement;

  root.classList.toggle('dark', effectiveTheme === 'dark');
  root.dataset.theme = effectiveTheme;
  root.dataset.themePreference = preference;

  return effectiveTheme;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>('light');

  useLayoutEffect(() => {
    let storedPreference: string | null = null;

    try {
      storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }

    const initialPreference = isThemePreference(storedPreference) ? storedPreference : 'system';
    setThemeState(initialPreference);
    setEffectiveTheme(applyTheme(initialPreference, getSystemPrefersDark()));
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (theme === 'system') {
        setEffectiveTheme(applyTheme('system', event.matches));
      }
    };

    media.addEventListener('change', handleSystemThemeChange);
    return () => media.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    setThemeState(nextTheme);
    setEffectiveTheme(applyTheme(nextTheme, getSystemPrefersDark()));

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The in-memory preference still works when persistence is unavailable.
    }
  }, []);

  const value = useMemo(
    () => ({ theme, effectiveTheme, setTheme }),
    [effectiveTheme, setTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}
