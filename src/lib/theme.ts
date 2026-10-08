import {
  DEFAULT_PALETTE,
  DEFAULT_THEME_PREFERENCE,
  PALETTE_IDS,
  PALETTE_STORAGE_KEY,
  THEME_PREFERENCES,
  THEME_STORAGE_KEY,
} from '@/lib/constants';
import type {
  AppearanceSettings,
  EffectiveTheme,
  PaletteId,
  ThemePreference,
} from '@/types/theme';

export function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.some((preference) => preference === value);
}

export function isPaletteId(value: unknown): value is PaletteId {
  return PALETTE_IDS.some((id) => id === value);
}

export function resolveEffectiveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): EffectiveTheme {
  if (preference === 'system') {
    return systemPrefersDark ? 'dark' : 'light';
  }

  return preference;
}

export const DEFAULT_APPEARANCE: AppearanceSettings = {
  palette: DEFAULT_PALETTE,
  theme: DEFAULT_THEME_PREFERENCE,
};

type StorageReader = Pick<Storage, 'getItem'>;

function readKey(storage: StorageReader | null, key: string): string | null {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
    return null;
  }
}

/** Reads and validates palette and color mode; invalid values fall back to their defaults. */
export function readStoredAppearance(storage: StorageReader | null): AppearanceSettings {
  const theme = readKey(storage, THEME_STORAGE_KEY);
  const palette = readKey(storage, PALETTE_STORAGE_KEY);

  return {
    theme: isThemePreference(theme) ? theme : DEFAULT_APPEARANCE.theme,
    palette: isPaletteId(palette) ? palette : DEFAULT_APPEARANCE.palette,
  };
}

/** Applies the appearance to the root element; shared by ThemeProvider (the pre-hydration script mirrors it). */
export function applyAppearance(
  root: HTMLElement,
  settings: AppearanceSettings,
  systemPrefersDark: boolean,
): EffectiveTheme {
  const effectiveTheme = resolveEffectiveTheme(settings.theme, systemPrefersDark);

  root.classList.toggle('dark', effectiveTheme === 'dark');
  root.dataset.theme = effectiveTheme;
  root.dataset.themePreference = settings.theme;
  root.dataset.palette = settings.palette;

  return effectiveTheme;
}
