// Animation and visibility state shared by the DOM and canvas hosts: entry
// animation, interpolation from the displayed values on updates / toggles.

import {
  blendValues,
  layoutShapeScene,
  sameValues,
  shapeValues,
  toggleCount,
  type ShapeLayoutInput,
} from "./layout";
import { easeOutCubic, type ShapeScene } from "./scene";
import { resolveSunburstPath } from "./sunburst";
import type {
  ShapeChartOptions,
  ShapeDrillEvent,
  ShapeToggleEvent,
} from "./types";

/** Duration of the entry animation, ms */
export const ENTER_MS = 600;
/** Duration of the update animation, ms */
export const UPDATE_MS = 400;

export const now = () =>
  typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();

/** Whether the user prefers reduced motion (false without `matchMedia`) */
export const prefersReducedMotion = () => {
  const g = globalThis as {
    matchMedia?: (query: string) => { matches: boolean } | null;
  };
  try {
    return !!g.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
};

export type ShapeFrameInput = Omit<
  ShapeLayoutInput,
  "options" | "hidden" | "enter" | "from" | "t" | "focus"
>;

export interface ShapeRuntime {
  readonly options: ShapeChartOptions;
  readonly hidden: ReadonlySet<number>;
  setOptions(options: ShapeChartOptions): void;
  /**
   * Hides / shows an entry (only proposes it when `options.hidden` controls
   * the state); null when the index is out of range
   */
  toggle(index: number): ShapeToggleEvent | null;
  /** Hidden indexes, ascending */
  hiddenIndexes(): number[];
  /**
   * Sunburst: focuses the node at `path` (only proposes it when
   * `options.drillPath` controls the focus); null when nothing would change
   */
  drill(path: readonly string[]): ShapeDrillEvent | null;
  /** Sunburst: names from the root to the focused node */
  drillPath(): string[];
  /** Lays the scene out at time `time`; `animating` asks for another frame */
  frame(
    time: number,
    input: ShapeFrameInput,
  ): { scene: ShapeScene; animating: boolean };
}

export const createShapeRuntime = (
  initial: ShapeChartOptions,
  reducedMotion: () => boolean = prefersReducedMotion,
): ShapeRuntime => {
  let options = initial;
  const hidden = new Set<number>();
  /** Replaces the hidden set by the controlled `hidden` option (if any) */
  const syncHidden = () => {
    const count = toggleCount(options);
    if (options.hidden) {
      hidden.clear();
      for (const i of options.hidden)
        if (Number.isInteger(i) && i >= 0 && i < count) hidden.add(i);
    } else for (const i of [...hidden]) if (i >= count) hidden.delete(i);
  };
  syncHidden();
  const sorted = (set: ReadonlySet<number>) => [...set].sort((a, b) => a - b);
  let entered = false;
  let entryStart: number | null = null;
  let update: { from: Map<string, number>; start: number | null } | null = null;
  let lastT = 1;
  /** Sunburst focus of an uncontrolled chart */
  let focus: string[] = [];
  /** Focus in effect: the controlled `drillPath`, else the drilled one, made valid */
  const currentFocus = (): string[] =>
    options.type === "sunburst"
      ? resolveSunburstPath(options, options.drillPath ?? focus, hidden)
      : [];

  const animated = () => options.animation !== false && !reducedMotion();

  /** Values currently on screen */
  const displayed = () => {
    const targets = shapeValues(options, hidden, currentFocus());
    return update && lastT < 1
      ? blendValues(update.from, targets, lastT)
      : targets;
  };

  const transition = (mutate: () => void) => {
    const from = displayed();
    mutate();
    if (!animated()) {
      update = null;
      entered = true;
      return;
    }
    if (!sameValues(from, shapeValues(options, hidden, currentFocus()))) {
      update = { from, start: null };
      lastT = 0;
    }
  };

  return {
    get options() {
      return options;
    },
    hidden,
    setOptions(next) {
      if (next.type !== options.type) {
        options = next;
        hidden.clear();
        focus = [];
        syncHidden();
        entered = false;
        entryStart = null;
        update = null;
        lastT = 1;
        return;
      }
      transition(() => {
        options = next;
        syncHidden();
      });
    },
    toggle(index) {
      if (!(Number.isInteger(index) && index >= 0)) return null;
      if (index >= toggleCount(options)) return null;
      const proposed = new Set(hidden);
      const nowHidden = !proposed.has(index);
      if (nowHidden) proposed.add(index);
      else proposed.delete(index);
      if (!options.hidden)
        transition(() => {
          if (nowHidden) hidden.add(index);
          else hidden.delete(index);
        });
      return { index, hidden: nowHidden, hiddenIndexes: sorted(proposed) };
    },
    hiddenIndexes: () => sorted(hidden),
    drill(path) {
      if (options.type !== "sunburst") return null;
      const before = currentFocus();
      const next = resolveSunburstPath(options, path, hidden);
      if (next.join("\u0000") === before.join("\u0000")) return null;
      if (!options.drillPath)
        transition(() => {
          focus = next;
        });
      return { path: next };
    },
    drillPath: () => currentFocus(),
    frame(time, input) {
      let enter = 1;
      if (!entered) {
        if (!animated()) entered = true;
        else {
          if (entryStart === null) entryStart = time;
          const p = (time - entryStart) / ENTER_MS;
          enter = easeOutCubic(p);
          if (p >= 1) {
            entered = true;
            enter = 1;
          }
        }
      }
      let t = 1;
      if (update) {
        if (!animated()) update = null;
        else {
          if (update.start === null) update.start = time;
          const p = (time - update.start) / UPDATE_MS;
          t = p >= 1 ? 1 : easeOutCubic(p);
        }
      }
      lastT = t;
      const scene = layoutShapeScene({
        ...input,
        options,
        hidden,
        enter,
        from: update?.from ?? null,
        t,
        focus: currentFocus(),
      });
      if (update && t >= 1) update = null;
      return { scene, animating: !entered || update !== null };
    },
  };
};
