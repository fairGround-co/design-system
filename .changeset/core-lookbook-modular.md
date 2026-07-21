---
"@fairground-co/core": minor
---

Modular two-render lookbook (DECISIONS #29–31): section modules with
provenance subheaders compose the catalog; the builder now emits a PUBLIC STUB
(default — tokens, components, the theme's icon library) or a COMPLETE brand
book (`--complete` — adds strategic guidance, licensed @font-face rules, and
brand marks from a `--brand-assets-dir`, with relative refs, `--inline-logos`,
or fully `--inline-assets`). New sections: visual foundations (private), voice
(private), brand marks (private), theme icon library (public). Themes may ship
icon-glyph data consumed via Icon's `glyphs` prop (`--theme-icons`).
