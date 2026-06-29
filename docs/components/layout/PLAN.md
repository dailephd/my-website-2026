# Layout Components Plan

## M1 implementation

- Compose the root shell from `Header`, `PageContainer`, and `Footer`.
- Pass normalized adapter data into layout components.
- Render the homepage hero from `ProfileContent` and CTA props.
- Keep non-M1 routes as accessible planned-feature placeholders.

## Testing notes

- Production build verifies all shell routes render statically.
- Playwright smoke tests verify the homepage heading and shell navigation.
- Responsive behavior is code-reviewed for wrapping and width constraints; full viewport hardening remains later work.

## TODO

- Perform the full responsive/accessibility audit in M13.

## M2 completion

- Wrapped the shell in the theme provider.
- Added the three-state theme control to the wrapping header layout.
- Converted header, footer, shell, hero, and M1 primitives to semantic theme tokens.

## M7 completion

- Replaced the hero-only route with the complete homepage narrative.
- Preserved server rendering, M1 shell behavior, and M2 theme behavior.
- Verified a 390 px dark-mode viewport without horizontal overflow.

## M12 completion

- Added premium shell depth and page atmosphere without changing layout ownership.
- Upgraded hero and section rhythm with CSS-only motifs.
- Verified light desktop and dark 390 px browser views.
