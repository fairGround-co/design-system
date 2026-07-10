import React from 'react';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/**
 * ResizeHandle — the drag-adjustable divider between panes. A thin bar that
 * highlights to accent on hover; when `collapsible`, it carries a distinct
 * pill handle (‹ / ›) for popping the adjacent pane open/closed.
 *
 * This component is presentational — wire `onDrag` (receives the pointer delta
 * in px since drag start) and `onToggle` to your own pane sizing/collapse state.
 */
export function ResizeHandle({
  orientation = 'vertical',   // 'vertical' divider (col-resize) | 'horizontal' (row-resize)
  collapsible = false,
  collapsed = false,
  onDrag,
  onToggle,
  title = 'Drag to resize',
  style,
}) {
  const vertical = orientation === 'vertical';
  const [hover, setHover] = React.useState(false);

  function startDrag(e) {
    e.preventDefault();
    const start = vertical ? e.clientX : e.clientY;
    function move(ev) {
      const now = vertical ? ev.clientX : ev.clientY;
      onDrag && onDrag(now - start);
    }
    function up() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  return (
    <div title={title}
      onMouseDown={startDrag}
      onMouseEnter={_canHover ? () => setHover(true) : undefined}
      onMouseLeave={_canHover ? () => setHover(false) : undefined}
      style={{
        flex: `0 0 ${5}px`, cursor: vertical ? 'col-resize' : 'row-resize',
        background: hover ? 'var(--accent)' : 'var(--border)',
        transition: 'background var(--dur-fast)', position: 'relative', zIndex: 10,
        ...style,
      }}>
      {collapsible && (
        <button type="button" title={collapsed ? 'Expand' : 'Collapse'}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }}
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 16, height: 36, background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 11, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1,
            fontFamily: 'var(--font-ui)',
          }}>{collapsed ? '›' : '‹'}</button>
      )}
    </div>
  );
}
