# Session handoff — Phase 1 partition-import executed; publish awaits PAT

**Status (2026-07-10): issue #2 built and verified; three PRs open for Kyle's
review (contract tier); publishing blocked on registry auth.**

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

1. **Kyle:** drop the per-agent PAT (packages:write, DECISIONS ops#23) into
   `~/.npmrc` (`//npm.pkg.github.com/:_authToken=…`) — publish attempt stopped
   at ENEEDAUTH per policy.
2. **Kyle:** review/merge the three PRs (design-system #2's PR + nwae-theme#1 +
   nwae-brand-assets#1).
3. Publish 0.1.0: core via the changesets flow in design-system; theme +
   brand-assets via their repos' changesets.
4. File the RichTextEditor `graduation-candidate` issue (text ready in the
   #2 thread).
5. Archive `nwa-equality-design-system` (per ops project-inventory) once the
   split merges; then the nwa-pride re-import (adapt → genericize → re-import
   step 3) becomes its own issue.

## References

- `docs/partition-map.md` — classification + genericization rules (new).
- `docs/token-contract.md` — the contract; `packages/core/tokens/*.css` is now
  the implementation of record.
- Issue #2 thread — full classification + verification log.
