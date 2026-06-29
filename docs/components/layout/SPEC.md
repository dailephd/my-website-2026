# Layout Components Specification

## Purpose

Define the M1 application shell that consistently frames every public route.

## Responsibilities

- `SiteShell` obtains profile, navigation, and footer data through content adapters.
- `Header` renders the profile-owned brand label and primary navigation.
- `Footer` renders profile attribution and footer navigation.
- `PageContainer` and `Container` provide responsive width and spacing constraints.
- `ThemeProvider` wraps the shell, and `ThemeToggle` is exposed in the header.

## Inputs and outputs

- Inputs: shell children plus typed profile and link data.
- Output: semantic header, main, navigation, and footer landmarks.

## Accessibility notes

- Primary and footer navigation use explicit accessible labels.
- Links remain keyboard accessible with visible focus treatment.
- Navigation wraps at narrow widths rather than relying on an unfinished menu control.
- The theme control exposes visible preference text and a complete accessible label.

## TODO

- Add the complete mobile-navigation interaction during responsive hardening if the link set outgrows wrapping.
- Continue using M2 semantic tokens in later shell changes.

## M7 homepage composition

The shell is unchanged. `/` now renders seven ordered, semantic, tokenized sections inside the
existing responsive container.

## M12 shell treatment

The shell uses a sticky translucent header, restrained background glow, clearer brand marker,
improved navigation underlines, and a layered footer. Content remains adapter-driven.
