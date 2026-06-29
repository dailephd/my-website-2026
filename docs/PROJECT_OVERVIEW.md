# [PROJECT-OVERVIEW] my-website-2026 — Project Overview

<!-- section-id: project-identity-project-identity -->

## [PROJECT-IDENTITY] Project Identity

**Name:** `my-website-2026`
**Slug:** `my-website-2026`
**Domain:** `personal-website-product-lab`
**Version:** `0.1.0`

**Repository location:** `Z:\Users\newuser\Projects\my-website-2026`

**Publication target:** GitHub

**Deployment target:** Vercel

<!-- section-id: purpose-purpose -->

## [PURPOSE] Purpose

`my-website-2026` is Dai Le's new personal website, portfolio, and product-lab website. It presents Dai as a software developer, AI builder, PhD-trained scientist, and product-focused technical founder.

The website should showcase selected projects, product-lab work, roadmaps, publications, technical writing, resume/contact information, gallery/media assets, and selected work connected to dailephd LLC. The site should feel like a premium independent product lab with big-company polish, while remaining personal enough to clearly show that Dai is the technical founder and builder behind the work.

This repository replaces the previous personal website implementation with a new design, structure, and content model. The previous website may be used as a source for personal information, gallery assets, GitHub links, publication links, and project descriptions, but its old visual design and component architecture should not be treated as the foundation for this project.

<!-- section-id: goals-goals -->

## [GOALS] Goals

* Build a modern, premium, dual-mode personal website using Next.js, React, TypeScript, and Tailwind CSS.
* Present Dai Le as a credible software developer, AI systems builder, scientific software developer, and product-minded technical founder.
* Make the website feel elegant, classy, modern, sophisticated, startup-like, and lightly game-inspired without becoming noisy or overdesigned.
* Support both light mode and dark mode.

  * Light mode must use soft grey surfaces, not pure white.
  * Dark mode must use charcoal grey surfaces, not pure black.
* Store website-owned content locally in the repository using structured files rather than duplicating content across pages.
* Display selected projects and product-lab work with strong visual hierarchy and clear proof of technical ability.
* Present `my-dev-kit`, `my-dev-kit-orchestrator`, and `my-dev-kit-lab` as one connected product ecosystem.
* Display selected project roadmaps from local structured content so roadmap text is updated once and reused across the site.
* Preserve useful information from the previous website, including gallery assets, GitHub links, publication links, project descriptions, resume/contact links, and personal background content.
* Optimize the site for SEO, link previews, professional credibility, accessibility, responsiveness, and performance.
* Publish the source code on GitHub and deploy the production site on Vercel.

<!-- section-id: non-goals-non-goals -->

## [NON-GOALS] Non-Goals

* Do not create a separate npm content package for the website content.
* Do not maintain separate personal and company websites.
* Do not copy the old website's design, layout, or component architecture.
* Do not duplicate roadmap text manually across multiple pages.
* Do not make the site depend on runtime fetching from GitHub for critical content.
* Do not use heavy WebGL, particle engines, cursor gimmicks, or large animation systems for the initial version.
* Do not make the website look like a student portfolio, cheap freelancer site, generic SaaS template, crypto landing page, or noisy cyberpunk demo.
* Do not overstate product maturity or claim that in-development projects are finished products.
* Do not hide important actions behind unclear UI.
* Do not sacrifice accessibility, SEO, mobile layout, or performance for visual effects.

<!-- section-id: key-concepts-key-concepts -->

## [KEY-CONCEPTS] Key Concepts

| Term                              | Meaning                                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Personal Website`                | The main public website for Dai Le's identity, selected work, publications, resume/contact information, writing, and project/product showcase.                                                   |
| `Product Lab`                     | A section of the site that presents selected software products, tools, and in-development systems with product-style clarity.                                                                    |
| `Premium Independent Product Lab` | The intended brand impression: polished enough to feel like a serious technical company, but clearly led by one technical founder.                                                               |
| `Selected Work`                   | Curated projects shown as evidence of technical ability, product taste, scientific computing background, and software development skill.                                                         |
| `Local Content Source`            | Structured content files inside this repo, such as `src/content/projects.ts`, `src/content/roadmaps.ts`, and `src/content/publications.ts`. These files are the website's local source of truth. |
| `Roadmap`                         | Structured project or product direction data rendered into roadmap UI components. Roadmaps should be updated once in local content files and reused wherever displayed.                          |
| `my-dev-kit Ecosystem`            | A connected product family consisting of `my-dev-kit`, `my-dev-kit-orchestrator`, and `my-dev-kit-lab`.                                                                                          |
| `Codebase Intelligence`           | The role of `my-dev-kit`: repository inspection, graph-guided retrieval, source/document indexing, and context preparation.                                                                      |
| `Workflow Orchestration`          | The role of `my-dev-kit-orchestrator`: workflow discipline, staged implementation control, and prompt/process coordination.                                                                      |
| `Validation Lab`                  | The role of `my-dev-kit-lab`: evaluation, testing, reporting, release checks, and validation of development workflows.                                                                           |
| `Legacy Website Content`          | Useful content from the previous website repo, including gallery assets, links, descriptions, and publication information. Legacy code/design should not be reused unless explicitly reviewed.   |
| `Dual-Mode Theme`                 | The site's light and dark mode system based on CSS variables, Tailwind, persistent user preference, and accessible theme controls.                                                               |
| `Roadmap UI`                      | Premium visual components that render roadmap content using cards, status badges, progress rails, phase sections, updated-date labels, and responsive layouts.                                   |
| `SEO Metadata`                    | Page-specific titles, descriptions, canonical URLs, Open Graph data, Twitter/X cards, structured data, sitemap, and robots configuration.                                                        |
| `Vercel Deployment`               | The production deployment target for the website. The site should build cleanly and deploy through Vercel from the GitHub repository.                                                            |

<!-- section-id: stakeholders-stakeholders -->

## [STAKEHOLDERS] Stakeholders

* **Dai Le:** Owner, developer, designer, content author, and technical founder represented by the website.
* **Hiring managers and recruiters:** Visitors evaluating Dai's technical credibility, project depth, and professional background.
* **Software engineering, AI, data science, and research software teams:** Visitors assessing project relevance, engineering skill, and scientific/technical fit.
* **Potential collaborators:** Visitors interested in projects, tools, writing, research background, or future product work.
* **Open-source users:** Visitors who may inspect GitHub repositories, documentation, package links, and project roadmaps.
* **Potential customers or product contacts:** Visitors evaluating dailephd LLC-related tools, product-lab work, or custom computing services.
* **Academic researchers:** Visitors interested in Dai's publications, biological sciences background, and scientific software work.
* **Coding agents and design agents:** Tools used to implement, refactor, test, or maintain the website according to project documentation.

<!-- section-id: scope-scope-and-boundaries -->

## [SCOPE] Scope and Boundaries

**In scope:**

* One GitHub repository named `my-website-2026`.
* One deployable Next.js website hosted on Vercel.
* Local structured content files for profile, projects, products, roadmaps, publications, gallery metadata, links, writing metadata, and resume metadata.
* Migration of selected useful content from the previous website repo.
* A premium light/dark visual design system using Tailwind CSS and CSS variables.
* Homepage, Work page, Products/Product Lab page, my-dev-kit Ecosystem page, About page, Writing page, Contact page, and supporting pages as needed.
* Project cards, product cards, roadmap components, publication cards, gallery/media components, CTA panels, navigation, footer, and theme toggle.
* SEO metadata, Open Graph previews, sitemap, robots file, and structured data where appropriate.
* Responsive behavior across mobile, tablet, laptop, and desktop widths.
* Accessibility requirements including semantic HTML, visible focus states, keyboard navigation, reduced-motion support, and accessible labels.
* Performance optimization for images, fonts, animations, static rendering, and production builds.

**Out of scope:**

* Separate npm package for website content.
* Separate company website.
* CMS integration.
* Runtime content fetching from GitHub for core site content.
* User accounts, dashboards, authentication, or private admin features.
* Blog CMS or complex writing platform in the first version.
* Payment processing, ecommerce, or customer account management.
* Heavy interactive 3D, WebGL, particle effects, or game-engine-like visuals.
* Autonomous coding-agent workflow inside this website.
* Reusing the previous website as the implementation foundation.
# M7 implementation note

The homepage product-lab narrative is complete locally. It combines identity, featured work, the
Product Lab, roadmap direction, technical focus, research credibility, and contact paths while
leaving full About/Publications, Gallery, Writing/Contact, SEO, and final visual polish to their
own milestones.

# M8 implementation note

The About and Publications feature is complete locally. It uses structured profile, publication,
and resume content. No complete citation is currently verified, and the placeholder resume asset
is not valid, so the UI exposes an honest publication empty state and no broken download.

# M9 implementation note

The Gallery and Media Showcase system is complete locally and integrated into `/work`. No genuine
media files are available, so metadata remains empty and the page shows a safe state without
broken image requests.

# M10 implementation note

Writing and Contact are complete locally. Writing uses a verified-empty index; Contact derives
safe Work, Products, and About pathways and clearly states that no public email is listed.

# M11 implementation note

SEO and link previews are complete locally for all seven public routes, including canonicals,
social metadata, structured data, sitemap, robots, and offline link validation.

# M12 implementation note

Premium visual polish is complete locally across the shell, homepage, feature cards, roadmap,
supporting routes, and intentional empty states, with CSS-only motifs and reduced-motion safety.
