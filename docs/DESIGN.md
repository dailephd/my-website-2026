# Design

## Purpose

This document is the visual design authority for `my-website-2026`. It defines the visual identity, thematic rules, layout principles, roadmap presentation style, accessibility expectations, and visual constraints that should guide all implementation work.

## Design intent

`my-website-2026` should feel like a premium independent product lab: polished enough to signal serious engineering quality, but still unmistakably owned and built by one technical founder.

The design must communicate all of the following at once:

- Dai Le is a capable software developer.
- Dai Le builds AI and technical products.
- Dai Le has a scientific and research background.
- The work is curated, intentional, and product-minded.
- The website is personal, but not casual or amateur.

## Brand position

### Required impression

- Premium independent product lab
- Big-company polish
- Personal technical founder ownership
- Elegant, classy, modern, sophisticated, startup-like
- Lightly game-inspired only in restraint, structure, and confidence

### Forbidden impression

- No noisy cyberpunk
- No crypto landing-page energy
- No cheap freelancer portfolio feeling
- No student portfolio vibe
- No generic SaaS-template look
- No visual gimmickry standing in for substance

## Structural design decisions

### Single website repository

This project is one website, not a split personal site plus company site. The visual system must unify identity, selected work, product-lab work, roadmaps, publications, writing, and contact into one coherent experience.

### Local structured content

Content lives in `src/content`, not in a separate npm content package. This means layout and component patterns should assume content is close to the application and validated locally.

### Structured roadmap content

Roadmaps are structured data, not copied markdown. The design must support rich roadmap rendering from reusable UI components.

### `my-dev-kit Ecosystem` product family

`my-dev-kit`, `my-dev-kit-orchestrator`, `my-frontend-observer`, and `my-dev-kit-lab` must read visually as one connected ecosystem with distinct responsibilities.

## Core visual system

The site has six selectable color palettes and three color modes. Palette and mode are the only
appearance preferences. All six palettes share the same page structure, content, routes, typography
hierarchy, and accessible controls.

### Six-palette appearance system

`ThemeProvider` owns the selected palette and color mode. `theme-script.tsx` applies them before first
paint, with the same validated values as `src/lib/theme.ts`. The server fallback is Mineral Research
in light mode. Palette and mode persist in `my-website-2026-palette` and `my-website-2026-theme`.
Unavailable storage falls back to Mineral and system mode for the session. The system mode follows
operating-system color preference. No special-effects preference exists.

| ID | Display name | Character |
| --- | --- | --- |
| `mineral` (default) | Mineral Research | Scientific, warm, calm, architectural |
| `oxblood` | Oxblood Atelier | Editorial, intimate, crafted |
| `signal` | Signal Green | Instrumental, precise, research-oriented |
| `cobalt` | Cobalt & Terracotta | Technical, confident, geometric |
| `amber` | Amber & Graphite | Warm, measured, scholarly |
| `original` | Violet & Graphite | Graphite surfaces, violet emphasis, cyan data accents |

The `original` identifier is an internal persistence contract. The public palette name is **Violet &
Graphite**. Its graphite surfaces, violet accent, cyan data/system accents, violet-led and cyan
atmospheric balance, violet logo stroke, violet primary-action hover, and cyan hero eyebrow are
preserved as static styling. It remains optional; Mineral Research is the default.

### Twelve effective color schemes and token architecture

Each palette has light and dark colors. Brand anchors are defined in `tokens.css` (Mineral light),
`theme.css` (Mineral dark), and `palettes.css` (the other five palettes). Shared material treatments,
static atmospheric gradients, typography accents, and interaction feedback live in `utilities.css`.
`diagrams.css` remains the central owner of diagram styling and topology stays with its components.

Semantic roles include background, surfaces, text, borders, primary and secondary accents, focus,
selection, atmospheric glows, and shadows. Primary accents carry links, data/system emphasis, and
focus; secondary accents carry control/orchestration and ornament roles. Hue may vary per palette
without changing semantic meaning. Compatibility aliases for historical cyan/violet token names
remain documented in `tokens.css`; new code uses semantic names.

The twelve palette/mode combinations retain their static colors, material styling, card treatments,
hover/focus feedback, diagram colors, and restrained gradients. Reduced-motion support remains for
ordinary UI transitions and hover interactions. There is no palette animation system, decorative
animation artwork, or effects setting.

### Appearance control

The shared header's **Appearance** button opens a keyboard-operable dialog with two native radio
fieldsets: Palette and Color mode. Escape, Close, outside press, or focus leaving closes the dialog;
focus returns to the trigger. It fits mobile viewports. No third preference or effects fieldset is
rendered.

### Accessibility and performance expectations

- WCAG AA for text and UI components in all twelve schemes; the historical Violet & Graphite values retain their documented, test-pinned exceptions. State is never conveyed by color alone.
- Focus ring (3px, `--color-focus-ring`) is visible in every scheme.
- No horizontal overflow at 360–1440px; decoration does not interfere with controls.
- Static rendering is preserved; client-side appearance code is limited to the control and preference provider.

### Light mode

Light schemes use warm or soft tinted paper tones, never pure white backgrounds, with clearly
separated surfaces, refined borders, and dark text with strong readability. Avoid pure white
full-page backgrounds, high-glare surfaces, and sterile clinical contrast.

### Dark mode

Dark schemes use deep tinted charcoal (green, plum, navy, graphite), never pure black, with layered
surfaces, legible borders, and high-contrast off-white text. Avoid pure black full-page backgrounds,
neon-on-black aesthetics, and overly saturated glow fields.

### Accent colors

Each palette supplies a primary and a secondary accent (see above); gold-style optional accents are
retired. Accent use must remain controlled, direct attention rather than dominate, and keep gradients
subtle and localized.

### Token authority

The production token sources are `tokens.css`, `theme.css`, and `palettes.css` as described above.
Components consume semantic variables and never embed mode- or palette-specific colors. The transition
duration is 180 ms for color, background, border, and shadow only, and reduced motion removes it.

## Surfaces and card design

### Surface model

The site should use solid premium cards with restrained separation from the background.

Required card qualities:

- Solid fills rather than transparent glassmorphism
- Defined edges or borders
- Soft shadowing or lift when appropriate
- High legibility in both themes

### Card types

Primary card families:

- Project cards
- Product cards
- Roadmap cards
- Publication cards
- Contact cards
- Gallery/media cards

Rules:

- Cards should feel deliberate and product-grade.
- Hover states should be subtle and confident.
- Motion should be small in amplitude and safe for reduced-motion users.

## Typography

### Tone

Typography should feel modern, technical, and calm.

Requirements:

- Strong headline hierarchy
- Clear section-level structure
- Readable body copy with comfortable line length
- Avoid overly playful or novelty typography

Desired effect:

- A landing page with strong product-company polish
- Supporting copy that still feels personal and direct

### Copy hierarchy

- Hero lines should communicate identity and positioning quickly.
- Section titles should be concise and declarative.
- Body copy should privilege clarity over ornament.
- Labels and statuses should support scanning.

## Layout principles

### Grid and spacing

- Layout should feel spacious, intentional, and stable.
- Use consistent horizontal rhythm across routes.
- Avoid cramped card layouts and over-dense content walls.
- Preserve strong alignment between section headers, cards, and CTAs.

### Responsive behavior

The site must remain coherent at mobile, tablet, laptop, and large desktop widths.

Rules:

- No unintended horizontal scrolling.
- Card layouts must stack cleanly on narrow screens.
- Roadmap components must remain readable on mobile.
- Decorative treatments may simplify on small screens.

### Navigation

Navigation must feel simple, premium, and dependable.

Requirements:

- Clear route labels
- Visible active or context cues when implemented
- Keyboard accessibility
- Theme toggle integrated without clutter

## Section design guidance

### Homepage

The homepage should establish identity within seconds.

It must communicate:

- who Dai is
- what Dai builds
- why the work is credible
- where to go next

The homepage should feel like the beginning of the final product, not a temporary scaffold.

### Work page

The work page should emphasize evidence of technical ability through curated project cards.

Design rules:

- Strong summary hierarchy
- Clear status and stack indicators
- Useful outbound links
- Featured work should be visually prioritized, not visually chaotic

### Products page

The products page should feel like a real product lab.

Design rules:

- Product-family hierarchy must be obvious
- Status must be honest
- Product CTAs must be clear
- Roadmap previews should enhance context, not overwhelm the page

### `my-dev-kit Ecosystem` page

This page is the clearest product-story page in the site.

It must visually express:

- `my-dev-kit` = static repository/codebase evidence
- `my-dev-kit-orchestrator` = workflow and lifecycle control
- `my-frontend-observer` = rendered browser/runtime evidence
- `my-dev-kit-lab` = optional assurance and evaluation

The core workflow includes an external human or coding agent that edits target source and an Observer correction loop. Orchestrator does not automatically run agents or other tools, Observer never edits source, and Lab is not mandatory for every edit. The diagram should show these explicit relationships and Lab's optional assurance lane.

### Technical diagrams and visualizations

Technical diagrams, architecture maps, workflow diagrams, timelines, system maps, node-link visualizations, and similar technical explainers use `DIAGRAM_DESIGN.md` as their diagram-specific visual authority.

Global website identity, typography, theme, accessibility, responsive behavior, motion, and performance remain governed by this file.

Implementation uses the shared diagram style layer in `src/styles/diagrams.css` and the established primitives in `src/components/diagrams/`.

### About page

The About page should support credibility without becoming autobiographical bloat.

Rules:

- Software-builder identity first
- Scientific background as credibility support
- Publications readable and structured
- Resume and contact actions easy to find

### M8 About and publication treatment

About leads with software identity, followed by technical-focus cards and supporting research
and education cards. Publication UI uses text badges, tokenized surfaces, optional metadata
rows, and a transparent verified-empty state rather than a fake citation.

### Writing page

If content is sparse, the empty state must still feel intentional and polished.

### Contact page

The contact page should be simple, direct, and professional.

Rules:

- easy-to-find email and professional links
- no cluttered form patterns in v1 unless intentionally added later

## Roadmap visual style

Roadmaps are a signature part of the site and must not look like plain markdown or a Jira export.

Required qualities:

- Premium product strategy dashboard feel
- Strong information hierarchy
- Clear phase/lane structure
- Readable status labels
- Desktop and mobile readability

Components should support:

- updated date labels
- status badges
- progress rails
- phase cards
- milestone lists
- preview and full-view variants

Rules:

- Status must be visible as text.
- Color supports meaning; it does not replace meaning.
- The roadmap should feel strategic, not bureaucratic.

## Project and product card style

### Project cards

Project cards should emphasize:

- title
- concise summary
- role
- stack credibility
- useful links

Visual tone:

- refined technical proof
- premium but restrained
- no inflated startup-marketing language

### Product cards

Product cards should emphasize:

- product family or product identity
- role in the ecosystem
- current status
- clear next action

Visual tone:

- product-lab clarity
- slightly more strategic than project cards
- enough polish to feel company-grade

## Gallery and media style

Gallery/media presentation should feel curated and clean.

Rules:

- Stable aspect ratios
- No distortion
- No layout shift
- Captions and alt text where useful
- Thumbnails before large assets when practical

Visual tone:

- editorial and product-oriented
- not a chaotic photo dump

## Motion and interaction feedback

Allowed:

- restrained glow
- subtle gradients
- small hover elevation or shift
- soft grid or dashboard motifs
- reduced-motion-safe transitions

Not allowed in v1:

- heavy WebGL
- particle engines
- intense cursor effects
- noisy animated backgrounds
- effect-heavy hero modules that weaken readability

Premium visuals should be added only after content and layout are stable.

## Accessibility rules

Design quality includes accessibility.

Requirements:

- visible focus states
- semantic structure and readable heading order
- sufficient contrast in both themes
- keyboard-usable navigation and controls
- reduced-motion support
- status not communicated by color alone
- image semantics handled correctly

Accessibility is not an optional cleanup pass; it is part of the intended product quality.

## M13 Responsive and Accessibility Hardening

M13 locks in the following design rules that were implemented across shared components, layout, and all public routes.

### Skip link

A "Skip to main content" link is the first focusable element in SiteShell. It is visually hidden by default and becomes visible on focus using the site's elevated surface, control radius, and focus ring token. It links to `#main-content` on the main element.

### Landmark expectations

- The header element wraps the sticky navigation bar.
- The main element has `id="main-content"` and receives focus when the skip link is activated.
- The footer element wraps the footer.
- Navigation landmarks use `aria-label` to distinguish primary and footer navigation.
- `aria-current="page"` is applied to the active route link via the NavLink client component.

### Heading expectations

- Every public route has exactly one h1 heading.
- Section headings follow h2 → h3 → h4 → h5 within their nesting level.
- In the roadmap feature: roadmap title is h2, lane titles are h3, phase titles are h4, milestone titles are h5.
- Contact cards inside a ContactPanel use h3 headings.
- Heading levels are not skipped.

### Focus state expectations

- Global `:focus-visible` applies a 3px outline using `--color-focus-ring` with 3px offset.
- Focus ring uses the active palette primary accent, verified at 3:1 or better in all ten schemes.
- All interactive elements (links, buttons, toggle) receive visible focus states without additional style overrides.

### Reduced-motion behavior

- `prefers-reduced-motion: reduce` removes `scroll-behavior` forced animation.
- All `theme-transition`, `premium-card-interactive`, and `premium-link` transitions are removed.
- The `body` background-color transition is removed.
- Decorative hover transforms (translateY) are removed.
- No motion-dependent content remains.

### Status label rules

- All status badges render text labels. Color is supporting, not the sole indicator.
- RoadmapStatusBadge renders: "Status: Shipped", "Status: Active", "Status: Planned", etc.
- ProductCard status renders: "Status: Active", "Status: In development", etc.
- ProjectCard status renders: "Active", "In development", etc.

### Image alt and decorative image rules

- Content images require non-empty alt text from the `alt` field in gallery metadata.
- Decorative images use empty alt text via the `item.decorative` flag.
- Decorative non-image visual elements use `aria-hidden="true"` or are CSS-only pseudo-elements.
- Image, video, and SVG elements are constrained to `max-width: 100%; height: auto` globally.

### Mobile layout expectations

- The body element has `overflow-x: hidden` and `overflow-wrap: break-word`.
- All grids collapse to single-column at small viewports.
- EcosystemDiagram arrows rotate 90° on mobile via `rotate-90 md:rotate-0`.
- Header wraps via `flex-wrap` at narrow widths.
- Container uses `px-5 sm:px-8` for safe mobile edge padding.

### Responsive grid and card expectations

- ProjectGrid: single column → sm:2-column → xl:3-column.
- ProductGrid standard: single column → md:2-column.
- ContactPanel channels: single column → md:2-column → lg:3-column.
- GalleryGrid: single column → md:2-column.
- Roadmap phases: single column → xl:2-column per lane.
- Long titles in PublicationCard and WritingCard use `break-words`.

### Testing commands

- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e` (requires dev server on port 3100)
- Full CI: `npm run ci`
- E2E accessibility spec: `tests/e2e/accessibility.spec.ts`
- E2E responsive spec: `tests/e2e/responsive.spec.ts`

Full independent WCAG 2.1 AA certification was not performed for M13. Accessibility hardening is based on code inspection, semantic HTML correctness, and E2E assertion coverage.

## Performance and visualization balance

Visual polish must not damage speed, stability, or readability.

Rules:

- prioritize fast-loading static content
- use optimized imagery
- lazy-load below-the-fold media when appropriate
- avoid unnecessary client-side complexity
- avoid decorative systems that inflate bundle size disproportionately

## SEO and link-preview quality

SEO is part of design quality, not just metadata plumbing.

Requirements:

- polished page titles and descriptions
- coherent canonical URLs
- high-quality Open Graph images
- clean social link previews
- metadata aligned with actual page content

A page that previews poorly in GitHub, Slack, LinkedIn, or social embeds is not fully designed.

M11 accepts only real 1200×630 preview artwork. The existing 1×1 placeholders are omitted until
they are replaced, preventing broken or misleading social previews.

## M12 implemented visual system

- Light schemes use tinted soft paper tones and dark schemes tinted charcoal (see the six-palette system above).
- Solid premium surfaces use restrained inset highlights, borders, and dimensional shadows.
- Primary and secondary palette accents appear as sparse labels, rails, focus states, and radial atmosphere.
- Hero panels and body surfaces use static palette-scoped radial gradients.
- Cards share subtle two-pixel hover lift; reduced motion removes the transform and transitions.
- Section separators and larger spacing establish a deliberate narrative rhythm.

Prohibited directions remain noisy cyberpunk, pure white/black main backgrounds, WebGL,
particles, cursor gimmicks, fake metrics, testimonials, and social proof. Full responsive and
accessibility hardening remains M13; performance and release readiness remain M14.

## Design review checklist

The M7 homepage moves from identity to proof, product direction, roadmap transparency, technical
focus, research credibility, and a closing action. Tokenized cards create continuity without the
animation and decorative layer reserved for M12.

M9 media uses tokenized figure cards, text badges, responsive grids, intrinsic aspect ratios,
and concise captions. The dashed empty state explains the asset gap without simulated imagery.

M10 uses restrained tokenized cards, textual type/channel badges, responsive grids, and direct
copy. Writing’s empty state looks intentional; Contact emphasizes pathways without form-like UI.

Before accepting visual work, verify:

- light schemes are tinted paper, not white
- dark schemes are tinted charcoal, not black
- every palette/mode combination keeps AA contrast and reads as the same site
- accent colors are controlled
- cards feel premium and solid
- `my-dev-kit Ecosystem` reads as one family
- roadmaps feel strategic rather than markdown-like
- pages remain readable on mobile
- focus states and contrast are preserved
- visuals do not overpower content
