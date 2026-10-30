// createChartController: the platform-free chart. It owns the options, the
// theme, the model, the visible range and the interactions (pointer / touch
// gestures fed by the host) and describes what to draw (`getScene`). Hosts
// only draw: createCanvasChart on any 2D context, the React Native charts
// with views.

import { toCss, unpackColor } from "./color";
import { curvePoints } from "./curve";
import { lowerBound } from "./data";
import { decimateMinMax } from "./decimate";
import {
  createScales,
  screenRect,
  toData,
  toScreen,
  type Rect,
  type Scales,
} from "./layout";
import {
  buildModel,
  type ChartModel,
  type DataCache,
  type SeriesModel,
} from "./model";
import {
  font,
  placeLabels,
  rectOf,
  textBox,
  type PointLabel,
  type ResolvedAnnotation,
} from "./overlay";
import {
  collectPointLabels,
  crosshairAt,
  dotSize,
  hitTest,
  hoverMarks,
  layoutChart,
  legendShape,
  resolveAnnotations,
  sameHover,
  tooltipContent,
  type ChartLayout,
  type HoverMark,
  type TooltipContent,
} from "./scene";
import { createTheme, type ChartTheme, type ChartThemeInput } from "./theme";
import type {
  ChartEventMap,
  ChartHoverEvent,
  ChartHoverItem,
  ChartOptions,
  ChartPlotClickEvent,
  ChartRect,
  ChartView,
} from "./types";
import {
  clampRange,
  panRange,
  sameRange,
  zoomRange,
  type Range,
} from "./viewport";

/** Events of a controller (no renderer events: hosts draw themselves) */
export type ChartControllerEventMap = Omit<ChartEventMap, "renderer">;

export interface ChartControllerConfig {
  options: ChartOptions;
  /** Colors and fonts (Minerva variables); light defaults when omitted */
  theme?: ChartThemeInput;
  /** Width in pixels of `text` drawn with the CSS `font` */
  measureText: (text: string, font: string) => number;
  /** Called when the scene changed and must be drawn again */
  onInvalidate?: () => void;
}

export interface ChartLegendEntry {
  id: string;
  name: string;
  /** CSS color */
  color: string;
  shape: "dot" | "line" | "square";
  hidden: boolean;
  /** Hit / draw box of the entry, pixels of the chart */
  box: Rect;
}

export interface ChartLegendLayout {
  entries: ChartLegendEntry[];
  position: "top" | "bottom";
  /** Whether a tap toggles the series */
  toggle: boolean;
  /** Height taken by the legend */
  height: number;
}

export interface ChartTooltipLayout {
  /** Default content (`text` is set instead when `tooltip.render` returns a string) */
  content: TooltipContent;
  /** Lines of a custom string tooltip */
  text: string[] | null;
  /** Box of the tooltip, pixels of the chart */
  box: Rect;
  /** Line height used to lay the box out */
  lineHeight: number;
  padding: number;
}

export interface ChartHoverLayout {
  event: ChartHoverEvent;
  marks: HoverMark[];
  /** X pixel of the vertical guide line (`null` when hidden) */
  crosshairX: number | null;
  /** Y pixel of the horizontal guide line of horizontal charts (`null` when hidden) */
  crosshairY: number | null;
  tooltip: ChartTooltipLayout | null;
}

/** Everything a host draws, in CSS pixels of the chart */
export interface ChartScene {
  width: number;
  height: number;
  theme: ChartTheme;
  model: ChartModel;
  view: ChartView;
  layout: ChartLayout;
  annotations: ResolvedAnnotation[];
  /** Labels of the dots that found a free slot */
  pointLabels: { label: PointLabel; box: Rect }[];
  legend: ChartLegendLayout | null;
  hover: ChartHoverLayout | null;
  /** Point being dragged (`interaction.dragPoints`) */
  dragging: { x: number; y: number; color: string; size: number } | null;
}

export interface ChartPointerOptions {
  /** Pointer id (touch identifier); 0 by default */
  id?: number;
  /** Touch input: the tooltip follows the finger and stays after a tap */
  touch?: boolean;
}

export interface ChartController {
  setOptions(options: ChartOptions): void;
  setTheme(theme: ChartThemeInput | undefined): void;
  /** Size of the chart in CSS pixels */
  setSize(width: number, height: number): void;
  /** What to draw (`null` until the size is known) */
  getScene(): ChartScene | null;
  pointerDown(x: number, y: number, options?: ChartPointerOptions): void;
  pointerMove(x: number, y: number, options?: ChartPointerOptions): void;
  pointerUp(x: number, y: number, options?: ChartPointerOptions): void;
  pointerCancel(options?: ChartPointerOptions): void;
  /** The mouse left the chart */
  pointerLeave(): void;
  /** Zooms around a pixel (factor < 1 zooms in) */
  zoomAt(x: number, y: number, factor: number): void;
  resetZoom(): void;
  getView(): ChartView;
  setView(view: Partial<ChartView>): void;
  /** Shows / hides a series (like a legend click) */
  toggleSeries(id: string): void;
  /** Hides the tooltip */
  clearHover(): void;
  getPlotRect(): ChartRect | null;
  toPixel(x: number, y: number): { x: number; y: number } | null;
  fromPixel(x: number, y: number): { x: number; y: number } | null;
  on<K extends keyof ChartControllerEventMap>(
    type: K,
    listener: (event: ChartControllerEventMap[K]) => void,
  ): () => void;
  destroy(): void;
}

const copyView = (v: ChartView): ChartView => ({
  x: [v.x[0], v.x[1]],
  y: [v.y[0], v.y[1]],
});

const TAP_SLOP = 6;
const TOUCH_SLOP = 10;
const DOUBLE_TAP_MS = 320;
const LEGEND_ROW = 20;

interface PointerState {
  x: number;
  y: number;
  startX: number;
  startY: number;
  touch: boolean;
  moved: boolean;
}

export const createChartController = (
  config: ChartControllerConfig,
): ChartController => {
  let options = config.options;
  let themeInput = config.theme;
  let theme = createTheme(themeInput, options.palette);
  const cache: DataCache = new Map();
  const hidden = new Set<string>();
  const listeners: {
    [K in keyof ChartControllerEventMap]?: Set<
      (event: ChartControllerEventMap[K]) => void
    >;
  } = {};
  let model: ChartModel;
  let view: ChartView = { x: [0, 1], y: [0, 1] };
  let zoomed = false;
  let width = 0;
  let height = 0;
  let annotations: ResolvedAnnotation[] = [];
  let scene: ChartScene | null = null;
  let sceneDirty = true;
  let lastPlot = "";
  let destroyed = false;

  let hover: { event: ChartHoverEvent; x: number; y: number } | null = null;
  const pointers = new Map<number, PointerState>();
  let gesture:
    | { kind: "pan"; view: ChartView; x: number; y: number }
    | {
        kind: "pinch";
        view: ChartView;
        distance: number;
        midX: number;
        midY: number;
      }
    | { kind: "point"; item: ChartHoverItem; x: number; y: number }
    | null = null;
  let lastTap = { time: 0, x: 0, y: 0 };

  const emit = <K extends keyof ChartControllerEventMap>(
    type: K,
    event: ChartControllerEventMap[K],
  ) => {
    listeners[type]?.forEach((listener) => listener(event));
  };

  const invalidate = () => {
    sceneDirty = true;
    if (!destroyed) config.onInvalidate?.();
  };

  const interaction = () => {
    const value = options.interaction;
    if (value === false) return null;
    const o = typeof value === "object" ? value : {};
    return {
      pan: o.pan ?? true,
      dragPoints: o.dragPoints ?? false,
    };
  };

  const measure = (text: string, size = theme.fontSize, weight = 400) =>
    config.measureText(text, font(theme, size, weight));

  const rebuild = () => {
    model = buildModel(options, theme, hidden, cache);
    const { base, minSpan } = model;
    if (!zoomed) {
      view = copyView(base);
    } else {
      view = {
        x: model.zoom.x ? clampRange(view.x, base.x, minSpan.x) : [...base.x],
        y: model.zoom.y ? clampRange(view.y, base.y, minSpan.y) : [...base.y],
      };
      zoomed = !sameRange(view.x, base.x) || !sameRange(view.y, base.y);
    }
    annotations = resolveAnnotations(options.annotations, theme);
    if (hover) {
      const stillThere = hover.event.items.every(
        (it) =>
          model.series[it.seriesIndex] &&
          !model.series[it.seriesIndex].hidden &&
          it.index < model.series[it.seriesIndex].cols.count,
      );
      if (!stillThere) setHover(null);
    }
    invalidate();
  };

  // --------------------------------------------------------------- legend

  const legendLayout = (): ChartLegendLayout | null => {
    const option = options.legend;
    const named = options.series.filter((s) => s.name).length;
    const show = option === undefined ? named > 1 : !!option;
    if (!show) return null;
    const cfg = typeof option === "object" ? option : {};
    const position = cfg.position === "bottom" ? "bottom" : "top";
    const entries: ChartLegendEntry[] = [];
    let x = 4;
    let row = 0;
    for (const s of model.series) {
      const w = 14 + measure(s.name, 12) + 8;
      if (x + w > width - 4 && x > 4) {
        x = 4;
        row++;
      }
      entries.push({
        id: s.id,
        name: s.name,
        color: s.colorCss,
        shape: legendShape(s.type),
        hidden: s.hidden,
        box: { x, y: row * LEGEND_ROW, width: w, height: LEGEND_ROW },
      });
      x += w + 10;
    }
    const legendHeight = (row + 1) * LEGEND_ROW + 6;
    if (position === "bottom") {
      for (const e of entries) e.box.y += height - legendHeight + 6;
    }
    return {
      entries,
      position,
      toggle: cfg.toggle ?? true,
      height: legendHeight,
    };
  };

  // ---------------------------------------------------------------- scene

  const tooltipLayout = (
    event: ChartHoverEvent,
    anchorX: number,
    anchorY: number,
  ): ChartTooltipLayout | null => {
    const tooltip = options.tooltip;
    if (tooltip === false) return null;
    const custom = typeof tooltip === "object" ? tooltip.render : undefined;
    let text: string[] | null = null;
    if (custom) {
      const result = custom(event);
      if (result === null || result === "") return null;
      if (typeof result === "string") text = result.split("\n");
    }
    const content = tooltipContent(
      model,
      event,
      scene?.layout.yTicks ?? null,
      scene?.layout.y2Ticks ?? null,
    );
    const lineHeight = 18;
    const padding = 8;
    let w = 0;
    let lines: number;
    if (text) {
      for (const line of text) w = Math.max(w, measure(line, 12));
      lines = text.length;
    } else {
      w = measure(content.title, 12, 600) + (content.titleColor ? 14 : 0);
      for (const row of content.rows) {
        w = Math.max(
          w,
          (row.color ? 14 : 0) +
            measure(row.name, 12) +
            16 +
            measure(row.value, 12, 600),
        );
      }
      lines = 1 + content.rows.length;
    }
    const boxW = Math.ceil(Math.max(w, 96) + padding * 2 + 4);
    const boxH = lines * lineHeight + padding * 2;
    let left = anchorX + 14;
    if (left + boxW > width - 4) left = anchorX - 14 - boxW;
    left = Math.max(4, Math.min(left, width - boxW - 4));
    const top = Math.max(4, Math.min(anchorY - boxH / 2, height - boxH - 4));
    return {
      content,
      text,
      box: { x: left, y: top, width: boxW, height: boxH },
      lineHeight,
      padding,
    };
  };

  const computeScene = (): ChartScene | null => {
    if (width <= 0 || height <= 0) return null;
    const legend = legendLayout();
    const legendTop = legend?.position === "top" ? legend.height : 0;
    const layout = layoutChart({
      model,
      view,
      theme,
      width,
      height: height - (legend?.height ?? 0),
      padding: options.padding,
      top: legendTop,
      measure: (text) => measure(text),
    });
    const labels = collectPointLabels(
      model,
      view,
      layout.scales,
      layout.yTicks,
    );
    const occupied: Rect[] = [];
    const labelHeight = theme.fontSize + 4;
    for (const a of annotations) {
      if (a.type === "text" && a.text) {
        occupied.push(
          textBox(
            a,
            layout.scales,
            measure(a.text, theme.fontSize, a.weight),
            labelHeight,
          ),
        );
        continue;
      }
      if (a.type !== "rect" || !a.label) continue;
      // keep the dot labels off the area titles (drawForeground does the same)
      const r = rectOf(a, layout.scales);
      if (r.width <= 0 || r.height <= 0) continue;
      const w = measure(a.label, theme.fontSize + 1, 600);
      const pos = a.labelPosition;
      occupied.push({
        x: pos.endsWith("left")
          ? r.x + 10
          : pos.endsWith("right")
            ? r.x + r.width - 10 - w
            : r.x + (r.width - w) / 2,
        y: pos.startsWith("top")
          ? r.y + 10
          : pos.startsWith("bottom")
            ? r.y + r.height - 10 - labelHeight
            : r.y + (r.height - labelHeight) / 2,
        width: w,
        height: labelHeight,
      });
    }
    const pointLabels = placeLabels(
      labels,
      layout.plot,
      (t) => measure(t),
      labelHeight - 2,
      occupied,
    );
    const next: ChartScene = {
      width,
      height,
      theme,
      model,
      view: copyView(view),
      layout,
      annotations,
      pointLabels,
      legend,
      hover: null,
      dragging: null,
    };
    scene = next;
    if (hover) {
      const guide = crosshairAt(
        model,
        layout.scales,
        hover.event,
        options.crosshair,
      );
      const horizontal = layout.scales.horizontal;
      next.hover = {
        event: hover.event,
        marks: hoverMarks(model, layout.scales, hover.event),
        crosshairX: horizontal ? null : guide,
        crosshairY: horizontal ? guide : null,
        tooltip:
          gesture?.kind === "pan" || gesture?.kind === "point"
            ? null
            : tooltipLayout(hover.event, hover.x, hover.y),
      };
    }
    if (gesture?.kind === "point") {
      const s = model.series[gesture.item.seriesIndex];
      next.dragging = {
        x: gesture.x,
        y: gesture.y,
        color: gesture.item.color,
        size: (s ? dotSize(s, gesture.item.index) : 8) + 6,
      };
    }
    const rect = layout.plot;
    const key = `${rect.x},${rect.y},${rect.width},${rect.height}`;
    if (key !== lastPlot) {
      lastPlot = key;
      emit("layout", { ...rect });
    }
    return next;
  };

  const getScene = () => {
    if (sceneDirty || !scene) {
      sceneDirty = false;
      scene = computeScene();
    }
    return scene;
  };

  // ---------------------------------------------------------- interaction

  const scales = () => getScene()?.layout.scales ?? null;

  const setHover = (
    next: { event: ChartHoverEvent; x: number; y: number } | null,
  ) => {
    const changed = !sameHover(hover?.event ?? null, next?.event ?? null);
    hover = next;
    invalidate();
    if (changed) emit("hover", next ? next.event : null);
  };

  const hitAt = (x: number, y: number, touch: boolean) => {
    const sc = scales();
    return sc
      ? hitTest(model, sc, scene?.layout.xTicks ?? null, x, y, touch ? 8 : 0)
      : null;
  };

  const inPlot = (x: number, y: number) => {
    const p = scales()?.plot;
    return (
      !!p && x >= p.x && x <= p.x + p.width && y >= p.y && y <= p.y + p.height
    );
  };

  const dataAt = (x: number, y: number) => {
    const sc = scales();
    if (!sc) return null;
    const { plot } = sc;
    const cx = Math.max(plot.x, Math.min(plot.x + plot.width, x));
    const cy = Math.max(plot.y, Math.min(plot.y + plot.height, y));
    return toData(sc, cx, cy);
  };

  const setViewInternal = (next: ChartView, notify: boolean) => {
    const { base, minSpan } = model;
    view = {
      x: clampRange(next.x, base.x, minSpan.x),
      y: clampRange(next.y, base.y, minSpan.y),
    };
    zoomed = !sameRange(view.x, base.x) || !sameRange(view.y, base.y);
    if (notify) emit("zoom", copyView(view));
    invalidate();
  };

  const zoomAt = (x: number, y: number, factor: number) => {
    const sc = scales();
    if (!sc || (!model.zoom.x && !model.zoom.y)) return;
    const next = copyView(view);
    const at = toData(sc, x, y);
    if (model.zoom.x) next.x = zoomRange(view.x, at.x, factor);
    if (model.zoom.y) next.y = zoomRange(view.y, at.y, factor);
    setViewInternal(next, true);
  };

  const resetZoom = () => {
    if (!zoomed) return;
    setViewInternal(copyView(model.base), true);
  };

  const legendAt = (x: number, y: number) =>
    getScene()?.legend?.entries.find(
      (e) =>
        x >= e.box.x &&
        x <= e.box.x + e.box.width &&
        y >= e.box.y &&
        y <= e.box.y + e.box.height,
    ) ?? null;

  const toggleSeries = (id: string) => {
    if (hidden.has(id)) hidden.delete(id);
    else hidden.add(id);
    rebuild();
  };

  const startPinch = () => {
    const [a, b] = [...pointers.values()];
    gesture = {
      kind: "pinch",
      view: copyView(view),
      distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
      midX: (a.x + b.x) / 2,
      midY: (a.y + b.y) / 2,
    };
    setHover(null);
  };

  const pointerDown = (x: number, y: number, o: ChartPointerOptions = {}) => {
    if (destroyed) return;
    const id = o.id ?? 0;
    const touch = !!o.touch;
    pointers.set(id, { x, y, startX: x, startY: y, touch, moved: false });
    const it = interaction();
    if (pointers.size === 2) {
      if (it && (model.zoom.x || model.zoom.y) && gesture?.kind !== "point")
        startPinch();
      return;
    }
    if (pointers.size > 2 || !it) {
      if (!it && touch) {
        const event = hitAt(x, y, true);
        setHover(event ? { event, x, y } : null);
      }
      return;
    }
    if (it.dragPoints) {
      const item = hitAt(x, y, touch)?.items.find(
        (i) => model.series[i.seriesIndex].type === "scatter",
      );
      if (item) {
        gesture = { kind: "point", item, x, y };
        return;
      }
    }
    if (zoomed && it.pan && inPlot(x, y)) {
      gesture = { kind: "pan", view: copyView(view), x, y };
      return;
    }
    gesture = null;
    if (touch) {
      const event = hitAt(x, y, true);
      setHover(event ? { event, x, y } : null);
    }
  };

  const pointerMove = (x: number, y: number, o: ChartPointerOptions = {}) => {
    if (destroyed) return;
    const id = o.id ?? 0;
    const p = pointers.get(id);
    if (p) {
      p.x = x;
      p.y = y;
      if (
        !p.moved &&
        Math.hypot(x - p.startX, y - p.startY) >
          (p.touch ? TOUCH_SLOP : TAP_SLOP)
      )
        p.moved = true;
    }
    if (gesture?.kind === "pinch" && pointers.size >= 2) {
      const [a, b] = [...pointers.values()];
      const distance = Math.max(1, Math.hypot(a.x - b.x, a.y - b.y));
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const sc = scales();
      if (!sc) return;
      const start = createScales(
        sc.plot,
        gesture.view,
        model.x.reverse,
        model.y.reverse,
        model.horizontal,
      );
      const factor = gesture.distance / distance;
      const next = copyView(gesture.view);
      const from = toData(start, gesture.midX, gesture.midY);
      const to = toData(start, midX, midY);
      // the data under the first midpoint follows the fingers
      if (model.zoom.x) {
        next.x = zoomRange(gesture.view.x, from.x, factor);
        next.x = panRange(next.x, (from.x - to.x) * factor);
      }
      if (model.zoom.y) {
        next.y = zoomRange(gesture.view.y, from.y, factor);
        next.y = panRange(next.y, (from.y - to.y) * factor);
      }
      setViewInternal(next, true);
      return;
    }
    if (gesture?.kind === "point" && p) {
      if (!p.moved) return;
      gesture.x = x;
      gesture.y = y;
      const at = dataAt(x, y);
      invalidate();
      if (at) emit("drag", { item: gesture.item, x: at.x, y: at.y });
      return;
    }
    if (gesture?.kind === "pan" && p) {
      if (!p.moved) return;
      const sc = scales();
      if (!sc) return;
      const next = copyView(gesture.view);
      const from = toData(sc, gesture.x, gesture.y);
      const to = toData(sc, x, y);
      if (model.zoom.x) next.x = panRange(gesture.view.x, from.x - to.x);
      if (model.zoom.y) next.y = panRange(gesture.view.y, from.y - to.y);
      setViewInternal(next, true);
      return;
    }
    if (pointers.size > 1) return;
    // mouse hover, or a finger scrubbing along the data
    if (!p || p.touch || !o.touch) {
      const event = hitAt(x, y, !!p?.touch || !!o.touch);
      if (event || !p?.touch) setHover(event ? { event, x, y } : null);
    }
  };

  const pointerUp = (x: number, y: number, o: ChartPointerOptions = {}) => {
    if (destroyed) return;
    const id = o.id ?? 0;
    const p = pointers.get(id);
    pointers.delete(id);
    const current = gesture;
    if (current?.kind === "pinch") {
      if (pointers.size < 2) gesture = null;
      return;
    }
    gesture = null;
    if (!p) return;
    if (current?.kind === "point") {
      if (p.moved) {
        const at = dataAt(x, y);
        invalidate();
        if (at) emit("drop", { item: current.item, x: at.x, y: at.y });
        return;
      }
    } else if (current?.kind === "pan" && p.moved) {
      invalidate();
      return;
    }
    if (p.moved) {
      if (p.touch) invalidate();
      return;
    }
    // tap / click
    const now = Date.now();
    if (
      p.touch &&
      now - lastTap.time < DOUBLE_TAP_MS &&
      Math.hypot(x - lastTap.x, y - lastTap.y) < 24 &&
      zoomed
    ) {
      lastTap = { time: 0, x, y };
      resetZoom();
      return;
    }
    lastTap = { time: now, x, y };
    const legend = legendAt(x, y);
    if (legend) {
      if (getScene()?.legend?.toggle) toggleSeries(legend.id);
      return;
    }
    const hit = hitAt(x, y, p.touch);
    if (hit) {
      if (p.touch) setHover({ event: hit, x, y });
      emit("click", hit);
      return;
    }
    if (p.touch) setHover(null);
    if (inPlot(x, y)) {
      const at = dataAt(x, y);
      if (at) emit("plotClick", at as ChartPlotClickEvent);
    }
  };

  const pointerCancel = (o: ChartPointerOptions = {}) => {
    pointers.delete(o.id ?? 0);
    if (gesture?.kind === "point" || pointers.size < 2) gesture = null;
    invalidate();
  };

  model = buildModel(options, theme, hidden, cache);
  rebuild();

  return {
    setOptions(next) {
      if (destroyed) return;
      const paletteChanged =
        (next.palette ?? []).join() !== (options.palette ?? []).join();
      options = next;
      if (paletteChanged) theme = createTheme(themeInput, options.palette);
      rebuild();
    },
    setTheme(next) {
      if (destroyed) return;
      themeInput = next;
      theme = createTheme(themeInput, options.palette);
      rebuild();
    },
    setSize(w, h) {
      if (w === width && h === height) return;
      width = Math.max(0, w);
      height = Math.max(0, h);
      invalidate();
    },
    getScene,
    pointerDown,
    pointerMove,
    pointerUp,
    pointerCancel,
    pointerLeave() {
      if (!gesture && hover) setHover(null);
    },
    zoomAt,
    resetZoom,
    getView: () => copyView(view),
    setView(next) {
      if (destroyed) return;
      setViewInternal({ x: next.x ?? view.x, y: next.y ?? view.y }, false);
    },
    toggleSeries,
    clearHover() {
      if (hover) setHover(null);
    },
    getPlotRect() {
      const p = getScene()?.layout.plot;
      return p ? { ...p } : null;
    },
    toPixel(x, y) {
      const sc = scales();
      return sc ? toScreen(sc, x, y) : null;
    },
    fromPixel(x, y) {
      const sc = scales();
      return sc ? toData(sc, x, y) : null;
    },
    on(type, listener) {
      let set = listeners[type] as Set<typeof listener> | undefined;
      if (!set) {
        set = new Set();
        (listeners as Record<string, unknown>)[type] = set;
      }
      set.add(listener);
      return () => {
        set.delete(listener);
      };
    },
    destroy() {
      destroyed = true;
      pointers.clear();
      for (const key of Object.keys(listeners))
        delete (listeners as Record<string, unknown>)[key];
    },
  };
};

// ------------------------------------------------------------- primitives

/** A polyline (pixels of the chart): interleaved x, y */
export interface ChartLinePrimitive {
  kind: "line";
  seriesIndex: number;
  color: string;
  width: number;
  /** Runs of points without gaps */
  segments: number[][];
}

export interface ChartAreaPrimitive {
  kind: "area";
  seriesIndex: number;
  color: string;
  opacity: number;
  /** Y pixel of the baseline (x pixel when `horizontal`) */
  baseline: number;
  segments: number[][];
  /**
   * Stacked and range areas: y pixel (x pixel when `horizontal`) of the
   * bottom edge under every point of `segments`
   */
  bottoms?: number[][];
  /** Horizontal charts: the area is filled toward the left edge (`baseline` / `bottoms` are x pixels) */
  horizontal?: boolean;
}

export interface ChartBarPrimitive {
  kind: "bars";
  seriesIndex: number;
  color: string;
  /** Interleaved x, y, width, height */
  rects: number[];
  /** CSS color of every rect (candlesticks, heatmap cells, colored bars); `color` otherwise */
  colors?: string[];
  /** Corner radius in pixels */
  radius?: number;
  /** Opacity of the fill (box plot boxes, translucent bars) */
  opacity?: number;
}

export interface ChartDotPrimitive {
  kind: "dots";
  seriesIndex: number;
  opacity: number;
  /** Interleaved x, y, diameter */
  dots: number[];
  /** CSS color of every dot */
  colors: string[];
}

export type ChartPrimitive =
  | ChartLinePrimitive
  | ChartAreaPrimitive
  | ChartBarPrimitive
  | ChartDotPrimitive;

export interface ChartPrimitiveOptions {
  /**
   * Upper bound of the dots drawn per series: above it the dots are merged
   * into one per occupied cell of their size
   * @default 4000
   */
  maxDots?: number;
  /**
   * Upper bound of the bars drawn per series: above it neighboring bars
   * sharing a pixel column are merged
   * @default 2000
   */
  maxBars?: number;
  /**
   * Width in pixels of the columns lines are decimated to (at most four
   * points per column); larger values mean fewer shapes
   * @default 1
   */
  columnWidth?: number;
  /** Size of the cells dots are merged into (the dot size by default) */
  dotCell?: number;
}

const visibleRange = (
  x: Float64Array,
  count: number,
  sorted: boolean,
  range: Range,
): [number, number] => {
  if (!sorted) return [0, count];
  const [a, b] = range[0] <= range[1] ? range : [range[1], range[0]];
  return [
    Math.max(0, lowerBound(x, count, a) - 1),
    Math.min(count, lowerBound(x, count, b) + 1),
  ];
};

const ORDER = {
  heatmap: 0,
  area: 1,
  bar: 2,
  boxplot: 2,
  candlestick: 3,
  line: 4,
  scatter: 5,
} as const;

/**
 * Rectangles collected along the axes (`x` along the x axis, `y` along the
 * value axis) and turned into screen rects
 */
const toRects = (sc: Scales, along: number[]): number[] => {
  if (!sc.horizontal) return along;
  const out = new Array<number>(along.length);
  for (let k = 0; k < along.length; k += 4) {
    out[k] = along[k + 1];
    out[k + 1] = along[k];
    out[k + 2] = along[k + 3];
    out[k + 3] = along[k + 2];
  }
  return out;
};

/**
 * Data of a scene as simple shapes in pixels of the chart, for hosts
 * without a canvas (React Native views, SVG): lines are decimated to a few
 * points per pixel column and large point sets are merged per cell, so the
 * number of shapes stays bounded by the size of the chart.
 */
export const scenePrimitives = (
  scene: ChartScene,
  limits: ChartPrimitiveOptions = {},
): ChartPrimitive[] => {
  const { model, view, layout } = scene;
  const sc = layout.scales;
  const { plot } = layout;
  const horizontal = sc.horizontal;
  const maxDots = limits.maxDots ?? 4000;
  const maxBars = limits.maxBars ?? 2000;
  const column = Math.max(1, limits.columnWidth ?? 1);
  // the x axis in pixels (along `xToPx`)
  const xLo = horizontal ? plot.y : plot.x;
  const xHi = xLo + (horizontal ? plot.height : plot.width);
  const out: ChartPrimitive[] = [];
  const series = model.series
    .filter((s) => !s.hidden && s.cols.count > 0)
    .sort((a, b) => ORDER[a.type] - ORDER[b.type] || a.index - b.index);
  for (const s of series) {
    const { x, y, count, sorted } = s.cols;
    if (s.type === "line" || s.type === "area") {
      const [start, end] = visibleRange(x, count, sorted, view.x);
      const top = s.stackTop ?? y;
      // curve first (in data space), then decimation; the stacked bottom
      // edge follows the same sampling
      const curved = curvePoints(x, top, start, end, s.curve);
      const bottom = s.stackBase
        ? curvePoints(x, s.stackBase, start, end, s.curve).points
        : null;
      let n = curved.length;
      let points = curved.points;
      let bottoms = bottom;
      if (sorted && n > ((xHi - xLo) * 2) / column) {
        if (bottom) {
          // keep the bottoms aligned with the kept tops (same x)
          const d = decimateMinMax(points, 0, n, (v) => sc.xToPx(v) / column);
          const next = new Float64Array(d.length * 2);
          const nextBottom = new Float64Array(d.length * 2);
          let k = 0;
          let j = 0;
          for (let i = 0; i < d.length; i++) {
            const xv = d.points[i * 2];
            while (j < n - 1 && points[j * 2] < xv) j++;
            next[k * 2] = xv;
            next[k * 2 + 1] = d.points[i * 2 + 1];
            nextBottom[k * 2] = xv;
            nextBottom[k * 2 + 1] = bottom[j * 2 + 1];
            k++;
          }
          points = next;
          bottoms = nextBottom;
          n = k;
        } else {
          const d = decimateMinMax(points, 0, n, (v) => sc.xToPx(v) / column);
          points = d.points;
          n = d.length;
        }
      }
      // range areas: a line on the lower edge too
      const band = s.type === "area" && !!s.cols.y0 && !!bottoms;
      const segments: number[][] = [];
      const bottomSegments: number[][] = [];
      const lowerSegments: number[][] = [];
      let run: number[] = [];
      let runBottom: number[] = [];
      let runLower: number[] = [];
      const flush = () => {
        if (run.length) {
          segments.push(run);
          bottomSegments.push(runBottom);
          if (band) lowerSegments.push(runLower);
        }
        run = [];
        runBottom = [];
        runLower = [];
      };
      for (let i = 0; i < n; i++) {
        const xv = points[i * 2];
        const yv = points[i * 2 + 1];
        const bv = bottoms ? bottoms[i * 2 + 1] : 0;
        if (
          !Number.isFinite(xv) ||
          !Number.isFinite(yv) ||
          !Number.isFinite(bv)
        ) {
          flush();
          continue;
        }
        const p = toScreen(sc, xv, yv);
        run.push(p.x, p.y);
        if (bottoms) runBottom.push(sc.yToPx(bv));
        if (band) {
          const q = toScreen(sc, xv, bv);
          runLower.push(q.x, q.y);
        }
      }
      flush();
      if (s.type === "area") {
        out.push({
          kind: "area",
          seriesIndex: s.index,
          color: s.colorCss,
          opacity: s.opacity,
          baseline: sc.yToPx(model.baseline),
          segments,
          ...(bottoms ? { bottoms: bottomSegments } : {}),
          ...(horizontal ? { horizontal: true } : {}),
        });
      }
      if (s.lineWidth > 0) {
        const width =
          s.type === "area" ? Math.min(s.lineWidth, 2) : s.lineWidth;
        out.push({
          kind: "line",
          seriesIndex: s.index,
          color: s.colorCss,
          width,
          segments,
        });
        if (band)
          out.push({
            kind: "line",
            seriesIndex: s.index,
            color: s.colorCss,
            width,
            segments: lowerSegments,
          });
      }
      continue;
    }
    if (s.type === "bar" && s.barBase && s.barTop) {
      const [start, end] = visibleRange(x, count, sorted, view.x);
      const half = Math.max(s.barHalfWidth / Math.abs(sc.xPerPx), 0.5);
      const rects: number[] = [];
      const colors: string[] = [];
      const merge = end - start > maxBars;
      let lastCol = NaN;
      for (let i = start; i < end; i++) {
        const a = s.barBase[i];
        const b = s.barTop[i];
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
        const cx = sc.xToPx(x[i] + s.barOffset);
        if (cx + half < xLo || cx - half > xHi) continue;
        const ya = sc.yToPx(a);
        const yb = sc.yToPx(b);
        const top = Math.min(ya, yb);
        const h = Math.max(1, Math.abs(ya - yb));
        const col = Math.floor(cx);
        if (merge && col === lastCol && rects.length) {
          // widen the previous bar of the same pixel column along the values
          const k = rects.length - 4;
          const bottom = Math.max(rects[k + 1] + rects[k + 3], top + h);
          rects[k + 1] = Math.min(rects[k + 1], top);
          rects[k + 3] = bottom - rects[k + 1];
          continue;
        }
        lastCol = col;
        rects.push(cx - half, top, half * 2, h);
        const pc = s.pointColors?.[i];
        colors.push(pc ? toCss(pc) : s.colorCss);
      }
      out.push({
        kind: "bars",
        seriesIndex: s.index,
        color: s.colorCss,
        rects: toRects(sc, rects),
        ...(s.pointColors ? { colors } : {}),
        radius: s.radius,
        ...(s.opacity < 1 ? { opacity: s.opacity } : {}),
      });
      continue;
    }
    if (s.type === "boxplot") {
      out.push(...boxPrimitives(s, sc, view.x, xLo, xHi, maxBars));
      continue;
    }
    if (s.type === "candlestick") {
      const [start, end] = visibleRange(x, count, sorted, view.x);
      const { open, high, low } = s.cols;
      const half = Math.max(s.barHalfWidth / Math.abs(sc.xPerPx), 1);
      const up = toCss(s.upColor);
      const down = toCss(s.downColor);
      const wicks: number[] = [];
      const bodies: number[] = [];
      const wickColors: string[] = [];
      const bodyColors: string[] = [];
      const step = Math.max(1, Math.ceil((end - start) / maxBars));
      for (let i = start; i < end; i += step) {
        const c = y[i];
        const o = open ? open[i] : c;
        if (!Number.isFinite(c) || !Number.isFinite(o)) continue;
        const cx = sc.xToPx(x[i]);
        if (cx + half < xLo || cx - half > xHi) continue;
        const color = c < o ? down : up;
        const hi = sc.yToPx(high ? high[i] : Math.max(o, c));
        const lo = sc.yToPx(low ? low[i] : Math.min(o, c));
        wicks.push(cx - 0.5, Math.min(hi, lo), 1, Math.abs(lo - hi));
        wickColors.push(color);
        const ya = sc.yToPx(o);
        const yb = sc.yToPx(c);
        bodies.push(
          cx - half,
          Math.min(ya, yb),
          half * 2,
          Math.max(1, Math.abs(ya - yb)),
        );
        bodyColors.push(color);
      }
      out.push(
        {
          kind: "bars",
          seriesIndex: s.index,
          color: up,
          rects: toRects(sc, wicks),
          colors: wickColors,
        },
        {
          kind: "bars",
          seriesIndex: s.index,
          color: up,
          rects: toRects(sc, bodies),
          colors: bodyColors,
          radius: 1,
        },
      );
      continue;
    }
    if (s.type === "heatmap") {
      const hw = Math.abs(s.cellHalf.x / sc.xPerPx);
      const hh = Math.abs(s.cellHalf.y / sc.yPerPx);
      const rects: number[] = [];
      const colors: string[] = [];
      const inset = hw > 3 && hh > 3 ? 1 : 0;
      for (let i = 0; i < count && rects.length / 4 < maxBars * 4; i++) {
        const c = s.cellColors?.[i];
        if (!c) continue;
        const r = screenRect(
          sc,
          sc.xToPx(x[i]) - hw,
          sc.xToPx(x[i]) + hw,
          sc.yToPx(y[i]) - hh,
          sc.yToPx(y[i]) + hh,
        );
        if (
          r.x + r.width < plot.x ||
          r.x > plot.x + plot.width ||
          r.y + r.height < plot.y ||
          r.y > plot.y + plot.height
        )
          continue;
        rects.push(
          r.x + inset,
          r.y + inset,
          r.width - inset * 2,
          r.height - inset * 2,
        );
        colors.push(toCss(unpackColor(c)));
      }
      out.push({
        kind: "bars",
        seriesIndex: s.index,
        color: s.colorCss,
        rects,
        colors,
        radius: s.radius,
      });
      continue;
    }
    // scatter
    const dots: number[] = [];
    const colors: string[] = [];
    const colorOf = (i: number) => {
      const c = s.pointColors?.[i];
      return c ? toCss(c) : s.colorCss;
    };
    const visible: number[] = [];
    const screen: number[] = [];
    for (let i = 0; i < count; i++) {
      const xv = x[i];
      const yv = y[i];
      if (!Number.isFinite(xv) || !Number.isFinite(yv)) continue;
      const p = toScreen(sc, xv, yv);
      if (
        p.x < plot.x ||
        p.x > plot.x + plot.width ||
        p.y < plot.y ||
        p.y > plot.y + plot.height
      )
        continue;
      visible.push(i);
      screen.push(p.x, p.y);
    }
    if (visible.length > maxDots) {
      const cell = Math.max(2, limits.dotCell ?? s.pointSize * 0.8);
      const cols = Math.ceil(plot.width / cell) + 1;
      const owner = new Map<number, number>();
      visible.forEach((i, k) => {
        const cx = Math.floor((screen[k * 2] - plot.x) / cell);
        const cy = Math.floor((screen[k * 2 + 1] - plot.y) / cell);
        owner.set(cy * cols + cx, i);
      });
      for (const [key, i] of owner) {
        dots.push(
          plot.x + ((key % cols) + 0.5) * cell,
          plot.y + (Math.floor(key / cols) + 0.5) * cell,
          cell,
        );
        colors.push(colorOf(i));
      }
    } else {
      visible.forEach((i, k) => {
        dots.push(screen[k * 2], screen[k * 2 + 1], dotSize(s, i));
        colors.push(colorOf(i));
      });
    }
    out.push({
      kind: "dots",
      seriesIndex: s.index,
      opacity: s.opacity,
      dots,
      colors,
    });
  }
  return out;
};

/** Box plot shapes: translucent boxes, then whiskers, caps, edges and medians, then outliers */
const boxPrimitives = (
  s: SeriesModel,
  sc: Scales,
  range: Range,
  xLo: number,
  xHi: number,
  maxBars: number,
): ChartPrimitive[] => {
  const { x, y, count, sorted, high, low, q1, q3, outliers } = s.cols;
  const [start, end] = visibleRange(x, count, sorted, range);
  const half = Math.max(s.barHalfWidth / Math.abs(sc.xPerPx), 1);
  const lw = Math.max(1, s.lineWidth);
  const boxes: number[] = [];
  const lines: number[] = [];
  const boxColors: string[] = [];
  const lineColors: string[] = [];
  const dots: number[] = [];
  const dotColors: string[] = [];
  const step = Math.max(1, Math.ceil((end - start) / maxBars));
  /** A line along the values (a whisker or a side) */
  const vertical = (cx: number, a: number, b: number) => {
    lines.push(cx - lw / 2, Math.min(a, b), lw, Math.abs(a - b));
  };
  /** A line across the box (an edge, a cap or the median) */
  const across = (cx: number, h: number, at: number, thick = lw) => {
    lines.push(cx - h, at - thick / 2, h * 2, thick);
  };
  for (let i = start; i < end; i += step) {
    const m = y[i];
    if (!Number.isFinite(m)) continue;
    const cx = sc.xToPx(x[i] + s.barOffset);
    if (cx + half < xLo || cx - half > xHi) continue;
    const pc = s.pointColors?.[i];
    const color = pc ? toCss(pc) : s.colorCss;
    const lo = sc.yToPx(low && Number.isFinite(low[i]) ? low[i] : m);
    const hi = sc.yToPx(high && Number.isFinite(high[i]) ? high[i] : m);
    const a = sc.yToPx(q1 && Number.isFinite(q1[i]) ? q1[i] : m);
    const b = sc.yToPx(q3 && Number.isFinite(q3[i]) ? q3[i] : m);
    const before = lines.length;
    boxes.push(cx - half, Math.min(a, b), half * 2, Math.abs(a - b));
    boxColors.push(color);
    vertical(cx, lo, a);
    vertical(cx, b, hi);
    vertical(cx - half, a, b);
    vertical(cx + half, a, b);
    across(cx, half / 2, lo);
    across(cx, half / 2, hi);
    across(cx, half, a);
    across(cx, half, b);
    across(cx, half, sc.yToPx(m), Math.max(2, lw * 1.6));
    for (let k = before; k < lines.length; k += 4) lineColors.push(color);
    const out = outliers?.[i];
    if (out) {
      for (const v of out) {
        const p = sc.horizontal
          ? { x: sc.yToPx(v), y: cx }
          : { x: cx, y: sc.yToPx(v) };
        dots.push(p.x, p.y, s.pointSize);
        dotColors.push(color);
      }
    }
  }
  const prims: ChartPrimitive[] = [
    {
      kind: "bars",
      seriesIndex: s.index,
      color: s.colorCss,
      rects: toRects(sc, boxes),
      colors: boxColors,
      opacity: s.opacity,
    },
    {
      kind: "bars",
      seriesIndex: s.index,
      color: s.colorCss,
      rects: toRects(sc, lines),
      colors: lineColors,
    },
  ];
  if (dots.length)
    prims.push({
      kind: "dots",
      seriesIndex: s.index,
      opacity: 0.85,
      dots,
      colors: dotColors,
    });
  return prims;
};
