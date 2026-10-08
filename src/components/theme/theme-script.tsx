import {
  PALETTE_IDS,
  PALETTE_STORAGE_KEY,
  THEME_PREFERENCES,
  THEME_STORAGE_KEY,
} from '@/lib/constants';
import { DEFAULT_APPEARANCE } from '@/lib/theme';

// Mirrors readStoredAppearance + applyAppearance in src/lib/theme.ts. Enumerations and keys are
// injected from the same constants so the script and ThemeProvider cannot drift apart.
export const themeInitializationScript = `
(() => {
  const root = document.documentElement;
  const read = (key, allowed, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      return allowed.indexOf(stored) !== -1 ? stored : fallback;
    } catch {
      return fallback;
    }
  };
  const preference = read('${THEME_STORAGE_KEY}', ${JSON.stringify(THEME_PREFERENCES)}, '${DEFAULT_APPEARANCE.theme}');
  const palette = read('${PALETTE_STORAGE_KEY}', ${JSON.stringify(PALETTE_IDS)}, '${DEFAULT_APPEARANCE.palette}');

  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveTheme = preference === 'system'
    ? (systemDark ? 'dark' : 'light')
    : preference;

  root.classList.toggle('dark', effectiveTheme === 'dark');
  root.dataset.theme = effectiveTheme;
  root.dataset.themePreference = preference;
  root.dataset.palette = palette;
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />;
}
