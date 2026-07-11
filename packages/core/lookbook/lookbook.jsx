/* ═══════════════════════════════════════════════════════════════════════
   @fairground-co/core — LOOKBOOK
   The theme catalog / specimen page. One self-contained HTML file per
   theme (built by scripts/build-lookbook.mjs): every token with its LIVE
   resolved value, every primitive rendered interactively, the selection
   hierarchy, and — on themed builds — the org voice guidance.

   The page reads window.__LOOKBOOK__ = { brand, title, packageLine,
   voiceMd, note } injected by the builder. When `brand` is set, a
   neutral ⇄ brand switcher appears (the neutral reference theme is
   always underneath the brand values, so both render from one file).
   ═══════════════════════════════════════════════════════════════════════ */
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button, Badge, MenuButton,
  TextInput, Textarea, Select, Checkbox, FormField, SearchInput,
  SegmentedControl, FilterChips, FilterMenu, StatusSelector, HeaderSelect,
  NumberSpinner, ColorPicker, SwipeAction, required, minLength,
  Toast, UndoToast, Spinner, Skeleton, SkeletonCard, EmptyState,
  ProgressBar, InlineHelp, Tooltip, LiveRegion, QRShare,
  AppHeader, AuthStatus, BottomTabBar, Dialog, ConfirmDialog, DangerZone,
  PopoutPane, ResizeHandle,
  Icon, CORE_ICON_GLYPHS,
  CONTRACT_VERSION, SURFACE_TOKENS, ACTION_TOKENS, STATUS_ROLES, SCOPE_ROLES,
  CAT_SLOTS, TYPE_TOKENS, SPACE_TOKENS, RADIUS_TOKENS, MOTION_TOKENS,
  LAYOUT_TOKENS, DENSITY_TOKENS, TENANT_OVERRIDE_WHITELIST,
} from '../src/index.js';

const LB = (typeof window !== 'undefined' && window.__LOOKBOOK__) || {};
const BRAND = LB.brand || null;

/* ── live token resolution ─────────────────────────────────────────────
   Custom properties keep color-mix()/var() text in getPropertyValue, so
   colors resolve through a probe element painted with the token.        */
function useEpoch() {
  return React.useContext(EpochContext);
}
const EpochContext = React.createContext(0);

function resolveColor(token) {
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
function rawValue(token) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

/* ── page scaffolding ─────────────────────────────────────────────────── */
function Section({ id, title, lead, children }) {
  return (
    <section id={id} style={{ marginBottom: 'var(--space-10)' }}>
      <h2 style={{
        font: 'var(--fw-extrabold) var(--fs-lg)/var(--lh-tight) var(--font-ui)',
        textTransform: 'uppercase', letterSpacing: 'var(--ls-label)',
        borderBottom: 'var(--border-w-accent) solid var(--accent)',
        paddingBottom: 'var(--space-3)', margin: '0 0 var(--space-5)',
      }}>{title}</h2>
      {lead && <p style={{ color: 'var(--text-muted)', maxWidth: 640, margin: '0 0 var(--space-6)', lineHeight: 'var(--lh-normal)' }}>{lead}</p>}
      {children}
    </section>
  );
}
function Card({ title, note, children, style }) {
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
function Flow({ gap = 5, align = 'center', children }) {
  return <div style={{ display: 'flex', gap: `var(--space-${gap})`, alignItems: align, flexWrap: 'wrap' }}>{children}</div>;
}
function TokenChip({ token, text }) {
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
function VariantStrip({ base }) {
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

/* ── tiny markdown renderer (voice docs) ──────────────────────────────── */
function Md({ src }) {
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

/* ── demo helpers ─────────────────────────────────────────────────────── */
function Frame({ height = 'auto', width = '100%', children, style }) {
  return (
    <div style={{
      border: 'var(--border-w-hair) dashed var(--border-strong)', borderRadius: 'var(--r-md)',
      overflow: 'hidden', height, width, position: 'relative', background: 'var(--bg)', ...style,
    }}>{children}</div>
  );
}

/* ═══ SECTIONS ═════════════════════════════════════════════════════════ */

function VoiceSection() {
  if (!LB.voiceMd) return null;
  return (
    <Section id="voice" title="Voice & content"
      lead="How this brand writes. Generic content discipline (tabular numerals, icon-with-label) lives in core; this voice is the brand's own.">
      <Card>
        <Md src={LB.voiceMd} />
      </Card>
    </Section>
  );
}

function SurfacesSection() {
  return (
    <Section id="surfaces" title="Surfaces & ink"
      lead="The stage everything else stands on. Resting surfaces carry a 1px border; --shadow-card is additive and themes may zero it.">
      <Card title="Surface ladder + ink">
        <Flow gap={6} align="stretch">
          {SURFACE_TOKENS.filter((t) => !['--overlay', '--scrim'].includes(t)).map((t) => <TokenChip key={t} token={t} />)}
        </Flow>
      </Card>
      <Card title="Backdrops — scrim vs overlay" note="A floating surface (Dialog, sheet) dims the page with --scrim; --overlay is the opaque full-bleed cover for blocking states.">
        <Flow>
          <TokenChip token="--scrim" /><TokenChip token="--overlay" />
        </Flow>
      </Card>
    </Section>
  );
}

function ActionSection() {
  useEpoch();
  return (
    <Section id="action" title="Action & signal"
      lead="--accent is THE action color and may flip per mode (this brand's signature); --scope-* capability colors and --commit stay stable across modes: view operations read --scope-view, data-changing acts read --commit.">
      <Card title="Working pair">
        <Flow gap={6}>
          <TokenChip token="--accent" text="primary actions" />
          <TokenChip token="--accent-2" text="complement" />
          <TokenChip token="--on-accent" text="ink on fills" />
          <TokenChip token="--match" text="search/filter hit" />
          <TokenChip token="--commit" text="data-changing" />
        </Flow>
      </Card>
      <Card title="Capability scope">
        <Flow gap={6}>
          {SCOPE_ROLES.map((r) => <TokenChip key={r} token={`--scope-${r}`} text={{ view: 'read-only / safe', guest: 'limited access', edit: 'write-enabled' }[r]} />)}
        </Flow>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Flow>
            {['guest', 'viewer', 'editor'].map((s) => <AuthStatus key={s} scope={s} user={s === 'guest' ? null : 'Kyle S.'} />)}
          </Flow>
        </div>
      </Card>
      <Card title="Status — reserved for state, never decorative"
        note="Each hue ships -soft / -deep / -bright derivations and a contrast-tuned -ink for text/marks.">
        <Flow gap={6} align="flex-start">
          {STATUS_ROLES.map((r) => <VariantStrip key={r} base={`--status-${r}`} />)}
        </Flow>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Flow>
            <Badge tone="success" icon="check">Success</Badge>
            <Badge tone="warning" icon="warning">Warning</Badge>
            <Badge tone="caution" icon="pending">Caution</Badge>
            <Badge tone="danger" icon="cancel">Danger</Badge>
            <Badge tone="info" icon="info">Info</Badge>
            <Badge tone="success" solid>Solid</Badge>
          </Flow>
        </div>
      </Card>
    </Section>
  );
}

function CategoricalSection() {
  return (
    <Section id="categorical" title="Categorical palette"
      lead="Discrete identities (zones, types, series) — never UI accents. Slots 1–8 are the default assignment order; 9–12 extend reach. Slate can read as neutral gray; lime has weak color-blind separation — use last. Domain names live app-side, aliased onto slots.">
      <Card title="12 slots × base / soft / deep / bright">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--space-5)' }}>
          {Array.from({ length: CAT_SLOTS }, (_, i) => <VariantStrip key={i} base={`--cat-${i + 1}`} />)}
        </div>
      </Card>
      <Card title="As identity chips">
        <Flow>
          {Array.from({ length: CAT_SLOTS }, (_, i) => <Badge key={i} cat={i + 1}>Slot {i + 1}</Badge>)}
        </Flow>
      </Card>
    </Section>
  );
}

function SelectionSection() {
  const [sel, setSel] = React.useState(1);
  const rows = ['Row one — click me', 'Row two — click me', 'Row three (matches a filter)'];
  const rail = true;
  return (
    <Section id="selection" title="Selection hierarchy"
      lead="Strict three levels so cues never collide: SELECTED (accent border + tint) > MATCH (ring in the complementary hue) > HOVER (surface-2 tint). Two committed selection variants: rail (inset edge bar) and ring (accent outline).">
      <Flow gap={6} align="flex-start">
        {['rail', 'ring'].map((variant) => (
          <Card key={variant} title={`${variant} variant`} style={{ flex: '1 1 280px', marginBottom: 0 }}>
            {rows.map((label, i) => {
              const selected = sel === i;
              const matched = i === 2;
              return (
                <div key={i} onClick={() => setSel(i)}
                  onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = 'var(--surface-2)'; }}
                  onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = selected ? 'var(--select-bg)' : 'transparent'; }}
                  style={{
                    padding: 'var(--cell-pad-y) var(--cell-pad-x)', minHeight: 'var(--row-h)',
                    display: 'flex', alignItems: 'center', cursor: 'pointer',
                    borderRadius: 'var(--r-sm)', marginBottom: 'var(--space-2)',
                    background: selected ? 'var(--select-bg)' : 'transparent',
                    boxShadow: [
                      selected && variant === 'rail' ? 'inset 3px 0 0 0 var(--select-accent)' : null,
                      selected && variant === 'ring' ? 'inset 0 0 0 1.5px var(--select-accent)' : null,
                      matched && !selected ? 'var(--ring-match)' : null,
                    ].filter(Boolean).join(', ') || 'none',
                    transition: 'background var(--dur-fast) var(--ease-ui)',
                  }}>
                  <span style={{ fontSize: 'var(--font-size-data)' }}>{label}</span>
                  {matched && <Icon name="search" size={14} title="filter match" style={{ marginLeft: 'auto', color: 'var(--match)' }} />}
                </div>
              );
            })}
          </Card>
        ))}
      </Flow>
    </Section>
  );
}

function TypographySection() {
  useEpoch();
  const fams = ['--font-ui', '--font-display', '--font-editorial', '--font-mono'];
  const sizes = ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl'];
  return (
    <Section id="type" title="Typography"
      lead={`Families are theme values; font FILES ship only via the private brand-assets package${BRAND ? ' — on this public page, brand faces fall back to system stacks (the field tools boot that way on purpose)' : ''}. Numbers are mono + tabular (.fg-tnum) wherever data aligns.`}>
      <Card title="Family roles">
        {fams.map((t) => (
          <div key={t} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 'var(--space-4)' }}>
            <code style={{ font: '500 var(--fs-xs)/1 var(--font-mono)', color: 'var(--text-muted)', width: 130, flex: 'none' }}>{t}</code>
            <span style={{ fontFamily: `var(${t})`, fontSize: 'var(--fs-lg)' }}>
              {t === '--font-mono' ? '0123456789 · 40×28 · 12:00:00' : 'Joyful but organized, quick brown fox'}
            </span>
          </div>
        ))}
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>{rawValue('--font-display') === rawValue('--font-ui') ? '--font-display aliases --font-ui in the neutral reference.' : ''}</div>
      </Card>
      <Card title="Size ramp · weights · casing">
        {sizes.map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 'var(--space-2)' }}>
            <code className="fg-tnum" style={{ font: '500 var(--fs-xs)/1 var(--font-mono)', color: 'var(--text-muted)', width: 130, flex: 'none' }}>--fs-{s} · {rawValue(`--fs-${s}`)}</code>
            <span style={{ fontSize: `var(--fs-${s})`, lineHeight: 'var(--lh-tight)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Parade lineup ready</span>
          </div>
        ))}
        <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'baseline' }}>
          {['book', 'medium', 'semibold', 'bold', 'extrabold', 'black'].map((w) => (
            <span key={w} style={{ fontWeight: `var(--fw-${w})` }}>{w}</span>
          ))}
          <span style={{ textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-extrabold)' }}>Uppercase headers, tracked</span>
          <span style={{ textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Eyebrow tracking</span>
        </div>
      </Card>
    </Section>
  );
}

function GeometrySection() {
  useEpoch();
  return (
    <Section id="geometry" title="Space · radius · elevation · motion">
      <Card title="Spacing scale (4px base, dense)">
        <Flow gap={4} align="flex-end">
          {SPACE_TOKENS.map((t) => (
            <div key={t} style={{ textAlign: 'center' }}>
              <div style={{ width: 22, height: `max(${rawValue(t) || '0px'}, 1px)`, background: 'var(--accent)', borderRadius: 2, margin: '0 auto' }} />
              <code className="fg-tnum" style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{t.replace('--space-', '')}</code>
            </div>
          ))}
        </Flow>
      </Card>
      <Flow gap={6} align="stretch">
        <Card title="Radius" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <Flow>
            {RADIUS_TOKENS.map((t) => (
              <div key={t} style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 44, background: 'var(--surface-2)', border: 'var(--border-w-std) solid var(--border-strong)', borderRadius: `var(${t})` }} />
                <code style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{t}</code>
              </div>
            ))}
          </Flow>
        </Card>
        <Card title="Elevation — border first, shadow additive" style={{ flex: '1 1 300px', marginBottom: 0 }}
          note="--shadow-card may be zeroed by dark themes; --shadow-pop is always on for floating layers.">
          <Flow gap={6}>
            <div style={{ width: 120, height: 64, borderRadius: 'var(--r-sm)', background: 'var(--surface)', border: 'var(--border-w-std) solid var(--border)', boxShadow: 'var(--shadow-card)', display: 'grid', placeItems: 'center', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>resting card</div>
            <div style={{ width: 120, height: 64, borderRadius: 'var(--r-md)', background: 'var(--surface)', border: 'var(--border-w-hair) solid var(--border)', boxShadow: 'var(--shadow-pop)', display: 'grid', placeItems: 'center', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>floating pop</div>
          </Flow>
        </Card>
        <Card title="Motion" style={{ flex: '1 1 240px', marginBottom: 0 }}
          note="No bounce, no decorative loops; prefers-reduced-motion zeroes every duration.">
          <div className="fg-tnum" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-sm)', lineHeight: 1.8 }}>
            {MOTION_TOKENS.map((t) => <div key={t}>{t} · {rawValue(t)}</div>)}
          </div>
        </Card>
      </Flow>
    </Section>
  );
}

function DensitySection({ density }) {
  useEpoch();
  return (
    <Section id="density" title="Density"
      lead="One axis, two stops — remap [data-density=compact] on any scope. Interactive targets never shrink below --touch-min (44px) on coarse pointers.">
      <Card title={`Current: ${density}`} note="Toggle density in the toolbar above — the table below re-reads the live values.">
        <table style={{ borderCollapse: 'collapse', fontSize: 'var(--font-size-data)' }} className="fg-tnum">
          <thead>
            <tr>{['token', 'resolved now'].map((h) => <th key={h} style={{ textAlign: 'left', padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-std) solid var(--border-strong)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {DENSITY_TOKENS.map((t) => (
              <tr key={t}>
                <td style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', fontFamily: 'var(--font-mono)' }}>{t}</td>
                <td style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', fontFamily: 'var(--font-mono)' }}>{rawValue(t)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Section>
  );
}

function DatavizSection() {
  return (
    <Section id="dataviz" title="Dataviz"
      lead="Series default to the categorical slots; sequential ramps derive from --accent; planned-vs-actual paths split drift into behind (alarm) and ahead (calm positive — good news must not read as an alarm).">
      <Card title="Series 1–12">
        <Flow gap={2}>
          {Array.from({ length: 12 }, (_, i) => <div key={i} title={`--viz-series-${i + 1}`} style={{ width: 34, height: 22, borderRadius: 3, background: `var(--viz-series-${i + 1})` }} />)}
        </Flow>
      </Card>
      <Flow gap={6} align="stretch">
        <Card title="Sequential ramp" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <div style={{ display: 'flex', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
            {Array.from({ length: 7 }, (_, i) => <div key={i} title={`--viz-seq-${i + 1}`} style={{ flex: 1, height: 30, background: `var(--viz-seq-${i + 1})` }} />)}
          </div>
        </Card>
        <Card title="Diverging anchors" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <div style={{ display: 'flex', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
            {['neg', 'mid', 'pos'].map((k) => <div key={k} title={`--viz-div-${k}`} style={{ flex: 1, height: 30, background: `var(--viz-div-${k})` }} />)}
          </div>
        </Card>
        <Card title="Planned vs actual + drift" style={{ flex: '2 1 320px', marginBottom: 0 }}>
          <svg viewBox="0 0 320 90" style={{ width: '100%', maxWidth: 420, display: 'block' }} aria-label="Planned vs actual drift sample">
            <path d="M10 70 L90 55 L170 45 L310 20" fill="none" stroke="var(--path-planned)" strokeWidth="2" strokeDasharray="6 5" />
            <path d="M10 70 L90 60 L170 62 L230 50" fill="none" stroke="var(--path-actual)" strokeWidth="2.5" />
            <path d="M90 55 L170 45 L170 62 L90 60 Z" fill="var(--path-drift-behind)" opacity="0.25" />
            <path d="M170 45 L230 33 L230 50 L170 62 Z" fill="var(--path-drift-behind)" opacity="0.25" />
            <text x="240" y="30" fontSize="10" fill="var(--viz-axis-ink)" fontFamily="var(--font-mono)">planned</text>
            <text x="238" y="55" fontSize="10" fill="var(--path-actual)" fontFamily="var(--font-mono)">actual</text>
          </svg>
          <Flow gap={4}>
            <TokenChip token="--path-drift-behind" text="behind plan" />
            <TokenChip token="--path-drift-ahead" text="ahead of plan" />
          </Flow>
        </Card>
      </Flow>
    </Section>
  );
}

function ButtonsSection() {
  return (
    <Section id="buttons" title="Buttons & menus"
      lead="Pick the variant by what the click DOES: primary = the theme's action color; commit = data-changing/final (use sparingly); neutral/ghost for low emphasis. Solid fills carry the contrast — no outlines on actions.">
      <Card title="Button">
        <Flow>
          <Button variant="primary">Primary</Button>
          <Button variant="commit">Commit</Button>
          <Button variant="neutral">Neutral</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" icon={<Icon name="share" size={16} />}>With icon</Button>
          <Button variant="neutral" disabled>Disabled</Button>
          <Button variant="commit" confirm="This intercepts the click with a ConfirmDialog.">confirm prop</Button>
        </Flow>
      </Card>
      <Card title="MenuButton — plain + split">
        <Flow>
          <MenuButton items={[{ label: 'CSV' }, { label: 'GeoJSON' }, { label: 'PDF', disabled: true }]}>Download</MenuButton>
          <MenuButton split variant="commit" onClick={() => {}} items={[{ label: 'Publish draft' }, { label: 'Unpublish', danger: true }]}>Publish</MenuButton>
        </Flow>
      </Card>
    </Section>
  );
}

function FormsSection() {
  const [name, setName] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [type, setType] = React.useState('walk');
  const [ok, setOk] = React.useState(true);
  const [part, setPart] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [n, setN] = React.useState(4);
  const [stackN, setStackN] = React.useState(2);
  const [color, setColor] = React.useState('var(--cat-5)');
  return (
    <Section id="forms" title="Forms"
      lead="Inputs fill with --surface-2 and focus with the view-scope ring; errors are --status-danger; the required asterisk is --commit. FormField auto-validates when given value + rules.">
      <Card title="Text · select · checkbox">
        <Flow gap={6} align="flex-start">
          <FormField label="Group name" required value={name} rules={[required(), minLength(3)]} hint="Auto-validating: type fewer than 3 chars">
            <TextInput value={name} onChange={setName} placeholder="e.g. Marching Band" />
          </FormField>
          <FormField label="Type">
            <Select value={type} onChange={setType} options={[{ value: 'walk', label: 'Walking' }, { value: 'float', label: 'Float' }, { value: 'truck', label: 'Truck' }]} />
          </FormField>
          <FormField label="With icon">
            <TextInput icon="search" placeholder="Leading icon" />
          </FormField>
          <FormField label="Error state">
            <TextInput error value="bad value" onChange={() => {}} />
          </FormField>
        </Flow>
        <Flow gap={6} style={{ marginTop: 'var(--space-6)' }}>
          <Checkbox checked={ok} onChange={setOk} label="Ready to stage" />
          <Checkbox indeterminate={!part} checked={part} onChange={setPart} label="Select all (indeterminate)" />
          <Checkbox disabled label="Disabled" />
        </Flow>
        <div style={{ marginTop: 'var(--space-6)', maxWidth: 420 }}>
          <FormField label="Notes">
            <Textarea value={notes} onChange={setNotes} rows={3} maxLength={120} placeholder="Multiline with counter…" />
          </FormField>
        </div>
      </Card>
      <Card title="Search · steppers · palette picker">
        <Flow gap={6}>
          <SearchInput value={q} onChange={setQ} placeholder="Search the list…" />
          <NumberSpinner value={n} onChange={setN} min={0} max={20} aria-label="Count" />
          <NumberSpinner layout="stacked" accent value={stackN} onChange={setStackN} min={0} max={9} aria-label="Slots" />
          <ColorPicker value={color} onChange={setColor} />
        </Flow>
      </Card>
    </Section>
  );
}

function SelectorsSection() {
  const [seg, setSeg] = React.useState('all');
  const [tab, setTab] = React.useState('list');
  const [level, setLevel] = React.useState('2');
  const [chips, setChips] = React.useState(['a']);
  const [menuVals, setMenuVals] = React.useState(['done', 'pending']);
  const [status, setStatus] = React.useState('done');
  const [page, setPage] = React.useState('lineup');
  return (
    <Section id="selectors" title="Selectors & filters"
      lead="View operations read --scope-view in every mode — filtering is a view op, not a data change. SegmentedControl is the primary selector; FilterMenu takes over past ~4 facets; StatusSelector adds per-segment semantic color and tap-or-swipe selection.">
      <Card title="SegmentedControl — enclosed · tabs · progressive">
        <Flow gap={6}>
          <SegmentedControl options={[{ value: 'all', label: 'All' }, { value: 'open', label: 'Open' }, { value: 'done', label: 'Done' }]} value={seg} onChange={setSeg} />
          <SegmentedControl variant="tabs" options={[{ value: 'list', label: 'List' }, { value: 'map', label: 'Map' }, { value: 'both', label: 'Both' }]} value={tab} onChange={setTab} />
          <SegmentedControl progressive options={[{ value: '1', label: 'Basic' }, { value: '2', label: 'Standard' }, { value: '3', label: 'Full' }]} value={level} onChange={setLevel} />
        </Flow>
      </Card>
      <Card title="FilterChips (empty = all) · FilterMenu (explicit set)">
        <Flow gap={6}>
          <FilterChips
            options={[{ value: 'a', label: 'Confirmed', tone: 'success', icon: 'check' }, { value: 'b', label: 'Pending', tone: 'caution', icon: 'pending' }, { value: 'c', label: 'Cancelled', tone: 'danger', icon: 'cancel' }]}
            value={chips} onChange={setChips}
          />
          <FilterMenu noun="status" nounPlural="statuses"
            options={[
              { value: 'done', label: 'Done', color: 'var(--status-success-ink)', icon: 'check' },
              { value: 'pending', label: 'Pending', color: 'var(--status-caution-ink)', icon: 'pending' },
              { value: 'blocked', label: 'Blocked', color: 'var(--status-danger-ink)', icon: 'ban' },
              { value: 'na', label: 'No contact', color: 'var(--text-faint)', icon: 'nocontact' },
            ]}
            value={menuVals} onChange={setMenuVals}
          />
        </Flow>
      </Card>
      <Card title="StatusSelector — tap or swipe across the track">
        <StatusSelector value={status} onChange={setStatus} />
      </Card>
      <Card title="HeaderSelect — nav that reads as the H1">
        <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-extrabold)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)' }}>
          <HeaderSelect value={page} onChange={setPage}
            options={[
              { label: 'Admin', options: [{ value: 'lineup', label: 'Lineup' }, { value: 'checkin', label: 'Check-in' }] },
              { label: 'Public', options: [{ value: 'map', label: 'Map' }] },
            ]} />
        </div>
      </Card>
    </Section>
  );
}

function FeedbackSection() {
  const [undoKey, setUndoKey] = React.useState(0);
  const [announced, setAnnounced] = React.useState('');
  return (
    <Section id="feedback" title="Feedback & loading">
      <Card title="Toast tones">
        <Flow gap={4} align="flex-start">
          <Toast tone="info" message="Synced 12s ago" onClose={() => {}} />
          <Toast tone="success" title="Published" message="Lineup is live" onClose={() => {}} />
          <Toast tone="warning" message="Working offline" actionLabel="Retry" onAction={() => {}} />
          <Toast tone="error" message="Save failed" onClose={() => {}} />
        </Flow>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Flow>
            <Button variant="neutral" size="sm" onClick={() => setUndoKey((k) => k + 1)}>Trigger UndoToast</Button>
            {undoKey > 0 && <UndoToast key={undoKey} message="Entry deleted" duration={5000} onUndo={() => {}} />}
          </Flow>
        </div>
      </Card>
      <Card title="Spinner · Skeleton · ProgressBar" note="Brand preset animations (flag spinners, gradient bars) live app-side and pass in via the colors prop — shown here with categorical slots.">
        <Flow gap={7}>
          <Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" />
          <Spinner size="md" colors={['var(--cat-1)', 'var(--cat-3)', 'var(--cat-5)', 'var(--cat-7)']} label="Cycling demo" />
        </Flow>
        <Flow gap={7} style={{ marginTop: 'var(--space-6)' }} align="flex-start">
          <div style={{ width: 220 }}>
            <Skeleton width="70%" /><div style={{ height: 8 }} /><Skeleton width="45%" /><div style={{ height: 12 }} /><SkeletonCard />
          </div>
          <div style={{ width: 240, display: 'grid', gap: 12 }}>
            <ProgressBar value={0.62} showPercent />
            <ProgressBar indeterminate />
            <ProgressBar value={0.8} colors={['var(--cat-4)', 'var(--cat-9)', 'var(--cat-7)']} />
          </div>
        </Flow>
      </Card>
      <Card title="Tooltip · InlineHelp · LiveRegion · QRShare">
        <Flow gap={7}>
          <Tooltip text="Hover on desktop, long-press on mobile"><span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>tooltip trigger</span></Tooltip>
          <span>Field guidance <InlineHelp text="Click-to-toggle help popover, sized for a phone in sunlight." /></span>
          <Button variant="neutral" size="sm" onClick={() => setAnnounced(`Checked in at ${new Date().toLocaleTimeString()}`)}>Announce to screen readers</Button>
          <LiveRegion message={announced} />
          {announced && <code style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>aria-live: “{announced}”</code>}
          <QRShare buttonLabel="Share" title="Share This Page" />
        </Flow>
      </Card>
      <Card title="EmptyState">
        <EmptyState icon="list" title="No entries yet" message="Content lists start here." action="Add the first one" onAction={() => {}} size="sm" />
      </Card>
    </Section>
  );
}

function LayoutSection() {
  const [dialog, setDialog] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [scope, setScope] = React.useState('viewer');
  const [page, setPage] = React.useState('lineup');
  const [tab, setTab] = React.useState('map');
  const [paneW, setPaneW] = React.useState(200);
  const dragStart = React.useRef(200);
  return (
    <Section id="layout" title="Layout & shell"
      lead="Navigation lives in the header (the selector IS the nav); multi-pane views drag-resize everywhere; below the mobile breakpoint the layout collapses to one pane switched by a bottom tab bar; dialogs anchor as bottom sheets on phones.">
      <Card title="AppHeader — year (informational) · wordmark (ink) · selector (context-changing) · AuthStatus">
        <Frame>
          <AppHeader year="2026" name={BRAND ? 'NWA PRIDE' : 'FAIRGROUND'} clock="9:41 AM"
            select={{ value: page, onChange: setPage, options: [{ value: 'lineup', label: 'Lineup' }, { value: 'script', label: 'Script' }, { value: 'checkin', label: 'Check-in' }] }}
            right={<AuthStatus scope={scope} user={scope === 'guest' ? null : 'Kyle S.'} onSignIn={() => setScope('viewer')} onSignOut={() => setScope('guest')} onSwitchAccount={() => {}} />}
          />
        </Frame>
        <div style={{ marginTop: 'var(--space-4)' }}>
          <SegmentedControl options={[{ value: 'guest', label: 'Guest' }, { value: 'viewer', label: 'View-only' }, { value: 'editor', label: 'Editor' }]} value={scope} onChange={setScope} />
        </div>
      </Card>
      <Card title="Panes — ResizeHandle + PopoutPane" note="Drag the divider; the pop-out extends over the middle pane or collapses to a strip via its ‹/› pill.">
        <Frame height={260}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: paneW, minWidth: 'var(--pane-min-w)', background: 'var(--surface)', padding: 'var(--space-5)', fontSize: 'var(--font-size-data)' }}>
              {['Alpha Group', 'Beta Crew', 'Gamma Riders'].map((g, i) => (
                <div key={g} style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', minHeight: 'var(--row-h)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge cat={i + 1}>{i + 1}</Badge>{g}
                </div>
              ))}
            </div>
            <div onPointerDown={() => { dragStart.current = paneW; }}>
              <ResizeHandle onDrag={(d) => setPaneW(Math.max(140, Math.min(320, dragStart.current + d)))} title="Drag to resize" />
            </div>
            <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--text-faint)', fontSize: 'var(--fs-sm)' }}>content pane</div>
            <PopoutPane title="Inspector" dockedWidth={180} minWidth={140} maxWidth={260} footer={<span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>footer slot</span>}>
              <div style={{ padding: 'var(--space-5)', fontSize: 'var(--font-size-data)' }}>Any content — tables, detail forms, check-in lists.</div>
            </PopoutPane>
          </div>
        </Frame>
      </Card>
      <Card title="Mobile shell — BottomTabBar (static demo)" note="SwipeAction and PullToRefresh are touch-only; try this page on a phone.">
        <Frame width={320} height={120} style={{ margin: '0 auto' }}>
          <div style={{ display: 'grid', placeItems: 'center', height: 64, color: 'var(--text-faint)', fontSize: 'var(--fs-sm)' }}>single pane ≤ 760px</div>
          <BottomTabBar position="static" value={tab} onChange={setTab}
            tabs={[{ value: 'map', label: 'Map', icon: 'map' }, { value: 'list', label: 'List', icon: 'list' }, { value: 'search', label: 'Search', icon: 'search' }]} />
        </Frame>
      </Card>
      <Card title="Dialog · ConfirmDialog · DangerZone">
        <Flow>
          <Button variant="neutral" onClick={() => setDialog(true)}>Open Dialog</Button>
          <Button variant="neutral" onClick={() => setConfirm(true)}>Typed confirmation</Button>
        </Flow>
        <Dialog open={dialog} title="A floating surface" onClose={() => setDialog(false)}
          footer={<Button variant="primary" onClick={() => setDialog(false)}>Done</Button>}>
          <p style={{ marginTop: 0 }}>Scrim + centered card, focus trap, Escape/scrim close; anchors as a bottom sheet ≤760px. Modals are reserved for destructive/committing acts — routine editing happens in place.</p>
        </Dialog>
        <ConfirmDialog open={confirm} variant="danger" title="Delete everything?" message='Type DELETE to enable the confirm button.' requireTyped="DELETE" onConfirm={() => setConfirm(false)} onCancel={() => setConfirm(false)} />
        <div style={{ marginTop: 'var(--space-6)', maxWidth: 460 }}>
          <DangerZone title="Danger zone">
            <Flow>
              <Button variant="commit" confirm={{ message: 'This one is guarded too.', variant: 'danger' }}>Destructive act</Button>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Destructive actions group here, each behind a confirm.</span>
            </Flow>
          </DangerZone>
        </div>
      </Card>
    </Section>
  );
}

function IconsSection() {
  const names = Object.keys(CORE_ICON_GLYPHS);
  return (
    <Section id="icons" title="Icons"
      lead="The generic base registry — 24×24, 1.75px stroke, round caps, currentColor. Apps inject domain registries via the glyphs prop (same-name entries win); unknown names render a dashed placeholder. Standalone icons always carry a title.">
      <Card title={`CORE_ICON_GLYPHS — ${names.length} glyphs`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))', gap: 'var(--space-5)' }}>
          {names.map((n) => (
            <div key={n} style={{ textAlign: 'center', color: 'var(--text)' }}>
              <Icon name={n} title={n} size={22} />
              <div style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 4 }}>{n}</div>
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            <Icon name="not-a-glyph" title="unknown name fallback" size={22} />
            <div style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginTop: 4 }}>fallback</div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function TenantSection() {
  return (
    <Section id="tenant" title="Tenant runtime overrides"
      lead="Multi-tenant apps may override ONLY the whitelist below at runtime on a [data-tenant] scope — surfaces, ink, status, spacing, type, and motion stay locked so accessibility and layout invariants hold.">
      <Card>
        <code style={{ fontSize: 'var(--fs-xs)', fontFamily: 'var(--font-mono)', lineHeight: 1.9, color: 'var(--text-muted)', wordBreak: 'break-word' }}>
          {TENANT_OVERRIDE_WHITELIST.join(' · ')}
        </code>
      </Card>
    </Section>
  );
}

/* ═══ APP ══════════════════════════════════════════════════════════════ */

const NAV = [
  ['voice', 'Voice'], ['surfaces', 'Surfaces'], ['action', 'Action & status'],
  ['categorical', 'Categorical'], ['selection', 'Selection'], ['type', 'Type'],
  ['geometry', 'Space & motion'], ['density', 'Density'], ['dataviz', 'Dataviz'],
  ['buttons', 'Buttons'], ['forms', 'Forms'], ['selectors', 'Selectors'],
  ['feedback', 'Feedback'], ['layout', 'Layout'], ['icons', 'Icons'], ['tenant', 'Tenant'],
].filter(([id]) => id !== 'voice' || LB.voiceMd);

function App() {
  const [brandOn, setBrandOn] = React.useState(!!BRAND);
  const [mode, setMode] = React.useState(document.documentElement.getAttribute('data-theme') || 'light');
  const [density, setDensity] = React.useState('comfortable');
  const [epoch, setEpoch] = React.useState(0);

  React.useEffect(() => {
    const el = document.documentElement;
    if (BRAND && brandOn) el.setAttribute('data-brand', BRAND);
    else el.removeAttribute('data-brand');
    el.setAttribute('data-theme', mode);
    if (density === 'compact') el.setAttribute('data-density', 'compact');
    else el.removeAttribute('data-density');
    setEpoch((e) => e + 1); // re-resolve every live token readout
  }, [brandOn, mode, density]);

  return (
    <EpochContext.Provider value={epoch}>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-base)' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--surface)', borderBottom: 'var(--border-w-std) solid var(--border)', boxShadow: 'var(--shadow-header)' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'var(--space-4) var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 'var(--fw-extrabold)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', fontSize: 'var(--fs-md)' }}>
                <span style={{ color: 'var(--scope-view)' }}>{LB.title || 'fairGround core'}</span> <span>lookbook</span>
              </div>
              <div className="fg-tnum" style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {LB.packageLine || ''}{LB.packageLine ? ' · ' : ''}contract v{CONTRACT_VERSION}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap', marginLeft: 'auto' }}>
              {BRAND && (
                <SegmentedControl options={[{ value: 'on', label: LB.title || BRAND }, { value: 'off', label: 'neutral reference' }]}
                  value={brandOn ? 'on' : 'off'} onChange={(v) => setBrandOn(v === 'on')} />
              )}
              <SegmentedControl options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} value={mode} onChange={setMode} />
              <SegmentedControl options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value={density} onChange={setDensity} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'var(--space-7) var(--space-6) var(--space-10)' }}>
          {LB.note && (
            <div style={{ border: 'var(--border-w-std) solid var(--status-caution)', background: 'var(--status-caution-soft)', color: 'var(--text)', borderRadius: 'var(--r-sm)', padding: 'var(--space-5) var(--space-6)', marginBottom: 'var(--space-7)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)' }}>
              {LB.note}
            </div>
          )}
          <nav style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} style={{ color: 'var(--scope-view)', textDecoration: 'none', fontSize: 'var(--fs-sm)', padding: '4px 10px', border: 'var(--border-w-hair) solid var(--border)', borderRadius: 'var(--r-pill)', background: 'var(--surface)' }}>{label}</a>
            ))}
          </nav>

          <VoiceSection />
          <SurfacesSection />
          <ActionSection />
          <CategoricalSection />
          <SelectionSection />
          <TypographySection />
          <GeometrySection />
          <DensitySection density={density} />
          <DatavizSection />
          <ButtonsSection />
          <FormsSection />
          <SelectorsSection />
          <FeedbackSection />
          <LayoutSection />
          <IconsSection />
          <TenantSection />

          <div style={{ borderTop: 'var(--border-w-hair) solid var(--border)', paddingTop: 'var(--space-6)', fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', lineHeight: 'var(--lh-normal)' }}>
            Generated by @fairground-co/core scripts/build-lookbook.mjs · every swatch and value on this page is read live
            from the CSS custom properties, so what you see is exactly what the packages ship.
          </div>
        </div>
      </div>
    </EpochContext.Provider>
  );
}

const rootEl = document.getElementById('lookbook-root');
createRoot(rootEl).render(<App />);
