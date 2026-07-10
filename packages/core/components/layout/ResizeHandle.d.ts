import * as React from 'react';

export interface ResizeHandleProps {
  /** Divider axis. @default "vertical" */
  orientation?: 'vertical' | 'horizontal';
  /** Show the pop-out pill handle (‹/›). @default false */
  collapsible?: boolean;
  collapsed?: boolean;
  /** Fired during drag with the pointer delta (px) since drag start. */
  onDrag?: (deltaPx: number) => void;
  /** Fired when the collapse pill is clicked. */
  onToggle?: () => void;
  title?: string;
  style?: React.CSSProperties;
}

/** Drag-adjustable pane divider; optional collapse pill for pop-out panes. */
export function ResizeHandle(props: ResizeHandleProps): JSX.Element;
