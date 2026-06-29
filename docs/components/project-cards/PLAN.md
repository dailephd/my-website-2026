# Project Cards Plan

## M3 implementation

- Define constrained project and link contracts.
- Add curated local project records.
- Normalize and validate records through content adapters.
- Render featured and standard cards on `/work`.
- Preserve the M2 semantic token system.

## Testing notes

- Unit tests cover deterministic ordering, featured filtering, lookup, category filtering,
  duplicate rejection, and missing optional links.
- Playwright covers project content, external links, dark mode, and 390 px mobile overflow.
- Content validation checks required fields, allowed statuses, priorities, identifiers, and URLs.

## TODO

- Wire `FeaturedWorkSection` into the homepage only when the homepage narrative milestone expands
  composition beyond the M1 hero.
