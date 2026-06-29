# Workflows

## Purpose

This document describes the expected implementation, validation, documentation, and deployment workflows for `my-website-2026`.

## Repository workflow model

- Single Next.js website repo
- Local structured content under `src/content`
- GitHub for source publication and pull-request review
- Vercel for preview and production deployment
- Docker for optional local production preview

## Normal feature workflow

1. Create or switch to a feature branch.
2. Run `npm install`.
3. Run `npm run dev`.
4. Implement scoped changes.
5. Run:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run validate:content`
   - `npm run validate:links`
   - `npm run test`
   - `npm run build`
6. Open a pull request.
7. Let GitHub Actions and Vercel preview validate the branch.

## Documentation workflow

Rules:

- use `docs/`, not `doc/`
- keep project-level docs aligned with the codebase shape
- keep roadmap source-of-truth rules aligned with `src/content/roadmaps.ts`
- do not document this repo as a monorepo or multi-service system

## Content workflow

Rules:

- website-owned content belongs in `src/content`
- route pages should consume structured content rather than duplicate it
- roadmap updates should be made in `src/content/roadmaps.ts`

### M1 profile and shell workflow

1. Edit identity and positioning copy in `src/content/profile.ts`.
2. Edit CTA, navigation, and footer link records in `src/content/links.ts`.
3. Keep stable IDs and update `displayPriority` to change ordering.
4. Consume records through the accessors in `src/lib/content`.
5. Run `npm run validate:content`, `npm run test`, and `npm run build`.

Do not duplicate profile identity in route components. External URLs should be added only after verification.

### M2 theme validation workflow

1. Change palette values only in `src/styles/tokens.css` or `src/styles/theme.css`.
2. Keep component styles tied to semantic variables.
3. Run `npm run lint` to reject pure white or pure black main backgrounds.
4. Run `npm run test` for theme resolution contracts.
5. Run `npm run test:e2e` for switching, persistence, and mobile smoke coverage.
6. Run `npm run build`.

### M3 project-content workflow

1. Edit selected-work records only in `src/content/projects.ts`.
2. Keep IDs and slugs stable; use constrained status/category/link values.
3. Omit unknown links rather than publishing placeholders.
4. Use `displayPriority` for deterministic order and `featured` for visual priority.
5. Consume project collections through `src/lib/content/get-projects.ts`.
6. Run `npm run validate:content`, `npm run test`, `npm run test:e2e`, and `npm run build`.

### M4 product-family workflow

1. Edit ecosystem content only in `src/content/products.ts`.
2. Preserve stable family/module IDs, slugs, role labels, and display priorities.
3. Omit unknown links and keep maturity claims conservative.
4. Consume data through `src/lib/content/get-products.ts`.
5. Keep roadmap data and UI out of product-family content.
6. Run content, unit, browser, and production-build checks.

### M5 roadmap workflow

1. Edit roadmap direction only in `src/content/roadmaps.ts`.
2. Preserve stable nested IDs and allowed textual statuses.
3. Use display priorities instead of relying on source order.
4. Consume full and preview data through `src/lib/content/get-roadmaps.ts`.
5. Run content validation, unit tests, browser tests, and the production build.

### M6 product-index workflow

1. Edit concise index entries in `productIndex` inside `src/content/products.ts`.
2. Keep family detail content separate from index-card copy.
3. Relate roadmap-enabled products with `roadmapSlug`; never copy roadmap milestones.
4. Omit unverified links and preserve honest maturity labels.
5. Validate adapters, browser behavior, and production build.

## Docker workflow

### M7 homepage-content workflow

1. Edit homepage-only copy and technical focus in `src/content/home.ts`.
2. Edit identity, links, projects, products, and roadmaps only in their owning modules.
3. Adjust preview selection in `src/lib/content/get-homepage.ts`; keep arrays out of the route.
4. Keep sections prop-driven and preserve graceful empty states.
5. Run typecheck, lint, content validation, unit tests, Playwright, and the production build.

Commands:

- `npm run docker:ready`
- `npm run dev:docker`
- `npm run dev:docker:down`

Purpose:

- local production-style preview of the website only

## Deployment workflow

- pull requests: GitHub Actions checks plus Vercel preview
- `main`: stable deployable branch for Vercel production

## Release workflow

Run:

- `npm run ci`
- `npm run check:release`

Then confirm:

- docs are aligned
- no obsolete multi-service references remain
- route/build/content validation passes

## About and publication content workflow

1. Edit verified background records in `src/content/profile.ts`.
2. Add complete citations only in `src/content/publications.ts`.
3. Replace `public/files/resume.pdf` with a valid current PDF before setting resume availability.
4. Run typecheck, content validation, unit tests, E2E tests, and build.

## Gallery and media workflow

1. Add an optimized AVIF, WebP, or PNG under the matching `public/images` folder.
2. Record its local path, intrinsic dimensions, caption, and alt policy in `gallery.ts`.
3. Associate it with a project, product, category, or placement only when verified.
4. Run content validation; missing local files fail validation.

## Writing and contact workflow

1. Add only real published writing or verified external destinations to `writing.ts`.
2. Keep draft and planned records non-public.
3. Edit contact framing in `contact.ts`; edit shared destinations only in `links.ts`.
4. Never add a form endpoint or visible email without an intentional verified source.

## SEO and link-preview workflow

1. Edit route metadata in `src/lib/seo/metadata.ts`.
2. Configure `NEXT_PUBLIC_SITE_URL` for production canonicals.
3. Replace preview placeholders with compressed 1200×630 PNG files.
4. Run `npm run validate:links`, tests, and build.

## Visual QA workflow

1. Change semantic tokens or reusable utilities before component-specific styles.
2. Inspect light desktop and dark mobile views in a real browser.
3. Verify focus, reduced motion, overflow, content truth, and lack of animation loops.
4. Run lint, tests, and build.
