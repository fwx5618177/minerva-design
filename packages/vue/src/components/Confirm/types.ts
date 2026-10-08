import type { VNodeChild } from "vue";
import type { ColorScheme } from "@minerva/core";

/**
 * Text of a confirmation: a string, or a render function returning any
 * VNode content (the counterpart of a React `ReactNode`).
 */
export type ConfirmContent = string | (() => VNodeChild);

/** Content of a confirmation, shared by `ConfirmDialog` and `confirm()`. */
export interface ConfirmOptions {
  /** Title (the dialog's accessible name). */
  title: ConfirmContent;
  /** Explanation below the title (the dialog's accessible description). */
  description?: ConfirmContent;
  /** Label of the confirm button; defaults to the localized "Confirm", or "Delete" for `color="danger"`. */
  confirmLabel?: ConfirmContent;
  /** Label of the cancel button; defaults to the localized "Cancel". */
  cancelLabel?: ConfirmContent;
  /** Accessible label of the close (×) button; defaults to the localized "Close". */
  closeLabel?: string;
  /**
   * Semantic color of the confirm button; `danger` marks a destructive
   * action (and defaults its label to "Delete")
   * @default "primary"
   */
  color?: Extract<ColorScheme, "primary" | "danger" | "warning">;
  /**
   * Shows a spinner on the confirm button and disables cancel (e.g. while an async `confirm` handler runs)
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

/**
 * Props of the declarative `ConfirmDialog` (`v-model:open`; the `confirm`
 * event replaces React's `onConfirm`). `title` / `description` /
 * `confirm-label` / `cancel-label` can also be given as slots.
 */
export interface ConfirmDialogProps extends Omit<ConfirmOptions, "title"> {
  /** Whether the dialog is open (controlled, `v-model:open`). */
  open: boolean;
  /** Title (the dialog's accessible name), or the `title` slot. */
  title?: ConfirmContent;
}

/** Props of `ConfirmProvider` (none: the application goes in its slot). */
export type ConfirmProviderProps = Record<string, never>;

/** Imperative confirmation: resolves `true` when confirmed, `false` when cancelled. */
export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>;
