// Toast queue: the framework-neutral store behind the React `toast()` /
// `<ToastProvider>` and the web components' `toast()` /
// `<minerva-toast-region>`. Semantics: insertion order (a re-used id replaces
// the toast in place and restarts its timer), auto-dismiss timers with
// pause / resume (hover / focus), an "open" -> "closing" -> removed lifecycle
// (`exitDuration` for the exit animation) and `getToastOverflow` for the
// renderers' `max`. Generic over the content type (React nodes, Lit
// templates, strings...) and over extra per-toast data (render scope...).
import { createStore, type Scheduler } from "./store";

/**
 * The engine's timers read at call time, like `defaultScheduler`, but called
 * from this module so that leak reports name the toast queue.
 */
const engineScheduler: Scheduler = {
  setTimeout: (callback, ms) => globalThis.setTimeout(callback, ms),
  clearTimeout: (handle) =>
    globalThis.clearTimeout(handle as ReturnType<typeof setTimeout>),
  now: () => Date.now(),
};

/** Default auto-close delay, in milliseconds. */
export const TOAST_DEFAULT_DURATION = 4000;
/** Default length of the closing animation before a toast is removed. */
export const TOAST_DEFAULT_EXIT_DURATION = 200;

export type ToastQueueId = string | number;

/** Semantic color of a toast. */
export type ToastQueueColor = "info" | "success" | "warning" | "danger";

/** Why a toast closed. */
export type ToastQueueCloseReason =
  "timeout" | "close-button" | "action" | "escape" | "dismiss" | "overflow";

/** Button rendered in a toast. */
export interface ToastQueueAction<C> {
  label: C;
  onClick: () => void;
}

/** Options of a shown toast (`C`: content type). */
export interface ToastQueueOptions<C> {
  /** Re-using the id of a toast replaces it; generated when omitted. */
  id?: ToastQueueId;
  /** @default "info" */
  color?: ToastQueueColor;
  /** Spinner, no auto-close by default. @default false */
  loading?: boolean;
  title?: C;
  description?: C;
  /** Auto-close delay; 0 keeps the toast open. @default 4000 (0 when loading) */
  duration?: number;
  /** Custom icon; `null` hides it. */
  icon?: C | null;
  /** @default true */
  closable?: boolean;
  action?: ToastQueueAction<C>;
  /** Called once with the id when the toast starts closing. */
  onClose?: (id: ToastQueueId) => void;
}

/** A toast of the queue. */
export interface ToastQueueBaseItem<C> {
  id: ToastQueueId;
  color: ToastQueueColor;
  loading: boolean;
  title?: C;
  description?: C;
  duration: number;
  icon?: C | null;
  closable: boolean;
  action?: ToastQueueAction<C>;
  onClose?: (id: ToastQueueId) => void;
  state: "open" | "closing";
}

/** A toast with the renderer's extra data `X`. */
export type ToastQueueItem<
  C,
  X extends object = object,
> = ToastQueueBaseItem<C> & X;

export interface ToastQueueState<C, X extends object = object> {
  /** Toasts in display order (a new array after every change). */
  toasts: ToastQueueItem<C, X>[];
}

/** Close / remove notifications (e.g. turned into DOM events). */
export type ToastQueueLifecycleEvent<C, X extends object = object> =
  | {
      type: "close";
      item: ToastQueueItem<C, X>;
      reason: ToastQueueCloseReason;
    }
  | { type: "remove"; item: ToastQueueItem<C, X> };

export type ToastQueueEvent<C, X extends object = object> =
  | { type: "ADD"; options: ToastQueueOptions<C>; extra?: X }
  | {
      type: "UPDATE";
      id: ToastQueueId;
      options: Omit<ToastQueueOptions<C>, "id">;
    }
  | { type: "DISMISS"; id: ToastQueueId; reason?: ToastQueueCloseReason }
  | { type: "DISMISS_ALL" }
  | { type: "PAUSE"; id: ToastQueueId }
  | { type: "RESUME"; id: ToastQueueId }
  | { type: "RESET" };

export interface ToastQueueConfig {
  /**
   * Whether toasts are kept. `false` (e.g. during SSR, where a module level
   * list would leak between requests) only hands out ids.
   * @default () => true
   */
  isClient?: () => boolean;
  /** Timers and clock. @default the engine's timers (`defaultScheduler`) */
  scheduler?: Scheduler;
  /** @default TOAST_DEFAULT_DURATION */
  defaultDuration?: number;
  /** @default TOAST_DEFAULT_EXIT_DURATION */
  exitDuration?: number;
}

export interface ToastQueue<C, X extends object = object> {
  getState(): ToastQueueState<C, X>;
  subscribe(
    listener: (
      state: ToastQueueState<C, X>,
      prev: ToastQueueState<C, X>,
    ) => void,
  ): () => void;
  send(event: ToastQueueEvent<C, X>): void;
  /** Shows (or replaces) a toast; returns its id. */
  add(options: ToastQueueOptions<C>, extra?: X): ToastQueueId;
  /**
   * Merges options into an open toast (its extra data is kept) and restarts
   * its timer. Unknown or closing ids are ignored.
   */
  update(id: ToastQueueId, options: Omit<ToastQueueOptions<C>, "id">): void;
  /** Starts closing a toast (`onClose`, "close" notification), then removes it. */
  dismiss(id: ToastQueueId, reason?: ToastQueueCloseReason): void;
  /** Closes every toast. */
  dismissAll(): void;
  /** Stops the auto-close countdown (hover / focus). */
  pause(id: ToastQueueId): void;
  /** Continues a paused countdown where it stopped. */
  resume(id: ToastQueueId): void;
  /** Whether the countdown of a toast is paused. */
  isPaused(id: ToastQueueId): boolean;
  /** Clears every toast and timer (no callbacks). */
  reset(): void;
  /** Listens to close / remove notifications. */
  subscribeLifecycle(
    listener: (event: ToastQueueLifecycleEvent<C, X>) => void,
  ): () => void;
}

interface Timer {
  handle?: unknown;
  /** Time at which the toast closes (while running). */
  deadline: number;
  /** Time left while paused. */
  remaining: number;
  paused: boolean;
}

/**
 * The oldest open toasts beyond `max` visible ones (closing toasts do not
 * count): the renderers dismiss them (reason "overflow").
 */
export function getToastOverflow<T extends { state: "open" | "closing" }>(
  toasts: readonly T[],
  max: number,
): T[] {
  const open = toasts.filter((t) => t.state === "open");
  return open.slice(0, Math.max(0, open.length - max));
}

/** Creates a toast queue. */
export function createToastQueue<C, X extends object = object>(
  config: ToastQueueConfig = {},
): ToastQueue<C, X> {
  const isClient = config.isClient ?? (() => true);
  const scheduler = config.scheduler ?? engineScheduler;
  const defaultDuration = config.defaultDuration ?? TOAST_DEFAULT_DURATION;
  const exitDuration = config.exitDuration ?? TOAST_DEFAULT_EXIT_DURATION;

  type Item = ToastQueueItem<C, X>;
  // Every change produces a new state (and array), so equality is identity.
  const store = createStore<ToastQueueState<C, X>>(
    { toasts: [] },
    { equals: Object.is },
  );
  const lifecycle = new Set<(event: ToastQueueLifecycleEvent<C, X>) => void>();
  const timers = new Map<ToastQueueId, Timer>();
  let idCounter = 0;

  const toasts = () => store.getState().toasts;
  const setToasts = (next: Item[]) => store.setState({ toasts: next });
  const notify = (event: ToastQueueLifecycleEvent<C, X>) => {
    for (const fn of [...lifecycle]) fn(event);
  };

  const clearTimer = (id: ToastQueueId) => {
    const timer = timers.get(id);
    if (timer) scheduler.clearTimeout(timer.handle);
    timers.delete(id);
  };

  const schedule = (id: ToastQueueId, duration: number) => {
    clearTimer(id);
    if (duration <= 0) return;
    timers.set(id, {
      handle: scheduler.setTimeout(() => dismiss(id, "timeout"), duration),
      deadline: scheduler.now() + duration,
      remaining: duration,
      paused: false,
    });
  };

  const add = (options: ToastQueueOptions<C>, extra?: X): ToastQueueId => {
    const id = options.id ?? ++idCounter;
    if (!isClient()) return id;
    const loading = options.loading ?? false;
    const next = {
      ...extra,
      id,
      color: options.color ?? "info",
      loading,
      title: options.title,
      description: options.description,
      duration: options.duration ?? (loading ? 0 : defaultDuration),
      icon: options.icon,
      closable: options.closable ?? true,
      action: options.action,
      onClose: options.onClose,
      state: "open",
    } as Item;
    const list = toasts();
    const index = list.findIndex((t) => t.id === id);
    if (index >= 0) {
      const updated = list.slice();
      updated[index] = next;
      setToasts(updated);
    } else {
      setToasts([...list, next]);
    }
    schedule(id, next.duration);
    return id;
  };

  const update = (
    id: ToastQueueId,
    options: Omit<ToastQueueOptions<C>, "id">,
  ) => {
    const current = toasts().find((t) => t.id === id && t.state === "open");
    if (!current) return;
    // Entering / leaving the loading state with the default duration of the
    // previous state switches to the default of the new one unless a
    // duration is given
    const loadingChanged =
      options.loading !== undefined && options.loading !== current.loading;
    const previousDefault = current.loading ? 0 : defaultDuration;
    const duration =
      options.duration ??
      (loadingChanged && current.duration === previousDefault
        ? undefined
        : current.duration);
    // The current toast doubles as the extra data: its own fields are all
    // overwritten by the merged options.
    add({ ...current, ...options, id, duration }, current);
  };

  function dismiss(
    id: ToastQueueId,
    reason: ToastQueueCloseReason = "dismiss",
  ): void {
    clearTimer(id);
    const closing = toasts().find((t) => t.id === id && t.state === "open");
    if (!closing) return;
    setToasts(
      toasts().map((t) => (t.id === id ? { ...t, state: "closing" } : t)),
    );
    closing.onClose?.(id);
    notify({ type: "close", item: closing, reason });
    scheduler.setTimeout(() => {
      // A toast shown again with the same id while closing stays
      const current = toasts().find((t) => t.id === id);
      if (current?.state !== "closing") return;
      setToasts(toasts().filter((t) => t.id !== id));
      notify({ type: "remove", item: current });
    }, exitDuration);
  }

  const dismissAll = () => {
    for (const t of toasts()) dismiss(t.id);
  };

  const pause = (id: ToastQueueId) => {
    const timer = timers.get(id);
    if (!timer || timer.paused) return;
    scheduler.clearTimeout(timer.handle);
    timer.remaining = Math.max(0, timer.deadline - scheduler.now());
    timer.paused = true;
  };

  const resume = (id: ToastQueueId) => {
    const timer = timers.get(id);
    if (!timer?.paused) return;
    timer.paused = false;
    timer.deadline = scheduler.now() + timer.remaining;
    timer.handle = scheduler.setTimeout(
      () => dismiss(id, "timeout"),
      timer.remaining,
    );
  };

  const reset = () => {
    for (const id of [...timers.keys()]) clearTimer(id);
    setToasts([]);
  };

  const send = (event: ToastQueueEvent<C, X>) => {
    switch (event.type) {
      case "ADD":
        add(event.options, event.extra);
        break;
      case "UPDATE":
        update(event.id, event.options);
        break;
      case "DISMISS":
        dismiss(event.id, event.reason);
        break;
      case "DISMISS_ALL":
        dismissAll();
        break;
      case "PAUSE":
        pause(event.id);
        break;
      case "RESUME":
        resume(event.id);
        break;
      case "RESET":
        reset();
        break;
    }
  };

  return {
    getState: store.getState,
    subscribe: store.subscribe,
    send,
    add,
    update,
    dismiss,
    dismissAll,
    pause,
    resume,
    isPaused: (id) => timers.get(id)?.paused ?? false,
    reset,
    subscribeLifecycle(listener) {
      lifecycle.add(listener);
      return () => {
        lifecycle.delete(listener);
      };
    },
  };
}
