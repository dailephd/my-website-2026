# Theme Components Specification

## Purpose

Define the implemented M2 theme contract for light, dark, and system-aware presentation.

## Responsibilities

- `theme-script.tsx` reads the persisted preference and applies the effective theme before visible paint.
- `ThemeProvider` owns preference state, effective state, persistence, and system-preference updates.
- `ThemeToggle` cycles through system, light, and dark with visible text and an accessible state label.
- Semantic tokens in `src/styles` control all M1 shell and UI colors.

## Inputs and outputs

- Input preference: `light`, `dark`, or `system`.
- Effective output: `light` or `dark`.
- Storage key: `my-website-2026-theme`.
- DOM output: `html.dark`, `data-theme`, and `data-theme-preference`.

## Accessibility notes

- The toggle is a native keyboard-operable button.
- Its visible label and `aria-label` communicate preference and effective state without color.
- Focus uses the shared focus-ring token.
- Theme transitions are disabled under `prefers-reduced-motion: reduce`.

## Failure behavior

- Invalid stored values fall back to `system`.
- Unavailable browser storage does not prevent in-memory theme switching.
- System preference changes update the effective theme only while preference is `system`.

## M12 premium visual tokens

Approved soft-grey and charcoal backgrounds remain unchanged. Shared tokens now include strong
borders, dual restrained glows, panel radii, highlight layers, and hover shadows. CSS-only grid
and radial motifs are decorative and non-animated.
