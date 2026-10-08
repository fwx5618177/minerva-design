export type ModalSize = "small" | "medium" | "large" | "xlarge" | "full";

/** Props of `Modal` (same names and defaults as the React `ModalProps`). */
export interface ModalProps {
  /** Controlled open state (`v-model:open`) */
  open?: boolean;
  /** Initial open state while uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Title (or the `title` slot); the dialog's accessible name */
  title?: string;
  /** Description (or the `description` slot) */
  description?: string;
  /** @default "medium" */
  size?: ModalSize;
  /** @default false */
  hideCloseButton?: boolean;
  /** Accessible name of the close button (default: translated "Close") */
  closeLabel?: string;
  /** @default "dialog" */
  role?: "dialog" | "alertdialog";
}
