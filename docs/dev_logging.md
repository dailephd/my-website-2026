# Development Logging

## 2026-06-29 — M7 Homepage Product-Lab Narrative

- Added typed homepage-only copy and a deterministic aggregate view model.
- Composed seven prop-driven sections from profile, link, project, product, and roadmap adapters.
- Kept placeholder publication records off the homepage; credibility uses verified background
  copy until M8.
- Added adapter/static-contract tests and Playwright coverage for narrative, routes, dark mode,
  and 390 px overflow.
- Kept `milestones.json` unchanged because its schema has no status field.

## 2026-06-29 — M12 Premium Visual Polish

- Refined tokens, dimensional surfaces, glows, borders, shadows, and radii.
- Added CSS-only atmosphere, shell depth, section rhythm, and restrained interactions.
- Polished projects, products, roadmap, publications, gallery, writing, and contact.
- Verified light desktop and dark 390 px views and added visual contract tests.
- Added no dependencies, binary assets, fake content, animation loops, WebGL, or particles.
- Kept `milestones.json` unchanged because its schema has no status field.

## 2026-06-29 — M11 SEO and Link Preview System

- Centralized metadata for all seven public routes.
- Added safe site URLs, canonicals, Open Graph/Twitter cards, JSON-LD, sitemap, and robots.
- Omitted the existing 1×1 OG placeholders and documented 1200×630 replacements.
- Extended offline link validation and added unit and browser metadata coverage.
- Kept `milestones.json` unchanged because its schema has no status field.

## 2026-06-29 — M10 Writing and Contact

- Added a verified-empty writing index with constrained public filtering.
- Added structured contact copy and derived Work, Products, and About pathways.
- Added Writing and Contact pages, components, validation, unit tests, and E2E tests.
- Added no email, contact form, CMS, MDX engine, or backend submission workflow.
- Kept `milestones.json` unchanged because its schema has no status field.

## 2026-06-29 — M9 Gallery and Media Showcase

- Replaced the nonexistent gallery placeholder with a verified-empty collection.
- Added local-file validation, optimized Next Image components, and `/work` integration.
- Added unit, render, desktop, and mobile dark-mode tests.
- Added asset conventions without committing fake or unoptimized binary media.
- Kept `milestones.json` unchanged because its schema has no status field.

## 2026-06-29 — M8 About and Publications

- Added typed profile background, publication, and resume contracts and adapters.
- Removed the fake publication record and use a verified-empty state.
- Kept the invalid placeholder resume unavailable, preventing a broken CTA.
- Implemented `/about`, publication components, homepage consistency, unit tests, and E2E tests.
- Kept `milestones.json` unchanged because its schema has no status field.
- Git reporting remains unavailable because this working copy has no `.git` directory.

## 2026-06-28 — M1 Content-Powered Website Shell

- Replaced placeholder profile and links with typed local M1 records.
- Added profile and link adapters with required-field validation and deterministic ordering.
- Wired the root shell, homepage hero, navigation, and footer to adapter data.
- Reduced later-feature routes to explicit planned placeholders.
- Added unit coverage for M1 adapters and Playwright smoke coverage for homepage identity and navigation.
- Kept the existing `milestones.json` schema unchanged; M1 completion is recorded in `PROJECT_PLAN.md` and `ROADMAP.md`.

## Known follow-up

- Later content scaffold validation still reports TODO-level gaps for project, roadmap, publication, and gallery IDs.
- Git branch/status reporting is unavailable until this directory is initialized as a Git repository.

## 2026-06-28 — M2 Dual-Mode Premium Theme

- Added typed `light`, `dark`, and `system` preferences with light/dark effective resolution.
- Added semantic soft-grey and charcoal token sets.
- Added pre-paint initialization, safe persistence, and system preference listeners.
- Wired the accessible three-state control into the M1 header.
- Converted active M1 shell components and primitives to semantic tokens.
- Added theme unit tests, browser persistence checks, exact palette checks, stable-control geometry,
  and a 390 px smoke test.
- Kept `milestones.json` unchanged because its schema has no status field.

## 2026-06-28 — M5 Roadmap Data Model and Renderer

- Added one structured ecosystem roadmap with three lanes and six phases.
- Added all six textual statuses, nested stable IDs, deterministic ordering, and preview derivation.
- Replaced roadmap placeholders with a static strategy-dashboard component system.
- Wired the full roadmap into `/products/my-dev-kit`.
- Implemented but did not homepage-wire the compact preview.
- Added unit and dark-mode mobile browser coverage.

## 2026-06-28 — M6 Product Lab Index

- Added featured my-dev-kit, experimental BioLit, and website/product-lab index entries.
- Added product index/card view models and roadmap-slug resolution.
- Reused the M5 roadmap preview inside the featured product card.
- Implemented `/products` while leaving the homepage narrative unchanged.
- Added unit and dark-mode mobile browser coverage.

## M2 follow-up

- M3 should reuse the token system for selected-work cards.
- The existing Next.js dev server emits a future `allowedDevOrigins` warning during Playwright runs.

## 2026-06-28 — M3 Selected Work Index

- Replaced the single project placeholder with five curated local project records.
- Added constrained project status, category, and link contracts.
- Added deterministic featured-first adapters, lookups, category filtering, and duplicate checks.
- Implemented tokenized project cards, optional link lists, responsive grids, and `/work`.
- Added project adapter tests and Playwright coverage for content, links, dark mode, and 390 px layout.
- Kept the homepage preview unwired because the current homepage remains the M1 hero-only composition.
- Kept `milestones.json` unchanged because its schema has no status field.

## M3 follow-up

- M4 should unify the three `my-dev-kit` projects as one ecosystem on its product page.
- Exact repository links for projects other than the published `my-dev-kit` npm package remain
  omitted until verified.

## 2026-06-28 — M4 my-dev-kit Ecosystem Overview

- Added one typed product family with three ordered ecosystem modules.
- Added validated statuses, stages, semantic roles, priorities, and optional links.
- Implemented the family hero, text-equivalent ecosystem flow, module cards, and route.
- Kept `/products` as a minimal link surface; the full index remains M6.
- Added unit and browser coverage, including dark-mode mobile overflow checks.
- Did not implement or wire roadmap UI.
- Kept `milestones.json` unchanged because its schema has no status field.
