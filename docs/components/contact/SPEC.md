# Contact Components Specification

> Historical M10 specification. Its no-form `ContactPanel` describes the earlier channel layout.
> Current contact behavior is owned by `docs/CONTRACT.md` and `src/app/contact/page.tsx`, which
> render the validated `ContactForm` and profile links. This file preserves the original rationale.

`ContactCard` renders one adapter-derived pathway with textual channel kind and safe link
attributes. `ContactPanel` renders structured context, channels, and a no-email fallback. It
contains no form, endpoint, or submission behavior.
