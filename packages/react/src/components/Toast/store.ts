import type { ReactNode } from "react";
import {
  createToastQueue,
  type ToastQueueId,
  type ToastQueueItem,
} from "@minerva/core";
import { canUseDOM } from "../../internal/canUseDOM";
import type { ThemeScope } from "../../internal/themeScope";
import type { ToastApi, ToastOptions } from "./types";

/** Default auto-close delay, in milliseconds */
export const DEFAULT_TOAST_DURATION = 4000;
/** Length of the closing animation before a toast is removed */
export const TOAST_EXIT_DURATION = 200;

export type ToastId = ToastQueueId;

/** Per-toast data of the React renderer */
interface ToastExtra {
  /**
   * Theme scope of the caller (`useToast()` inside a nested ConfigProvider):
   * the toast is rendered into its portal container, with its language.
   * `undefined` = the scope of the owning ToastProvider (`toast()`).
   */
  scope?: ThemeScope;
}

/**
 * A toast held by the store: `state` "open" | "closing", `loading` (spinner,
 * no auto-close by default), `icon` (undefined: the color icon or spinner,
 * null: hidden) and the render `scope`.
 */
export type ToastItem = ToastQueueItem<ReactNode, ToastExtra>;

/**
 * Keeps a scope only when it changes something compared to the owning
 * provider: a scoped portal container or a scoped language.
 */
export const toastScopeOf = (
  scope: ThemeScope | null | undefined,
): ThemeScope | undefined =>
  scope && (scope.portalContainer || scope.language) ? scope : undefined;

type Listener = (toasts: ToastItem[]) => void;

/**
 * Module level store: the imperative API works without a provider (and
 * outside React). Only the owning ToastProvider renders the list. Re-using an id
 * replaces the toast (sonner-style) instead of appending a duplicate.
 *
 * A thin adapter over core's `createToastQueue` (shared with the web
 * components): same-id replacement, timers, pause / resume and the closing
 * state live there.
 */
export class ToastStore {
  private readonly queue = createToastQueue<ReactNode, ToastExtra>({
    // SSR: a module level list would leak between requests; nothing renders
    // on the server anyway.
    isClient: () => canUseDOM,
    defaultDuration: DEFAULT_TOAST_DURATION,
    exitDuration: TOAST_EXIT_DURATION,
  });

  subscribe = (fn: Listener): (() => void) =>
    this.queue.subscribe((state) => fn(state.toasts));

  push(opts: ToastOptions, scope?: ThemeScope): ToastId {
    return this.queue.add(opts, { scope });
  }

  /**
   * Changes an open toast in place: the given options are merged into it and
   * its timer restarts. Unknown or closing ids are ignored.
   */
  update(id: ToastId, opts: Omit<ToastOptions, "id">): void {
    this.queue.update(id, opts);
  }

  /** Starts the closing animation, then removes the toast. */
  dismiss(id: ToastId): void {
    this.queue.dismiss(id);
  }

  dismissAll(): void {
    this.queue.dismissAll();
  }

  /** Stops the auto-close countdown (hover / focus). */
  pause(id: ToastId): void {
    this.queue.pause(id);
  }

  /** Continues a paused countdown where it stopped. */
  resume(id: ToastId): void {
    this.queue.resume(id);
  }

  /** useSyncExternalStore snapshot: a new array on every change. */
  readonly getSnapshot = (): ToastItem[] => this.queue.getState().toasts;

  /** Current list (tests). */
  peek(): readonly ToastItem[] {
    return this.getSnapshot();
  }

  /** Clears everything (tests). */
  reset(): void {
    this.queue.reset();
  }
}

export const toastStore = new ToastStore();

/**
 * Mounted ToastProviders. Exactly one of them, the owner, renders the toasts
 * so that several providers on a page never show a toast twice. The owner is
 * the earliest-rendered provider still mounted: the outermost one when they
 * are nested, the first one in document order when they are siblings. When it
 * unmounts, the next one takes over.
 */
class ToastProviderRegistry {
  private mounted = new Set<number>();
  private owner: number | null = null;
  private listeners = new Set<() => void>();
  private sequence = 0;

  /** Rendering order of a provider; assigned once per provider instance. */
  nextOrder = (): number => ++this.sequence;

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  readonly getOwner = (): number | null => this.owner;

  /** Registers a mounted provider; returns its unregister function. */
  register(order: number): () => void {
    this.mounted.add(order);
    this.elect();
    return () => {
      this.mounted.delete(order);
      this.elect();
    };
  }

  private elect(): void {
    let owner: number | null = null;
    for (const order of this.mounted) {
      if (owner === null || order < owner) owner = order;
    }
    if (owner === this.owner) return;
    this.owner = owner;
    for (const fn of this.listeners) fn();
  }
}

export const toastProviders = new ToastProviderRegistry();

/**
 * Builds a toast API over `store`. Every toast it shows carries `scope`
 * (see `ToastItem.scope`); `undefined` renders in the owner's scope.
 */
export const createToast = (
  store: ToastStore,
  scope?: ThemeScope,
): ToastApi => {
  const show = (opts: ToastOptions) => store.push(opts, scope);
  const fn = ((opts: ToastOptions) => show(opts)) as ToastApi;
  fn.info = (title, opts) => show({ ...opts, title, color: "info" });
  fn.success = (title, opts) => show({ ...opts, title, color: "success" });
  fn.warning = (title, opts) => show({ ...opts, title, color: "warning" });
  fn.danger = (title, opts) => show({ ...opts, title, color: "danger" });
  fn.loading = (title, opts) => show({ ...opts, title, loading: true });
  fn.promise = (promise, messages, opts) => {
    const id = show({
      ...opts,
      title: messages.loading,
      loading: true,
      duration: 0,
    });
    const settle = (color: "success" | "danger", title: ReactNode) =>
      show({ ...opts, id, title, color, loading: false });
    promise.then(
      (value) =>
        settle(
          "success",
          typeof messages.success === "function"
            ? messages.success(value)
            : messages.success,
        ),
      (error: unknown) =>
        settle(
          "danger",
          typeof messages.error === "function"
            ? messages.error(error)
            : messages.error,
        ),
    );
    return promise;
  };
  fn.update = (id, opts) => store.update(id, opts);
  fn.dismiss = (id) =>
    id === undefined ? store.dismissAll() : store.dismiss(id);
  return fn;
};

/**
 * Shows a toast: `toast({ color, title, description })`, or the shortcuts
 * `toast.success(title, options)`, `toast.danger(...)`, `toast.loading(...)`,
 * ... Returns the id; `toast.update(id, options)` changes it in place,
 * `toast.dismiss(id)` closes it and `toast.promise(promise, messages)` follows
 * a promise from loading to success / danger. Works anywhere (no provider
 * needed to queue toasts); one ToastProvider renders them (see
 * `toastProviders`).
 *
 * Meant for code outside React components (event buses, API clients,
 * non-component modules): its toasts use the scope of the owning
 * ToastProvider (usually the root theme and language). Inside components,
 * prefer `useToast()`, which follows the nearest ConfigProvider scope.
 */
export const toast: ToastApi = createToast(toastStore);
