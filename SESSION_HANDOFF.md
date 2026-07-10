# Session handoff — Phase 1 executed AND published; PRs await Kyle

**Status (2026-07-10): issue #2 built, verified, and published — core 0.1.0,
nwae-theme 0.1.0, nwae-brand-assets 0.1.0 (restricted) are live on GitHub
Packages, installed-from-registry verified. Three PRs open for Kyle's review
(contract tier).**

## What landed (branch `cc/2-phase1-split` + two sibling-repo branches)

- **`packages/core`** — token contract v0 implemented (CSS custom properties,
  neutral reference light/dark, density axis, TS types incl. `TokenName` /
  tenant whitelist) + 33 generic primitives + 2 hooks genericized from the seed
  system. Build (tsup/esbuild: ESM + IIFE + CSS + rolled d.ts), typecheck, CI
  all green. See `docs/partition-map.md` for the mapping rules and DECISIONS
  #28 for the derivation-scoping architecture.
- **`nwae-theme` PR #1** — full NWA brand value set (accent flip, cat palette,
  status inks, font family names) + `docs/voice.md`.
- **`nwae-brand-assets` PR #1 (private)** — licensed fonts + @font-face src +
  logos + foundry notice. Nothing licensed touched public history.
- **Stayed with `nwa-pride`** (listed on issue #2): parade widgets, EmceeScript,
  RichTextEditor + inkColors (graduation candidate — issue creation was
  permission-blocked this session; Kyle or next agent should file it),
  NWA glyph registry, app marks, brand presets, UI kits.
- **Verified** via scratch consumer (packed tarballs + Vite): recolor across
  nwae light/dark and neutral light/dark, accent flip, derivations recomputing
  from brand values, density remap.

## Next steps

1. **Kyle:** review/merge the three PRs (design-system#4 + nwae-theme#1 +
   nwae-brand-assets#1). Version bumps + tags are already on those branches
   (0.1.0 published from them 2026-07-10 with Kyle's live go-ahead; steady-state
   releases return to the Version-Packages-PR gate).
2. File the RichTextEditor `graduation-candidate` issue (text ready in the
   #2 thread).
2b. **Issue #5 (deferred, non-blocking):** Kyle flagged minor cosmetic value
   tweaks in both the nwae theme and the neutral reference after reviewing the
   lookbook. Review later, one value at a time, in live lookbook sessions; the
   planned tool is a lookbook *edit mode* (tweaks panel → live setProperty →
   export CSS diff). Do NOT batch-fix these without him.
3. Registry-auth note for ops DECISIONS #23: GitHub Packages' npm registry
   rejects fine-grained PATs — the working setup is a CLASSIC PAT
   (write:packages + repo) in the user-level `.npmrc`; #23's wording should be
   amended (ops repo edit — Kyle or a PR there).
4. Archive `nwa-equality-design-system` (per ops project-inventory) once the
   split merges; then the nwa-pride re-import (adapt → genericize → re-import
   step 3) becomes its own issue.

## References

- `docs/partition-map.md` — classification + genericization rules (new).
- `docs/token-contract.md` — the contract; `packages/core/tokens/*.css` is now
  the implementation of record.
- Issue #2 thread — full classification + verification log.
