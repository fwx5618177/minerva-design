import type { ReactNode } from "react";
import { canUseDOM } from "../../internal/canUseDOM";
import type { ThemeScope } from "../../internal/themeScope";
import type { ToastAction, ToastApi, ToastOptions } from "./types";

/** Default auto-close delay, in milliseconds */
export const DEFAULT_TOAST_DURATION = 4000;
/** Length of the closing animation before a toast is removed */
export const TOAST_EXIT_DURATION = 200;

export type ToastId = string | number;

/** A toast held by the store */
export interface ToastItem {
  id: ToastId;
  color: NonNullable<ToastOptions["color"]>;
  /** Spinner instead of the icon, no auto-close by default */
  loading: boolean;
  title?: ReactNode;
  description?: ReactNode;
  duration: number;
  /** Custom icon; undefined uses the color icon (or spinner), null hides it */
  icon?: ReactNode;
  closable: boolean;
  action?: ToastAction;
  onClose?: (id: ToastId) => void;
  state: "open" | "closing";
  /**
   * Theme scope of the caller (`useToast()` inside a nested ConfigProvider):
   * the toast is rendered into its portal container, with its language.
   * `undefined` = the scope of the owning ToastProvider (`toast()`).
   */
  scope?: ThemeScope;
}

/**
 * Keeps a scope only when it changes something compared to the owning
 * provider: a scoped portal container or a scoped language.
 */
export const toastScopeOf = (
  scope: ThemeScope | null | undefined,
): ThemeScope | undefined =>
  scope && (scope.portalContainer || scope.language) ? scope : undefined;

type Listener = (toasts: ToastItem[]) => void;

interface Timer {
  handle?: ReturnType<typeof setTimeout>;
  /** Date.now() at which the toast closes (while running) */
  deadline: number;
  /** Time left when paused */
  remaining: number;
  paused: boolean;
}

/**
 * Module level store: the imperative API works without a provider (and
 * outside React). Only the owning ToastProvider renders the list. Re-using an id
 * replaces the toast (sonner-style) instead of appending a duplicate.
 */
export class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners = new Set<Listener>();
  private idCounter = 0;
  private timers = new Map<ToastId, Timer>();

  subscribe = (fn: Listener): (() => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  private emit(): void {
    for (const fn of this.listeners) fn(this.toasts);
  }

  private clearTimer(id: ToastId): void {
    const timer = this.timers.get(id);
    if (timer) clearTimeout(timer.handle);
    this.timers.delete(id);
  }

  private schedule(id: ToastId, duration: number): void {
    this.clearTimer(id);
    if (duration <= 0) return;
    this.timers.set(id, {
      handle: setTimeout(() => this.dismiss(id), duration),
      deadline: Date.now() + duration,
      remaining: duration,
      paused: false,
    });
  }

  push(opts: ToastOptions, scope?: ThemeScope): ToastId {
    const id = opts.id ?? ++this.idCounter;
    // SSR: a module level list would leak between requests; nothing renders
    // on the server anyway.
    if (!canUseDOM) return id;
    const loading = opts.loading ?? false;
    const next: ToastItem = {
      id,
      color: opts.color ?? "info",
      loading,
      title: opts.title,
      description: opts.description,
      duration: opts.duration ?? (loading ? 0 : DEFAULT_TOAST_DURATION),
      icon: opts.icon,
      closable: opts.closable ?? true,
      action: opts.action,
      onClose: opts.onClose,
      state: "open",
      scope,
    };
    const index = this.toasts.findIndex((t) => t.id === id);
    if (index >= 0) {
      const updated = this.toasts.slice();
      updated[index] = next;
      this.toasts = updated;
    } else {
      this.toasts = [...this.toasts, next];
    }
    this.emit();
    this.schedule(id, next.duration);
    return id;
  }

  /**
   * Changes an open toast in place: the given options are merged into it and
   * its timer restarts. Unknown or closing ids are ignored.
   */
  update(id: ToastId, opts: Omit<ToastOptions, "id">): void {
    const current = this.toasts.find((t) => t.id === id && t.state === "open");
    if (!current) return;
    // Entering / leaving the loading state with the default duration of the
    // previous state switches to the default of the new one unless a
    // duration is given
    const loadingChanged =
      opts.loading !== undefined && opts.loading !== current.loading;
    const defaultDuration = current.loading ? 0 : DEFAULT_TOAST_DURATION;
    const duration =
      opts.duration ??
      (loadingChanged && current.duration === defaultDuration
        ? undefined
        : current.duration);
    this.push({ ...current, ...opts, id, duration }, current.scope);
  }

  /** Starts the closing animation, then removes the toast. */
  dismiss(id: ToastId): void {
    this.clearTimer(id);
    const closing = this.toasts.find((t) => t.id === id && t.state === "open");
    if (!closing) return;
    this.toasts = this.toasts.map((t) =>
      t.id === id ? { ...t, state: "closing" } : t,
    );
    this.emit();
    closing.onClose?.(id);
    setTimeout(() => {
      // A toast pushed again with the same id while closing stays
      const current = this.toasts.find((t) => t.id === id);
      if (current?.state !== "closing") return;
      this.toasts = this.toasts.filter((t) => t.id !== id);
      this.emit();
    }, TOAST_EXIT_DURATION);
  }

  dismissAll(): void {
    for (const t of this.toasts) this.dismiss(t.id);
  }

  /** Stops the auto-close countdown (hover / focus). */
  pause(id: ToastId): void {
    const timer = this.timers.get(id);
    if (!timer || timer.paused) return;
    clearTimeout(timer.handle);
    timer.remaining = Math.max(0, timer.deadline - Date.now());
    timer.paused = true;
  }

  /** Continues a paused countdown where it stopped. */
  resume(id: ToastId): void {
    const timer = this.timers.get(id);
    if (!timer?.paused) return;
    timer.paused = false;
    timer.deadline = Date.now() + timer.remaining;
    timer.handle = setTimeout(() => this.dismiss(id), timer.remaining);
  }

  /** useSyncExternalStore snapshot: a new array on every change. */
  readonly getSnapshot = (): ToastItem[] => this.toasts;

  /** Current list (tests). */
  peek(): readonly ToastItem[] {
    return this.toasts;
  }

  /** Clears everything (tests). */
  reset(): void {
    for (const id of [...this.timers.keys()]) this.clearTimer(id);
    this.toasts = [];
    this.emit();
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
