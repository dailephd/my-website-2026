'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  PALETTE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from '@/lib/constants';
import { DEFAULT_APPEARANCE, applyAppearance, readStoredAppearance } from '@/lib/theme';
import type {
  AppearanceSettings,
  EffectiveTheme,
  PaletteId,
  ThemePreference,
} from '@/types/theme';

interface ThemeContextValue {
  theme: ThemePreference;
  effectiveTheme: EffectiveTheme;
  palette: PaletteId;
  setTheme: (theme: ThemePreference) => void;
  setPalette: (palette: PaletteId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The in-memory preference still works when persistence is unavailable.
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppearanceSettings>(DEFAULT_APPEARANCE);
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>('light');
  const settingsRef = useRef(settings);

  const commit = useCallback((next: AppearanceSettings) => {
    settingsRef.current = next;
    setSettings(next);
    setEffectiveTheme(applyAppearance(document.documentElement, next, getSystemPrefersDark()));
  }, []);

  useLayoutEffect(() => {
    let storage: Storage | null = null;

    try {
      storage = window.localStorage;
    } catch {
      // Storage access itself can throw; fall back to defaults for this session.
    }

    commit(readStoredAppearance(storage));
  }, [commit]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (settingsRef.current.theme === 'system') {
        setEffectiveTheme(applyAppearance(document.documentElement, settingsRef.current, event.matches));
      }
    };

    media.addEventListener('change', handleSystemThemeChange);
    return () => media.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const setTheme = useCallback(
    (theme: ThemePreference) => {
      commit({ ...settingsRef.current, theme });
      persist(THEME_STORAGE_KEY, theme);
    },
    [commit],
  );

  const setPalette = useCallback(
    (palette: PaletteId) => {
      commit({ ...settingsRef.current, palette });
      persist(PALETTE_STORAGE_KEY, palette);
    },
    [commit],
  );



  const value = useMemo(
    () => ({
      theme: settings.theme,
      palette: settings.palette,
      effectiveTheme,
      setTheme,
      setPalette,
    }),
    [effectiveTheme, setPalette, setTheme, settings],
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
