import * as React from 'react';

export interface DangerZoneProps {
  /** Section title. @default "Danger Zone" */
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Visual wrapper for destructive action groups — danger-tinted border, recessed bg.
 */
export function DangerZone(props: DangerZoneProps): JSX.Element;
