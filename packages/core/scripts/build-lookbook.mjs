/* ═══════════════════════════════════════════════════════════════════════
   Lookbook builder — emits a SELF-CONTAINED catalog HTML file in one of
   two flavors (DECISIONS #31):

   PUBLIC STUB (default) — tokens + components + theme icon library.
     Ships in the theme repo (docs/lookbook.html → GitHub Pages) and in
     core's own dist/ (neutral reference). Licensed fonts/logos and
     strategic guidance are OMITTED by construction.

   COMPLETE (--complete) — everything: strategic guidance (voice,
     visual foundations), licensed @font-face rules, brand marks.
     Lives in the PRIVATE brand-assets repo (docs/lookbook.html) — the
     canonical review surface. Asset files are referenced relative to
     that location by default (../fonts, ../logos), so the committed file
     stays small and renders true from a repo clone; pass --inline-assets
     to embed fonts/logos as data URIs for a fully portable single file.

   Flags:
     --brand <key>            data-brand value (nwae | lp | fairground …)
     --title <text>           display title
     --package <text>         package@version line
     --theme-css <path>       theme styles.css to inline
     --theme-icons <path>     theme icon library module (ESM exporting a
                              name→svg map); rendered in the Icons section
     --voice <path>           voice.md (strategic — complete render only)
     --foundations <path>     visual-foundations.md (strategic — complete)
     --brand-assets-dir <dir> brand-assets repo root (fonts/, logos/, docs/)
     --complete               include private modules + licensed assets
     --inline-assets          embed fonts/logos as data URIs (else relative)
     --asset-base <prefix>    relative prefix for assets (default "..")
     --note <text>            banner note
     --out <path>             output file
     --fragment               omit the <html>/<head>/<body> shell
   ═══════════════════════════════════════════════════════════════════════ */
import { build as esbuild } from 'esbuild';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, basename, extname } from 'node:path';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}
const flag = (name) => process.argv.includes(`--${name}`);
const fromCwd = (p) => resolve(process.cwd(), p);

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

/** Load a theme icon library module and return its glyph map. */
async function loadThemeIcons(path) {
  const mod = await import(pathToFileURL(fromCwd(path)).href);
  const candidate = mod.default
    ?? Object.values(mod).find((v) => v && typeof v === 'object' && !Array.isArray(v));
  if (!candidate) throw new Error(`--theme-icons: no glyph map export found in ${path}`);
  return candidate;
}

const MIME = { '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.otf': 'font/otf', '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2' };

/** Complete mode: font-face CSS from the brand-assets repo, with url()
    rewritten to the asset base (committed mode) or data URIs (portable). */
async function buildFontCss(dir, { inline, assetBase }) {
  const fontsDir = resolve(dir, 'fonts');
  let css = await readFile(resolve(fontsDir, 'fonts.css'), 'utf8');
  // Inline the lazy alpina.css @import if present (an @import would dangle
  // in the generated file).
  css = await inlineImports(css, fontsDir);
  const urls = [...css.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]);
  for (const u of new Set(urls)) {
    if (/^(data:|https?:)/.test(u)) continue;
    let replacement;
    if (inline) {
      const bytes = await readFile(resolve(fontsDir, u));
      replacement = `data:${MIME[extname(u).toLowerCase()] || 'application/octet-stream'};base64,${bytes.toString('base64')}`;
    } else {
      replacement = `${assetBase}/fonts/${u}`;
    }
    css = css.split(`url("${u}")`).join(`url("${replacement}")`)
             .split(`url('${u}')`).join(`url("${replacement}")`)
             .split(`url(${u})`).join(`url("${replacement}")`);
  }
  return css;
}

async function inlineImports(css, baseDir) {
  const imports = [...css.matchAll(/@import\s+url\(["']?([^"')]+)["']?\);?/g)];
  for (const m of imports) {
    if (/^(data:|https?:)/.test(m[1])) continue;
    const sub = await readFile(resolve(baseDir, m[1]), 'utf8');
    css = css.replace(m[0], await inlineImports(sub, dirname(resolve(baseDir, m[1]))));
  }
  return css;
}

/** Complete mode: logo list from the brand-assets repo. */
async function collectLogos(dir, { inline, assetBase }) {
  const logosDir = resolve(dir, 'logos');
  let files;
  try { files = (await readdir(logosDir)).filter((f) => MIME[extname(f).toLowerCase()]); }
  catch { return []; }
  const out = [];
  for (const f of files.sort()) {
    let src;
    if (inline) {
      const bytes = await readFile(resolve(logosDir, f));
      src = `data:${MIME[extname(f).toLowerCase()]};base64,${bytes.toString('base64')}`;
    } else {
      src = `${assetBase}/logos/${f}`;
    }
    out.push({ name: basename(f, extname(f)), src });
  }
  return out;
}

/** Provenance links (DECISIONS #31) — where each section's driving files
    live. GitHub blob URLs; private-repo links resolve only for authorized
    viewers, which is the complete render's audience anyway. */
function buildSources(brand, { themeIcons, complete }) {
  const gh = 'https://github.com/fairground-co';
  const core = `${gh}/design-system/blob/main/packages/core`;
  const sources = {
    contract:  { label: 'design-system/packages/core/tokens/contract.css', href: `${core}/tokens/contract.css` },
    components:{ label: 'design-system/packages/core/components/', href: `${gh}/design-system/tree/main/packages/core/components` },
    coreIcons: { label: 'design-system/packages/core/components/icons/glyphs.js', href: `${core}/components/icons/glyphs.js` },
    tokensJs:  { label: 'design-system/packages/core/src/tokens.js', href: `${core}/src/tokens.js` },
  };
  if (brand) {
    sources.theme = { label: `${brand}-theme/styles.css`, href: `${gh}/${brand}-theme/blob/main/styles.css` };
    if (themeIcons) sources.themeIcons = { label: `${brand}-theme/icons.js`, href: `${gh}/${brand}-theme/blob/main/icons.js` };
    if (complete) {
      const ba = `${gh}/${brand}-brand-assets`;
      sources.voice = { label: `${brand}-brand-assets/docs/voice.md (private)`, href: `${ba}/blob/main/docs/voice.md` };
      sources.foundations = { label: `${brand}-brand-assets/docs/visual-foundations.md (private)`, href: `${ba}/blob/main/docs/visual-foundations.md` };
      sources.brandAssets = { label: `${brand}-brand-assets/logos/ (private)`, href: `${ba}/tree/main/logos` };
    }
  }
  return sources;
}

async function main() {
  const brand = arg('brand');
  const complete = flag('complete');
  const inline = flag('inline-assets');
  // --inline-logos: embed logo images only, leaving font src relative —
  // for portable review copies that must not carry licensed font bytes.
  const inlineLogos = inline || flag('inline-logos');
  const assetBase = arg('asset-base', '..');
  const title = arg('title', brand ? brand : 'fairGround core');
  const pkgLine = arg('package', null) ??
    await readFile(resolve(root, 'package.json'), 'utf8').then((s) => {
      const p = JSON.parse(s); return `${p.name}@${p.version}`;
    });
  const themeCssPath = arg('theme-css');
  const themeIconsPath = arg('theme-icons');
  const brandAssetsDir = arg('brand-assets-dir') ? fromCwd(arg('brand-assets-dir')) : null;
  const voicePath = arg('voice') ?? (complete && brandAssetsDir ? resolve(brandAssetsDir, 'docs/voice.md') : null);
  const foundationsPath = arg('foundations') ?? (complete && brandAssetsDir ? resolve(brandAssetsDir, 'docs/visual-foundations.md') : null);
  const note = arg('note');
  const out = fromCwd(arg('out', resolve(root, 'dist/lookbook.html')));

  if (complete && !brandAssetsDir) {
    throw new Error('--complete requires --brand-assets-dir (fonts/, logos/, docs/)');
  }

  const [js, coreCss] = await Promise.all([bundleApp(), bundleCoreCss()]);
  const themeCss = themeCssPath ? await readFile(fromCwd(themeCssPath), 'utf8') : '';
  const themeIcons = themeIconsPath ? await loadThemeIcons(themeIconsPath) : null;
  const readOptional = async (p) => { if (!p) return null; try { return await readFile(p, 'utf8'); } catch { return null; } };
  const voiceMd = complete ? await readOptional(voicePath) : null;
  const foundationsMd = complete ? await readOptional(foundationsPath) : null;
  const fontCss = complete ? await buildFontCss(brandAssetsDir, { inline, assetBase }) : '';
  const logos = complete ? await collectLogos(brandAssetsDir, { inline: inlineLogos, assetBase }) : [];

  // <-escape so embedded content (e.g. a guidance doc containing a literal
  // "</script>" in a code sample) can never truncate the inline script tag.
  const config = JSON.stringify({
    brand: brand || null,
    title,
    packageLine: pkgLine,
    complete,
    voiceMd,
    foundationsMd,
    themeIcons,
    logos,
    note: note || null,
    sources: buildSources(brand, { themeIcons: !!themeIcons, complete }),
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
    (fontCss ? `<style>\n${fontCss}\n</style>\n` : '') +
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
<title>${title} — ${complete ? 'brand book' : 'lookbook'}</title>
</head>
<body>
${body}
</body>
</html>`;

  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, 'utf8');
  console.log(`lookbook (${complete ? 'COMPLETE' : 'public stub'}${inline ? ', inlined assets' : ''}) → ${out} (${Math.round(html.length / 1024)} KB)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
