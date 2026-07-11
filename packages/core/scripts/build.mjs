/* ═══════════════════════════════════════════════════════════════════════
   @fairground-co/core — build pipeline (adapted from the NWA seed system).
   Produces four artifacts into dist/:
     1. index.mjs          ESM, React external            (bundler mode)
     2. core.global.js     IIFE, window.FairGroundCore    (<script> mode)
     3. core.css           styles.css with @imports inlined
     4. index.d.ts         rolled-up type barrel
   ═══════════════════════════════════════════════════════════════════════ */
import { build as esbuild } from 'esbuild';
import { build as tsup } from 'tsup';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { rm, mkdir } from 'node:fs/promises';
import { buildTypes } from './build-types.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');
const entry = resolve(root, 'src/index.js');

// esbuild treats .js as JS by default; our .js/.jsx sources use JSX, so map
// both extensions to the automatic JSX runtime.
const jsxLoader = { '.js': 'jsx', '.jsx': 'jsx' };
const jsxOpts = { jsx: 'automatic' };

async function clean() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
}

/* 1 — ESM bundle (React external) via tsup. */
async function buildEsm() {
  await tsup({
    entry: { index: entry },
    outDir: dist,
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    dts: false, // hand-assembled below (jsx + .d.ts pairs don't roll cleanly)
    sourcemap: false,
    clean: false,
    splitting: false,
    treeshake: true,
    loader: jsxLoader,
    esbuildOptions(o) {
      o.jsx = 'automatic';
      o.logOverride = { 'empty-glob': 'silent' };
    },
    silent: true,
  });
}

/* 2 — IIFE global bundle. React + ReactDOM read from window.*; nothing else
   assumes a bundler. */
async function buildGlobal() {
  await esbuild({
    entryPoints: [entry],
    outfile: resolve(dist, 'core.global.js'),
    bundle: true,
    format: 'iife',
    globalName: 'FairGroundCore',
    platform: 'browser',
    target: ['es2019'],
    loader: jsxLoader,
    ...jsxOpts,
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    // Map the bare React specifiers to the UMD globals the CDN scripts expose.
    banner: {
      js:
        'var __fg_react = (typeof window !== "undefined" && window.React) || undefined;' +
        'var __fg_react_dom = (typeof window !== "undefined" && window.ReactDOM) || undefined;',
    },
    plugins: [reactGlobalsPlugin()],
    logLevel: 'silent',
  });
}

/* esbuild plugin: resolve react / react-dom / react/jsx-runtime to tiny shims
   that read from window.* — so the IIFE never inlines React source. */
function reactGlobalsPlugin() {
  return {
    name: 'react-globals',
    setup(b) {
      const filter = /^(react|react-dom|react\/jsx-runtime)$/;
      b.onResolve({ filter }, (args) => ({ path: args.path, namespace: 'react-global' }));
      b.onLoad({ filter: /.*/, namespace: 'react-global' }, (args) => {
        if (args.path === 'react') {
          return {
            contents:
              'const R = window.React;' +
              'export default R;' +
              'export const useState = R.useState, useEffect = R.useEffect, useRef = R.useRef, useCallback = R.useCallback, useMemo = R.useMemo, useContext = R.useContext, useReducer = R.useReducer, useLayoutEffect = R.useLayoutEffect, useId = R.useId, createElement = R.createElement, Fragment = R.Fragment, forwardRef = R.forwardRef, createContext = R.createContext, memo = R.memo, cloneElement = R.cloneElement, Children = R.Children;',
            loader: 'js',
          };
        }
        if (args.path === 'react-dom') {
          return { contents: 'export default window.ReactDOM; export const createPortal = window.ReactDOM.createPortal, render = window.ReactDOM.render, flushSync = window.ReactDOM.flushSync;', loader: 'js' };
        }
        // react/jsx-runtime — use React.createElement so no bundler runtime needed.
        return {
          contents:
            'const R = window.React;' +
            'const jsx = (type, props, key) => { const { children, ...rest } = props || {}; if (key !== undefined) rest.key = key; return R.createElement(type, rest, ...(children === undefined ? [] : Array.isArray(children) ? children : [children])); };' +
            'export { jsx, jsx as jsxs };' +
            'export const Fragment = R.Fragment;',
          loader: 'js',
        };
      });
    },
  };
}

/* 3 — CSS: inline styles.css @imports. Core ships no fonts — families are
   theme values; files live in private brand-assets packages. */
async function buildCss() {
  await esbuild({
    entryPoints: [resolve(root, 'styles.css')],
    outfile: resolve(dist, 'core.css'),
    bundle: true,
    logLevel: 'silent',
  });
}

async function main() {
  await clean();
  await Promise.all([buildEsm(), buildGlobal(), buildCss()]);
  await buildTypes({ root, dist });
  console.log('@fairground-co/core build complete → dist/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
