import React from 'react';
import { Spinner } from '../feedback/Spinner.jsx';

/**
 * PullToRefresh — mobile pull-down-to-refresh wrapper. Shows a Spinner
 * indicator when the user pulls down from the top of a scrollable list.
 *
 * Three states: idle → pulling (spinner scales with distance) →
 * refreshing (spinner animates, onRefresh called) → snaps back on resolve.
 *
 * Only activates when the scroll container is at the top. Uses touch
 * events to avoid interference with scroll behavior.
 */
export function PullToRefresh({
  onRefresh,
  children,
  disabled = false,
  pullThreshold = 60,
  style,
}) {
  const [state, setState] = React.useState('idle'); // idle | pulling | refreshing
  const [pullY, setPullY] = React.useState(0);
  const startY = React.useRef(0);
  const scrollRef = React.useRef(null);

  const handleTouchStart = (e) => {
    if (disabled || state === 'refreshing') return;
    if (scrollRef.current && scrollRef.current.scrollTop > 0) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (disabled || state === 'refreshing') return;
    if (scrollRef.current && scrollRef.current.scrollTop > 0) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) {
      // Dampen the pull (diminishing returns)
      const damped = Math.min(dy * 0.5, 120);
      setPullY(damped);
      setState('pulling');
    }
  };

  const handleTouchEnd = async () => {
    if (state !== 'pulling') return;
    if (pullY >= pullThreshold && onRefresh) {
      setState('refreshing');
      setPullY(pullThreshold);
      try {
        await onRefresh();
      } catch (e) { /* ignore */ }
    }
    setState('idle');
    setPullY(0);
  };

  const progress = Math.min(pullY / pullThreshold, 1);
  const showSpinner = state === 'pulling' || state === 'refreshing';

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Pull indicator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: pullY, overflow: 'hidden',
        transition: state === 'pulling' ? 'none' : 'height 0.3s ease',
      }}>
        {showSpinner ? (
          <div style={{
            transform: `scale(${state === 'refreshing' ? 1 : progress})`,
            opacity: state === 'refreshing' ? 1 : progress,
            transition: state === 'pulling' ? 'none' : 'transform 0.3s, opacity 0.3s',
          }}>
            <Spinner size="md" />
          </div>
        ) : null}
      </div>
      {/* Content */}
      <div
        ref={scrollRef}
        style={{
          transform: `translateY(${pullY}px)`,
          transition: state === 'pulling' ? 'none' : 'transform 0.3s ease',
          overflowY: 'auto', height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
