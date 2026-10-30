// createCanvasShapeChart: shape charts on one 2D canvas without any DOM
// (mini-programs, Taro, uni-app, OffscreenCanvas). The legend and the
// tooltip are drawn on the canvas; the host forwards touches / pointer events.

import type { ChartCanvas, ChartTouch } from "../canvas";
import { createTheme, type ChartTheme, type ChartThemeInput } from "../theme";
import { drawShapeLegend, drawShapeScene, drawShapeTooltip } from "./draw";
import { hitTestShapes } from "./hit";
import {
  hoverEvent,
  layoutShapeLegend,
  layoutShapeTooltip,
  legendConfig,
  sameHover,
  shapeLegend,
  tooltipContent,
  type ShapeLegendBox,
} from "./layout";
import { createShapeRuntime, now } from "./runtime";
import {
  estimateText,
  type MeasureText,
  type ShapeHover,
  type ShapeScene,
} from "./scene";
import type {
  ShapeChartEventMap,
  ShapeChartOptions,
  ShapeHoverEvent,
} from "./types";

const TAP_SLOP = 8;

export interface CanvasShapeChartConfig {
  /** Canvas to draw on (`HTMLCanvasElement`, `OffscreenCanvas` or a mini-program canvas node) */
  canvas: ChartCanvas;
  /** Width of the canvas in CSS pixels (rpx converted by the host) */
  width: number;
  /** Height of the canvas in CSS pixels */
  height: number;
  /**
   * Device pixel ratio (`wx.getWindowInfo().pixelRatio` in mini-programs)
   * @default 1
   */
  pixelRatio?: number;
  /** Chart options */
  options: ShapeChartOptions;
  /** Colors and fonts: values of the Minerva CSS variables */
  theme?: ChartThemeInput;
}

export interface CanvasShapeChartInstance {
  /** Replaces the options (animates from the previous values) */
  setOptions(options: ShapeChartOptions): void;
  /** Replaces the theme input */
  setTheme(theme: ChartThemeInput | undefined): void;
  /** New CSS size (and pixel ratio) of the canvas */
  resize(width: number, height: number, pixelRatio?: number): void;
  /** Draws now (frames are otherwise scheduled automatically) */
  render(): void;
  /** Touch handlers: pass the `touches` / `changedTouches` of the event */
  touchStart(touches: readonly ChartTouch[]): void;
  touchMove(touches: readonly ChartTouch[]): void;
  touchEnd(changedTouches: readonly ChartTouch[]): void;
  touchCancel(changedTouches?: readonly ChartTouch[]): void;
  /** Mouse / pen handlers (H5, desktop mini-programs) */
  pointerDown(x: number, y: number): void;
  pointerMove(x: number, y: number): void;
  pointerUp(x: number, y: number): void;
  pointerLeave(): void;
  /**
   * Hides / shows a slice, stage, radar series or top-level treemap node and
   * emits `toggle` (with the `hidden` option: only emits `toggle`)
   */
  toggle(index: number): void;
  /** Indexes of the hidden entries, ascending */
  getHidden(): number[];
  /**
   * Sunburst: zooms into the node at `path` (names from the root, `[]` =
   * the root) and emits `drill` (with the `drillPath` option: only emits `drill`)
   */
  drill(path: readonly string[]): void;
  /** Sunburst: names from the root to the focused node (`[]` = the root) */
  getDrillPath(): string[];
  /** Removes the hover (and the tooltip) */
  clearHover(): void;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof ShapeChartEventMap>(
    type: K,
    listener: (event: ShapeChartEventMap[K]) => void,
  ): () => void;
  /** Stops the animations and the listeners */
  destroy(): void;
}

/**
 * Creates a pie / donut, radar, gauge, funnel or treemap chart drawn on a 2D
 * canvas, legend and tooltip included. Works without a DOM.
 */
export const createCanvasShapeChart = (
  config: CanvasShapeChartConfig,
): CanvasShapeChartInstance => {
  const { canvas } = config;
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
  } catch {
    ctx = null;
  }
  let width = config.width;
  let height = config.height;
  let dpr = config.pixelRatio ?? 1;
  let options = config.options;
  let themeInput = config.theme;
  let theme: ChartTheme = createTheme(themeInput, options.palette);
  const runtime = createShapeRuntime(options);
  let scene: ShapeScene | null = null;
  let legendBoxes: ShapeLegendBox[] = [];
  let hover: { hover: ShapeHover; x: number; y: number } | null = null;
  let press: { x: number; y: number; moved: boolean } | null = null;
  let destroyed = false;
  let frameId: number | null = null;
  let frameKind: "canvas" | "global" | "timeout" = "timeout";
  let fontSet = "";

  const listeners: {
    [K in keyof ShapeChartEventMap]: Set<
      (event: ShapeChartEventMap[K]) => void
    >;
  } = {
    hover: new Set(),
    click: new Set(),
    toggle: new Set(),
    drill: new Set(),
  };
  const emit = <K extends keyof ShapeChartEventMap>(
    type: K,
    event: ShapeChartEventMap[K],
  ) => {
    for (const listener of [...listeners[type]]) listener(event);
  };

  const measure: MeasureText = (text, f) => {
    if (!ctx || typeof ctx.measureText !== "function")
      return estimateText(text, f);
    if (f !== fontSet) {
      ctx.font = f;
      fontSet = f;
    }
    return ctx.measureText(text).width;
  };

  const g = globalThis as {
    requestAnimationFrame?: (cb: () => void) => number;
    cancelAnimationFrame?: (id: number) => void;
  };

  const cancelFrame = () => {
    if (frameId === null) return;
    if (frameKind === "canvas") canvas.cancelAnimationFrame?.(frameId);
    else if (frameKind === "global") g.cancelAnimationFrame?.(frameId);
    else clearTimeout(frameId);
    frameId = null;
  };

  const schedule = () => {
    if (destroyed || frameId !== null) return;
    if (canvas.requestAnimationFrame) {
      frameKind = "canvas";
      frameId = canvas.requestAnimationFrame(() => render());
    } else if (g.requestAnimationFrame) {
      frameKind = "global";
      frameId = g.requestAnimationFrame(() => render());
    } else {
      frameKind = "timeout";
      frameId = setTimeout(() => render(), 16) as unknown as number;
    }
  };

  const tooltipText = (event: ShapeHoverEvent): string | null | undefined => {
    if (options.tooltip === false) return null;
    const render =
      typeof options.tooltip === "object" ? options.tooltip.render : undefined;
    if (!render) return undefined;
    const out = render(event);
    // nodes cannot be drawn on a canvas: use their text
    if (out === null) return null;
    return typeof out === "string" ? out : (out.textContent ?? null);
  };

  function render() {
    frameId = null;
    if (destroyed || !(width > 0 && height > 0)) return;
    const pw = Math.max(1, Math.round(width * dpr));
    const ph = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pw) canvas.width = pw;
    if (canvas.height !== ph) canvas.height = ph;
    fontSet = "";

    const entries = shapeLegend(options, theme, runtime.hidden);
    const legendPosition = legendConfig(options).position;
    let bounds = { x: 0, y: 0, width, height };
    legendBoxes = [];
    if (entries) {
      const legend = layoutShapeLegend(
        entries,
        width,
        legendPosition,
        height,
        theme,
        measure,
      );
      legendBoxes = legend.boxes;
      bounds = {
        x: 0,
        y: legendPosition === "top" ? legend.height : 0,
        width,
        height: Math.max(0, height - legend.height),
      };
    }
    const frame = runtime.frame(now(), {
      theme,
      width,
      height,
      bounds,
      measure,
    });
    scene = frame.scene;
    if (hover && !scene.items.some((it) => it.index === hover?.hover.index)) {
      hover = null;
      emit("hover", null);
    }
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, pw, ph);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawShapeScene(ctx, scene, hover?.hover ?? null);
      if (legendBoxes.length) drawShapeLegend(ctx, theme, legendBoxes);
      const event = hover ? hoverEvent(scene, hover.hover) : null;
      if (hover && event && !press?.moved) {
        const custom = tooltipText(event);
        const content =
          custom === undefined ? tooltipContent(scene, hover.hover) : custom;
        if (content) {
          const box = layoutShapeTooltip(
            content,
            hover.x,
            hover.y,
            width,
            height,
            theme,
            measure,
            scene,
            hover.hover,
          );
          drawShapeTooltip(ctx, theme, box);
        }
      }
      fontSet = "";
    }
    if (frame.animating) schedule();
  }

  const setHover = (next: ShapeHover | null, x: number, y: number) => {
    const changed = !sameHover(hover?.hover ?? null, next);
    const moved = !!next && (hover?.x !== x || hover?.y !== y);
    hover = next ? { hover: next, x, y } : null;
    if (changed || moved) schedule();
    if (changed) emit("hover", scene && next ? hoverEvent(scene, next) : null);
  };

  const legendAt = (x: number, y: number) =>
    legendBoxes.find(
      (b) =>
        x >= b.x - 4 &&
        x <= b.x + b.width + 4 &&
        y >= b.y &&
        y <= b.y + b.height,
    );

  const hitAt = (x: number, y: number) =>
    scene ? hitTestShapes(scene, x, y, hover?.hover ?? null) : null;

  const toggle = (index: number) => {
    if (destroyed) return;
    const event = runtime.toggle(index);
    if (!event) return;
    if (!options.hidden) schedule();
    emit("toggle", event);
  };

  const drill = (path: readonly string[]) => {
    if (destroyed) return;
    const event = runtime.drill(path);
    if (!event) return;
    if (options.type === "sunburst" && !options.drillPath) schedule();
    emit("drill", event);
  };

  /** Tap / click: legend toggle, else hover + click event */
  const tap = (x: number, y: number) => {
    const box = legendAt(x, y);
    if (box) {
      if (legendConfig(options).toggle) toggle(box.index);
      return;
    }
    const hit = hitAt(x, y);
    if (hit && scene) {
      setHover(hit, x, y);
      const e = hoverEvent(scene, hit);
      if (e) emit("click", e);
      const item = scene.items.find((it) => it.index === hit.index);
      if (item?.drill && options.type === "sunburst" && options.drill !== false)
        drill(item.drill);
    } else setHover(null, x, y);
  };

  const down = (x: number, y: number) => {
    press = { x, y, moved: false };
  };
  const move = (x: number, y: number, touch: boolean) => {
    if (press && Math.hypot(x - press.x, y - press.y) > TAP_SLOP)
      press.moved = true;
    if (touch) return;
    setHover(hitAt(x, y), x, y);
  };
  const up = (x: number, y: number) => {
    const p = press;
    press = null;
    if (p && !p.moved) tap(x, y);
    else schedule();
  };

  render();

  return {
    setOptions(next) {
      if (destroyed) return;
      const paletteChanged =
        (next.palette ?? []).join() !== (options.palette ?? []).join();
      if (next.type !== options.type) hover = null;
      options = next;
      runtime.setOptions(next);
      if (paletteChanged) theme = createTheme(themeInput, next.palette);
      schedule();
    },
    setTheme(input) {
      if (destroyed) return;
      themeInput = input;
      theme = createTheme(input, options.palette);
      schedule();
    },
    resize(w, h, ratio) {
      width = w;
      height = h;
      if (ratio) dpr = ratio;
      schedule();
    },
    render() {
      cancelFrame();
      render();
    },
    touchStart(touches) {
      const t = touches[0];
      if (t) down(t.x, t.y);
    },
    touchMove(touches) {
      const t = touches[0];
      if (t) move(t.x, t.y, true);
    },
    touchEnd(touches) {
      const t = touches[0];
      if (t) up(t.x, t.y);
      else press = null;
    },
    touchCancel() {
      press = null;
      schedule();
    },
    pointerDown: (x, y) => down(x, y),
    pointerMove: (x, y) => move(x, y, false),
    pointerUp: (x, y) => up(x, y),
    pointerLeave() {
      press = null;
      setHover(null, 0, 0);
    },
    toggle,
    getHidden: () => runtime.hiddenIndexes(),
    drill,
    getDrillPath: () => runtime.drillPath(),
    clearHover: () => setHover(null, 0, 0),
    on(type, listener) {
      listeners[type].add(listener);
      return () => {
        listeners[type].delete(listener);
      };
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelFrame();
      listeners.hover.clear();
      listeners.click.clear();
      listeners.toggle.clear();
      listeners.drill.clear();
    },
  };
};
