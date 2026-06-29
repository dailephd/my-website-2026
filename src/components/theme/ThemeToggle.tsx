'use client';

import { THEME_PREFERENCES } from '@/lib/constants';
import { useTheme } from '@/components/theme/ThemeProvider';

const preferenceLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
} as const;

export default function ThemeToggle() {
  const { effectiveTheme, setTheme, theme } = useTheme();
  const currentIndex = THEME_PREFERENCES.indexOf(theme);
  const nextTheme = THEME_PREFERENCES[(currentIndex + 1) % THEME_PREFERENCES.length];

  return (
    <button
      aria-label={`Theme preference: ${preferenceLabels[theme]}. Effective theme: ${preferenceLabels[effectiveTheme]}. Activate to use ${preferenceLabels[nextTheme]}.`}
      className="theme-transition inline-flex min-h-10 min-w-32 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] shadow-[var(--shadow-control)] hover:border-[var(--color-accent-violet)] hover:text-[var(--color-text-primary)]"
      onClick={() => setTheme(nextTheme)}
      type="button"
    >
      Theme: {preferenceLabels[theme]}
    </button>
  );
}
