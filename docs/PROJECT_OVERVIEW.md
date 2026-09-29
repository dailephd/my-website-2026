# Project Overview

## Identity

- **Name:** `my-website-2026`
- **Repository location:** `Z:\Users\newuser\Projects\my-website-2026`
- **Publication target:** GitHub
- **Deployment target:** Vercel

## Purpose

`my-website-2026` is the website for **dailephd LLC**, a business providing custom computing
services across software, data, and AI. The site's primary framing is the business and its
technical project work; Dai Le's personal professional and research background is presented
**primarily on `/about`**, not as the homepage's leading identity.

The site presents:

- The `my-dev-kit` product ecosystem (`my-dev-kit`, `my-dev-kit-orchestrator`,
  `my-frontend-observer`, `my-dev-kit-lab`)
  as one connected product family.
- Current and archived technical projects.
- Verified publications (no invented or placeholder citation data).
- A working contact channel (form + professional profile links).
- Dai Le's software, AI-evaluation, and biological-science background on `/about`.

This is **not** a personal-website-first framing from earlier milestones. Documentation, copy,
and navigation should consistently reflect the dailephd LLC business identity as primary, with
Dai Le as founder/technical lead detailed on the About page.

## Structural rules

- Single Next.js website repository — not a monorepo, no `apps/`/`packages/` split.
- All content is local and typed under `src/content`, validated by `scripts/validate-content.mjs`
  and `scripts/validate-links.mjs`. No external CMS.
- No backend beyond the minimal `/api/contact` route used for the contact form's email delivery.
  There is no database, no Python service, and no additional backend surface.
- Deployment target is Vercel; this repository's tooling does not perform deployment, push, or
  publication — those remain explicit, separate, manual steps.

## Site structure

| Area | Route(s) | Purpose |
|---|---|---|
| Home | `/` | Business identity, featured technical work, technical focus, background/credibility |
| Projects | `/projects`, `/projects/my-dev-kit` | Current + archived technical projects; my-dev-kit ecosystem relationship diagram, per-product links, and version roadmaps |
| Publications | `/publications` | Verified publication records only |
| About | `/about` | Dai Le's professional background, research background, education |
| Contact | `/contact` | Contact form (email via Resend) + professional profile links (GitHub, LinkedIn) |

Removed routes (`/work`, `/products`, `/products/my-dev-kit`, `/writing`) are documented in
`README.md` and `docs/ARCHITECTURE.md`. `/work` is kept only as a permanent redirect to
`/projects` for link continuity; the others have no route at all.

## What this project intentionally does not have

- No CMS, headless or otherwise.
- No database or ORM.
- No Python or other secondary-language service.
- No monorepo tooling, workspaces, or `apps/`/`packages/` split.
- No deployment automation beyond the Vercel GitHub integration (manual, out of scope for local
  tooling).

## See also

- `docs/ARCHITECTURE.md` — system layers and the architecture diagram
- `docs/DOMAIN_MODEL.md` — content/domain types
- `docs/CONTRACT.md` — behavioral contracts
- `docs/WORKFLOWS.md` — day-to-day and release workflows
- `docs/DESIGN.md` — visual design system (unchanged by this documentation pass)
