import React from 'react';

/**
 * SwipeAction — swipe-to-reveal action buttons behind a card/row.
 * Common mobile pattern for check-off, edit, delete on list cards.
 *
 * Supports touch (pointer events) with momentum/snap. Swiping reveals
 * colored action buttons behind the content. If swiped past 60% of
 * width, auto-triggers the first action (quick-swipe). Snaps back
 * on release if below threshold.
 */
export function SwipeAction({
  children,
  actions = [],
  direction = 'right',
  threshold = 80,
  style,
}) {
  const wrapRef = React.useRef(null);
  const startX = React.useRef(0);
  const currentX = React.useRef(0);
  const [offset, setOffset] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);

  const totalActionWidth = actions.length * threshold;

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse') return;
    startX.current = e.clientX - offset;
    currentX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    const dir = direction === 'left' ? 1 : -1;
    // Clamp: only allow swipe in the configured direction
    const clamped = direction === 'right'
      ? Math.max(-totalActionWidth * 1.2, Math.min(0, dx))
      : Math.min(totalActionWidth * 1.2, Math.max(0, dx));
    setOffset(clamped);
  };

  const handlePointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    const wrapWidth = wrapRef.current ? wrapRef.current.offsetWidth : 300;
    const absOffset = Math.abs(offset);

    // Quick-swipe: past 60% of width → auto-trigger first action
    if (absOffset > wrapWidth * 0.6 && actions.length > 0) {
      actions[0].onClick && actions[0].onClick();
      setOffset(0);
      setRevealed(false);
      return;
    }

    // Past threshold → snap to revealed
    if (absOffset > threshold / 2) {
      const snapTo = direction === 'right' ? -totalActionWidth : totalActionWidth;
      setOffset(snapTo);
      setRevealed(true);
    } else {
      setOffset(0);
      setRevealed(false);
    }
  };

  const close = () => { setOffset(0); setRevealed(false); };

  const actionEls = actions.map((a, i) => (
    <button key={i} type="button" title={a.label}
      onClick={() => { a.onClick && a.onClick(); close(); }}
      style={{
        width: threshold, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        border: 'none', cursor: 'pointer',
        background: a.color || 'var(--accent)', color: 'var(--on-accent)',
        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '0.04em',
      }}>
      {a.icon ? <span style={{ fontSize: 20 }}>{a.icon}</span> : null}
      {a.label}
    </button>
  ));

  return (
    <div ref={wrapRef} style={{ position: 'relative', overflow: 'hidden', touchAction: 'pan-y', ...style }}>
      {/* Actions behind */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [direction === 'right' ? 'right' : 'left']: 0,
        display: 'flex', alignItems: 'stretch',
      }}>
        {actionEls}
      </div>
      {/* Content on top */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translateX(${offset}px)`,
          transition: dragging ? 'none' : 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative', zIndex: 1,
          background: 'var(--surface)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
