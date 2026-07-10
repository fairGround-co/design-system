import React from 'react';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Tooltip — an accessible tooltip that replaces native title behavior with
 * a styled, reliable tooltip. Shows on hover (desktop) and long-press (mobile).
 * Uses role="tooltip" and aria-describedby for screen reader support.
 */
export function Tooltip({
  text,
  children,
  placement = 'top',
  delay = 400,
  id,
  style,
}) {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef(null);
  const pressRef = React.useRef(null);
  const tooltipId = id || React.useId?.() || ('tt-' + Math.random().toString(36).slice(2, 8));

  const show = () => setVisible(true);
  const hide = () => { clearTimeout(timerRef.current); clearTimeout(pressRef.current); setVisible(false); };
  const delayedShow = () => { timerRef.current = setTimeout(show, delay); };

  // Long-press for mobile
  const handlePointerDown = (e) => {
    if (!_isCoarse) return;
    pressRef.current = setTimeout(show, 500);
  };
  const handlePointerUp = () => {
    clearTimeout(pressRef.current);
    if (_isCoarse && visible) setTimeout(hide, 1500);
  };

  React.useEffect(() => {
    if (!visible) return;
    const onScroll = () => hide();
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, [visible]);

  const pos = {
    top:    { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
    left:   { right: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
    right:  { left: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={!_isCoarse ? delayedShow : undefined}
      onMouseLeave={!_isCoarse ? hide : undefined}
      onFocus={delayedShow}
      onBlur={hide}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      {visible ? (
        <span id={tooltipId} role="tooltip" style={{
          position: 'absolute', zIndex: 50,
          ...pos[placement] || pos.top,
          padding: '6px 10px', maxWidth: 240,
          background: 'var(--text)', color: 'var(--bg)',
          borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-pop)',
          fontSize: 12, lineHeight: 1.4, fontFamily: 'var(--font-ui)',
          fontWeight: 400, whiteSpace: 'normal', pointerEvents: 'none',
        }}>{text}</span>
      ) : null}
    </span>
  );
}
