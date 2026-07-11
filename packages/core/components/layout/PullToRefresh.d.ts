import * as React from 'react';

export interface PullToRefreshProps {
  /** Async callback fired when the user completes a pull. The spinner stays until this resolves. */
  onRefresh?: () => Promise<void>;
  children?: React.ReactNode;
  /** Disable pull-to-refresh. @default false */
  disabled?: boolean;
  /** Distance in px the user must pull before triggering. @default 60 */
  pullThreshold?: number;
  style?: React.CSSProperties;
}

/**
 * Mobile pull-down-to-refresh wrapper. Shows a Spinner when the user
 * pulls down from the top of a scrollable list.
 */
export function PullToRefresh(props: PullToRefreshProps): JSX.Element;
