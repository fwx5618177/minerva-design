import type { ReactNode } from "react";

/** Status of a toast; sets its color, icon and ARIA role */
export type ToastStatus = "info" | "success" | "warning" | "danger";

/** Screen corner / edge where the toast stack is shown */
export type ToastPosition =
  | "topRight"
  | "topLeft"
  | "topCenter"
  | "bottomRight"
  | "bottomLeft"
  | "bottomCenter";

/** Options of a toast */
export interface ToastOptions {
  /**
   * Identifier of the toast; generated when omitted. Showing a toast with the
   * id of a visible one replaces it (and restarts its timer) instead of
   * stacking a duplicate
   */
  id?: string | number;
  /**
   * Status of the toast
   * @default "info"
   */
  status?: ToastStatus;
  /** Main text */
  title?: ReactNode;
  /** Secondary text under the title */
  description?: ReactNode;
  /**
   * Time in milliseconds before the toast closes automatically; 0 keeps it open
   * @default 4000
   */
  duration?: number;
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
  error: (title: ReactNode, options?: ToastOptions) => string | number;
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
