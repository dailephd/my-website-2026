# Diagrams

All diagrams in this document are Mermaid, kept intentionally small and labeled with plain text
— no secrets, no fictional services, and nothing that doesn't match the current implementation
(cross-referenced against `docs/ARCHITECTURE.md`, `docs/CONTRACT.md`, and the source under
`src/`).

## 1. Site architecture

```mermaid
flowchart TD
  Browser["Browser"]
  Router["Next.js App Router"]
  Pages["Route pages (src/app/**)"]
  Components["Components (src/components/**)"]
  Content["src/content/*.ts"]
  Adapters["src/lib/content adapters"]
  SEO["src/lib/seo"]
  API["POST /api/contact"]
  Email["Resend"]
  Assets["public/ assets"]
  Scripts["validate-content / validate-links / lint"]

  Browser --> Router --> Pages
  Pages --> Components
  Pages --> SEO
  Components --> Adapters --> Content
  Pages --> API --> Email
  Router --> Assets
  Scripts -. validates .-> Content
  Scripts -. validates .-> Pages
```

## 2. Content flow

```mermaid
flowchart LR
  Profile["src/content/profile.ts"]
  Projects["src/content/projects.ts"]
  Products["src/content/products.ts"]
  Publications["src/content/publications.ts"]
  Contact["src/content/contact.ts"]
  Links["src/content/links.ts"]
  Adapters["src/lib/content/* adapters"]
  Pages["Page components"]
  Rendered["Rendered pages"]

  Profile --> Adapters
  Projects --> Adapters
  Products --> Adapters
  Publications --> Adapters
  Contact --> Adapters
  Links --> Adapters
  Adapters --> Pages --> Rendered
```

## 3. Routing / navigation structure

```mermaid
flowchart TD
  Home["/"]
  Nav["Header primary navigation"]
  Projects["/projects"]
  Publications["/publications"]
  About["/about"]
  Contact["/contact"]
  Detail["/projects/my-dev-kit"]
  Work["/work (HTTP 308 redirect only)"]

  Home --> Nav
  Nav --> Projects
  Nav --> Publications
  Nav --> About
  Nav --> Contact
  Projects --> Detail
  Work -. redirects .-> Projects
```

## 4. Project relationship (my-dev-kit ecosystem)

```mermaid
flowchart TD
  Kit["my-dev-kit: static repository evidence"]
  Evidence["Bounded Repository Evidence"]
  Orchestrator["my-dev-kit-orchestrator: workflow control"]
  Actor["External human or coding agent: edits target source"]
  Observer["my-frontend-observer: rendered runtime evidence"]
  Lab["my-dev-kit-lab: optional assurance"]

  Kit --> Evidence --> Orchestrator --> Actor --> Observer
  Observer -- runtime evidence and correction result --> Orchestrator
  Observer -.-|optional assurance| Lab
```

## 5. Publication rendering flow

```mermaid
flowchart TD
  Records["Publication records (src/content/publications.ts)"]
  Sort["Sort: year desc, then displayPriority asc"]
  Card["PublicationCard"]
  Author["Bold Dai Le / Le Dai author name"]
  Abstract["Collapsible Abstract (details/summary)"]
  BibTeX["Collapsible BibTeX (if present)"]
  DOI["DOI / URL link"]
  Page["/publications page"]

  Records --> Sort --> Card
  Card --> Author
  Card --> Abstract
  Card --> BibTeX
  Card --> DOI
  Card --> Page
```

## 6. Contact form email flow

```mermaid
flowchart TD
  Form["Contact page form (ContactForm)"]
  ClientValidation["Client-side validation"]
  API["POST /api/contact"]
  ServerValidation["Server validation + honeypot check"]
  Helper["sendContactEmail helper"]
  Provider["Resend"]
  Inbox["CONTACT_TO_EMAIL (default dailephd@gmail.com)"]
  ReplyTo["replyTo = visitor senderEmail"]
  Response["JSON success / error response"]

  Form --> ClientValidation --> API --> ServerValidation --> Helper --> Provider --> Inbox
  Helper --> ReplyTo
  Helper --> Response --> Form
```

## 7. Release-readiness workflow

```mermaid
flowchart TD
  Typecheck["npm run typecheck"]
  Lint["npm run lint"]
  Content["npm run validate:content"]
  Links["npm run validate:links"]
  Test["npm run test"]
  Build["npm run build"]
  CheckRelease["npm run check:release"]
  E2E["npm run test:e2e (optional, needs dev server)"]
  Manual["Manual QA (docs/QA_CHECKLIST.md)"]
  Status["Final git status review"]

  Typecheck --> Lint --> Content --> Links --> Test --> Build --> CheckRelease
  CheckRelease --> E2E
  CheckRelease --> Manual --> Status
```

## 8. Git branch workflow

```mermaid
flowchart TD
  Main["main"]
  Docs["docs/*"]
  Feature["feature/*"]
  Fix["fix/*"]
  Release["release/*"]
  Review["Manual review"]
  Commit["Local commit (only when explicitly instructed)"]
  Push["Push (only when explicitly instructed)"]
  Deploy["Deployment — separate future workflow"]

  Main --> Feature --> Commit --> Review
  Main --> Fix --> Commit
  Main --> Docs --> Commit
  Main --> Release --> Commit
  Review --> Push -.-> Deploy
```

See `docs/BRANCHING.md` for the naming rules behind this diagram.
