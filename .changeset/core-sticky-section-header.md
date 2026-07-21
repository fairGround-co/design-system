---
"@fairground-co/core": minor
---

StickySectionHeader — a section header that pins below a fixed offset and
reports its stuck state (sentinel + IntersectionObserver, no scroll handler)
via a `{ stuck }` render-prop and a `[data-stuck]` attribute. Graduates the
"sticky section header" seed named in the adoption plan; the lookbook is its
first consumer (plain heading until stuck, HeaderSelect jump-nav when stuck).
