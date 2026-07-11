import React from 'react';

/**
 * LiveRegion — a visually hidden aria-live region for announcing dynamic
 * updates to screen readers. Drop it in the app and update `message`
 * when things change (new item, status update, error).
 *
 * Visually hidden using the standard clip pattern (not display:none,
 * which prevents screen reader announcement).
 */
export function LiveRegion({
  message = '',
  assertive = false,
  style,
}) {
  return (
    <div
      role={assertive ? 'alert' : 'status'}
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      style={{
        position: 'absolute', width: 1, height: 1,
        padding: 0, margin: -1, overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap',
        border: 0, ...style,
      }}
    >
      {message}
    </div>
  );
}
