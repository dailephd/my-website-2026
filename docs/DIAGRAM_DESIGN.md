# DIAGRAM_DESIGN.md

## 1. Purpose

This file defines the visual grammar, composition rules, connector rules, responsive behavior, accessibility requirements, implementation constraints, and AI-agent instructions for technical diagrams used on the Dai Le personal website and product lab.

It applies to public-facing:

- Architecture diagrams
- Workflow diagrams
- Product relationship diagrams
- System maps
- Node-link diagrams
- Hierarchy and tree diagrams
- Lifecycle diagrams
- Timelines
- Before-and-after state diagrams
- Side-by-side system comparisons
- Swimlane diagrams
- Decision flows
- Feedback loops
- Technical explainers

The goal is to create diagrams that look like polished developer-education technical infographics rather than raw documentation, generic flowcharts, or disconnected website cards.

A diagram should feel like one intentionally composed visual system.

It should not feel like text placed into boxes after the fact.

---

## 2. Authority and Relationship to DESIGN.md

An AI agent creating or modifying a diagram must read:

1. `DESIGN.md`
2. `DIAGRAM_DESIGN.md`

`DESIGN.md` controls:

- Global brand identity
- Light and dark theme tokens
- Typography
- Page spacing
- Page layout
- Accessibility
- General responsive behavior
- Motion
- Performance
- Browser support
- SEO and semantic page structure

`DIAGRAM_DESIGN.md` controls:

- Diagram composition
- Diagram canvases
- Node hierarchy
- Node styling
- Connector styling
- Arrow shafts
- Arrowheads
- Diagram color semantics
- Diagram legends
- Diagram annotations
- Diagram-specific responsive transformations
- Diagram-specific implementation
- Diagram-specific QA

If the files appear to conflict:

- Follow `DESIGN.md` for the overall website.
- Follow `DIAGRAM_DESIGN.md` for diagram-specific details.
- Do not silently resolve a genuine contradiction.
- Report the contradiction before implementation.

This file must not be used to create a separate visual identity from the rest of the website.

---

## 3. Core Visual Direction

Use a polished developer-education technical infographic style with:

- Strong information hierarchy
- Dark or light theme-aware technical canvases
- Solid node surfaces
- Clear system relationships
- Visible connector shafts
- Proportionate arrowheads
- Restrained primary and secondary palette accents
- Consistent semantic colors
- Moderate corner rounding
- Subtle command-center atmosphere
- Clean technical typography
- Compact explanatory annotations
- Deliberate whitespace

The style may feel:

- Technical
- Cinematic
- Precise
- Educational
- System-oriented
- Premium
- Slightly game-interface inspired

It must remain:

- Readable
- Professional
- Accessible
- Lightweight
- Responsive
- Consistent with the website

The style must not become:

- A raw Mermaid diagram
- ASCII art
- A text document with arrows
- A terminal emulator
- A generic SaaS card layout
- A default flowchart-library result
- A 3D toy
- A neon cyberpunk interface
- A dense monitoring dashboard
- An illustration that obscures the system logic

---

## 4. Diagram Composition

A diagram must communicate one primary idea.

Before implementation, identify:

1. The diagram’s primary question.
2. The main entities.
3. The primary flow.
4. Secondary relationships.
5. Feedback or return paths.
6. State or status meanings.
7. The correct layout pattern.

Use visual hierarchy to distinguish:

- Primary systems
- Intermediate artifacts
- Internal process steps
- Outcomes
- Feedback paths
- Explanatory annotations

Do not give every element equal visual weight.

A large system, product, or major phase should not look identical to a minor step or metadata label.

Do not display every possible relationship when a scoped view communicates the point more clearly.

---

## 5. Diagram Canvas

Use one coherent canvas for each diagram.

The canvas should visually bind all diagram elements into one composition.

Canvas surfaces:

- Use `var(--hero-bg)`, `var(--surface-inset)`, or another existing theme-aware surface from `DESIGN.md`.
- Do not use pure white.
- Do not use pure black.
- Do not use transparent glass as the primary canvas.
- Do not introduce a diagram-only page background that conflicts with the website.

Canvas border:

- Use `1px solid var(--border-soft)`.
- A stronger border may use `var(--border)`.
- Do not use a bright glowing border around the entire canvas.

Canvas radius:

- Default: `1.5rem`.
- Compact embedded diagram: `1.25rem`.
- Do not invent unrelated radius values.

Canvas padding:

- Mobile: `1rem-1.25rem`.
- Tablet: `1.5rem-2rem`.
- Desktop: `2rem-3rem`.

Canvas atmosphere may include:

- A very subtle grid
- A low-opacity radial glow
- A faint technical pattern
- Small decorative line fragments

Atmospheric elements must:

- Remain behind the content
- Use low contrast
- Be `aria-hidden`
- Never reduce label readability
- Never become the main visual content

---

## 6. Diagram Typography

Use the typography families and theme text tokens defined in `DESIGN.md`.

Diagram title:

- Use the established section-heading or subsection-heading scale.
- Use `var(--text-primary)`.
- Keep it direct and descriptive.

Diagram subtitle:

- Use secondary-text sizing.
- Use `var(--text-secondary)`.
- Explain what the diagram shows in one concise sentence.

Primary node title:

- Use `1rem-1.25rem`.
- Use weight `600-700`.
- Use `var(--text-primary)`.

Secondary node title:

- Use `0.875rem-1rem`.
- Use weight `600`.
- Use `var(--text-primary)`.

Node description:

- Use `0.8125rem-0.9375rem`.
- Use `var(--text-secondary)`.
- Keep it to one or two short lines when possible.

Connector label:

- Use `0.75rem-0.8125rem`.
- Use weight `600`.
- Use a solid theme-aware label surface.
- Do not place long sentences directly on connector lines.

Use monospace only for:

- Code
- API names
- Commands
- File paths
- Package names
- Technical identifiers
- Data properties

Do not use monospace for all diagram content.

---

## 7. Diagram Nodes

### 7.1 Primary Nodes

Use primary nodes for:

- Products
- Major systems
- Major phases
- Major states
- Major outputs

Primary node surface:

- `var(--surface-card)` or `var(--surface-elevated)`

Primary node border:

- Default: `1.5px solid var(--border)`
- Featured or active: a restrained accent border using an existing accent token

Primary node radius:

- `1rem-1.25rem`

Primary node padding:

- Mobile: `1rem`
- Desktop: `1.25rem-1.5rem`

Primary nodes may include:

- Small icon
- Eyebrow label
- Prominent title
- One concise description
- Compact internal workflow
- Small metadata labels when necessary

Do not place a long paragraph inside a primary node.

### 7.2 Secondary Nodes

Use secondary nodes for:

- Process steps
- Intermediate artifacts
- Actions
- Substates
- Supporting outputs

Secondary node surface:

- `var(--surface-inset)` or `var(--surface-card)`

Secondary node border:

- `1px solid var(--border-soft)`

Secondary node radius:

- `0.75rem-1rem`

Secondary node padding:

- `0.625rem-0.875rem`

Secondary nodes should be visually smaller than primary nodes.

### 7.3 Artifact Nodes

Use artifact nodes for:

- Context packets
- Reports
- Generated files
- Handoff objects
- Bundles
- Build outputs
- Experiment artifacts

Artifact nodes should be visually distinct without becoming louder than the primary systems.

Use:

- A document, package, file, or archive icon
- A slightly stronger border
- A compact description
- A restrained primary or secondary palette accent

Do not use novelty shapes that reduce readability.

### 7.4 Decision Nodes

Decision nodes may use a diamond only when the content is a real decision with multiple outcomes.

Decision nodes must:

- Contain a short question
- Show clearly labeled outgoing paths
- Use visible connector shafts
- Avoid very small text
- Remain readable on mobile

Do not use a diamond merely for decoration.

### 7.5 Node Consistency

Nodes at the same semantic level must use consistent:

- Radius
- Padding
- Border weight
- Typography
- Icon scale
- Surface treatment

Do not generate a different visual style for every node.

---

## 8. Connectors and Arrows

Connectors are structural elements, not decoration.

A connector must make the relationship understandable without relying only on spatial proximity.

### 8.1 Primary Flow Connectors

Use primary connectors for the main direction of the diagram.

Requirements:

- Use a solid line.
- Desktop stroke width: `4px`.
- Tablet stroke width: `3.5px`.
- Mobile stroke width: `3px`.
- Never use less than `3px` for a primary flow connector.
- Use rounded line caps.
- Use rounded line joins.
- Use a visible arrowhead.
- The arrowhead and shaft must use the same semantic color.
- Use opacity `0.85-1`.
- Do not use a detached arrowhead without a visible shaft.

Preferred primary flow color:

- `var(--accent-secondary)`

A primary orchestration or control flow may use:

- `var(--accent-primary)`

Do not choose between those colors arbitrarily. Use the primary accent (`--diagram-flow-data`) for primary system or data movement and the secondary accent (`--diagram-flow-control`) for orchestration or control flow. Hues come from the active palette (docs/DESIGN.md); the role distinction, not the hue, carries the meaning.

### 8.2 Secondary Connectors

Use secondary connectors for:

- Supporting relationships
- Alternate paths
- Cross-links
- Non-primary dependencies

Requirements:

- Stroke width: `2.5px-3px`.
- Use a solid or dashed line according to meaning.
- Use rounded caps and joins.
- Use `var(--border-strong)`, `var(--accent-primary)`, or `var(--accent-secondary)` according to the established semantic meaning.
- Keep secondary connectors quieter than primary connectors.

### 8.3 Feedback and Return Connectors

Use dashed connectors for:

- Feedback
- Return paths
- Alternate references
- Yield-and-resume behavior
- Reverse relationships
- Previous-state links

Requirements:

- Stroke width: `2.5px`.
- Dash pattern: approximately `8 8`.
- Use a visible arrowhead when direction matters.
- Add a short label when the meaning is not obvious.
- Keep feedback connectors visually distinct from the primary flow.

Do not use a dashed connector for the main forward progression.

### 8.4 Connector Labels

Connector labels must:

- Be short
- Use a solid theme-aware label background
- Use `var(--surface-elevated)` or `var(--surface-inset)`
- Use `var(--text-secondary)` or the corresponding semantic accent
- Use padding around the text
- Avoid overlapping the connector shaft
- Avoid covering arrowheads
- Remain readable in both themes

Good connector labels:

- context packet
- artifacts and outcomes
- feedback
- alternate
- yield
- commit
- continue
- blocked

Do not place a paragraph on a connector.

### 8.5 SVG Connector Requirements

When SVG is used:

- Use a shared `<defs>` block for markers.
- Use `markerUnits="strokeWidth"` so arrowheads scale consistently with stroke width.
- Use `orient="auto"` or `orient="auto-start-reverse"` as appropriate.
- Use `vector-effect="non-scaling-stroke"` on connector paths when responsive scaling would otherwise make the line too thin.
- Ensure `stroke` is explicitly set.
- Ensure `stroke-width` is explicitly set.
- Ensure `fill="none"` is set for open connector paths.
- Ensure marker color matches the connector color.
- Do not rely on browser-default SVG stroke behavior.
- Do not allow a CSS reset to set the path stroke to `none`.
- Keep connectors behind nodes unless a crossing relationship requires otherwise.

### 8.6 CSS Connector Requirements

When CSS borders or pseudo-elements are used:

- Set the line thickness explicitly.
- Set a theme-aware background or border color explicitly.
- Ensure the line extends continuously between nodes.
- Ensure the arrowhead is attached to the shaft.
- Ensure responsive layout changes also reposition the shaft.
- Do not rely on a `1px` border for a primary connector.

Prefer SVG when connectors require:

- Curves
- Loops
- Branches
- Arrow markers
- Responsive routing
- Cross-node relationships

### 8.7 Theme Visibility

Connector colors must remain visible against:

- `var(--bg)`
- `var(--hero-bg)`
- `var(--surface-main)`
- `var(--surface-card)`
- `var(--surface-inset)`

Light mode:

- Do not use a pale connector that disappears against a soft-grey background.
- Use the light-mode accent or strong-border tokens defined in `DESIGN.md`.

Dark mode:

- Do not use a dark connector that disappears against charcoal surfaces.
- Use the dark-mode accent or strong-border tokens defined in `DESIGN.md`.

Do not hardcode one connector color that only works in one theme.

---

## 9. Diagram Color Semantics

Color must communicate meaning consistently.

Use existing tokens from `DESIGN.md`.

Primary system or data flow:

- `var(--diagram-flow-data)` (maps to `--color-accent-primary`)
- Primary accent family

Orchestration, control, alternate processing, or coordination:

- `var(--diagram-flow-control)` (maps to `--color-accent-secondary`)
- Secondary accent family

Successful continuation, completion, valid state, committed state:

- `var(--status-success)`

Active processing, decision, transition, caution:

- `var(--status-warning)`

Blocking, interruption, failure, destructive state, yield:

- `var(--status-error)`

Informational annotation:

- `var(--status-info)`

Neutral relationship, inactive path, scaffolding, or context:

- `var(--status-neutral)` or `var(--border-strong)`

Rules:

- Use the same color for the same meaning within one diagram.
- Do not use status colors as decoration.
- Do not use more semantic colors than the diagram requires.
- Do not use color as the only way to communicate state.
- Pair color with labels, line styles, icons, or shapes.
- Do not invent a diagram-only color palette.

---

## 10. Supported Layout Patterns

Choose the pattern based on the information structure.

Do not force every diagram into stacked cards.

### 10.1 Vertical Workflow

Use when:

- The process has a clear top-to-bottom sequence.
- A product or artifact passes work to the next layer.
- Feedback returns to an earlier stage.

Structure:

- Major systems arranged vertically.
- Primary connectors point downward.
- Intermediate artifacts appear between systems.
- Feedback uses a dashed return connector.

### 10.2 Side-by-Side Comparison

Use when:

- Comparing two systems
- Comparing old and new behavior
- Comparing blocking and interruptible behavior
- Comparing alternatives with equivalent structure

Structure:

- Matching outer regions
- Aligned semantic levels
- Consistent node sizes
- Clear comparison labels
- Shared legend when needed

Do not make one side visually dominant unless the comparison requires it.

### 10.3 Node-Link Architecture Map

Use when:

- Showing parent, child, sibling, return, or dependency relationships
- Showing a graph or linked structure
- Showing multiple relationship types

Structure:

- Clear node hierarchy
- Distinct connector styles by relationship type
- Compact legend
- Scoped number of nodes

Avoid hairball graphs.

### 10.4 Before-and-After State Diagram

Use when:

- Showing a state transition
- Showing current versus work-in-progress state
- Showing pre-commit versus post-commit state

Structure:

- Mirrored or aligned states
- A clearly visible transition event
- Consistent node placement across states
- Explicit state labels

### 10.5 Lifecycle Timeline

Use when:

- Showing phases ordered in time
- Showing browser, rendering, deployment, or data lifecycle stages
- Showing a single directional sequence

Structure:

- One clearly visible time axis
- Phase cards aligned to the axis
- Optional milestone or event markers
- Supporting notes below or beside the main sequence

### 10.6 Swimlane or Priority-Lane Diagram

Use when:

- Showing parallel actors
- Showing priority differences
- Showing interruption and resumption
- Showing work moving between systems

Structure:

- Clearly labeled lanes
- Shared time direction
- Distinct activity blocks
- Explicit interruption or transfer points

### 10.7 Decision Flow

Use when:

- The process contains real branching decisions
- Paths loop or return
- Outcomes depend on conditions

Structure:

- Strong primary spine
- Short decision questions
- Clearly labeled branches
- Visible loop-back paths
- Compact legend when line styles have multiple meanings

---

## 11. Internal Mini-Diagrams

A primary product or system node may contain a compact internal workflow.

Internal mini-diagrams must:

- Use real visual nodes or step rows
- Use visible connectors
- Remain secondary to the main diagram
- Use shorter labels
- Avoid long descriptions
- Preserve the main flow at a glance

Acceptable internal patterns:

- Three to five connected step nodes
- One input branching into several operations and reconverging
- A short numbered sequence
- A compact pipeline
- A small tree

Do not represent an internal workflow as:

- A paragraph with arrow characters
- A multiline text list with downward arrows
- Raw Mermaid syntax
- ASCII art
- Loose labels with no structural connector

---

## 12. Icons and Symbols

Use icons only when they improve comprehension.

Preferred source:

- Existing project icon system
- `lucide-react` when already available

Icon rules:

- Use one consistent icon family.
- Match icon stroke weight across the diagram.
- Use icons at a restrained scale.
- Pair unfamiliar icons with text.
- Do not use decorative icons in every node.
- Do not substitute icons for necessary labels.

Useful icon categories:

- Product or system
- File or artifact
- Search
- Graph
- Code
- Workflow
- Test
- Report
- Chart
- Gallery
- Success
- Warning
- Error
- Feedback

---

## 13. Legends and Annotations

Use a legend when:

- More than one connector style is used.
- More than one semantic color is used.
- The meaning is not obvious from labels.
- The diagram includes special relationship types.

A legend should:

- Be compact
- Use the actual line styles and colors
- Use short labels
- Sit inside the diagram canvas
- Avoid competing with the main flow

Use annotations for:

- Key takeaways
- Why a mechanism matters
- Important constraints
- Before-and-after explanations
- Definitions of technical terms

Annotations should use:

- Solid theme-aware surfaces
- Clear heading
- Short body text
- Optional icon
- Moderate visual emphasis

Do not surround every node with explanatory prose.

---

## 14. Interaction and Motion

Diagrams should be understandable without interaction.

Allowed interaction:

- Subtle node hover
- Focus highlighting
- Connector highlighting associated with the focused node
- Expandable details when the content genuinely requires them
- Tooltips for short supplementary definitions
- Keyboard-accessible inspection

Allowed motion:

- Small opacity transition
- Small color transition
- Maximum `2px` node lift
- Slow, subtle connector emphasis when useful
- Section reveal consistent with `DESIGN.md`

Not allowed by default:

- 3D rotation
- Drag-to-spin behavior
- Continuous orbiting
- Mouse-following parallax
- Bouncy motion
- Rapid pulsing
- Animated particles
- Continuous high-contrast line movement
- Motion required to understand the diagram

Respect `prefers-reduced-motion`.

Reduced-motion mode must:

- Disable ambient movement
- Disable animated connector travel
- Disable diagram-specific reveal sequences
- Preserve all information statically

---

## 15. Responsive Behavior

A diagram must be intentionally redesigned for smaller viewports.

Do not merely shrink the desktop diagram.

### 15.1 Desktop

At `1024px` and above:

- Use the selected full diagram pattern.
- Preserve meaningful spatial relationships.
- Keep node labels readable.
- Keep connectors clearly visible.
- Use the full legend or annotation structure when needed.

### 15.2 Tablet

From `640px` to `1023px`:

- Reduce canvas padding.
- Reduce spacing between nodes.
- Preserve primary relationships.
- Simplify secondary annotations.
- Reposition legends when necessary.
- Keep primary connector width at least `3.5px`.

### 15.3 Mobile

Below `640px`:

- Preserve semantic order.
- Prefer a vertical transformation when the desktop view is horizontal.
- Stack comparison regions when necessary.
- Shorten connector labels.
- Move supporting annotations below the main flow.
- Keep primary connector width at least `3px`.
- Do not create page-level horizontal overflow.
- Do not allow arrowheads to remain without their shafts.
- Do not shrink text below readable sizes.
- Do not overlap nodes and labels.

An internal scroll region may be used only when:

- The diagram cannot be simplified without losing essential meaning.
- The scroll region is clearly intentional.
- It does not cause page-level horizontal scrolling.
- An accessible text summary remains available.

### 15.4 Required Width Checks

Check diagrams at:

- `360px`
- `390px`
- `768px`
- `1024px`
- `1280px`
- `1440px`
- `1920px`

At each width, verify:

- No clipped nodes
- No clipped arrowheads
- No missing connector shafts
- No label overlap
- No unintended page-level horizontal scroll
- No unreadably small text
- Correct semantic order

---

## 16. Accessibility

Meaningful diagrams require an accessible text equivalent.

Requirements:

- Use semantic headings around the diagram.
- Provide a concise text summary of the diagram’s meaning.
- Give meaningful SVG diagrams an accessible name and description when appropriate.
- Mark purely decorative SVG layers and atmospheric elements as `aria-hidden="true"`.
- Do not rely on color alone.
- Ensure keyboard focus can reach interactive nodes.
- Ensure hover behavior has an equivalent focus behavior.
- Use visible focus states from `DESIGN.md`.
- Preserve reading order in the DOM.
- Ensure mobile visual reordering does not create an incorrect screen-reader order.
- Keep text contrast adequate in both themes.

If the diagram is purely decorative:

- Mark it as decorative.
- Do not duplicate nearby text unnecessarily for screen readers.

---

## 17. Implementation Rules

Preferred implementation:

- React components
- Semantic HTML
- CSS Grid
- Flexbox
- SVG connectors
- CSS variables
- Existing Tailwind conventions
- Existing design tokens

Use SVG for:

- Connector shafts
- Arrowheads
- Curves
- Branches
- Feedback loops
- Timelines
- Relationship lines
- Brackets
- Tree edges

Use HTML/CSS for:

- Nodes
- Labels
- Legends
- Annotations
- Descriptions
- Icons
- Controls

Do not add a new dependency when HTML, CSS, and SVG can implement the diagram cleanly.

Raw Mermaid may be used for:

- Internal documentation
- README source diagrams
- Development planning
- Early structure exploration

Raw Mermaid must not be treated as the final public website design unless it is explicitly restyled to satisfy this file.

Do not use:

- ASCII arrows
- Unicode arrows as the primary diagram connector system
- Preformatted text as a public diagram
- Default library styling as the final visual
- Raster screenshots as the only maintainable implementation
- Three.js
- WebGL
- Canvas-based rendering
- A heavy graph library

Exceptions require explicit task-level authorization.

### 17.1 Implementation Authority

- Shared diagram styling lives in `src/styles/diagrams.css`.
- Reusable diagram markup primitives live in `src/components/diagrams/`.
- Route-specific content and topology remain local to the owning component.
- New diagrams must consume the shared style system rather than recreate visual constants.
- Use a shared primitive when its semantic role matches; do not force topology into a generic renderer.

---

## 18. Recommended Reusable Primitives

Prefer shared primitives when the website contains more than one diagram.

Recommended component names:

- `DiagramCanvas`
- `DiagramHeader`
- `DiagramSection`
- `DiagramNode`
- `DiagramArtifactNode`
- `DiagramDecisionNode`
- `DiagramConnector`
- `DiagramArrowMarker`
- `DiagramLabel`
- `DiagramLegend`
- `DiagramAnnotation`
- `DiagramTimeline`
- `DiagramSummary`

These names are recommendations, not permission to create all components automatically.

Create only the primitives required by the assigned task.

Do not build a general diagram framework without explicit instruction.

Shared primitives should centralize:

- Node radius
- Node border
- Node surface
- Connector width
- Connector marker
- Connector colors
- Label styling
- Theme behavior
- Reduced-motion behavior

---

## 19. Forbidden Patterns

Do not use:

- Arrowheads without visible shafts
- `1px` primary connectors
- Connectors with opacity so low that they disappear
- A hardcoded connector color that works in only one theme
- Raw text arrows between content blocks
- ASCII diagrams
- Raw Mermaid as finished website styling
- Default flowchart-library visuals
- Giant pill-shaped nodes for every element
- Excessive glow
- Excessive neon
- Transparent glass panels as the main diagram surface
- Unreadable fake code
- Dense fake dashboards
- Hairball graphs
- Unexplained edge colors
- Different colors with no semantic meaning
- Multiple unrelated icon styles
- 3D rotation for standard diagrams
- Decorative motion required to understand the flow
- Fragile absolute positioning for the entire diagram
- Page-level horizontal overflow
- Desktop diagrams simply scaled down until text becomes unreadable
- Hidden overflow that clips arrowheads or feedback paths

---

## 20. AI Agent Workflow

When creating or modifying a diagram, the AI agent must:

1. Read `DESIGN.md`.
2. Read `DIAGRAM_DESIGN.md`.
3. Locate the actual rendered component.
4. Search for duplicate or stale diagram implementations.
5. Confirm which route renders the component.
6. Identify the diagram’s primary question.
7. Identify the correct supported layout pattern.
8. Preserve existing content and behavior unless the task says otherwise.
9. Use existing theme tokens.
10. Use visible connector shafts and arrowheads.
11. Implement light and dark theme support.
12. Implement the responsive transformation.
13. Add or preserve an accessible summary.
14. Check the actual rendered route.
15. Run existing project validation.

The agent must not assume that editing a similarly named component changes the rendered diagram.

Before reporting completion, verify:

- The edited component is imported by the actual route.
- No stale duplicate is still rendered.
- Build output or cache is not masking the change.
- Theme-specific CSS is not hiding connector shafts.
- SVG stroke values are not being overridden.
- The result is visible in the actual page.

---

## 21. Diagram Review Checklist

### Composition

- Does the diagram communicate one main idea?
- Is the primary flow immediately visible?
- Are primary and secondary elements visually distinct?
- Is the chosen layout pattern appropriate?

### Nodes

- Are node sizes consistent by semantic level?
- Are titles readable?
- Are descriptions concise?
- Are primary systems more prominent than minor steps?
- Are icons useful rather than decorative?

### Connectors

- Are connector shafts clearly visible?
- Are arrowheads attached to visible shafts?
- Are primary connectors at least `4px` on desktop and `3px` on mobile?
- Are feedback paths visibly distinct?
- Are connector labels concise?
- Do line colors work in both themes?

### Color

- Does each semantic color have a consistent meaning?
- Is state communicated by more than color?
- Are unnecessary colors avoided?
- Are existing website tokens used?

### Responsiveness

- Does the diagram transform intentionally on mobile?
- Is semantic order preserved?
- Are labels readable?
- Are connectors still visible?
- Is page-level horizontal overflow avoided?

### Accessibility

- Is there an accessible summary?
- Is reading order correct?
- Are interactive elements keyboard accessible?
- Are focus states visible?
- Are decorative layers hidden from assistive technology?

### Performance

- Is the implementation lightweight?
- Are unnecessary dependencies avoided?
- Is motion restrained?
- Is reduced motion respected?
- Does the diagram avoid heavy canvas, WebGL, or 3D rendering?

### Rendering Integrity

- Is the edited component the one actually rendered?
- Are there stale duplicates?
- Are connector strokes explicitly defined?
- Are theme rules overriding any visible line?
- Are arrowheads or paths clipped by overflow?
- Has the actual route been visually checked?

---

## 22. Acceptance Requirements

A public-facing technical diagram is acceptable only when:

1. It follows `DESIGN.md`.
2. It follows `DIAGRAM_DESIGN.md`.
3. It uses one coherent visual composition.
4. It has a clear primary flow.
5. It uses solid theme-aware surfaces.
6. It uses consistent node hierarchy.
7. It has visible connector shafts.
8. It has proportionate arrowheads.
9. It works in light and dark mode.
10. It remains readable on mobile.
11. It avoids page-level horizontal overflow.
12. It includes an accessible text equivalent.
13. It respects reduced motion.
14. It does not rely on a heavy dependency without explicit authorization.
15. It has been checked on the actual rendered route.

---

## 23. Version History

### 2026-08-02

Changes:
- Created a dedicated design system for architecture diagrams, workflows, system maps, node-link diagrams, timelines, comparisons, decision flows, and technical explainers.
- Defined exact node, connector, arrow, theme, semantic-color, responsive, accessibility, implementation, and QA rules.
- Established mandatory coordination with `DESIGN.md`.
- Added protection against stale components, invisible connector shafts, default flowchart styling, and unsupported 3D treatments.

Reason:
Technical diagrams require more specific visual and implementation rules than the global website design system can provide. This file ensures diagrams remain readable, maintainable, theme-aware, responsive, accessible, and visually consistent with the premium independent product lab identity.
