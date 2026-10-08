import type { PaletteId, ThemePreference } from '@/types/theme';

export const siteConfig = {
  name: 'my-website-2026',
  description: 'dailephd LLC - software, data, and AI projects by Dai Le.',
};

export const THEME_STORAGE_KEY = 'my-website-2026-theme';
export const PALETTE_STORAGE_KEY = 'my-website-2026-palette';

export const THEME_PREFERENCES = ['light', 'dark', 'system'] as const satisfies readonly ThemePreference[];

export const PALETTES = [
  { id: 'mineral', label: 'Mineral Research', swatch: ['#0f716a', '#b8683f'] },
  { id: 'oxblood', label: 'Oxblood Atelier', swatch: ['#812c49', '#2d7168'] },
  { id: 'signal', label: 'Signal Green', swatch: ['#3f6f47', '#a66f40'] },
  { id: 'cobalt', label: 'Cobalt & Terracotta', swatch: ['#2751ac', '#c25b37'] },
  { id: 'amber', label: 'Amber & Graphite', swatch: ['#93602b', '#256a64'] },
  { id: 'original', label: 'Violet & Graphite', swatch: ['#087b91', '#6d3ee8'] },
] as const satisfies readonly { id: PaletteId; label: string; swatch: readonly [string, string] }[];

export const PALETTE_IDS = PALETTES.map((palette) => palette.id) as readonly PaletteId[];

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';
export const DEFAULT_PALETTE: PaletteId = 'mineral';
