import type { ReactNode } from "react";
import type { ColorScheme } from "@minerva/core";

/** Screen corner / edge where the toast stack is shown */
export type ToastPosition =
  | "topRight"
  | "topLeft"
  | "topCenter"
  | "bottomRight"
  | "bottomLeft"
  | "bottomCenter";

/** Button rendered inside a toast; activating it also closes the toast */
export interface ToastAction {
  /** Visible text of the button */
  label: ReactNode;
  /** Called when the button is activated, before the toast closes */
  onClick: () => void;
}

/** Options of a toast */
export interface ToastOptions {
  /**
   * Identifier of the toast; generated when omitted. Showing a toast with the
   * id of a visible one replaces it (and restarts its timer) instead of
   * stacking a duplicate
   */
  id?: string | number;
  /**
   * Semantic color of the toast; sets its accent, icon and ARIA role
   * ("danger" is announced as an alert, the others as a status)
   * @default "info"
   */
  color?: Extract<ColorScheme, "info" | "success" | "warning" | "danger">;
  /**
   * Shows a spinner instead of the icon and keeps the toast open (duration
   * defaults to 0) until it is updated or dismissed; announced as a status
   * @default false
   */
  loading?: boolean;
  /** Main text */
  title?: ReactNode;
  /** Secondary text under the title */
  description?: ReactNode;
  /**
   * Time in milliseconds before the toast closes automatically; 0 keeps it
   * open. Loading toasts default to 0
   * @default 4000
   */
  duration?: number;
  /**
   * Replaces the color icon (or the loading spinner); null hides it
   */
  icon?: ReactNode;
  /**
   * Shows the close button
   * @default true
   */
  closable?: boolean;
  /** Action button rendered in the toast (e.g. "Undo") */
  action?: ToastAction;
  /**
   * Called once with the toast id when it closes, whatever the reason (timer,
   * close button, action, dismiss, overflow of ToastProvider max)
   */
  onClose?: (id: string | number) => void;
}

/** Messages of `toast.promise`: a node, or a function of the settled value */
export interface ToastPromiseMessages<T> {
  /** Title while the promise is pending */
  loading: ReactNode;
  /** Title once the promise resolves */
  success: ReactNode | ((value: T) => ReactNode);
  /** Title once the promise rejects */
  error: ReactNode | ((error: unknown) => ReactNode);
}

/** The `toast` function (also returned by useToast) */
export interface ToastApi {
  /** Shows a toast and returns its id */
  (options: ToastOptions): string | number;
  /** Shows an info toast with the given title */
  info: (title: ReactNode, options?: ToastOptions) => string | number;
  /** Shows a success toast with the given title */
  success: (title: ReactNode, options?: ToastOptions) => string | number;
  /** Shows a warning toast with the given title */
  warning: (title: ReactNode, options?: ToastOptions) => string | number;
  /** Shows a danger toast with the given title */
  danger: (title: ReactNode, options?: ToastOptions) => string | number;
  /** Shows a loading toast (spinner, no auto-close) with the given title */
  loading: (title: ReactNode, options?: ToastOptions) => string | number;
  /**
   * Shows a loading toast while the promise is pending, then turns the same
   * toast into a success or danger toast. Returns the given promise
   */
  promise: <T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages<T>,
    options?: Omit<ToastOptions, "color" | "loading" | "title">,
  ) => Promise<T>;
  /**
   * Changes an open toast in place (merging the options) and restarts its
   * timer; `loading: false` turns a loading toast into a regular one (with
   * the default duration unless one is given). Unknown ids are ignored
   */
  update: (id: string | number, options: Omit<ToastOptions, "id">) => void;
  /** Closes the toast with the given id, or every toast when omitted */
  dismiss: (id?: string | number) => void;
}

export interface ToastProviderProps {
  /**
   * Where the toasts are stacked
   * @default "topRight"
   */
  position?: ToastPosition;
  /** Application content; the toast viewport is rendered after it */
  children?: ReactNode;
  /**
   * Maximum number of toasts shown at once; when exceeded the oldest close
   * first
   * @default Infinity
   */
  max?: number;
  /**
   * Pauses the auto-close timer while a toast is hovered or focused
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Accessible label of the toast region
   * @default "Notifications" (localized)
   */
  ariaLabel?: string;
  /**
   * Accessible label of the close buttons
   * @default "Close" (localized)
   */
  closeLabel?: string;
}
