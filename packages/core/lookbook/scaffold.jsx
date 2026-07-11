/* ═══════════════════════════════════════════════════════════════════════
   Lookbook scaffold — shared chrome and live-token plumbing used by every
   section module in lookbook/sections/. Section modules export
   `meta` ({ id, title, visibility, sources }) + a `SectionBody` component;
   the shell (lookbook.jsx) composes them per DECISIONS #31.
   ═══════════════════════════════════════════════════════════════════════ */
import React from 'react';

/** Build-time config injected by scripts/build-lookbook.mjs. */
export const LB = (typeof window !== 'undefined' && window.__LOOKBOOK__) || {};
export const BRAND = LB.brand || null;
export const COMPLETE = !!LB.complete;

/* ── live token resolution ─────────────────────────────────────────────
   Custom properties keep color-mix()/var() text in getPropertyValue, so
   colors resolve through a probe element painted with the token.        */
export const EpochContext = React.createContext(0);
export function useEpoch() {
  return React.useContext(EpochContext);
}

export function resolveColor(token) {
  const probe = document.createElement('div');
  probe.style.cssText = `position:absolute;visibility:hidden;background:var(${token})`;
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).backgroundColor;
  probe.remove();
  const m = rgb.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
  if (!m) return rgb;
  const hex = '#' + [m[1], m[2], m[3]].map((v) => Math.round(+v).toString(16).padStart(2, '0')).join('');
  return rgb.includes('rgba') ? rgb : hex;
}
export function rawValue(token) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

/* ── page scaffolding ─────────────────────────────────────────────────── */

/** Section shell — title bar + provenance subheader (DECISIONS #31: every
    section names the file(s) driving it, dimmed/small/hyperlinked). */
export function Section({ meta, lead, children }) {
  const sources = (meta.sources || [])
    .map((key) => (LB.sources || {})[key])
    .filter(Boolean);
  return (
    <section id={meta.id} style={{ marginBottom: 'var(--space-10)' }}>
      <h2 style={{
        font: 'var(--fw-extrabold) var(--fs-lg)/var(--lh-tight) var(--font-ui)',
        textTransform: 'uppercase', letterSpacing: 'var(--ls-label)',
        borderBottom: 'var(--border-w-accent) solid var(--accent)',
        paddingBottom: 'var(--space-3)', margin: '0 0 var(--space-2)',
        display: 'flex', alignItems: 'baseline', gap: 'var(--space-5)', flexWrap: 'wrap',
      }}>
        {meta.title}
        {meta.visibility === 'private' && (
          <span style={{
            font: 'var(--fw-semibold) var(--fs-2xs)/1 var(--font-mono)',
            letterSpacing: 'var(--ls-eyebrow)', color: 'var(--status-caution-ink)',
            border: 'var(--border-w-hair) solid var(--status-caution)',
            borderRadius: 'var(--r-pill)', padding: '3px 8px',
          }}>PRIVATE</span>
        )}
      </h2>
      {sources.length > 0 && (
        <div style={{
          font: '400 var(--fs-2xs)/1.6 var(--font-mono)', color: 'var(--text-faint)',
          marginBottom: 'var(--space-5)', display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap',
        }}>
          {sources.map((s) => s.href
            ? <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{ color: 'var(--text-faint)', textDecoration: 'underline dotted' }}>{s.label}</a>
            : <span key={s.label}>{s.label}</span>)}
        </div>
      )}
      {lead && <p style={{ color: 'var(--text-muted)', maxWidth: 640, margin: '0 0 var(--space-6)', lineHeight: 'var(--lh-normal)' }}>{lead}</p>}
      {children}
    </section>
  );
}

export function Card({ title, note, children, style }) {
  return (
    <div style={{
      background: 'var(--surface)', border: 'var(--border-w-std) solid var(--border)',
      borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-card)',
      padding: 'var(--space-6)', marginBottom: 'var(--space-6)', ...style,
    }}>
      {title && <div style={{
        font: 'var(--fw-semibold) var(--fs-xs)/1 var(--font-ui)', textTransform: 'uppercase',
        letterSpacing: 'var(--ls-eyebrow)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)',
      }}>{title}</div>}
      {children}
      {note && <div style={{ marginTop: 'var(--space-5)', fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', lineHeight: 'var(--lh-snug)' }}>{note}</div>}
    </div>
  );
}

export function Flow({ gap = 5, align = 'center', style, children }) {
  return <div style={{ display: 'flex', gap: `var(--space-${gap})`, alignItems: align, flexWrap: 'wrap', ...style }}>{children}</div>;
}

export function TokenChip({ token, text }) {
  useEpoch();
  const [resolved, setResolved] = React.useState('');
  React.useEffect(() => { setResolved(resolveColor(token)); });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 220 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 'var(--r-sm)', background: `var(${token})`,
        border: 'var(--border-w-hair) solid var(--border-strong)', flex: 'none',
      }} />
      <div style={{ lineHeight: 'var(--lh-snug)' }}>
        <code style={{ font: '500 var(--fs-sm)/1.3 var(--font-mono)' }}>{token}</code>
        <div className="fg-tnum" style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{resolved}{text ? ` · ${text}` : ''}</div>
      </div>
    </div>
  );
}

export function VariantStrip({ base }) {
  useEpoch();
  const [vals, setVals] = React.useState({});
  React.useEffect(() => {
    setVals({
      base: resolveColor(base), soft: resolveColor(`${base}-soft`),
      deep: resolveColor(`${base}-deep`), bright: resolveColor(`${base}-bright`),
    });
  });
  return (
    <div style={{ minWidth: 150 }}>
      <div title={`${base} · ${vals.base || ''}`} style={{ height: 30, borderRadius: '4px 4px 0 0', background: `var(${base})` }} />
      <div style={{ display: 'flex' }}>
        {['soft', 'deep', 'bright'].map((v) => (
          <div key={v} title={`${base}-${v} · ${vals[v] || ''}`} style={{ flex: 1, height: 14, background: `var(${base}-${v})` }} />
        ))}
      </div>
      <code style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{base}</code>
    </div>
  );
}

/* ── tiny markdown renderer (guidance docs) ───────────────────────────── */
export function Md({ src }) {
  const html = React.useMemo(() => {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const inline = (s) => esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
    // Wrapped source lines join into logical blocks first (blank line =
    // break; headings and list items always start their own block).
    const blocks = [];
    for (const line of (src || '').split(/\r?\n/)) {
      const isBreak = !line.trim();
      const startsBlock = /^(#{1,4})\s|^\s*[-•]\s/.test(line);
      if (isBreak) { blocks.push(null); continue; }
      if (startsBlock || !blocks.length || blocks[blocks.length - 1] === null || /^(#{1,4})\s/.test(blocks[blocks.length - 1])) {
        blocks.push(line);
      } else {
        blocks[blocks.length - 1] += ' ' + line.trim();
      }
    }
    const out = [];
    let list = false;
    for (const block of blocks.filter(Boolean)) {
      const li = block.match(/^\s*[-•]\s+(.*)/);
      if (li) { if (!list) { out.push('<ul>'); list = true; } out.push(`<li>${inline(li[1])}</li>`); continue; }
      if (list) { out.push('</ul>'); list = false; }
      const h = block.match(/^(#{1,4})\s+(.*)/);
      if (h) { out.push(`<h${h[1].length + 2}>${inline(h[2])}</h${h[1].length + 2}>`); continue; }
      out.push(`<p>${inline(block)}</p>`);
    }
    if (list) out.push('</ul>');
    return out.join('\n');
  }, [src]);
  return <div className="lb-md" dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ── demo frame ───────────────────────────────────────────────────────── */
export function Frame({ height = 'auto', width = '100%', children, style }) {
  return (
    <div style={{
      border: 'var(--border-w-hair) dashed var(--border-strong)', borderRadius: 'var(--r-md)',
      overflow: 'hidden', height, width, position: 'relative', background: 'var(--bg)', ...style,
    }}>{children}</div>
  );
}

/** Shared glyph-grid renderer used by the icon sections. */
export function GlyphGrid({ registry, Icon, showFallback = false }) {
  const names = Object.keys(registry || {});
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))', gap: 'var(--space-5)' }}>
      {names.map((n) => (
        <div key={n} style={{ textAlign: 'center', color: 'var(--text)' }}>
          <Icon name={n} title={n} size={22} glyphs={registry} />
          <div style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 4 }}>{n}</div>
        </div>
      ))}
      {showFallback && (
        <div style={{ textAlign: 'center' }}>
          <Icon name="not-a-glyph" title="unknown name fallback" size={22} />
          <div style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginTop: 4 }}>fallback</div>
        </div>
      )}
    </div>
  );
}
