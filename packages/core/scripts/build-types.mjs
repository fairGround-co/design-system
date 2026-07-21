/* ═══════════════════════════════════════════════════════════════════════
   Hand-assembled type rollup → dist/index.d.ts

   The hand-written .d.ts siblings live next to each .jsx. dts-rollup / tsc
   can't cleanly resolve the .jsx + .d.ts pairs (the .jsx has no types of
   its own), so we concatenate the existing .d.ts contents into one
   self-contained declaration file (the pattern proven in the seed system).

   Because dist/ ships without components/, the rollup must be
   self-contained: we strip the per-file `import * as React ...` (one
   shared import is emitted at the top) and intra-package type imports
   whose declarations are already included.
   ═══════════════════════════════════════════════════════════════════════ */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Order mirrors src/index.js. Paths relative to components/.
const DTS = [
  'core/Button.d.ts',
  'core/Badge.d.ts',
  'core/MenuButton.d.ts',
  'feedback/EmptyState.d.ts',
  'feedback/InlineHelp.d.ts',
  'feedback/LiveRegion.d.ts',
  'feedback/Notice.d.ts',
  'feedback/ProgressBar.d.ts',
  'feedback/QRShare.d.ts',
  'feedback/Skeleton.d.ts',
  'feedback/Spinner.d.ts',
  'feedback/Toast.d.ts',
  'feedback/Tooltip.d.ts',
  'feedback/UndoToast.d.ts',
  'forms/Checkbox.d.ts',
  'forms/ColorPicker.d.ts',
  'forms/FilterChips.d.ts',
  'forms/FilterMenu.d.ts',
  'forms/FormField.d.ts',
  'forms/HeaderSelect.d.ts',
  'forms/NumberSpinner.d.ts',
  'forms/SearchInput.d.ts',
  'forms/SegmentedControl.d.ts',
  'forms/Select.d.ts',
  'forms/StatusSelector.d.ts',
  'forms/SwipeAction.d.ts',
  'forms/TextInput.d.ts',
  'forms/Textarea.d.ts',
  'forms/ThemeToggle.d.ts',
  'forms/useFormValidation.d.ts',
  'forms/useTrackDrag.d.ts',
  'icons/Icon.d.ts',
  'layout/AppHeader.d.ts',
  'layout/AuthStatus.d.ts',
  'layout/BottomTabBar.d.ts',
  'layout/ConfirmDialog.d.ts',
  'layout/DangerZone.d.ts',
  'layout/Dialog.d.ts',
  'layout/PopoutPane/PopoutPane.d.ts',
  'layout/PullToRefresh.d.ts',
  'layout/ResizeHandle.d.ts',
  'layout/StickySectionHeader.d.ts',
];

// Strip: React import lines, and intra-package type imports (their
// declarations are already concatenated into this same file).
const STRIP = [
  /^\s*import\s+\*\s+as\s+React\s+from\s+['"]react['"];?\s*$/,
  /^\s*import\s+React(?:\s*,\s*\{[^}]*\})?\s+from\s+['"]react['"];?\s*$/,
  /^\s*import\s+(?:type\s+)?\{[^}]*\}\s+from\s+['"]\.\.?\/[^'"]+['"];?\s*$/,
];

export async function buildTypes({ root, dist }) {
  const header =
    '/* @fairground-co/core — generated type rollup. Do not edit by hand. */\n' +
    "import * as React from 'react';\n\n";

  const parts = [];
  for (const rel of DTS) {
    const raw = await readFile(resolve(root, 'components', rel), 'utf8');
    const cleaned = raw
      .split(/\r?\n/)
      .filter((line) => !STRIP.some((re) => re.test(line)))
      .join('\n')
      .trim();
    parts.push(`/* ── ${rel} ${'─'.repeat(Math.max(2, 60 - rel.length))} */\n${cleaned}`);
  }

  // The token contract's type surface ships as-is (no React dependency).
  const tokens = await readFile(resolve(root, 'src/tokens.d.ts'), 'utf8');
  parts.push(`/* ── src/tokens.d.ts ${'─'.repeat(41)} */\n${tokens.trim()}`);

  const out = header + parts.join('\n\n') + '\n';
  await writeFile(resolve(dist, 'index.d.ts'), out, 'utf8');
}
