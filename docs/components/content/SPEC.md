# Content Layer Specification

## Purpose

Define the M1 local profile and link content that powers the shared website shell.

## Responsibilities

- `src/content/profile.ts` owns Dai Le’s identity, positioning, and CTA references.
- `src/content/links.ts` owns categorized primary, navigation, and footer links.
- `src/lib/content` validates required profile fields and returns sorted, display-ready data.
- Route and layout components consume adapter results instead of duplicating content.

## Inputs and outputs

- Inputs: typed `ProfileContent` and `SiteLink` records from `src/content`.
- Outputs: `getProfile()`, `getPrimaryLinks()`, `getNavigationLinks()`, and `getFooterLinks()`.

## Accessibility notes

- Link labels must describe their destination.
- Navigation and footer collections must have stable labels and IDs.
- Required identity text must remain available as semantic page content.

## TODO

- Expand content contracts only within the milestone that owns each later feature.
- Replace or add external profile links only after their final URLs are verified.

## M3 project content

- `src/content/projects.ts` owns selected-work records.
- Every project has stable `id` and `slug`, constrained status/category values, stack tags,
  featured state, deterministic priority, and optional links.
- `src/lib/content/get-projects.ts` validates and sorts without mutating source records.

## M4 product-family content

- `src/content/products.ts` owns the my-dev-kit Ecosystem family and its three modules.
- `src/lib/content/get-products.ts` validates, sorts, and exposes family/module accessors.
- Product copy may complement M3 project summaries but must not duplicate roadmap data.

## M5 roadmap content

- `src/content/roadmaps.ts` is the sole roadmap source of truth.
- Every roadmap, lane, phase, and milestone has a stable ID, status, and deterministic priority.
- Product/project copy describes identity; roadmap copy describes staged direction.

## M6 product index

- `productIndex` in `src/content/products.ts` owns concise list presentation.
- `roadmapSlug` relates an index item to roadmap data without copying roadmap text.
- Families and standalone products share one stable index contract.

## M7 homepage content

- `src/content/home.ts` owns concise homepage-only copy and technical-focus items.
- `getHomepageViewModel()` composes existing adapters without mutating source records.
- M7 uses verified research-background copy rather than rendering placeholder publications.

## M8 About, publication, and resume content

- `profile.ts` owns technical, research, and education content.
- `publications.ts` is intentionally empty until complete citations are verified.
- `resume.ts` owns file metadata and an explicit availability flag.
- Adapters validate and sort without mutation and suppress unavailable resume links.

## M9 gallery content

- `gallery.ts` is the only media metadata source and is empty until genuine assets exist.
- Records require stable IDs, local paths, dimensions, kinds, categories, and alt policy.
- Adapters validate files and provide deterministic placement and association filters.

## M10 writing and contact content

- `writing.ts` is the sole writing-record source and remains empty until real writing exists.
- `contact.ts` owns page copy; channel hrefs remain owned by `links.ts`.
- Adapters exclude draft/planned writing and compose contact channels without inventing data.

## M11 metadata content use

SEO derives identity and product naming from existing local content rather than a second content
store.
