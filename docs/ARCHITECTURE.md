# Architecture

## Purpose

This document defines the architectural boundaries for `my-website-2026`, a single Next.js personal website and product-lab repository. It establishes how local structured content flows into reusable UI and route composition without introducing a separate content package, backend service, or monorepo split.

## Repository shape

- Repository type: single Next.js website repository
- Runtime model: static-first website with Next.js App Router
- Deployment target: Vercel
- Publication target: GitHub
- Documentation root: `docs/`
- Content source of truth: `src/content`

## Architecture summary

`my-website-2026` uses a layered architecture designed around local content ownership and clear dependency direction.

Dependency direction:

`types -> content -> content-adapters -> seo -> ui -> feature-components/layout-theme -> application`

Lower layers must not import higher layers. Pages compose data and components; data files do not compose pages.

## Layers in dependency order

### 1. `types`

- Path: `src/types`
- Role: shared TypeScript types and interfaces for content records, roadmap models, gallery items, SEO objects, and related contracts.
- Allowed dependencies: none, or other type-only utilities when needed.
- Must not import: React components, route pages, `src/app`, or content modules with runtime data.

Responsibilities:

- Define stable shapes for `Profile`, `Project`, `Product`, `Roadmap`, `Publication`, `GalleryItem`, `WritingItem`, `ResumeMetadata`, and SEO-related records.
- Provide reusable interfaces consumed by content files, adapter helpers, and page composition.

### 2. `content`

- Path: `src/content`
- Role: local structured website content and roadmap/project/publication records.
- Allowed dependencies: `src/types`
- Must not import: React components, `src/app`, route modules, or UI primitives.

Responsibilities:

- Store website-owned content under local source control.
- Hold structured records for:
  - `src/content/profile.ts`
  - `src/content/links.ts`
  - `src/content/projects.ts`
  - `src/content/products.ts`
  - `src/content/roadmaps.ts`
  - `src/content/publications.ts`
  - `src/content/gallery.ts`
  - `src/content/writing.ts`
  - `src/content/resume.ts`
- Provide the single source of truth for roadmap text and status data.

### 3. `content-adapters`

- Path: `src/lib/content`
- Role: normalized accessors and validation helpers for local content.
- Allowed dependencies: `src/types`, `src/content`
- Must not import: UI components or route pages.

Responsibilities:

- Provide stable read access to local content.
- Normalize or validate content before UI composition.
- Fail clearly when required content is missing or structurally invalid.
- Support graceful empty states for optional content such as writing or gallery sections when records are intentionally absent.

### 4. `seo`

- Path: `src/lib/seo`
- Role: metadata helpers, structured data, site URL helpers, Open Graph helpers.
- Allowed dependencies: `src/types`, `src/content`, `src/lib/content`
- Must not import: UI components.

Responsibilities:

- Generate reusable metadata objects for route pages.
- Centralize canonical URL, Open Graph, Twitter/X card, sitemap, robots, and structured data logic.
- Keep SEO behavior aligned with local content rather than hardcoded page strings.

### 5. `ui`

- Path: `src/components/ui`
- Role: reusable presentational primitives such as `Button`, `Card`, `Badge`, `Container`, `SectionHeader`, and accessibility helpers.
- Allowed dependencies: types, styling utilities, simple helpers.
- Must not import: route pages, content record modules, or feature-specific business content.

Responsibilities:

- Provide styling and semantic building blocks.
- Stay generic enough to be reused across work, products, roadmaps, publications, writing, contact, and gallery areas.

### 6. `feature-components`

- Paths:
  - `src/components/sections`
  - `src/components/projects`
  - `src/components/products`
  - `src/components/roadmap`
  - `src/components/publications`
  - `src/components/gallery`
  - `src/components/writing`
  - `src/components/contact`
- Role: feature-specific UI that renders structured content passed through props.
- Preferred dependency style: props-first composition.

Responsibilities:

- Render feature-specific content into project cards, product cards, ecosystem views, roadmap views, publication lists, gallery components, and contact sections.
- Prefer props over direct content imports unless the component is intentionally a section-level composition component for a page.
- Keep roadmap rendering focused on structured roadmap data rather than freeform duplicated page copy.

### 7. `layout-theme`

- Paths:
  - `src/components/layout`
  - `src/components/theme`
  - `src/styles`
- Role: site shell, navigation, footer, page container, theme provider, theme toggle, global design tokens.

Responsibilities:

- Define app shell structure.
- Implement light/dark theme behavior and persistence.
- Hold design-token-driven CSS variables and global layout utilities.
- Ensure soft-grey light mode and charcoal-grey dark mode remain consistent across routes.

### 8. `application`

- Path: `src/app`
- Role: Next.js route pages, route metadata, page composition, sitemap, robots, and not-found page.
- Allowed dependencies: all lower layers.

Responsibilities:

- Compose data, metadata, and components for the main routes:
  - `/`
  - `/work`
  - `/products`
  - `/products/my-dev-kit`
  - `/writing`
  - `/about`
  - `/contact`
- Export route-level metadata through reusable helpers.
- Own sitemap, robots, and not-found behavior.

## Dependency rules

### Hard rules

- Lower layers must not import higher layers.
- Content must not import React components.
- UI primitives must not know about project-specific content records.
- Pages compose data and components.
- Roadmaps are data in `src/content/roadmaps.ts`, not duplicated page copy.
- SEO metadata should be produced through reusable helpers plus page-specific content.
- The site has no backend API in v1 unless explicitly added later.

### Practical interpretation

- `src/content` owns the content truth.
- `src/lib/content` owns read access and validation behavior.
- `src/lib/seo` owns metadata generation.
- `src/components/ui` owns reusable presentation primitives.
- `src/components/*` feature folders own rendering patterns.
- `src/app` owns page assembly and route exports.

## Core architectural flows

### Content flow

1. Types define record shapes.
2. Local content files populate structured records.
3. Content adapters validate or normalize those records.
4. Application routes request data through adapters or direct content access where the composition is intentionally simple.
5. Feature components render content into page sections.

### Roadmap flow

1. Roadmap data is stored once in `src/content/roadmaps.ts`.
2. Roadmap types in `src/types/roadmap.ts` define allowed structures and statuses.
3. Roadmap adapters normalize the data if needed.
4. Roadmap UI components render preview and full-view variants.
5. Pages reuse the same roadmap records wherever needed.

This avoids duplicated roadmap text across the homepage, product pages, and future preview surfaces.

### SEO flow

1. Local content provides route-specific names, summaries, and asset references.
2. SEO helpers create canonical URLs, metadata objects, Open Graph data, and structured data.
3. Route modules export page metadata and feed sitemap/robots generation.

## Integration points

### GitHub

- Hosts the source repository.
- Serves as the public publication target for code.
- Provides outbound links to project repositories, docs, and related assets.

### Vercel

- Hosts preview and production deployments.
- Builds the Next.js application from the repository.
- Provides rollback support at the deployment level.

### Browser and `localStorage`

- Used for theme persistence.
- Stores `light`, `dark`, or `system` under `my-website-2026-theme`.
- A pre-paint initialization script resolves the effective theme before the React provider hydrates.
- `ThemeProvider` listens for system color-scheme changes while preference is `system`.
- Must degrade safely when browser storage is unavailable.

### External links

- GitHub
- LinkedIn
- Publication URLs and DOI links
- Resume file

## M8 About and Publications flow

Local profile, publication, and resume records feed pure adapters under `src/lib/content`.
The server-rendered `/about` route composes those view models and passes publications into
prop-driven components. There is no dynamic citation service, CMS, or PDF generator.

## M9 gallery flow

`src/content/gallery.ts` feeds server-safe adapters that validate metadata and local public-file
existence. `/work` requests the `work` placement and passes the view model into prop-driven
components. Next Image owns responsive optimization; there is no upload or lightbox layer.

## M10 writing and contact flow

`/writing` consumes the local writing index adapter and renders published records or an empty
state. `/contact` composes profile context, contact copy, and existing links through a contact
adapter. Both routes are static/server-rendered and include no CMS, MDX, form backend, or API.

## M11 SEO flow

`src/lib/seo` owns URL normalization, route metadata, social-preview resolution, and JSON-LD.
Routes export registry metadata; sitemap and robots reuse the same URL helpers. Link validation
remains offline by default.

## M12 visual layer

Semantic tokens remain in `src/styles/tokens.css` and dark overrides in `theme.css`.
`utilities.css` owns reusable premium surfaces, section rhythm, decorative motifs, interaction
states, and reduced-motion overrides. Components consume those utilities without new content.
- Project docs and demos
- Product references for the `my-dev-kit Ecosystem`

### Search engines and social platforms

- Consume sitemap and robots outputs.
- Consume page metadata, canonical URLs, Open Graph data, and Twitter/X cards.
- Consume structured data where provided.

## Architectural invariants

### Content invariants

- Website-owned content lives in `src/content`.
- The repository must not depend on a separate npm content package.
- The project remains a single website repository, not a monorepo.
- Every list-rendered item must have a stable `id` or `slug`.
- Required content failures must be visible during validation or build-time review.

### Roadmap invariants

- Roadmap text is maintained once in `src/content/roadmaps.ts`.
- No page should maintain a second handwritten copy of roadmap milestones or statuses.
- Roadmap statuses must come from the approved status set.
- Roadmap UI must communicate status with text, not color alone.
- Roadmaps should render like a premium product strategy dashboard, not a markdown dump or Jira board.

### Design and theming invariants

- Theme styling is driven by design tokens and CSS variables.
- Light mode uses soft grey surfaces, not pure white.
- Dark mode uses charcoal grey surfaces, not pure black.
- Theme controls must be accessible and keyboard operable.
- Navigation, cards, and roadmap surfaces must remain readable in both themes.

### Accessibility invariants

- Navigation must be keyboard accessible.
- Interactive controls must have visible focus states.
- Images need meaningful `alt` text when informative and must be hidden from assistive tech when decorative.
- Layout and content hierarchy must preserve semantic headings and landmark structure.

### SEO and route invariants

- Public pages must have unique metadata.
- Canonical URLs should be derived through shared helpers.
- Sitemap and robots generation must stay aligned with the public route set.
- Open Graph and Twitter/X card assets should come from maintained local assets.

### Performance invariants

- Prefer static/server rendering for stable content.
- Avoid runtime content fetching for critical page content.
- Avoid large client-side dependencies for visuals.
- Avoid heavy WebGL, particle engines, cursor gimmicks, or game-like rendering systems in v1.

## Out-of-scope architecture for v1

The following are intentionally excluded from the v1 architecture unless explicitly added later:

- Separate backend service or API layer
- CMS integration
- Separate npm content package
- Monorepo split
- User accounts or authentication
- Payment or account workflows
- Heavy 3D or game-engine-style visuals
- Runtime GitHub content fetching for core site content

## Review checklist

When changing architecture, verify:

- The dependency direction still holds.
- New content still lives under `src/content`.
- Route-level metadata still uses shared SEO helpers.
- `my-dev-kit`, `my-dev-kit-orchestrator`, and `my-dev-kit-lab` still present as one product family.
- No roadmap copy has leaked into page-specific hardcoded strings.
# M7 homepage composition

The homepage is a server-rendered route composition. `getHomepageViewModel()` is the single join
point over local content adapters. Section components accept props and do not import project,
product, or roadmap source records. This preserves the existing downward dependency direction:
content and types -> adapters -> feature components -> route.
