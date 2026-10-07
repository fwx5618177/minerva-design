import { DEV, devWarn } from "../../internal/dev";
import { defineElement } from "../../internal/define";
import {
  MinervaConfirmDialog,
  type ConfirmColor,
  type ConfirmCloseReason,
} from "./confirm";

/** Content of an imperative confirmation (`confirm()`). */
export interface ConfirmOptions {
  /** Title (the dialog's accessible name) */
  title: string;
  /** Explanation below the title (the dialog's accessible description) */
  description?: string;
  /** Confirm button label (default: localized "Confirm", or "Delete" with `color: "danger"`) */
  confirmLabel?: string;
  /** Cancel button label (default: localized "Cancel") */
  cancelLabel?: string;
  /** Accessible label of the close (×) button (default: localized "Close") */
  closeLabel?: string;
  /** Semantic color of the confirm button (default "primary") */
  color?: ConfirmColor;
  /**
   * Element the dialog is appended to (default `document.body`). Pass the
   * caller's `<minerva-config>` scope (e.g. `button.closest("minerva-config")`)
   * so the dialog uses its theme, palette and language.
   */
  container?: Element | null;
}

/** Imperative confirmation: resolves `true` when confirmed, `false` when cancelled. */
export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>;

interface ConfirmRequest {
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
}

/** FIFO: concurrent confirmations are shown one at a time, in call order. */
const queue: ConfirmRequest[] = [];
let current: MinervaConfirmDialog | null = null;

function showNext(): void {
  const request = queue.shift();
  if (!request) {
    current = null;
    return;
  }
  const { options, resolve } = request;
  let container: Element = options.container ?? document.body;
  if (!container.isConnected) {
    if (DEV) {
      devWarn(
        MinervaConfirmDialog.tagName,
        "confirm(): `container` is not connected to the document; the dialog is appended to document.body instead.",
      );
    }
    container = document.body;
  }

  const dialog = document.createElement(
    MinervaConfirmDialog.tagName,
  ) as MinervaConfirmDialog;
  dialog.label = options.title;
  if (options.description) dialog.description = options.description;
  if (options.confirmLabel) dialog.confirmLabel = options.confirmLabel;
  if (options.cancelLabel) dialog.cancelLabel = options.cancelLabel;
  if (options.closeLabel) dialog.closeLabel = options.closeLabel;
  if (options.color) dialog.color = options.color;

  let settled = false;
  let finished = false;
  const settle = (value: boolean) => {
    if (settled) return;
    settled = true;
    resolve(value);
  };
  // Removed by the page (body replaced, scope unmounted): a cancel.
  const observer = new MutationObserver(() => {
    if (!dialog.isConnected) finish();
  });
  const finish = () => {
    if (finished) return;
    finished = true;
    observer.disconnect();
    settle(false);
    dialog.remove();
    showNext();
  };

  // Resolve as soon as the close is accepted (the exit animation may follow):
  // the event is checked after every listener ran.
  dialog.addEventListener("minerva-open-change", (event) => {
    const { open, reason } = (
      event as CustomEvent<{ open: boolean; reason: ConfirmCloseReason }>
    ).detail;
    queueMicrotask(() => {
      if (!open && !event.defaultPrevented) settle(reason === "confirm");
    });
  });
  dialog.addEventListener("minerva-after-close", finish, { once: true });

  current = dialog;
  container.append(dialog);
  observer.observe(document, { childList: true, subtree: true });
  dialog.open = true;
}

/**
 * Imperative confirmation, the themed replacement of `window.confirm`
 * (lib-core's `confirm()`): appends a `<minerva-confirm-dialog>` to
 * `options.container` (default `document.body`), opens it, and resolves
 * `true` when the user confirms, `false` when they cancel (Cancel / close
 * button, Escape, overlay click). The element is removed once closed.
 * Concurrent calls are queued and shown one at a time. On the server (no
 * `document`) it resolves `false`.
 */
export const confirm: ConfirmFunction = (options) => {
  if (typeof document === "undefined") {
    if (DEV) {
      devWarn(
        MinervaConfirmDialog.tagName,
        "confirm() called without a document (server render): resolving false.",
      );
    }
    return Promise.resolve(false);
  }
  defineElement(MinervaConfirmDialog);
  return new Promise<boolean>((resolve) => {
    queue.push({ options, resolve });
    if (!current) showNext();
  });
};
