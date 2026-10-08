import { DEV, devWarn } from "../../internal/dev";
import { defineElement } from "../../internal/define";
import { closestComposed, composedParent } from "../../internal/dom";
import { resolveLanguage } from "../../internal/locale";
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
   * Element that asks (usually the clicked button), the React library's `useConfirm()`
   * equivalent: the dialog renders inside its theme scope (the closest
   * `<minerva-config>` or element with `data-theme` / `data-palette`, shadow
   * roots crossed) and uses its language, and the closest
   * `<minerva-confirm-provider>` around it queues the request
   */
  host?: Element | null;
  /**
   * Explicit element the dialog is appended to (wins over the scope of
   * `host`; default: the scope of `host`, else the provider, else
   * `document.body`)
   */
  container?: Element | null;
}

/** Imperative confirmation: resolves `true` when confirmed, `false` when cancelled. */
export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>;

/** Selector of the elements that scope the theme of their subtree. */
const SCOPE_SELECTOR =
  "minerva-config:not([root]), [data-minerva-theme-scope], [data-theme], [data-palette]";

/**
 * Theme scope of `host` (the React library's `useThemeScope()`): the closest
 * `<minerva-config>` (not `root`) or element setting `data-theme` /
 * `data-palette` / `data-minerva-theme-scope`, crossing shadow roots. The
 * document element and `<body>` are the root scope: `null`.
 */
export function confirmScopeOf(host: Element): Element | null {
  const scope = closestComposed(host, SCOPE_SELECTOR);
  if (!scope) return null;
  const doc = host.ownerDocument;
  return scope === doc.documentElement || scope === doc.body ? null : scope;
}

interface ConfirmRequest {
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
}

/**
 * FIFO queue of confirmations (the React library's `ConfirmQueue`): one dialog at a
 * time, in call order. The standalone queue appends to `document.body`, a
 * `<minerva-confirm-provider>` to itself; a request's `host` scope or
 * explicit `container` wins.
 */
export class ConfirmQueue {
  private readonly requests: ConfirmRequest[] = [];
  private current: MinervaConfirmDialog | null = null;
  private readonly settles = new Set<(value: boolean) => void>();

  constructor(private readonly defaultContainer: () => Element) {}

  /** Queues a confirmation. */
  enqueue(options: ConfirmOptions): Promise<boolean> {
    defineElement(MinervaConfirmDialog);
    return new Promise<boolean>((resolve) => {
      this.requests.push({ options, resolve });
      if (!this.current) this.showNext();
    });
  }

  /** Resolves every pending request (and the shown one) as cancelled. */
  cancelAll(): void {
    const pending = this.requests.splice(0);
    for (const request of pending) request.resolve(false);
    for (const settle of [...this.settles]) settle(false);
    this.current?.remove();
  }

  private container(options: ConfirmOptions): Element {
    const doc = typeof document === "undefined" ? null : document;
    const explicit = options.container;
    if (explicit) {
      if (explicit.isConnected) return explicit;
      if (DEV) {
        devWarn(
          MinervaConfirmDialog.tagName,
          "confirm(): `container` is not connected to the document; the dialog is appended to document.body instead.",
        );
      }
      return doc!.body;
    }
    const scope =
      options.host?.isConnected === true ? confirmScopeOf(options.host) : null;
    const fallback = this.defaultContainer();
    // The host's scope, unless the default container is already inside it
    return scope && !isInside(fallback, scope) ? scope : fallback;
  }

  private showNext(): void {
    const request = this.requests.shift();
    if (!request) {
      this.current = null;
      return;
    }
    const { options, resolve } = request;
    const container = this.container(options);

    const dialog = document.createElement(
      MinervaConfirmDialog.tagName,
    ) as MinervaConfirmDialog;
    dialog.label = options.title;
    if (options.description) dialog.description = options.description;
    if (options.confirmLabel) dialog.confirmLabel = options.confirmLabel;
    if (options.cancelLabel) dialog.cancelLabel = options.cancelLabel;
    if (options.closeLabel) dialog.closeLabel = options.closeLabel;
    if (options.color) dialog.color = options.color;
    // The caller's language when the container does not carry it (a `lang`
    // between the host and its theme scope, or no scope at all)
    const host = options.host;
    if (host?.isConnected && !options.container) {
      const language = resolveLanguage(host);
      if (language !== resolveLanguage(container)) {
        dialog.setAttribute("lang", language);
      }
    }

    let settled = false;
    let finished = false;
    const settle = (value: boolean) => {
      if (settled) return;
      settled = true;
      this.settles.delete(settle);
      resolve(value);
    };
    this.settles.add(settle);
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
      this.showNext();
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

    this.current = dialog;
    container.append(dialog);
    observer.observe(document, { childList: true, subtree: true });
    dialog.open = true;
  }
}

/** Whether `el` is `ancestor` or inside it (shadow roots crossed). */
function isInside(el: Element, ancestor: Element): boolean {
  for (let node: Element | null = el; node; node = composedParent(node)) {
    if (node === ancestor) return true;
  }
  return false;
}

/** Element owning a queue (`<minerva-confirm-provider>`). */
export interface ConfirmQueueOwner extends Element {
  readonly confirmQueue: ConfirmQueue;
}

/** Connected providers; the most recently connected one wins. */
const providers: ConfirmQueueOwner[] = [];

/** @internal Called by `<minerva-confirm-provider>` (dis)connection. */
export function registerConfirmProvider(owner: ConfirmQueueOwner): () => void {
  providers.push(owner);
  return () => {
    const index = providers.lastIndexOf(owner);
    if (index >= 0) providers.splice(index, 1);
  };
}

let standalone: ConfirmQueue | null = null;

/** Tag of the provider element (resolved without importing it). */
const PROVIDER_TAG = "minerva-confirm-provider";

/** Queue of `host`: its closest provider, else the latest one, else standalone. */
function queueFor(host: Element | null | undefined): ConfirmQueue {
  const own =
    host?.isConnected === true
      ? closestComposed<ConfirmQueueOwner>(host, PROVIDER_TAG)
      : null;
  if (own && "confirmQueue" in own) return own.confirmQueue;
  const latest = providers[providers.length - 1];
  if (latest) return latest.confirmQueue;
  standalone ??= new ConfirmQueue(() => document.body);
  return standalone;
}

const serverResult = (): Promise<boolean> => {
  if (DEV) {
    devWarn(
      MinervaConfirmDialog.tagName,
      "confirm() called without a document (server render): resolving false.",
    );
  }
  return Promise.resolve(false);
};

/**
 * Imperative confirmation, the themed replacement of `window.confirm`
 * (the React library's `confirm()` / `useConfirm()`): opens a
 * `<minerva-confirm-dialog>` and resolves `true` when the user confirms,
 * `false` when they cancel (Cancel / close button, Escape, overlay click).
 * The element is removed once closed. Concurrent calls are queued and shown
 * one at a time.
 *
 * - With `host` (the element asking, e.g. the clicked button) it behaves
 *   like `useConfirm()`: the closest `<minerva-confirm-provider>` around the
 *   host queues it and the dialog renders in the host's theme scope and
 *   language (see `confirmFor()`).
 * - Without `host`: the most recently connected
 *   `<minerva-confirm-provider>` renders it (in its own scope), else it is
 *   appended to `document.body` (root theme and language).
 * - On the server (no `document`) it resolves `false`.
 */
export const confirm: ConfirmFunction = (options) => {
  if (typeof document === "undefined") return serverResult();
  return queueFor(options.host).enqueue(options);
};

/**
 * A confirm function bound to `host` (the React library's `useConfirm()`): every
 * call behaves like `confirm({ ...options, host })`, so its dialogs render
 * in the host's `<minerva-config>` scope (theme, palette, tokens) with the
 * host's language, queued by the closest `<minerva-confirm-provider>`.
 */
export function confirmFor(host: Element): ConfirmFunction {
  return (options) => confirm({ ...options, host: options.host ?? host });
}
