import * as React from 'react';

export interface QRShareProps {
  /** The link to share + encode. @default current location.href */
  url?: string;
  /** Popup heading. @default "Share This Link" */
  title?: string;
  /** Button label; null → icon-only button. @default null */
  buttonLabel?: string | null;
  /** QR image edge in px. @default 200 */
  qrSize?: number;
  /** Override the QR image URL (default: qrserver.com endpoint). */
  qrSrc?: string;
  onOpen?: () => void;
  style?: React.CSSProperties;
}

/** Share button + QR popup. Icon (or labelled) button opens a centered popup with the shareable URL, a scannable QR code, and a Copy Link action. Self-contained state; closes on scrim click / Escape. */
export function QRShare(props: QRShareProps): JSX.Element;
