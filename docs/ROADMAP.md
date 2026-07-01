# Roadmap

## Purpose

This document is the forward-looking project roadmap narrative for `my-website-2026`. It summarizes direction, delivery phases, milestone intent, and explicit v1 boundaries. It complements `docs/milestones.json` rather than replacing it.

## Product direction

`my-website-2026` moves from an initial scaffold to a public v1 personal website and product-lab site for Dai Le.

The direction is to:

- build the new website from skeleton to polished public v1
- keep website-owned content local and structured under `src/content`
- present selected projects and product-lab work with clear technical credibility
- present the `my-dev-kit Ecosystem` as one connected product family
- add premium roadmap UI backed by structured roadmap data
- publish the code to GitHub and deploy the site to Vercel

## Delivery principles

### Vertical milestone principle

Each milestone should implement one complete vertical feature from local content and types through UI wiring, tests, and docs.

### Content-first principle

Content contracts and structured local records should lead the build. Pages should consume content; they should not become duplicated content stores.

### Quality principle

The site should feel like an intentional premium product from early milestones onward, even before visual polish is complete.

## Phased roadmap

### Phase 1: Foundation

Focus:

- establish repository structure
- establish docs and project rules
- establish app shell and route skeleton
- establish local content ownership

Milestones:

- `M1 — Content-Powered Website Shell`

Desired outcome:

- the repo builds
- the homepage already reads from local structured content
- the shell looks like the beginning of the final site rather than a throwaway prototype

### Phase 2: Content and theme

Focus:

- implement the dual-mode premium theme
- formalize design tokens and theme persistence
- strengthen the shared shell

Milestones:

- `M2 — Dual-Mode Premium Theme`

Desired outcome:

- the visual foundation is real and user-facing
- theme behavior is accessible, persistent, and aligned with the soft-grey/charcoal design rule

### Phase 3: Work, products, and `my-dev-kit Ecosystem`

Focus:

- ship the selected work index
- ship the product lab index
- establish the `my-dev-kit Ecosystem` as one connected family

Milestones:

- `M3 — Selected Work Index`
- `M4 — my-dev-kit Ecosystem Overview`
- `M6 — Product Lab Index`

Desired outcome:

- visitors can understand both Dai’s selected work and the product-lab direction quickly
- the ecosystem page makes the connected product story obvious

### Phase 4: Roadmap UI

Focus:

- define roadmap contracts and structured data
- build premium roadmap rendering
- reuse the same roadmap data across routes

Milestones:

- `M5 — Roadmap Data Model and Renderer`

Desired outcome:

- roadmap content lives once in `src/content/roadmaps.ts`
- roadmap UI feels like a premium product strategy dashboard, not a markdown list

### Phase 5: Homepage, about, gallery, writing, and contact

Focus:

- shape the public narrative
- support credibility and discoverability
- round out the core public routes

Milestones:

- `M7 — Homepage Product-Lab Narrative`
- `M8 — About and Publications`
- `M9 — Gallery and Media Showcase`
- `M10 — Writing and Contact`

Desired outcome:

- the site explains who Dai is, what he builds, and why the work is credible
- the non-work/product routes feel intentional, not secondary

### Phase 6: SEO

Focus:

- route-level metadata
- structured data
- link previews
- sitemap and robots

Milestones:

- `M11 — SEO and Link Preview System`

Desired outcome:

- every public page previews well and has coherent metadata
- search and social ingestion quality supports the brand impression

### Phase 7: Visual polish

Focus:

- add controlled premium surface treatment
- improve motion, hover, and background nuance
- enhance visual confidence without weakening content

Milestones:

- `M12 — Premium Visual Polish`

Desired outcome:

- the site feels more premium and product-like without becoming noisy or overanimated

### Phase 8: Accessibility, performance, and release readiness

Focus:

- harden responsive behavior
- improve accessibility and consistency
- prepare for public release quality

Milestones:

- `M13 — Responsive and Accessibility Hardening`
- `M14 — Performance and Release Readiness`

Desired outcome:

- the site behaves consistently across viewports and themes
- the site is ready for public Vercel deployment as v1

## Strategic narrative by area

### Identity and credibility

The website should evolve toward a strong first-impression identity layer that establishes Dai as:

- software developer
- AI builder
- PhD-trained scientist
- product-focused technical founder

### Product-lab story

The product-lab story should become one of the most distinctive parts of the website, especially through:

- the products index
- the `my-dev-kit Ecosystem` page
- roadmap previews and roadmap detail rendering

### Roadmap strategy

Roadmaps are not an add-on. They are part of the product credibility model. They should show structured thinking, technical direction, and maturity without pretending unfinished work is complete.

## v1 boundaries

The v1 roadmap explicitly does not include:

- CMS integration
- separate npm content package
- separate personal and company websites
- user accounts
- backend services
- payment processing
- customer account workflows
- heavy 3D or game-style visual systems
- heavy WebGL or particle effects

## Risks and watchpoints

Primary watchpoints:

- allowing hardcoded page copy to drift away from structured content
- letting roadmap text get duplicated across pages
- visually overdesigning the site before content and hierarchy are stable
- letting the ecosystem story fragment into separate repo cards
- sacrificing accessibility or performance for polish

## Roadmap governance

When adding or changing milestones, preserve these rules:

- milestones should remain vertically scoped
- content stays local under `src/content`
- the site remains a single Next.js repo
- roadmaps remain structured content rendered by reusable UI
- the ecosystem story remains unified

## Current recommended execution order

1. M1 is complete locally with real structured-content-driven shell behavior.
2. M2 is complete locally with persisted dual-mode theme behavior.
3. M3 and M4 are complete locally; the selected-work and ecosystem narratives are established.
4. M5 through M7 are complete locally; the homepage now composes the existing content adapters.
5. M8 through M10 are complete locally; the supporting public routes are in place.
6. M11 metadata quality is complete locally.
7. M12 premium visual polish is complete locally.
8. M13 responsive and accessibility hardening is complete locally.
9. M14 performance and release readiness is complete locally.

## Post-M14 status

The planned M1–M14 implementation milestone sequence is complete. The website builds cleanly,
passes all validation gates, and is ready for the following separate deployment workflow:

1. Review final git diff for the M13 and M14 feature branch.
2. Commit staged changes.
3. Open a pull request to `main`.
4. Push to GitHub after review.
5. Configure Vercel project and set `NEXT_PUBLIC_SITE_URL` to the production domain.
6. Deploy a Vercel preview and verify all seven public routes.
7. Promote to production when preview looks correct.
8. Add real 1200×630 OG images to `public/images/og/` and replace the placeholder resume PDF.

These steps are not part of the M14 milestone and have not been performed.
