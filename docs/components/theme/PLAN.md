# Theme Components Plan

## M2 implementation

- Define theme preference and effective-theme types.
- Add semantic light/dark tokens.
- Apply the initial effective theme before paint.
- Persist manual preference and listen for system changes.
- Wire an accessible three-state toggle into the header.
- Convert the M1 shell and UI primitives to semantic tokens.

## Testing notes

- Unit tests cover preference validation and effective-theme resolution.
- Playwright verifies toggle visibility, dark-mode application, persistence after reload, stable toggle geometry, exact background colors, and a 390 px viewport.
- Static lint rejects pure white or pure black main background tokens.

## TODO

- Reuse the M2 tokens when later feature components become active.
- Revisit only if a future content-security policy requires nonce-based inline script handling.

## M12 completion

- Refined layered surfaces, borders, shadows, glows, radii, and focus aliases.
- Added reusable premium card, section, hero, grid, and link utilities.
- Preserved system/manual theme behavior and reduced-motion protection.
