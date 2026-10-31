// Canvases resolve CSS colors (currentColor, var(--x)) to numbers when they
// draw; a theme switch changes them without touching the icons. This
// watches the usual theme switches: classes, styles and data attributes of
// <html> and <body>, and the system color scheme.

const listeners = new Set<() => void>();
let stop: (() => void) | null = null;

const notify = () => {
  for (const listener of [...listeners]) listener();
};

const start = () => {
  if (typeof document === "undefined") return () => {};
  const cleanups: (() => void)[] = [];
  if (typeof MutationObserver === "function") {
    const observer = new MutationObserver(notify);
    const options: MutationObserverInit = { attributes: true };
    observer.observe(document.documentElement, options);
    if (document.body) observer.observe(document.body, options);
    cleanups.push(() => observer.disconnect());
  }
  if (typeof matchMedia === "function") {
    const query = matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener?.("change", notify);
    cleanups.push(() => query.removeEventListener?.("change", notify));
  }
  return () => cleanups.forEach((cleanup) => cleanup());
};

/** Calls `listener` after a possible theme change; returns an unsubscribe function */
export const observeTheme = (listener: () => void): (() => void) => {
  listeners.add(listener);
  stop ??= start();
  return () => {
    listeners.delete(listener);
    if (!listeners.size && stop) {
      stop();
      stop = null;
    }
  };
};
