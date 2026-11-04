import type { PaletteId, ThemePreference } from '@/types/theme';

export const siteConfig = {
  name: 'my-website-2026',
  description: 'dailephd LLC - software, data, and AI projects by Dai Le.',
};

export const THEME_STORAGE_KEY = 'my-website-2026-theme';
export const PALETTE_STORAGE_KEY = 'my-website-2026-palette';

export const THEME_PREFERENCES = ['light', 'dark', 'system'] as const satisfies readonly ThemePreference[];

export const PALETTES = [
  { id: 'mineral', label: 'Mineral Research' },
  { id: 'oxblood', label: 'Oxblood Atelier' },
  { id: 'signal', label: 'Signal Green' },
  { id: 'cobalt', label: 'Cobalt & Terracotta' },
  { id: 'amber', label: 'Amber & Graphite' },
  { id: 'original', label: 'Violet & Graphite' },
  { id: 'onedark', label: 'One Dark' },
] as const satisfies readonly { id: PaletteId; label: string }[];

export const PALETTE_IDS = PALETTES.map((palette) => palette.id) as readonly PaletteId[];

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';
export const DEFAULT_PALETTE: PaletteId = 'original';

/** Palettes that render one fixed dark appearance; the stored color mode is retained but not applied. */
export const FIXED_DARK_PALETTES: readonly PaletteId[] = ['onedark'];
