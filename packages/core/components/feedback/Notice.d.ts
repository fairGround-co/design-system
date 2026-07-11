import * as React from 'react';

export interface NoticeProps {
  /** Semantic tone — maps to the status token families. @default "info" */
  tone?: 'success' | 'warning' | 'caution' | 'danger' | 'info';
  /** Optional uppercase eyebrow title, tone-inked. */
  title?: string;
  /** Icon glyph name; defaults per tone (check / warning / pending / cancel /
   *  info). Pass null to render no icon. */
  icon?: string | null;
  /** Tighter padding + smaller type for in-form/in-card placement. @default false */
  compact?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Inline/banner notice for page content — callouts, review notes, warnings.
 * In-flow and persistent (vs Toast: transient, floating). Fill mixes the tone
 * into the current surface, so it tracks light/dark and brand scopes.
 */
export function Notice(props: NoticeProps): JSX.Element;
