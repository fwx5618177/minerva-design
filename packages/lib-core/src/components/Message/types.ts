import type { CSSProperties, MouseEvent, ReactNode } from "react";
import type { createRoot } from "react-dom/client";

export type MessageType = "success" | "error" | "info" | "warning" | "loading";
export type MessagePlacement =
  "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

/** Internal bookkeeping of a rendered message */
export interface MessageInstance {
  id: string;
  props: MessageProps;
  root: ReturnType<typeof createRoot>;
  /** Wrapper element the message root renders into */
  element: HTMLElement;
  /** Creation order */
  seq: number;
}

/** Global defaults set with `message.config()` */
export interface MessageConfig {
  /**
   * Default auto-close delay in milliseconds; 0 keeps messages open
   * @default 3000
   */
  duration?: number;
  /**
   * Default screen position
   * @default "topRight"
   */
  placement?: MessagePlacement;
  /**
   * Maximum number of messages shown at once; the oldest ones close first
   * @default Infinity
   */
  maxCount?: number;
}

export interface MessageProps {
  /** Unique id; generated automatically when omitted in MessageOptions. Reusing the id of an open message replaces it */
  id: string;
  /**
   * Message type, which sets the color. Set by the method you call (message.success, ...)
   * @default "info"
   */
  type?: MessageType;
  /** Message content */
  content: ReactNode;
  /**
   * Time in milliseconds before the message closes automatically; 0 keeps it open. Defaults to message.config().duration
   * @default 3000
   */
  duration?: number;
  /**
   * Shows a close button
   * @default false
   */
  showClose?: boolean;
  /** Icon displayed before the content */
  icon?: ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Called with the message id when the message closes, whatever the reason */
  onClose?: (id: string) => void;
  /**
   * Shows a countdown progress bar (only when duration > 0)
   * @default true
   */
  showProgress?: boolean;
  /**
   * Pauses the countdown and progress bar while hovered or while keyboard focus is inside the message
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Screen position of the message stack. Defaults to message.config().placement
   * @default "topRight"
   */
  placement?: MessagePlacement;
  /** Called when the message is clicked */
  onClick?: (e: MouseEvent) => void;
  /** Extra description exposed to assistive technologies (aria-description) */
  description?: string;
  /**
   * Accessible label of the close button
   * @default "Close" (localized)
   */
  closeAriaLabel?: string;
  /** Called after message.update() re-renders the message */
  onUpdate?: (id: string, props: MessageProps) => void;
  /** Maximum width of the message */
  maxWidth?: number | string;
  /** z-index of the message */
  zIndex?: number;
}

/**
 * Options accepted by `message.xxx()` / `useMessage().xxx()`.
 * `id` is optional — one is generated when omitted.
 */
export type MessageOptions = Omit<MessageProps, "id"> & { id?: string };

/** Result of `useMessage().xxx()`: resolves once the message has closed */
export type MessagePromiseResult = Promise<void> & { messageId: string };
