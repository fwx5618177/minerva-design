import type { ReactNode } from "react";
import type { ColorScheme } from "@minerva/core";

/** Content of a confirmation, shared by `ConfirmDialog` and `confirm()`. */
export interface ConfirmOptions {
  /** Title (the dialog's accessible name). */
  title: ReactNode;
  /** Explanation below the title (the dialog's accessible description). */
  description?: ReactNode;
  /** Label of the confirm button; defaults to the localized "Confirm", or "Delete" for `color="danger"`. */
  confirmLabel?: ReactNode;
  /** Label of the cancel button; defaults to the localized "Cancel". */
  cancelLabel?: ReactNode;
  /** Accessible label of the close (×) button; defaults to the localized "Close". */
  closeLabel?: string;
  /**
   * Semantic color of the confirm button; `danger` marks a destructive
   * action (and defaults its label to "Delete")
   * @default "primary"
   */
  color?: Extract<ColorScheme, "primary" | "danger" | "warning">;
  /**
   * Shows a spinner on the confirm button and disables cancel (e.g. while an async `onConfirm` runs)
   * @default false
   */
  loading?: boolean;
  /**
   * Natively disables the confirm button (removes it from the tab order). While
   * `loading` alone it stays focusable but cannot be activated again
   * @default false
   */
  confirmDisabled?: boolean;
}

/** Props of the declarative `ConfirmDialog`. */
export interface ConfirmDialogProps extends ConfirmOptions {
  /** Whether the dialog is open (controlled). */
  open: boolean;
  /** Called with `false` when the user cancels (cancel button, close, Escape, overlay click). */
  onOpenChange: (open: boolean) => void;
  /** Called when the confirm button is pressed. The dialog does not close by itself. */
  onConfirm: () => void | Promise<void>;
}

/** Props of `ConfirmProvider`. */
export interface ConfirmProviderProps {
  /**
   * Application subtree; `useConfirm()` / `confirm()` render their dialogs
   * here (`useConfirm()` dialogs inside the caller's ConfigProvider scope).
   */
  children?: ReactNode;
}

/** Imperative confirmation: resolves `true` when confirmed, `false` when cancelled. */
export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>;
