---
"@fairground-co/core": minor
---

Notice — the inline/banner notice primitive (five status tones, optional
title/icon, compact variant; in-flow and persistent vs Toast's transient
float). Fills mix the tone into the current surface (the selection-state
recipe) so they track light/dark and brand scopes. Also fixes Icon to
actually inherit currentColor as its d.ts always documented — icons inside
buttons/toasts now take their context's ink instead of forcing --text.
