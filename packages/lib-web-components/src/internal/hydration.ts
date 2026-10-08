/**
 * Hydration-safe host attributes.
 *
 * Composite items (`<minerva-tab>`, `<minerva-tab-panel>`, `<minerva-radio>`,
 * `<minerva-option>`...) carry state on their HOST: roving `tabindex`,
 * `aria-controls` / `aria-labelledby` id references, generated ids,
 * `data-state`, `slot`, `hidden`. When such markup comes from the server
 * (a React 19 page rendering the tags) and the definitions load before the
 * framework hydrates, writing these attributes on upgrade makes the
 * framework report hydration mismatches.
 *
 * Elements that may be server-rendered markup - upgraded (already in the
 * document when constructed) or created while the document is still being
 * parsed - therefore DEFER the host attributes they write themselves: the
 * latest value of each is recorded and applied once hydration has had a
 * chance to run (after the next animation frame, then the next idle period
 * or task), and the callbacks registered with `onHostSettled()` (roving
 * focus set up...) run then. Elements created by script (`createElement`,
 * Lit / React client rendering) write synchronously, as usual. ARIA that
 * ElementInternals can carry (`role`, `aria-selected`...) is never
 * deferred: it adds no host attribute.
 */

/** Elements whose host attributes are deferred, with their pending writes */
const deferred = new WeakMap<Element, Map<string, string | null>>();
/** Callbacks of deferred elements, run when they settle */
const callbacks = new Map<Element, Array<() => void>>();
/** Connected deferred elements waiting for the flush */
const queue = new Set<Element>();
let scheduled = false;
let waiters: Array<() => void> = [];

/** Safety net when no frame comes (background tab): settle anyway */
const MAX_DELAY = 1000;

/**
 * Called from the constructor: marks an element that may be server-rendered
 * markup (upgraded, or parsed while the document is loading).
 */
export function markServerRendered(el: Element): void {
  if (deferred.has(el)) return; // already inherited from its group
  if (
    el.isConnected ||
    (typeof document !== "undefined" && document.readyState === "loading")
  ) {
    deferred.set(el, new Map());
  }
}

/**
 * Called when an element connects: a deferred one settles after the
 * hydration window (no-op for the others).
 */
export function scheduleHostSettle(el: Element): void {
  if (deferred.has(el)) schedule(el);
}

/** Whether the host attributes of `el` are still deferred. */
export function isHostDeferred(el: Element): boolean {
  return deferred.has(el);
}

/**
 * Sets (string), toggles (boolean) or removes (`null` / `false`) a host
 * attribute, now or - for a deferred element - once it settles. `owner` is
 * the element writing on another one (a group setting the ids of its items):
 * while the owner is deferred, `el` is deferred too (it may not be upgraded
 * yet, but it is server-rendered markup as well).
 */
export function setHostAttribute(
  el: Element,
  name: string,
  value: string | boolean | null,
  owner?: Element,
): void {
  const next = value === true ? "" : value === false ? null : value;
  if (owner && deferred.has(owner) && !deferred.has(el)) {
    deferred.set(el, new Map());
  }
  const pending = deferred.get(el);
  if (pending) {
    pending.set(name, next);
    schedule(el);
    return;
  }
  write(el, name, next);
}

/**
 * The value of a host attribute, including a deferred write not applied
 * yet (`null` when absent).
 */
export function getHostAttribute(el: Element, name: string): string | null {
  const pending = deferred.get(el);
  if (pending?.has(name)) return pending.get(name) ?? null;
  return el.getAttribute(name);
}

/**
 * Runs `callback` once `el` settles (immediately when it is not deferred).
 * Returns whether it ran synchronously.
 */
export function onHostSettled(el: Element, callback: () => void): boolean {
  if (!deferred.has(el)) {
    callback();
    return true;
  }
  const list = callbacks.get(el) ?? [];
  list.push(callback);
  callbacks.set(el, list);
  schedule(el);
  return false;
}

/** Resolves after the pending deferred elements settled (tests, demos). */
export function hostSettled(): Promise<void> {
  if (!scheduled) return Promise.resolve();
  return new Promise((resolve) => waiters.push(resolve));
}

function write(el: Element, name: string, value: string | null) {
  if (value === null) {
    if (el.hasAttribute(name)) el.removeAttribute(name);
  } else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
}

function schedule(el: Element) {
  queue.add(el);
  if (scheduled) return;
  scheduled = true;
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    clearTimeout(safety);
    flush();
  };
  const safety = setTimeout(run, MAX_DELAY);
  const afterFrame = () => {
    const idle = (
      globalThis as {
        requestIdleCallback?: (
          cb: () => void,
          options?: { timeout: number },
        ) => number;
      }
    ).requestIdleCallback;
    if (idle) idle(run, { timeout: 200 });
    else setTimeout(run, 0);
  };
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(afterFrame);
  } else {
    afterFrame();
  }
}

function flush() {
  scheduled = false;
  const elements = Array.from(queue);
  queue.clear();
  // attributes first (every element), then the callbacks reading them
  for (const el of elements) {
    const pending = deferred.get(el);
    deferred.delete(el);
    for (const [name, value] of pending ?? []) write(el, name, value);
  }
  for (const el of elements) {
    const list = callbacks.get(el) ?? [];
    callbacks.delete(el);
    for (const callback of list) callback();
  }
  const resolved = waiters;
  waiters = [];
  for (const resolve of resolved) resolve();
}
