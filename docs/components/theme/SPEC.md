# Theme and appearance

## Purpose

Define the six-palette, three-color-mode appearance contract. Visual rules live in `docs/DESIGN.md`.

## Owners

- `ThemeProvider` owns palette and color mode, persistence, and live system preference updates.
- `theme-script.tsx` applies palette and resolved color mode before first paint.
- `AppearanceControl` exposes palette and color mode with accessible native radio groups.
- `src/lib/theme.ts` validates stored values and applies `data-palette`, `data-theme`,
  `data-theme-preference`, and the `dark` class.
- Palette tokens live in `src/styles/tokens.css`, `theme.css`, and `palettes.css`; shared static
  palette treatments live in `src/styles/utilities.css`; diagrams live in `diagrams.css`.

## Contract

- Six internal palette IDs: `mineral`, `oxblood`, `signal`, `cobalt`, `amber`, `original`.
- Public palette labels are Mineral Research, Oxblood Atelier, Signal Green, Cobalt & Terracotta,
  Amber & Graphite, and Violet & Graphite.
- `mineral` is the default palette. Modes are `light`, `dark`, and `system`.
- Palette and mode keep their existing storage keys. No effects preference or `data-fx` attribute exists.
- Unavailable storage falls back to defaults without disabling in-memory preference changes.
- Palette styling preserves static identity across all twelve combinations. Ordinary hover, focus,
  and accessible theme transitions respect reduced-motion preferences.

## Non-goals

No special palette animation system, effect artwork, or diagram animation.
