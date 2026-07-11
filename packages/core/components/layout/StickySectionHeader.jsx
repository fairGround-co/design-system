import React from 'react';

/**
 * StickySectionHeader — a section header that pins below a fixed offset
 * while its section scrolls under it, and reports when it is "stuck" so
 * the consumer can render differently in that state.
 *
 * Core owns only the MECHANISM (sticky positioning + stuck detection). The
 * consumer decides what changes when stuck, two ways:
 *   • render-prop children: `({ stuck }) => …`
 *   • the `data-stuck` attribute for CSS-only styling.
 *
 * `top` is the pin offset (number px or CSS length) and MUST match a real
 * fixed/sticky chrome height above it.
 *
 * Detection reads a zero-height sentinel placed just above the header in
 * flow, against its section container, on scroll/resize. (IntersectionObserver
 * would be lighter but is chosen against here because it fails to fire in
 * some embedded webviews; a passive scroll read behaves identically
 * everywhere and stays cheap for the handful of headers on a page.)
 */
export function StickySectionHeader({
  top = 0,
  zIndex = 30,
  as: Tag = 'div',
  children,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const sentinelRef = React.useRef(null);
  const [stuck, setStuck] = React.useState(false);
  const offset = typeof top === 'number' ? top : parseFloat(top) || 0;

  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const container = sentinel.parentElement; // the section being headed
    const measure = () => {
      const sTop = sentinel.getBoundingClientRect().top;
      const cBottom = container ? container.getBoundingClientRect().bottom : Infinity;
      // Stuck once the sentinel has scrolled above the pin line AND the
      // section still extends below it (else the header has scrolled away).
      setStuck(sTop < offset + 0.5 && cBottom > offset + 0.5);
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [offset]);

  const content = typeof children === 'function' ? children({ stuck }) : children;
  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 0 }} />
      <Tag
        ref={ref}
        data-stuck={stuck ? '' : undefined}
        style={{ position: 'sticky', top: typeof top === 'number' ? `${top}px` : top, zIndex, ...style }}
        {...rest}
      >
        {content}
      </Tag>
    </>
  );
}
