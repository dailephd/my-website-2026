import { describe, expect, it } from 'vitest';

import { THEME_STORAGE_KEY } from '@/lib/constants';
import { isThemePreference, resolveEffectiveTheme } from '@/lib/theme';

describe('theme contract', () => {
  it('accepts only supported theme preferences', () => {
    expect(['light', 'dark', 'system'].every(isThemePreference)).toBe(true);
    expect(isThemePreference('sepia')).toBe(false);
    expect(isThemePreference(null)).toBe(false);
  });

  it('resolves explicit preferences independently of the system', () => {
    expect(resolveEffectiveTheme('light', true)).toBe('light');
    expect(resolveEffectiveTheme('dark', false)).toBe('dark');
  });

  it('resolves system preference to an effective theme', () => {
    expect(resolveEffectiveTheme('system', true)).toBe('dark');
    expect(resolveEffectiveTheme('system', false)).toBe('light');
  });

  it('uses the project-specific persistence key', () => {
    expect(THEME_STORAGE_KEY).toBe('my-website-2026-theme');
  });
});
