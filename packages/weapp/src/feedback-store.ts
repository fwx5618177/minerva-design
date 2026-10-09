export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  color?: "primary" | "danger" | "warning";
  loading?: boolean;
  confirmDisabled?: boolean;
}
export interface ConfirmEntry extends ConfirmOptions {
  id: number;
}
export function createConfirmStore() {
  let sequence = 0;
  const entries: Array<{
    entry: ConfirmEntry;
    resolve: (value: boolean) => void;
  }> = [];
  const listeners = new Set<(items: ConfirmEntry[]) => void>();
  const notify = () =>
    listeners.forEach((fn) => fn(entries.map((e) => e.entry)));
  return {
    request(options: ConfirmOptions) {
      return new Promise<boolean>((resolve) => {
        entries.push({ entry: { ...options, id: ++sequence }, resolve });
        notify();
      });
    },
    settle(id: number, value: boolean) {
      const index = entries.findIndex((e) => e.entry.id === id);
      if (index < 0) return;
      const [entry] = entries.splice(index, 1);
      entry!.resolve(value);
      notify();
    },
    clear() {
      const old = entries.splice(0);
      old.forEach((e) => e.resolve(false));
      notify();
    },
    subscribe(listener: (items: ConfirmEntry[]) => void) {
      listeners.add(listener);
      listener(entries.map((e) => e.entry));
      return () => listeners.delete(listener);
    },
  };
}
export const globalConfirmStore = createConfirmStore();
export const confirm = (options: ConfirmOptions) =>
  globalConfirmStore.request(options);
export type ToastId = string | number;
export interface ToastOptions {
  id?: ToastId;
  title?: string;
  description?: string;
  color?: "info" | "success" | "warning" | "danger";
  loading?: boolean;
  duration?: number;
  closable?: boolean;
  action?: { label: string; onClick: () => void };
  onClose?: (id: ToastId) => void;
}
export interface ToastEntry extends ToastOptions {
  id: ToastId;
}
export interface ToastMessages<T> {
  loading: string;
  success: string | ((value: T) => string);
  error: string | ((error: unknown) => string);
}
export function createToastStore() {
  let sequence = 0;
  let limit = Infinity;
  let items: ToastEntry[] = [];
  const listeners = new Set<(items: ToastEntry[]) => void>();
  const timers = new Map<
    ToastId,
    {
      timer?: ReturnType<typeof setTimeout>;
      deadline: number;
      remaining: number;
    }
  >();
  const notify = () => listeners.forEach((fn) => fn([...items]));
  function dismiss(id?: ToastId) {
    const removed = id === undefined ? items : items.filter((e) => e.id === id);
    items = id === undefined ? [] : items.filter((e) => e.id !== id);
    for (const e of removed) {
      clearTimeout(timers.get(e.id)?.timer);
      timers.delete(e.id);
      e.onClose?.(e.id);
    }
    if (removed.length) notify();
  }
  function schedule(item: ToastEntry) {
    clearTimeout(timers.get(item.id)?.timer);
    const duration = item.duration ?? (item.loading ? 0 : 4000);
    if (duration <= 0) {
      timers.delete(item.id);
      return;
    }
    timers.set(item.id, {
      remaining: duration,
      deadline: Date.now() + duration,
      timer: setTimeout(() => dismiss(item.id), duration),
    });
  }
  function show(options: ToastOptions): ToastId {
    const id = options.id ?? `toast-${++sequence}`;
    const index = items.findIndex((e) => e.id === id);
    const item = { color: "info" as const, closable: true, ...options, id };
    if (index < 0) items.push(item);
    else items[index] = item;
    schedule(item);
    while (items.length > limit) dismiss(items[0]!.id);
    notify();
    return id;
  }
  function update(id: ToastId, options: Omit<ToastOptions, "id">) {
    const old = items.find((e) => e.id === id);
    if (!old) return;
    const merged = { ...old, ...options, id };
    if (
      options.loading === false &&
      options.duration === undefined &&
      old.loading
    )
      delete merged.duration;
    show(merged);
  }
  const api = Object.assign(show, {
    dismiss,
    update,
    info: (title: string, options: ToastOptions = {}) =>
      show({ ...options, title, color: "info" }),
    success: (title: string, options: ToastOptions = {}) =>
      show({ ...options, title, color: "success" }),
    warning: (title: string, options: ToastOptions = {}) =>
      show({ ...options, title, color: "warning" }),
    danger: (title: string, options: ToastOptions = {}) =>
      show({ ...options, title, color: "danger" }),
    loading: (title: string, options: ToastOptions = {}) =>
      show({ ...options, title, loading: true }),
    promise<T>(
      promise: Promise<T>,
      messages: ToastMessages<T>,
      options: ToastOptions = {},
    ) {
      const id = show({ ...options, title: messages.loading, loading: true });
      promise.then(
        (value) =>
          update(id, {
            title:
              typeof messages.success === "function"
                ? messages.success(value)
                : messages.success,
            color: "success",
            loading: false,
          }),
        (error) =>
          update(id, {
            title:
              typeof messages.error === "function"
                ? messages.error(error)
                : messages.error,
            color: "danger",
            loading: false,
          }),
      );
      return promise;
    },
  });
  return {
    api,
    subscribe(listener: (items: ToastEntry[]) => void) {
      listeners.add(listener);
      listener([...items]);
      return () => listeners.delete(listener);
    },
    setLimit(max: number) {
      limit = Math.max(0, max);
      while (items.length > limit) dismiss(items[0]!.id);
    },
    pause(id: ToastId) {
      const timer = timers.get(id);
      if (!timer) return;
      clearTimeout(timer.timer);
      timer.remaining = Math.max(0, timer.deadline - Date.now());
      timer.timer = undefined;
    },
    resume(id: ToastId) {
      const timer = timers.get(id);
      if (!timer || timer.timer) return;
      timer.deadline = Date.now() + timer.remaining;
      timer.timer = setTimeout(() => dismiss(id), timer.remaining);
    },
    action(id: ToastId) {
      const item = items.find((e) => e.id === id);
      try {
        item?.action?.onClick();
      } finally {
        dismiss(id);
      }
    },
  };
}
export const globalToastStore = createToastStore();
export const toast = globalToastStore.api;
export type ToastApi = typeof toast;
