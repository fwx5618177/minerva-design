import type { ReactNode } from "react";
import { canUseDOM } from "../../internal/canUseDOM";
import type { ToastApi, ToastOptions, ToastStatus } from "./types";

/** Default auto-close delay, in milliseconds */
export const DEFAULT_TOAST_DURATION = 4000;
/** Length of the closing animation before a toast is removed */
export const TOAST_EXIT_DURATION = 200;

export type ToastId = string | number;

/** A toast held by the store */
export interface ToastItem {
  id: ToastId;
  status: ToastStatus;
  title?: ReactNode;
  description?: ReactNode;
  duration: number;
  state: "open" | "closing";
}

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
 * outside React), every ToastProvider renders the same list. Re-using an id
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

  push(opts: ToastOptions): ToastId {
    const id = opts.id ?? ++this.idCounter;
    // SSR: a module level list would leak between requests; nothing renders
    // on the server anyway.
    if (!canUseDOM) return id;
    const next: ToastItem = {
      id,
      status: opts.status ?? "info",
      title: opts.title,
      description: opts.description,
      duration: opts.duration ?? DEFAULT_TOAST_DURATION,
      state: "open",
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

  /** Starts the closing animation, then removes the toast. */
  dismiss(id: ToastId): void {
    this.clearTimer(id);
    if (!this.toasts.some((t) => t.id === id && t.state === "open")) return;
    this.toasts = this.toasts.map((t) =>
      t.id === id ? { ...t, state: "closing" } : t,
    );
    this.emit();
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

const createToast = (store: ToastStore): ToastApi => {
  const fn = ((opts: ToastOptions) => store.push(opts)) as ToastApi;
  fn.info = (title, opts) => store.push({ ...opts, title, status: "info" });
  fn.success = (title, opts) =>
    store.push({ ...opts, title, status: "success" });
  fn.warning = (title, opts) =>
    store.push({ ...opts, title, status: "warning" });
  fn.error = (title, opts) => store.push({ ...opts, title, status: "danger" });
  fn.dismiss = (id) =>
    id === undefined ? store.dismissAll() : store.dismiss(id);
  return fn;
};

/**
 * Shows a toast: `toast({ status, title, description })`, or the shortcuts
 * `toast.success(title, options)`, `toast.error(...)`, ... Returns the id;
 * `toast.dismiss(id)` closes it. Works anywhere (no provider needed to queue
 * toasts); a ToastProvider renders them.
 */
export const toast: ToastApi = createToast(toastStore);
