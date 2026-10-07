import type { CSSProperties, MouseEvent, ReactNode } from "react";
import type { createRoot } from "react-dom/client";

export type MessageType = "success" | "error" | "info" | "warning" | "loading";
export type MessagePlacement =
  "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface MessageInstance {
  id: string;
  props: MessageProps;
  root: ReturnType<typeof createRoot>;
}

export interface MessageProps {
  /** Unique id; generated automatically when omitted in MessageOptions */
  id: string;
  /**
   * Message type, which sets the color. Set by the method you call (message.success, ...)
   * @default "info"
   */
  type?: MessageType;
  /** Message content */
  content: ReactNode;
  /**
   * Time in milliseconds before the message closes automatically; 0 keeps it open
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
   * Pauses the countdown and progress bar while hovered
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Screen position of the message stack
   * @default "topRight"
   */
  placement?: MessagePlacement;
  /** Called when the message is clicked */
  onClick?: (e: MouseEvent) => void;
  /** Extra description exposed to assistive technologies (aria-description) */
  description?: string;
  /**
   * Accessible label of the close button
   * @default "Close"
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
