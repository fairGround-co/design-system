import React from 'react';

/**
 * useTrackDrag — pointer-drag selection over a horizontal track of N equal
 * segments. Returns handler props to spread onto the track container: a press
 * or a swipe resolves the pointer's X to a segment index and calls onPick(i).
 * Uses pointer capture so a drag keeps tracking outside the element, and a ref
 * (not state) for the drag flag so dragging never forces a re-render.
 *
 * Extracted from StatusSelector so any segmented control can opt into
 * tap-or-swipe selection (e.g. the escalating SegmentedControl scale).
 *
 *   const drag = useTrackDrag(options.length, (i) => setValue(options[i].value));
 *   <div {...drag}> … </div>
 */
export function useTrackDrag(count, onPick) {
  const ref = React.useRef(null);
  const dragging = React.useRef(false);

  const pick = (clientX) => {
    const el = ref.current;
    if (!el || count < 1) return;
    const r = el.getBoundingClientRect();
    let i = Math.floor(((clientX - r.left) / r.width) * count);
    i = Math.max(0, Math.min(count - 1, i));
    onPick(i);
  };

  return {
    ref,
    style: { touchAction: 'none', userSelect: 'none' },
    onPointerDown: (e) => { e.currentTarget.setPointerCapture(e.pointerId); dragging.current = true; pick(e.clientX); },
    onPointerMove: (e) => { if (dragging.current) pick(e.clientX); },
    onPointerUp: () => { dragging.current = false; },
    onPointerCancel: () => { dragging.current = false; },
  };
}
