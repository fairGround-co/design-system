import * as React from 'react';

export interface AuthStatusProps {
  /** Authorization scope — drives the color signal: guest=--scope-guest (its sign-in cap wears --commit, since signing in enables change), viewer=--scope-view (read-only/safe), editor=--scope-edit (write-enabled). @default "guest" */
  scope?: 'guest' | 'viewer' | 'editor';
  /** Signed-in display name (shown for viewer/editor). */
  user?: string | null;
  /** Label for the guest badge half. @default "Guest" */
  guestLabel?: string;
  /** Text on the guest action segment. @default "Sign in" */
  signInLabel?: string;
  /** Guest activator — fires when the "Sign in" segment is clicked. */
  onSignIn?: () => void;
  /** Account-menu item (signed-in): "Sign out". */
  onSignOut?: () => void;
  /** Account-menu item (signed-in): "Change user". */
  onSwitchAccount?: () => void;
  /** Drop the label — dot-only badge for tight headers. @default false */
  compact?: boolean;
  style?: React.CSSProperties;
}

/** Sign-in / guest-mode indicator AND activator, as one segmented pill (badge half + solid activator cap). Color is the capability-scope signal: guest=--scope-guest (a full "Sign in" action segment in --commit), viewer=--scope-view (safe, small caret → account menu), editor=--scope-edit (write scope, small caret → account menu). Wire write controls off the same `scope`. */
export function AuthStatus(props: AuthStatusProps): JSX.Element;
