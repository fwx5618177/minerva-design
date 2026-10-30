// Page-wide budget of live WebGL contexts. Browsers keep about 16 per page
// (fewer on mobile) and silently lose the oldest beyond that, which a chart
// takes for a GPU failure (it falls back to the next backend for good). A
// dashboard or a docs page easily has more GPU charts than that, so past the
// budget the backends suspend the least recently drawn off-screen contexts
// themselves (WEBGL_lose_context frees the slot) and restore them when they
// are drawn again or scroll back into view, then redraw their last frame.
// The state lives on globalThis: every copy of the engine shares the budget.

/** What a backend does around a suspension */
export interface GlSlotHooks {
  /** The context is about to be suspended: forget its GPU objects */
  suspend(): void;
  /** The context is back: rebuild the programs and redraw the last frame */
  restore(): void;
  /** A real loss (GPU reset, eviction by the browser, failed restore) */
  lost(): void;
}

export interface GlSlot {
  /**
   * Marks the context as used now. False while it is suspended: a restore
   * is then under way and `restore()` redraws once it is done.
   */
  use(): boolean;
  /** Leaves the budget (destroy) */
  release(): void;
}

interface Entry {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  ext: WEBGL_lose_context;
  hooks: GlSlotHooks;
  lastUsed: number;
  /** On or near the screen (always true without IntersectionObserver) */
  visible: boolean;
  /** Lost on purpose by the budget */
  suspended: boolean;
  /** The lost event of the suspension was dispatched (restore is allowed) */
  lostSeen: boolean;
  /** Restore wanted, waiting for the lost event or `webglcontextrestored` */
  restoring: boolean;
  /** restoreContext() was called */
  requested: boolean;
  timer: ReturnType<typeof setTimeout> | undefined;
  onLost(event: Event): void;
  onRestored(): void;
}

interface BudgetState {
  budget: number;
  entries: Set<Entry>;
  observer: IntersectionObserver | null | undefined;
  byCanvas: WeakMap<Element, Entry>;
  clock: number;
}

const KEY = Symbol.for("minerva-design.charts.gl-budget");

/** Chromium keeps 16 contexts per page (8 on Android): leave room for others */
const defaultBudget = () =>
  typeof navigator !== "undefined" &&
  /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent ?? "")
    ? 6
    : 12;

const state = (): BudgetState => {
  const host = globalThis as unknown as Record<symbol, BudgetState>;
  return (host[KEY] ??= {
    budget: defaultBudget(),
    entries: new Set(),
    observer: undefined,
    byCanvas: new WeakMap(),
    clock: 0,
  });
};

/** A restore that doesn't come back in time is a real loss */
const RESTORE_TIMEOUT = 3000;

const observer = (s: BudgetState): IntersectionObserver | null => {
  if (s.observer !== undefined) return s.observer;
  s.observer =
    typeof IntersectionObserver === "function"
      ? new IntersectionObserver(
          (records) => {
            for (const record of records) {
              const entry = s.byCanvas.get(record.target);
              if (entry) entry.visible = record.isIntersecting;
            }
            // scrolled back near the screen: restore before it is needed
            resumeWaiting(s);
          },
          { rootMargin: "200px" },
        )
      : null;
  return s.observer;
};

const isActive = (entry: Entry) => !entry.suspended || entry.restoring;

const suspend = (entry: Entry) => {
  entry.suspended = true;
  entry.lostSeen = false;
  entry.hooks.suspend();
  // already lost by the browser (event pending): it becomes a suspension
  if (!entry.gl.isContextLost()) entry.ext.loseContext();
};

/**
 * Suspends other contexts until `keep` (or nothing) fits in the budget:
 * off-screen ones first, then the least recently drawn. With
 * `onScreenToo` false, only off-screen contexts may go, and nothing is
 * suspended (false is returned) when that isn't enough.
 */
const makeRoom = (
  s: BudgetState,
  keep: Entry | null,
  onScreenToo: boolean,
): boolean => {
  const others = [...s.entries].filter((e) => e !== keep && isActive(e));
  let excess = others.length + (keep ? 1 : 0) - s.budget;
  if (excess <= 0) return true;
  const victims = others
    .filter((e) => !e.restoring && (onScreenToo || !e.visible))
    .sort((a, b) =>
      a.visible === b.visible ? a.lastUsed - b.lastUsed : a.visible ? 1 : -1,
    );
  if (!onScreenToo && victims.length < excess) return false;
  for (const victim of victims) {
    if (excess-- <= 0) break;
    suspend(victim);
  }
  return excess <= 0;
};

const fail = (s: BudgetState, entry: Entry) => {
  leave(s, entry);
  entry.hooks.lost();
};

/**
 * Restores a suspended context that is on screen, if a slot can be freed
 * without suspending another on-screen chart (no ping-pong between charts)
 */
function resume(s: BudgetState, entry: Entry) {
  if (!entry.suspended || entry.restoring || !entry.visible) return;
  if (!makeRoom(s, entry, false)) return;
  entry.restoring = true;
  // restoreContext only works once the lost event was dispatched
  if (entry.lostSeen) requestRestore(s, entry);
}

/** Visible suspended contexts waiting for a slot */
function resumeWaiting(s: BudgetState) {
  for (const entry of [...s.entries].sort((a, b) => b.lastUsed - a.lastUsed)) {
    if (entry.suspended && entry.visible) resume(s, entry);
  }
}

const requestRestore = (s: BudgetState, entry: Entry) => {
  entry.requested = true;
  entry.timer = setTimeout(() => fail(s, entry), RESTORE_TIMEOUT);
  try {
    entry.ext.restoreContext();
  } catch {
    fail(s, entry);
  }
};

function leave(s: BudgetState, entry: Entry) {
  if (!s.entries.delete(entry)) return;
  if (entry.timer !== undefined) clearTimeout(entry.timer);
  entry.timer = undefined;
  entry.canvas.removeEventListener("webglcontextlost", entry.onLost);
  entry.canvas.removeEventListener("webglcontextrestored", entry.onRestored);
  // a restore still on its way would bring back a context nobody uses
  if (entry.requested && entry.restoring) {
    entry.canvas.addEventListener(
      "webglcontextrestored",
      () => entry.ext.loseContext(),
      { once: true },
    );
  }
  s.observer?.unobserve(entry.canvas);
  s.byCanvas.delete(entry.canvas);
  resumeWaiting(s);
}

/**
 * Enters the context of `canvas` into the page-wide budget (suspending
 * others if needed) and takes over its lost / restored events: suspensions
 * stay internal, real losses reach `hooks.lost`. Without WEBGL_lose_context
 * the context is left unmanaged (the browser's own limit applies).
 */
export const claimGlSlot = (
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  hooks: GlSlotHooks,
): GlSlot => {
  const s = state();
  const ext = gl.getExtension("WEBGL_lose_context");
  if (!ext) {
    const onLost = (event: Event) => {
      event.preventDefault();
      hooks.lost();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    return {
      use: () => !gl.isContextLost(),
      release: () => canvas.removeEventListener("webglcontextlost", onLost),
    };
  }
  const entry: Entry = {
    canvas,
    gl,
    ext,
    hooks,
    lastUsed: ++s.clock,
    visible: true,
    suspended: false,
    lostSeen: false,
    restoring: false,
    requested: false,
    timer: undefined,
    onLost(event) {
      // always: keeps restoreContext possible
      event.preventDefault();
      if (!entry.suspended) {
        fail(s, entry);
        return;
      }
      entry.lostSeen = true;
      // after the dispatch: the browser allows the restore once it returns
      if (entry.restoring && !entry.requested) {
        setTimeout(() => {
          if (entry.restoring && !entry.requested && s.entries.has(entry)) {
            requestRestore(s, entry);
          }
        });
      }
    },
    onRestored() {
      if (!entry.restoring) return;
      if (entry.timer !== undefined) clearTimeout(entry.timer);
      entry.timer = undefined;
      entry.restoring = false;
      entry.requested = false;
      entry.suspended = false;
      entry.hooks.restore();
    },
  };
  canvas.addEventListener("webglcontextlost", entry.onLost);
  canvas.addEventListener("webglcontextrestored", entry.onRestored);
  s.entries.add(entry);
  s.byCanvas.set(canvas, entry);
  observer(s)?.observe(canvas);
  // a new chart always gets its context (it was just created)
  makeRoom(s, entry, true);
  return {
    use() {
      entry.lastUsed = ++s.clock;
      if (!entry.suspended) return !gl.isContextLost();
      // drawn while suspended: restored now if on screen, else when it
      // scrolls back (its last frame is redrawn then)
      resume(s, entry);
      return false;
    },
    release: () => leave(s, entry),
  };
};

/** Live contexts allowed on the page (tests, embedders with other WebGL users) */
export const setGlContextBudget = (budget: number): void => {
  const s = state();
  s.budget = Math.max(1, Math.floor(budget));
  makeRoom(s, null, true);
  resumeWaiting(s);
};

/** Contexts in the budget, and how many are suspended (tests, diagnostics) */
export const glContextUsage = (): { total: number; suspended: number } => {
  const entries = [...state().entries];
  return {
    total: entries.length,
    suspended: entries.filter((entry) => !isActive(entry)).length,
  };
};
