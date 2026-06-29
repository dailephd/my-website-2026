# Product Ecosystem Components Plan

## M4 implementation

- Define one product-family record and three ordered modules.
- Validate stable identifiers, roles, statuses, priorities, and links.
- Build a family hero, accessible flow, and module-card section.
- Compose `/products/my-dev-kit` through adapters.

## Testing notes

- Unit tests cover ordering, lookup, required family access, exact modules, duplicates, and
  missing links.
- Playwright covers family/module comprehension, the npm CTA, dark mode, and 390 px layout.

## TODO

- M7 may compose a compact product-lab narrative on the homepage.

## M6 completion

- Added a featured family card and responsive secondary product grid.
- Added status, category, product-type, positioning, link, and roadmap-preview rendering.
- Wired `/products` through a server-side index view model.
