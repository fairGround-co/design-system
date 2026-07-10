import * as React from 'react';

export interface InlineHelpProps {
  /** The help content shown in the popover. */
  text: React.ReactNode;
  /** Icon glyph name. @default "info" */
  icon?: string;
  /** Popover placement relative to the icon. @default "top" */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Max width of the popover. @default 240 */
  maxWidth?: number;
  style?: React.CSSProperties;
}

/** Contextual help popover — small muted icon button, click to toggle a help text popover. */
export function InlineHelp(props: InlineHelpProps): JSX.Element;
