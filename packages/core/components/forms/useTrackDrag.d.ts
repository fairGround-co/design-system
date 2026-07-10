import * as React from 'react';

export interface TrackDragHandlers {
  ref: React.RefObject<any>;
  style: React.CSSProperties;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
}
/** Pointer-drag selection over a horizontal track of N equal segments. */
export function useTrackDrag(count: number, onPick: (index: number) => void): TrackDragHandlers;
