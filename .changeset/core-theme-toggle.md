---
"@fairground-co/core": minor
---

ThemeToggle — the standard light/dark switcher, sized for a header strip
("icon" variant) or a profile dropdown row ("switch" variant, sliding sun/moon
thumb). Controlled (value/onChange) like the rest of the system's inputs,
with an uncontrolled zero-config fallback that writes
document.documentElement's [data-theme] and persists to localStorage on its
own — drop it into a header with no wiring. On-state (dark) uses
--scope-view, matching Checkbox's precedent (a display preference is a view
operation, not a data-changing commit). Adds `sun`/`moon` to the base icon
registry.
