import React from 'react';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/**
 * PopoutPane — a generic pop-out container pane. It opens beside the primary
 * list (never replacing it), holds arbitrary `children`, and can EXTEND to
 * cover the middle/detail pane and COLLAPSE back — via a distinct ‹/› pill
 * handle on its inner edge — without hiding the main list. Wrap any content:
 * a data table, an inspector, a work queue.
 *
 * Three widths, set by state:
 *   • docked (default) — `dockedWidth`, sits between list and detail.
 *   • expanded — grows (flex) to cover the middle pane. Toggled by the › handle.
 *   • collapsed — a thin labelled strip (‹). Toggled by the ‹ handle when docked.
 *
 * Header carries the title, an expand/restore toggle, and a close ✕. Provide an
 * optional `footer`. Mount inside your flex row layout; give it a place via the
 * layout, not absolute positioning.
 */
export function PopoutPane({
  title,
  open = true,
  onClose,
  expanded,
  defaultExpanded = false,
  onToggleExpand,
  collapsible = true,
  collapsed,
  defaultCollapsed = false,
  onToggleCollapse,
  dockedWidth = 440,
  minWidth = 300,
  maxWidth = 760,
  resizable = true,
  footer = null,
  handle = true,
  children,
  style,
}) {
  const [innerExp, setInnerExp] = React.useState(defaultExpanded);
  const isExp = expanded != null ? expanded : innerExp;
  const toggleExp = () => { const n = !isExp; if (onToggleExpand) onToggleExpand(n); else setInnerExp(n); };

  const [innerCol, setInnerCol] = React.useState(defaultCollapsed);
  const isCol = collapsed != null ? collapsed : innerCol;
  const toggleCol = () => { const n = !isCol; if (onToggleCollapse) onToggleCollapse(n); else setInnerCol(n); };

  // Drag-resize the docked width (like every list panel). Disabled while expanded.
  const [width, setWidth] = React.useState(dockedWidth);
  const [dragging, setDragging] = React.useState(false);
  const paneRef = React.useRef(null);
  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = paneRef.current ? paneRef.current.offsetWidth : width;
    setDragging(true);
    const move = (ev) => setWidth(Math.max(minWidth, Math.min(maxWidth, startW + (ev.clientX - startX))));
    const up = () => { setDragging(false); document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
  };

  if (!open) return null;

  // Collapsed → a thin vertical strip that re-expands on click.
  if (collapsible && isCol) {
    return (
      <div onClick={toggleCol} title={'Expand ' + (title || 'panel')}
        style={{
          flex: '0 0 26px', minWidth: 26, alignSelf: 'stretch', display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', background: 'var(--surface)',
          borderRight: '1px solid var(--border)', color: 'var(--text-muted)', userSelect: 'none',
          fontFamily: 'var(--font-ui)', ...style,
        }}
        onMouseEnter={_canHover ? (e) => { e.currentTarget.style.color = 'var(--text)'; } : undefined}
        onMouseLeave={_canHover ? (e) => { e.currentTarget.style.color = 'var(--text-muted)'; } : undefined}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
          ›&nbsp;{title}
        </span>
      </div>
    );
  }

  const flex = isExp ? '1 1 auto' : `0 0 ${width}px`;

  const pill = (label, onClick, title2) => (
    <button type="button" onClick={onClick} title={title2} aria-label={title2}
      style={{
        position: 'absolute', top: '50%', right: -7, transform: 'translateY(-50%)',
        width: 13, height: 42, borderRadius: 'var(--r-pill)',
        background: 'var(--surface-3)', border: '1px solid var(--border)', color: 'var(--text-faint)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        fontSize: 11, fontWeight: 800, lineHeight: 1, zIndex: 4, fontFamily: 'var(--font-ui)',
        opacity: 0.9, transition: 'color var(--dur-fast), border-color var(--dur-fast), opacity var(--dur-fast)',
      }}
      onMouseEnter={_canHover ? (e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.opacity = '1'; } : undefined}
      onMouseLeave={_canHover ? (e) => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.opacity = '0.9'; } : undefined}>
      {label}
    </button>
  );

  return (
    <div ref={paneRef} style={{
      position: 'relative', flex, minWidth, display: 'flex', flexDirection: 'column', minHeight: 0,
      overflow: 'visible', background: 'var(--surface)', borderRight: '1px solid var(--border)',
      fontFamily: 'var(--font-ui)', transition: dragging ? 'none' : 'flex-basis var(--dur-base) var(--ease-ui)', ...style,
    }}>
      {/* ‹/› pill handle on the OPEN edge (right), vertically centered: collapse/restore */}
      {handle && pill(isExp ? '›' : '‹', isExp ? toggleExp : (collapsible ? toggleCol : toggleExp), isExp ? 'Restore width' : (collapsible ? 'Collapse panel' : 'Expand over pane'))}

      {/* header */}
      <div style={{ flexShrink: 0, borderBottom: '1px solid var(--border)', padding: '8px 10px 7px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 0 }}>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        <button type="button" onClick={toggleExp} title={isExp ? 'Restore width' : 'Extend over the middle pane'} aria-label={isExp ? 'Restore width' : 'Extend over the middle pane'}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 15, cursor: 'pointer', lineHeight: 1, padding: '2px 6px', borderRadius: 4 }}
          onMouseEnter={_canHover ? (e) => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text)'; } : undefined}
          onMouseLeave={_canHover ? (e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; } : undefined}>
          {isExp ? '⇥' : '⤢'}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} title="Close" aria-label="Close"
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 16, cursor: 'pointer', lineHeight: 1, padding: '2px 6px', borderRadius: 4 }}
            onMouseEnter={_canHover ? (e) => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text)'; } : undefined}
            onMouseLeave={_canHover ? (e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; } : undefined}>✕</button>
        )}
      </div>

      {/* body */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{children}</div>

      {footer ? <div style={{ flexShrink: 0, borderTop: '1px solid var(--border)' }}>{footer}</div> : null}

      {/* trailing drag-resize handle (docked only) — every list panel is resizable */}
      {resizable && !isExp && (
        <div onMouseDown={startResize} title="Drag to resize"
          style={{
            position: 'absolute', top: 0, right: -3, width: 6, height: '100%', cursor: 'col-resize', zIndex: 3,
            background: dragging ? 'var(--accent)' : 'transparent', transition: 'background var(--dur-fast)',
          }}
          onMouseEnter={_canHover ? (e) => { if (!dragging) e.currentTarget.style.background = 'var(--border-strong)'; } : undefined}
          onMouseLeave={_canHover ? (e) => { if (!dragging) e.currentTarget.style.background = 'transparent'; } : undefined} />
      )}
    </div>
  );
}
