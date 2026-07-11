/* ═══════════════════════════════════════════════════════════════════════
   Lookbook builder — emits a SELF-CONTAINED specimen catalog HTML file:
   React + the component library bundled in, core token CSS inlined, and
   (for themed builds) the theme CSS + voice doc inlined too. No network,
   no build step for the reader — double-click and review.

   Default (no flags): dist/lookbook.html — the neutral reference catalog
   that ships in the published package.

   Themed builds (run from a theme repo's tooling or by hand):
     node scripts/build-lookbook.mjs \
       --brand nwae \
       --title "NWA Equality" \
       --package "@fairground-co/nwae-theme@0.1.0" \
       --theme-css ../nwae-theme/styles.css \
       --voice ../nwae-theme/docs/voice.md \
       --note "Licensed brand typefaces are not embedded …" \
       --out ../nwae-theme/docs/lookbook.html

   --fragment omits the <html>/<head>/<body> shell (for hosts that wrap
   content in their own document skeleton).
   ═══════════════════════════════════════════════════════════════════════ */
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}
const flag = (name) => process.argv.includes(`--${name}`);

async function bundleApp() {
  const result = await esbuild({
    entryPoints: [resolve(root, 'lookbook/lookbook.jsx')],
    bundle: true,
    write: false,
    format: 'iife',
    platform: 'browser',
    target: ['es2019'],
    minify: true,
    jsx: 'automatic',
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'silent',
  });
  return result.outputFiles[0].text;
}

async function bundleCoreCss() {
  const result = await esbuild({
    entryPoints: [resolve(root, 'styles.css')],
    bundle: true,
    write: false,
    minify: true,
    logLevel: 'silent',
  });
  return result.outputFiles[0].text;
}

async function main() {
  const brand = arg('brand');
  const title = arg('title', brand ? brand : 'fairGround core');
  const pkgLine = arg('package', null) ??
    await readFile(resolve(root, 'package.json'), 'utf8').then((s) => {
      const p = JSON.parse(s); return `${p.name}@${p.version}`;
    });
  const themeCssPath = arg('theme-css');
  const voicePath = arg('voice');
  const note = arg('note');
  const out = resolve(process.cwd(), arg('out', resolve(root, 'dist/lookbook.html')));

  const [js, coreCss] = await Promise.all([bundleApp(), bundleCoreCss()]);
  const themeCss = themeCssPath ? await readFile(resolve(process.cwd(), themeCssPath), 'utf8') : '';
  const voiceMd = voicePath ? await readFile(resolve(process.cwd(), voicePath), 'utf8') : '';

  // <-escape so embedded content (e.g. a voice doc containing a literal
  // "</script>" in a code sample) can never truncate the inline script tag.
  const config = JSON.stringify({
    brand: brand || null,
    title,
    packageLine: pkgLine,
    voiceMd: voiceMd || null,
    note: note || null,
  }).replace(/</g, '\\u003c');

  const baseStyle = `
    html { color-scheme: light dark; }
    body { margin: 0; background: var(--bg); }
    * { box-sizing: border-box; }
    .lb-md h3, .lb-md h4 { text-transform: uppercase; letter-spacing: var(--ls-label); font-size: var(--fs-sm); margin: var(--space-6) 0 var(--space-3); }
    .lb-md h3:first-child { margin-top: 0; }
    .lb-md p, .lb-md li { line-height: var(--lh-normal); font-size: var(--fs-sm); margin: 0 0 var(--space-3); max-width: 640px; }
    .lb-md ul { padding-left: 20px; margin: 0 0 var(--space-4); }
    .lb-md code { font-family: var(--font-mono); background: var(--surface-2); padding: 1px 5px; border-radius: 4px; font-size: 0.92em; }
    .lb-md em { color: var(--text-muted); }
  `;

  const body =
    `<style>${coreCss}</style>\n` +
    (themeCss ? `<style>\n${themeCss}\n</style>\n` : '') +
    `<style>${baseStyle}</style>\n` +
    `<div id="lookbook-root"></div>\n` +
    `<script>window.__LOOKBOOK__=${config};` +
    (brand ? `document.documentElement.setAttribute('data-brand',${JSON.stringify(brand)});` : '') +
    `if(!document.documentElement.getAttribute('data-theme'))document.documentElement.setAttribute('data-theme','light');</script>\n` +
    `<script>${js}</script>`;

  const html = flag('fragment') ? body : `<!doctype html>
<html lang="en" data-theme="light"${brand ? ` data-brand="${brand}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — lookbook</title>
</head>
<body>
${body}
</body>
</html>`;

  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, 'utf8');
  console.log(`lookbook → ${out} (${Math.round(html.length / 1024)} KB)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
