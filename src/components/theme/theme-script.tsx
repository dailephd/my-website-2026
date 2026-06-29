import { THEME_STORAGE_KEY } from '@/lib/constants';

const themeInitializationScript = `
(() => {
  const root = document.documentElement;
  let preference = 'system';

  try {
    const stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      preference = stored;
    }
  } catch {}

  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveTheme = preference === 'system'
    ? (systemDark ? 'dark' : 'light')
    : preference;

  root.classList.toggle('dark', effectiveTheme === 'dark');
  root.dataset.theme = effectiveTheme;
  root.dataset.themePreference = preference;
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />;
}
