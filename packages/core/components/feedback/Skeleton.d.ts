import * as React from 'react';

export interface SkeletonProps {
  /** @default "line" */
  variant?: 'line' | 'card' | 'tile' | 'circle';
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

/** Shimmer placeholder for loading states — pulsing rounded rectangle. */
export function Skeleton(props: SkeletonProps): JSX.Element;

export interface SkeletonCardProps {
  style?: React.CSSProperties;
}

/** Pre-composed skeleton matching a typical media-row card layout — drop-in replacement while loading. */
export function SkeletonCard(props: SkeletonCardProps): JSX.Element;
