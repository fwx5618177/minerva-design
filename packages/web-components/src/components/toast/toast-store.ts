// Framework-agnostic toast store and `toast()` API: a port of the React library's
// `components/Toast/store.ts` (same semantics: same-id replacement, timers,
// pause / resume, closing state, update, promise), without React. No DOM
// access at import time (SSR safe).
import type { TemplateResult } from "lit";
import { DEV, devWarn } from "../../internal/dev";

/** Default auto-close delay, in milliseconds */
export const DEFAULT_TOAST_DURATION = 4000;
/** Length of the closing animation before a toast is removed */
export const TOAST_EXIT_DURATION = 200;

/** Tag name of the toast region element */
export const TOAST_REGION_TAG = "minerva-toast-region";

export type ToastId = string | number;

/** Renderable toast content: text, a DOM node or a Lit template */
export type ToastContent = string | Node | TemplateResult;

/** Semantic color of a toast */
export type ToastColor = "info" | "success" | "warning" | "danger";

/** Screen corner / edge where the toast stack is shown */
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

/** Why a toast closed (`minerva-close` detail) */
export type ToastCloseReason =
  "timeout" | "close-button" | "action" | "escape" | "dismiss" | "overflow";

/** Button rendered inside a toast; activating it also closes the toast */
export interface ToastAction {
  /** Visible text of the button */
  label: ToastContent;
  /** Called when the button is activated, before the toast closes */
  onClick: () => void;
}

/** Region a toast is shown in: the element, or its `id` */
export type ToastRegionTarget = HTMLElement | string;

/** Options of a toast (the React library's `ToastOptions`, plus `region`) */
export interface ToastOptions {
  /**
   * Identifier of the toast; generated when omitted. Showing a toast with the
   * id of a visible one replaces it (and restarts its timer)
   */
  id?: ToastId;
  /** Semantic color; sets the accent, icon and ARIA role. @default "info" */
  color?: ToastColor;
  /** Spinner instead of the icon, no auto-close by default. @default false */
  loading?: boolean;
  /** Main text */
  title?: ToastContent;
  /** Secondary text under the title */
  description?: ToastContent;
  /**
   * Time in milliseconds before the toast closes automatically; 0 keeps it
   * open. Loading toasts default to 0. @default 4000
   */
  duration?: number;
  /** Replaces the color icon (or the loading spinner); null hides it */
  icon?: ToastContent | null;
  /** Shows the close button. @default true */
  closable?: boolean;
  /** Action button rendered in the toast (e.g. "Undo") */
  action?: ToastAction;
  /** Called once with the toast id when it closes, whatever the reason */
  onClose?: (id: ToastId) => void;
  /**
   * `<minerva-toast-region>` (element or id) that renders the toast; default:
   * the first connected region in document order (one is created on
   * `document.body` when there is none)
   */
  region?: ToastRegionTarget;
}

/** Messages of `toast.promise`: content, or a function of the settled value */
export interface ToastPromiseMessages<T> {
  /** Title while the promise is pending */
  loading: ToastContent;
  /** Title once the promise resolves */
  success: ToastContent | ((value: T) => ToastContent);
  /** Title once the promise rejects */
  error: ToastContent | ((error: unknown) => ToastContent);
}

/** The `toast` function and its shortcuts (the React library's `ToastApi`) */
export interface ToastApi {
  /** Shows a toast and returns its id */
  (options: ToastOptions): ToastId;
  /** Shows an info toast with the given title */
  info: (title: ToastContent, options?: ToastOptions) => ToastId;
  /** Shows a success toast with the given title */
  success: (title: ToastContent, options?: ToastOptions) => ToastId;
  /** Shows a warning toast with the given title */
  warning: (title: ToastContent, options?: ToastOptions) => ToastId;
  /** Shows a danger toast with the given title */
  danger: (title: ToastContent, options?: ToastOptions) => ToastId;
  /** Shows a loading toast (spinner, no auto-close) with the given title */
  loading: (title: ToastContent, options?: ToastOptions) => ToastId;
  /**
   * Shows a loading toast while the promise is pending, then turns the same
   * toast into a success or danger toast. Returns the given promise
   */
  promise: <T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages<T>,
    options?: Omit<ToastOptions, "color" | "loading" | "title">,
  ) => Promise<T>;
  /**
   * Changes an open toast in place (merging the options) and restarts its
   * timer; `loading: false` turns a loading toast into a regular one.
   * Unknown ids are ignored
   */
  update: (id: ToastId, options: Omit<ToastOptions, "id">) => void;
  /** Closes the toast with the given id, or every toast when omitted */
  dismiss: (id?: ToastId) => void;
  /**
   * The same API bound to a region (element or id): its toasts render in
   * that `<minerva-toast-region>` (the React library's `useToast()` scope)
   */
  region: (target: ToastRegionTarget) => ToastApi;
}

/** A toast held by the store */
export interface ToastItem {
  id: ToastId;
  color: ToastColor;
  loading: boolean;
  title?: ToastContent;
  description?: ToastContent;
  duration: number;
  /** Custom icon; undefined uses the color icon (or spinner), null hides it */
  icon?: ToastContent | null;
  closable: boolean;
  action?: ToastAction;
  onClose?: (id: ToastId) => void;
  state: "open" | "closing";
  /** Explicit region; `undefined` = the owner region */
  region?: HTMLElement;
}

/** Store lifecycle notifications (regions turn them into DOM events) */
export type ToastLifecycleEvent =
  | { type: "close"; item: ToastItem; reason: ToastCloseReason }
  | { type: "remove"; item: ToastItem };

type Listener = (toasts: ToastItem[]) => void;
type LifecycleListener = (event: ToastLifecycleEvent) => void;

interface Timer {
  handle?: ReturnType<typeof setTimeout>;
  deadline: number;
  remaining: number;
  paused: boolean;
}

const hasDOM = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

export interface ToastStoreOptions {
  /** Whether toasts are kept (false on the server). @default DOM available */
  isClient?: () => boolean;
}

/**
 * Module level store: the API works anywhere; `<minerva-toast-region>`
 * elements render the list. Re-using an id replaces the toast.
 */
export class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners = new Set<Listener>();
  private lifecycle = new Set<LifecycleListener>();
  private idCounter = 0;
  private timers = new Map<ToastId, Timer>();
  private readonly isClient: () => boolean;

  constructor(options: ToastStoreOptions = {}) {
    this.isClient = options.isClient ?? hasDOM;
  }

  /** Listens to list changes; returns the unsubscribe function. */
  subscribe = (fn: Listener): (() => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  /** Listens to close / remove notifications. */
  subscribeLifecycle = (fn: LifecycleListener): (() => void) => {
    this.lifecycle.add(fn);
    return () => {
      this.lifecycle.delete(fn);
    };
  };

  private emit(): void {
    for (const fn of [...this.listeners]) fn(this.toasts);
  }

  private notify(event: ToastLifecycleEvent): void {
    for (const fn of [...this.lifecycle]) fn(event);
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
      handle: setTimeout(() => this.dismiss(id, "timeout"), duration),
      deadline: Date.now() + duration,
      remaining: duration,
      paused: false,
    });
  }

  /** Shows (or replaces) a toast; returns its id. */
  push(opts: ToastOptions, region?: HTMLElement): ToastId {
    const id = opts.id ?? ++this.idCounter;
    // SSR: a module level list would leak between requests; nothing renders
    // on the server anyway.
    if (!this.isClient()) return id;
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
      region,
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
   * Changes an open toast in place (options merged, timer restarted).
   * Unknown or closing ids are ignored.
   */
  update(id: ToastId, opts: Omit<ToastOptions, "id">): void {
    const current = this.toasts.find((t) => t.id === id && t.state === "open");
    if (!current) return;
    const loadingChanged =
      opts.loading !== undefined && opts.loading !== current.loading;
    const defaultDuration = current.loading ? 0 : DEFAULT_TOAST_DURATION;
    const duration =
      opts.duration ??
      (loadingChanged && current.duration === defaultDuration
        ? undefined
        : current.duration);
    this.push({ ...current, ...opts, id, duration }, current.region);
  }

  /** Starts the closing animation, then removes the toast. */
  dismiss(id: ToastId, reason: ToastCloseReason = "dismiss"): void {
    this.clearTimer(id);
    const closing = this.toasts.find((t) => t.id === id && t.state === "open");
    if (!closing) return;
    this.toasts = this.toasts.map((t) =>
      t.id === id ? { ...t, state: "closing" } : t,
    );
    this.emit();
    closing.onClose?.(id);
    this.notify({ type: "close", item: closing, reason });
    setTimeout(() => {
      // A toast pushed again with the same id while closing stays
      const current = this.toasts.find((t) => t.id === id);
      if (current?.state !== "closing") return;
      this.toasts = this.toasts.filter((t) => t.id !== id);
      this.emit();
      this.notify({ type: "remove", item: current });
    }, TOAST_EXIT_DURATION);
  }

  /** Closes every open toast. */
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
    timer.handle = setTimeout(
      () => this.dismiss(id, "timeout"),
      timer.remaining,
    );
  }

  /** Current list (a new array on every change). */
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

/** The store behind the `toast` export. */
export const toastStore = new ToastStore();

/** Marks a region created on demand by `toast()` */
export const AUTO_ATTRIBUTE = "data-minerva-auto";

/**
 * Connected `<minerva-toast-region>` elements. Toasts without an explicit
 * (connected) region render in the owner: the first region in document
 * order (connection order across shadow trees), so several regions never
 * show a toast twice.
 */
class ToastRegionRegistry {
  private regions: HTMLElement[] = [];
  private listeners = new Set<() => void>();
  private autoPending = false;

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  private changed() {
    for (const fn of [...this.listeners]) fn();
  }

  /** Regions in document order (connection order when not comparable). */
  ordered(): HTMLElement[] {
    return this.regions.slice().sort((a, b) => {
      const position = a.compareDocumentPosition(b);
      if (position & Node.DOCUMENT_POSITION_DISCONNECTED) return 0;
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
  }

  /** The region rendering toasts without an explicit region. */
  get owner(): HTMLElement | null {
    return this.ordered()[0] ?? null;
  }

  register(region: HTMLElement): void {
    if (this.regions.includes(region)) return;
    this.regions.push(region);
    // A region created on demand gives way to one of the page
    if (!region.hasAttribute(AUTO_ATTRIBUTE)) {
      for (const auto of this.regions.filter((r) =>
        r.hasAttribute(AUTO_ATTRIBUTE),
      )) {
        auto.remove();
      }
    }
    this.changed();
  }

  unregister(region: HTMLElement): void {
    const index = this.regions.indexOf(region);
    if (index < 0) return;
    this.regions.splice(index, 1);
    this.changed();
  }

  /** The region that renders `item`. */
  regionOf(item: ToastItem): HTMLElement | null {
    const explicit = item.region;
    // A region that went away falls back to the owner
    if (explicit && this.regions.includes(explicit)) return explicit;
    return this.owner;
  }

  /**
   * Creates a region on `document.body` when a toast is shown while none is
   * connected (deferred a microtask so regions parsed in the same task win).
   */
  ensureRegion(): void {
    if (this.autoPending || this.regions.length > 0 || !hasDOM()) return;
    this.autoPending = true;
    queueMicrotask(() => {
      this.autoPending = false;
      if (this.regions.length > 0 || !document.body) return;
      if (!toastStore.getSnapshot().length) return;
      const region = document.createElement(TOAST_REGION_TAG);
      region.setAttribute(AUTO_ATTRIBUTE, "");
      document.body.append(region);
    });
  }
}

export const toastRegions = new ToastRegionRegistry();

/** Resolves a region target (element or id). */
function resolveRegion(
  target: ToastRegionTarget | undefined,
): HTMLElement | undefined {
  if (target === undefined) return undefined;
  if (typeof target !== "string") return target;
  if (!hasDOM()) return undefined;
  const el = document.getElementById(target) ?? undefined;
  if (DEV && !el) {
    devWarn(
      TOAST_REGION_TAG,
      `toast(): no element with id "${target}"; the toast is shown in the default region.`,
    );
  }
  return el;
}

/**
 * Builds a toast API over `store`; toasts it shows render in `region`
 * (unless an option names another one), else in the owner region.
 */
export const createToast = (
  store: ToastStore,
  region?: ToastRegionTarget,
): ToastApi => {
  const show = (opts: ToastOptions) => {
    if (DEV && !hasDOM()) {
      devWarn(
        TOAST_REGION_TAG,
        "toast() called without a document (server side): the toast is ignored.",
      );
    }
    const { region: target, ...rest } = opts;
    const el = resolveRegion(target ?? region);
    const id = store.push(rest, el);
    if (hasDOM()) toastRegions.ensureRegion();
    return id;
  };
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
    const settle = (color: "success" | "danger", title: ToastContent) =>
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
  fn.update = (id, opts) => {
    const { region: target, ...rest } = opts as ToastOptions;
    void target;
    store.update(id, rest);
  };
  fn.dismiss = (id) =>
    id === undefined ? store.dismissAll() : store.dismiss(id);
  fn.region = (target) => createToast(store, target);
  return fn;
};

/**
 * Shows a toast: `toast({ color, title, description })`, or the shortcuts
 * `toast.success(title, options)`, `toast.danger(...)`, `toast.loading(...)`,
 * ... Returns the id; `toast.update(id, options)` changes it in place,
 * `toast.dismiss(id)` closes it, `toast.promise(promise, messages)` follows a
 * promise from loading to success / danger, `toast.region(el | id)` targets
 * a given `<minerva-toast-region>`.
 */
export const toast: ToastApi = createToast(toastStore);
