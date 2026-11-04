export type ThemePreference = 'light' | 'dark' | 'system';

export type EffectiveTheme = Exclude<ThemePreference, 'system'>;

export type PaletteId = 'mineral' | 'oxblood' | 'signal' | 'cobalt' | 'amber' | 'original' | 'onedark';

export interface AppearanceSettings {
  palette: PaletteId;
  theme: ThemePreference;
}
