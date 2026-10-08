import { describe, expect, it } from 'vitest';

import {
  DEFAULT_PALETTE,
  PALETTE_IDS,
  PALETTE_STORAGE_KEY,
  PALETTES,
  THEME_STORAGE_KEY,
} from '@/lib/constants';
import {
  DEFAULT_APPEARANCE,
  isPaletteId,
  isThemePreference,
  readStoredAppearance,
  resolveEffectiveTheme,
} from '@/lib/theme';

function storageOf(values: Record<string, string>) {
  return { getItem: (key: string) => values[key] ?? null };
}

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

  it('keeps stable persistence keys', () => {
    expect(THEME_STORAGE_KEY).toBe('my-website-2026-theme');
    expect(PALETTE_STORAGE_KEY).toBe('my-website-2026-palette');
  });
});

describe('appearance model', () => {
  it('defines exactly the six palettes with Mineral Research as default', () => {
    expect(PALETTE_IDS).toEqual(['mineral', 'oxblood', 'signal', 'cobalt', 'amber', 'original']);
    expect(PALETTES.map((palette) => palette.label)).toEqual([
      'Mineral Research',
      'Oxblood Atelier',
      'Signal Green',
      'Cobalt & Terracotta',
      'Amber & Graphite',
      'Violet & Graphite',
    ]);
    expect(DEFAULT_PALETTE).toBe('mineral');
    expect(PALETTE_IDS.every(isPaletteId)).toBe(true);
    expect(isPaletteId('violet')).toBe(false);
  });


  it('defaults to mineral / system', () => {
    expect(DEFAULT_APPEARANCE).toEqual({ palette: 'mineral', theme: 'system' });
    expect(readStoredAppearance(null)).toEqual(DEFAULT_APPEARANCE);
    expect(readStoredAppearance(storageOf({}))).toEqual(DEFAULT_APPEARANCE);
  });

  it('restores each valid stored setting independently', () => {
    expect(readStoredAppearance(storageOf({ [PALETTE_STORAGE_KEY]: 'cobalt' }))).toEqual({
      ...DEFAULT_APPEARANCE,
      palette: 'cobalt',
    });
    expect(readStoredAppearance(storageOf({ [THEME_STORAGE_KEY]: 'dark' }))).toEqual({
      ...DEFAULT_APPEARANCE,
      theme: 'dark',
    });
  });

  it('rejects invalid stored values per setting without disturbing valid ones', () => {
    expect(
      readStoredAppearance(
        storageOf({
          [PALETTE_STORAGE_KEY]: 'violet',
          [THEME_STORAGE_KEY]: 'dark',
        }),
      ),
    ).toEqual({ palette: 'mineral', theme: 'dark' });
  });

  it('survives storage that throws', () => {
    const throwing = {
      getItem: () => {
        throw new Error('blocked');
      },
    };
    expect(readStoredAppearance(throwing)).toEqual(DEFAULT_APPEARANCE);
  });
});
