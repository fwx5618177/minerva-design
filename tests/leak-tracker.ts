// Leak tracker shared by the React and web component leak harnesses:
// records the global resources a component acquires (event listeners on
// window / document / <html> / <body> / media query lists, timers, animation
// frames, idle callbacks, Resize / Mutation / Intersection observers) and
// reports the ones still held after it was unmounted / disconnected.
//
// Only resources acquired from the library sources are counted (the call
// stack contains packages/<core|dom|react|web-components>/src and no
// node_modules frame in between): React, Lit, happy-dom and Testing Library
// internals are not ours.

type Kind = "listener" | "timer" | "interval" | "frame" | "idle" | "observer";

interface Resource {
  kind: Kind;
  label: string;
  stack: string;
}

const OWN_FRAME =
  /[\\/]packages[\\/](core|dom|react|web-components)[\\/]src[\\/](?!.*\.test\.)/;

/** First library frame of the current stack, or null when not ours */
function ownFrame(): string | null {
  const lines = (new Error().stack ?? "").split("\n").slice(1);
  for (const line of lines) {
    if (/leak-tracker/.test(line)) continue;
    if (/node_modules/.test(line)) return null;
    if (OWN_FRAME.test(line)) return line.trim();
  }
  return null;
}

type Restore = () => void;

export interface LeakTracker {
  /** Resources acquired by the library and still held */
  held(): string[];
  /** Number of held resources of each label (to compare connect cycles) */
  counts(): Map<string, number>;
  /** Puts the original globals back */
  restore(): void;
}

const capture = (options?: boolean | EventListenerOptions) =>
  typeof options === "boolean" ? options : !!options?.capture;

export function trackLeaks(
  win: Window & typeof globalThis = window,
): LeakTracker {
  const held = new Map<unknown, Resource>();
  const restores: Restore[] = [];
  const acquire = (key: unknown, kind: Kind, label: string) => {
    const stack = ownFrame();
    if (stack) held.set(key, { kind, label, stack });
  };
  const release = (key: unknown) => held.delete(key);

  const patch = <T extends object, K extends keyof T>(
    target: T,
    name: K,
    replacement: (original: T[K]) => T[K],
  ) => {
    const original = target[name];
    if (typeof original !== "function") return;
    const own = Object.prototype.hasOwnProperty.call(target, name);
    target[name] = replacement(original.bind(target) as T[K]);
    restores.push(() => {
      if (own) target[name] = original;
      else delete target[name];
    });
  };

  // --- event listeners -----------------------------------------------------
  const listenerKey = (
    target: EventTarget,
    name: string,
    type: string,
    listener: EventListenerOrEventListenerObject,
    useCapture: boolean,
  ) => {
    const id = `${name}|${type}|${useCapture}`;
    // one key object per (target, type, capture, listener)
    let byListener = keyStore.get(target);
    if (!byListener) keyStore.set(target, (byListener = new Map()));
    let byId = byListener.get(listener);
    if (!byId) byListener.set(listener, (byId = new Map()));
    let key = byId.get(id);
    if (!key) byId.set(id, (key = { id }));
    return key;
  };
  const keyStore = new WeakMap<
    EventTarget,
    Map<EventListenerOrEventListenerObject, Map<string, object>>
  >();
  const trackTarget = (target: EventTarget, name: string) => {
    patch(
      target,
      "addEventListener",
      (add) =>
        function (this: unknown, type, listener, options) {
          if (listener) {
            const key = listenerKey(
              target,
              name,
              type,
              listener,
              capture(options),
            );
            if (!held.has(key))
              acquire(key, "listener", `${name} "${type}" listener`);
          }
          return add(type, listener, options);
        } as EventTarget["addEventListener"],
    );
    patch(
      target,
      "removeEventListener",
      (remove) =>
        function (this: unknown, type, listener, options) {
          if (listener) {
            release(
              listenerKey(target, name, type, listener, capture(options)),
            );
          }
          return remove(type, listener, options);
        } as EventTarget["removeEventListener"],
    );
  };
  trackTarget(win, "window");
  trackTarget(win.document, "document");
  trackTarget(win.document.documentElement, "<html>");
  if (win.document.body) trackTarget(win.document.body, "<body>");

  // media query lists: track their (legacy and modern) listeners
  // bare calls (`setTimeout(...)`) use globalThis, which may not be `window`
  const globals = Array.from(
    new Set<typeof win>([win, globalThis as typeof win]),
  );
  for (const scope of globals)
    patch(scope, "matchMedia", (matchMedia) => (query: string) => {
      const list = matchMedia(query);
      if (!list || (list as { __tracked?: boolean }).__tracked) return list;
      (list as { __tracked?: boolean }).__tracked = true;
      const name = `matchMedia(${query})`;
      trackTarget(list, name);
      patch(list, "addListener", (add) => (listener) => {
        if (listener)
          acquire(
            listenerKey(list, name, "change", listener as EventListener, false),
            "listener",
            `${name} listener`,
          );
        return add(listener);
      });
      patch(list, "removeListener", (remove) => (listener) => {
        if (listener)
          release(
            listenerKey(list, name, "change", listener as EventListener, false),
          );
        return remove(listener);
      });
      return list;
    });

  // --- timers ----------------------------------------------------------------
  const timer = (
    schedule:
      | "setTimeout"
      | "setInterval"
      | "requestAnimationFrame"
      | "requestIdleCallback",
    cancel:
      | "clearTimeout"
      | "clearInterval"
      | "cancelAnimationFrame"
      | "cancelIdleCallback",
    kind: Kind,
  ) => {
    const keyOf = (id: unknown) => `${kind}:${String(id)}`;
    for (const scope of globals)
      patch(
        scope,
        schedule,
        (original) =>
          ((callback: (...args: unknown[]) => void, ...rest: unknown[]) => {
            const handle: { id?: unknown } = {};
            const wrapped = (...args: unknown[]) => {
              if (kind !== "interval") release(keyOf(handle.id));
              return callback(...args);
            };
            handle.id = (original as (...a: unknown[]) => unknown)(
              typeof callback === "function" ? wrapped : callback,
              ...rest,
            );
            acquire(keyOf(handle.id), kind, `${schedule}(${rest[0] ?? ""})`);
            return handle.id;
          }) as never,
      );
    for (const scope of globals)
      patch(
        scope,
        cancel,
        (original) =>
          ((id: unknown) => {
            release(keyOf(id));
            return (original as (id: unknown) => void)(id);
          }) as never,
      );
  };
  timer("setTimeout", "clearTimeout", "timer");
  timer("setInterval", "clearInterval", "interval");
  timer("requestAnimationFrame", "cancelAnimationFrame", "frame");
  timer("requestIdleCallback", "cancelIdleCallback", "idle");

  // --- observers ---------------------------------------------------------------
  for (const name of [
    "ResizeObserver",
    "MutationObserver",
    "IntersectionObserver",
  ] as const) {
    const Original = win[name] as unknown as
      | (new (...args: never[]) => {
          observe(...args: unknown[]): void;
          unobserve?(target: unknown): void;
          disconnect(): void;
        })
      | undefined;
    if (!Original) continue;
    class Tracked extends Original {
      #targets = new Set<unknown>();
      observe(...args: unknown[]) {
        this.#targets.add(args[0]);
        if (!held.has(this)) acquire(this, "observer", name);
        return super.observe(...args);
      }
      unobserve(target: unknown) {
        this.#targets.delete(target);
        if (this.#targets.size === 0) release(this);
        return super.unobserve?.(target);
      }
      disconnect() {
        this.#targets.clear();
        release(this);
        return super.disconnect();
      }
    }
    (win as unknown as Record<string, unknown>)[name] = Tracked;
    (globalThis as unknown as Record<string, unknown>)[name] = Tracked;
    restores.push(() => {
      (win as unknown as Record<string, unknown>)[name] = Original;
      (globalThis as unknown as Record<string, unknown>)[name] = Original;
    });
  }

  return {
    held: () =>
      Array.from(
        held.values(),
        (r) => `${r.label} (${r.stack.replace(/^at /, "")})`,
      ),
    counts: () => {
      const counts = new Map<string, number>();
      for (const r of held.values()) {
        const label = `${r.label} @ ${r.stack.replace(/:\d+:\d+\)?$/, "")}`;
        counts.set(label, (counts.get(label) ?? 0) + 1);
      }
      return counts;
    },
    restore: () => {
      for (const undo of restores.reverse()) undo();
      restores.length = 0;
      held.clear();
    },
  };
}
