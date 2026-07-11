import React from 'react';
import { Toast } from './Toast.jsx';

/**
 * UndoToast — a transient notification with a countdown bar and prominent
 * Undo button. For Tier 1 (reversible) actions that benefit from an undo
 * window. Auto-dismisses after `duration` ms unless the user clicks Undo.
 *
 * The countdown bar depletes left-to-right over the duration, giving the
 * user a visual sense of how much time remains.
 */

let _injectedStyle = false;
function _injectKeyframe() {
  if (_injectedStyle || typeof document === 'undefined') return;
  const st = document.createElement('style');
  st.id = 'fg-undo-toast-kf';
  st.textContent = '@keyframes fg-undo-deplete { from { width: 100%; } to { width: 0%; } }';
  document.head.appendChild(st);
  _injectedStyle = true;
}

export function UndoToast({
  message,
  undoLabel = 'Undo',
  duration = 5000,
  tone = 'info',
  onUndo,
  onExpire,
  style,
}) {
  const [visible, setVisible] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const timerRef = React.useRef(null);
  const remainRef = React.useRef(duration);
  const startRef = React.useRef(Date.now());

  React.useEffect(() => { _injectKeyframe(); }, []);

  // Auto-dismiss timer (pausable on hover)
  React.useEffect(() => {
    if (paused || !visible) return;
    startRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      setVisible(false);
      onExpire && onExpire();
    }, remainRef.current);
    return () => clearTimeout(timerRef.current);
  }, [paused, visible]);

  const handlePause = () => {
    clearTimeout(timerRef.current);
    remainRef.current = Math.max(0, remainRef.current - (Date.now() - startRef.current));
    setPaused(true);
  };
  const handleResume = () => { setPaused(false); };

  const handleUndo = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
    onUndo && onUndo();
  };

  if (!visible) return null;

  const TONE_COLORS = {
    info: 'var(--status-info)',
    success: 'var(--status-success)',
    warning: 'var(--status-warning)',
    error: 'var(--status-danger)',
  };
  const barColor = TONE_COLORS[tone] || TONE_COLORS.info;

  return (
    <div
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      style={{ position: 'relative', ...style }}
    >
      <Toast
        tone={tone}
        message={message}
        actionLabel={undoLabel}
        onAction={handleUndo}
        onClose={() => { clearTimeout(timerRef.current); setVisible(false); onExpire && onExpire(); }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 8, right: 8, height: 3,
        borderRadius: '0 0 var(--r-md) var(--r-md)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: barColor,
          opacity: 0.6,
          animation: paused ? 'none' : `fg-undo-deplete ${duration}ms linear forwards`,
          animationPlayState: paused ? 'paused' : 'running',
        }} />
      </div>
    </div>
  );
}
