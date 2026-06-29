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

`my-dev-kit`, `my-dev-kit-orchestrator`, and `my-dev-kit-lab` must read visually as one connected ecosystem, not three unrelated repo cards.

## Core visual system

### Light mode

Light mode is soft grey, not white.

Required characteristics:

- Backgrounds: warm or neutral light greys
- Surfaces: clearly separated from the page background without harsh contrast
- Borders: subtle, visible, refined
- Text: dark neutral tones with strong readability

Avoid:

- Pure white full-page backgrounds
- High-glare surfaces
- Sterile clinical contrast

### Dark mode

Dark mode is charcoal grey, not black.

Required characteristics:

- Backgrounds: deep charcoal and graphite tones
- Surfaces: layered darker greys with visible separation
- Borders: subtle but legible edge definition
- Text: high-contrast off-white or cool light grey

Avoid:

- Pure black full-page backgrounds
- Neon-on-black hacker aesthetics
- Overly saturated glow fields

### Accent colors

Primary accents:

- Violet for premium technical emphasis
- Cyan for system, data, or diagrammatic emphasis

Optional accent:

- Sparse muted gold for featured labels or selective premium emphasis only

Rules:

- Accent use must remain controlled.
- Accent colors should direct attention, not dominate the interface.
- Accent gradients should be subtle and localized.

### Implemented M2 token authority

The production token source is `src/styles/tokens.css`, with dark overrides in
`src/styles/theme.css`.

| Semantic token | Light | Dark |
| --- | --- | --- |
| Background | `#EDEFF3` | `#1A1D23` |
| Surface | `#F5F6F8` | `#20242C` |
| Card | `#F1F3F6` | `#262B35` |
| Elevated | `#FAFAFB` | `#2D3340` |
| Primary text | `#111827` | `#F3F4F6` |
| Secondary text | `#4B5563` | `#CBD5E1` |
| Muted text | `#6B7280` | `#94A3B8` |
| Border | `#D1D5DB` | `#3A4150` |
| Violet accent | `#7C3AED` | `#A78BFA` |
| Cyan accent | `#087F9A` | `#22D3EE` |

Components must consume semantic variables rather than embedding mode-specific colors.
The M2 transition duration is 180 ms for color, background, border, and shadow only.
Reduced-motion preference removes these transitions.

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

- `my-dev-kit` = Codebase Intelligence
- `my-dev-kit-orchestrator` = Workflow Orchestration
- `my-dev-kit-lab` = Validation Lab

The ecosystem should read as a system pipeline, not a list of repos.

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

## Motion and visual effects

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

- Light mode retains the approved soft grey; dark mode retains the approved charcoal.
- Solid premium surfaces use restrained inset highlights, borders, and dimensional shadows.
- Violet and cyan appear as sparse labels, rails, focus states, and radial atmosphere.
- The hero and closing CTA use CSS-only quiet grids and static radial glow.
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

- light mode is soft grey, not white
- dark mode is charcoal grey, not black
- accent colors are controlled
- cards feel premium and solid
- `my-dev-kit Ecosystem` reads as one family
- roadmaps feel strategic rather than markdown-like
- pages remain readable on mobile
- focus states and contrast are preserved
- visuals do not overpower content
