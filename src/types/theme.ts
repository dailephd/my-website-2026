export type ThemePreference = 'light' | 'dark' | 'system';

export type EffectiveTheme = Exclude<ThemePreference, 'system'>;
