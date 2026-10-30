// Trading chart: candles (or bars, lines, areas...) over a gap-free index
// axis, indicator panes, price lines, markers, drawings and streaming.
//
// Layers, bottom to top: a Canvas2D background (grid, bands, watermark),
// the GPU data canvas covering every pane (candles, volumes, indicator
// lines, baked in device pixels), a Canvas2D overlay (axes, labels, price
// lines, markers, drawings, crosshair) and DOM legends. The GPU items are
// rebuilt only when the view, the scales or the data change; a tick
// rebuilds only the items of the last bar.

import {
  luminance,
  mix,
  packColor,
  parseColor,
  toCss,
  type Rgba,
} from "../color";
import { createDataCanvas, styleElement } from "../dom";
import { createRenderer } from "../renderers/detect";
import type { ChartRenderer, RenderItem } from "../renderers/types";
import { stepDecimals } from "../scale";
import {
  readTheme,
  themeColorsChanged,
  watchTheme,
  type ChartTheme,
} from "../theme";
import type { ChartRendererKind } from "../types";
import { localeLabels, resolveLocale } from "../locale";
import {
  anchorCount,
  hitDrawing,
  paintDrawing,
  setDash,
  type DrawingMapper,
} from "./drawings";
import {
  DAY,
  HOUR,
  MINUTE,
  boundaryWeight,
  detectPrecision,
  formatCountdown,
  formatCrosshairTime,
  formatFixed,
  formatPercent,
  formatVolume,
  inferTimeframe,
  pickTicks,
  priceFormatter,
  shiftTime,
  tickText,
} from "./format";
import {
  AreaBuffer,
  BarBuffer,
  LineBuffer,
  candleMetrics,
  clampRange,
  pixelRange,
} from "./geometry";
import { heikinAshiInto, parseTimeframe } from "./indicators";
import { TRADING_LABELS, fill, type TradingTexts } from "./labels";
import {
  createScale,
  fitScale,
  fromScaled,
  panScale,
  scaleTicks,
  scaledAt,
  toScaled,
  valueAt,
  yOf,
  yOfScaled,
  zoomScale,
  type PaneScale,
} from "./scale";
import {
  appendBars as storeAppend,
  createPyramid,
  createStore,
  indexOfTime,
  inputLength,
  barAt,
  prependBars as storePrepend,
  pyramidLevel,
  readBar,
  setBars as storeSet,
  updateBar as storeUpdate,
  lowerBoundTime,
  type OhlcColumns,
} from "./store";
import { LINE_COLORS, buildStudies, type Study } from "./studies";
import type {
  TradingBarsInput,
  TradingChartEventMap,
  TradingChartInstance,
  TradingChartOptions,
  TradingCrosshairEvent,
  TradingDrawing,
  TradingDrawingPoint,
  TradingDrawingTool,
  TradingPriceLine,
  TradingScaleMode,
  TradingVisibleRange,
} from "./types";

const TIME_AXIS = 28;
const MIN_AXIS = 60;
const MAX_SPACING = 60;
const MIN_PANE = 48;
const PRICE = "price";
const UP = "var(--success-color, #089981)";
const DOWN = "var(--danger-color, #f23645)";
const WARNING = "var(--warning-color, #f59e0b)";
const PRIMARY = "var(--primary-color, #2962ff)";

const PRICE_LINE_TITLES: Record<string, keyof TradingTexts | undefined> = {
  order: "limit",
  position: "position",
  takeProfit: "takeProfit",
  stopLoss: "stopLoss",
  alert: "alert",
};

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/** Readable text on a fill (a CSS color): dark on light fills, white otherwise */
const textOn = (fill: string) => {
  const color = parseColor(fill);
  return color && luminance(color) > 0.5 ? "#0b0e11" : "#fff";
};

const finite = Number.isFinite;

interface Pane {
  id: string;
  study: Study | null;
  scale: PaneScale;
  top: number;
  height: number;
  ticks: number[];
  step: number;
}

/** Bars drawn: a level of the pyramid and the groups in view */
interface Visible {
  /** Logical index at the left edge */
  left: number;
  level: number;
  /** Bars per group */
  size: number;
  cols: OhlcColumns;
  /** Groups drawn (one extra on each side) */
  g0: number;
  g1: number;
  /** Groups whose center is in the plot */
  s0: number;
  s1: number;
  /** Last group */
  last: number;
}

interface LegendRow {
  row: HTMLDivElement;
  values: HTMLSpanElement[];
  button: HTMLButtonElement | null;
}

type Layer = (ga: number, gb: number, live: boolean) => RenderItem[];

/** Interaction in progress */
type Gesture =
  | {
      kind: "pan";
      x: number;
      y: number;
      right: number;
      pane: Pane | null;
      moved: boolean;
      lastX: number;
      lastY: number;
      lastT: number;
      velocity: number;
    }
  | { kind: "axisY"; pane: Pane; y: number; min: number; max: number }
  | { kind: "axisX"; x: number; spacing: number }
  | {
      kind: "separator";
      index: number;
      y: number;
      above: number;
      below: number;
    }
  | { kind: "order"; line: TradingPriceLine; startPrice: number }
  | {
      kind: "drawing";
      id: string;
      handle: number;
      x: number;
      y: number;
      original: TradingDrawing;
      moved: boolean;
    }
  | { kind: "create"; x: number; y: number; moved: boolean };

/** Mounts a trading chart in `container` (which should have a height) */
export const createTradingChart = (
  container: HTMLElement,
  initial: TradingChartOptions = {},
): TradingChartInstance => {
  const doc = container.ownerDocument;
  const win = doc.defaultView;
  let options: TradingChartOptions = { ...initial };
  let destroyed = false;

  // ------------------------------------------------------------------ DOM

  const make = <K extends keyof HTMLElementTagNameMap>(
    tag: K,
    style: Partial<CSSStyleDeclaration>,
  ) => styleElement(doc.createElement(tag), style) as HTMLElementTagNameMap[K];

  const root = make("div", {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "0",
    overflow: "hidden",
    outline: "none",
    userSelect: "none",
    touchAction: "pan-y",
    fontFamily: "var(--font-family-sans, system-ui, sans-serif)",
    color: "var(--text-color, #1f2937)",
    cursor: "crosshair",
  });
  root.className = "minerva-trading-chart";
  root.tabIndex = 0;
  root.setAttribute("role", "figure");
  root.setAttribute("aria-roledescription", "chart");

  const layer = (tag: "canvas" | "div") =>
    make(tag, {
      position: "absolute",
      left: "0",
      top: "0",
      pointerEvents: "none",
    });
  const background = layer("canvas") as HTMLCanvasElement;
  const foreground = layer("canvas") as HTMLCanvasElement;
  background.setAttribute("aria-hidden", "true");
  foreground.setAttribute("aria-hidden", "true");
  const legends = layer("div") as HTMLDivElement;
  legends.style.right = "0";
  legends.style.bottom = "0";
  const jump = make("button", {
    position: "absolute",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    padding: "0",
    borderRadius: "50%",
    border:
      "1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent)",
    background: "var(--surface-elevated-color, var(--surface-color, #fff))",
    color: "var(--text-color, #1f2937)",
    boxShadow: "0 4px 14px -4px rgba(15, 23, 42, 0.25)",
    cursor: "pointer",
  });
  jump.type = "button";
  jump.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l5 5-5 5M9 3l5 5-5 5"/></svg>';
  const live = make("div", {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  });
  live.setAttribute("aria-live", "polite");
  root.append(background, foreground, legends, jump, live);
  container.appendChild(root);

  // ----------------------------------------------------------------- data

  const store = createStore();
  let pyramid = createPyramid();
  /** Heikin-Ashi bars (time and volume shared with the store) */
  const ha: OhlcColumns = {
    time: store.time,
    open: new Float64Array(0),
    high: new Float64Array(0),
    low: new Float64Array(0),
    close: new Float64Array(0),
    volume: store.volume,
  };
  let haValid = 0;
  let haPyramid = createPyramid();
  let studies: Study[] = [];
  const studyValid = new Map<Study, number>();
  const visibility = new Map<string, boolean>();
  interface CompareRuntime {
    id: string;
    name: string;
    color: string;
    times: Float64Array;
    data: Float64Array;
    values: Float64Array;
    valid: number;
  }
  let compares: CompareRuntime[] = [];
  /** Changes when bars other than the last one change */
  let dataVersion = 0;
  /** Changes when the last bar changes */
  let tailVersion = 0;
  let detectedPrecision = 2;
  let inferredTimeframe = DAY;

  // ----------------------------------------------------------------- view

  let spacing = options.barSpacing ?? 8;
  let right = NaN;
  let plotW = 0;
  let plotH = 0;
  let axisW = MIN_AXIS;
  let width = 0;
  let height = 0;
  let panes: Pane[] = [];
  const scales = new Map<string, PaneScale>();
  const paneHeights = new Map<string, number>();
  let vis: Visible | null = null;
  let volumeOverlayMax = 0;

  // -------------------------------------------------------------- state

  let theme: ChartTheme = readTheme(root);
  let themeVersion = 0;
  let optionsVersion = 0;
  let renderer: ChartRenderer | null = null;
  let rendererToken = 0;
  let frameId = 0;
  let layers: { fn: Layer; main: RenderItem[]; live: RenderItem[] }[] = [];
  let geomKey = "";
  let builtTail = -1;
  let itemVersion = 0;
  let resolveReady!: (kind: ChartRendererKind | null) => void;
  const ready = new Promise<ChartRendererKind | null>((resolve) => {
    resolveReady = resolve;
  });

  let pointer: { x: number; y: number } | null = null;
  let keyboardIndex: number | null = null;
  let gesture: Gesture | null = null;
  const touches = new Map<number, { x: number; y: number }>();
  let pinch: { distance: number; spacing: number } | null = null;
  let kinetic: { v: number; t: number } | null = null;
  let scrollAnim: { from: number; to: number; start: number } | null = null;
  /** Range asked by `setVisibleRange` / `fitContent`, applied once the plot width is known */
  let pendingRange: { from: number; to: number } | null = null;

  let drawings: readonly TradingDrawing[] = options.drawings ?? [];
  let emittedDrawings: readonly TradingDrawing[] | null = null;
  let tool: TradingDrawingTool = options.drawingMode ?? "cursor";
  let selected: string | null = null;
  let hovered: string | null = null;
  let draft: TradingDrawing | null = null;
  let drawingCounter = 0;
  const lineOverrides = new Map<string, number>();
  let hoveredLine: string | null = null;
  let lastRange: TradingVisibleRange | null = null;
  let lastCrosshair = "";
  let historyFirst = NaN;
  let countdownTimer: ReturnType<typeof setInterval> | null = null;

  // ---------------------------------------------------------- listeners

  const listeners = new Map<string, Set<(event: never) => void>>();
  const emit = <K extends keyof TradingChartEventMap>(
    type: K,
    event: TradingChartEventMap[K],
  ) => {
    listeners
      .get(type)
      ?.forEach((fn) => (fn as (e: TradingChartEventMap[K]) => void)(event));
  };

  // ------------------------------------------------------------- helpers

  // locale and texts, resolved at each options update (and `<html lang>` change)
  let locale = resolveLocale(options.locale);
  let texts = localeLabels(TRADING_LABELS, locale, options.labels);
  const resolveTexts = () => {
    locale = resolveLocale(options.locale);
    texts = localeLabels(TRADING_LABELS, locale, options.labels);
  };
  const labels = () => texts;
  const n = () => store.length;
  const style = () => options.chartStyle ?? "candles";
  const redUp = () => options.colorConvention === "redUp";
  const upCss = () => options.upColor ?? (redUp() ? DOWN : UP);
  const downCss = () => options.downColor ?? (redUp() ? UP : DOWN);
  const resolve = (css: string, fallback: Rgba = theme.primary): Rgba =>
    theme.resolve ? theme.resolve(css, fallback) : fallback;
  const css = (value: string, alpha = 1) => toCss(resolve(value), alpha);
  const precision = () => options.precision ?? detectedPrecision;
  let priceFormat = priceFormatter(2, undefined);
  let priceFormatKey = "";
  const formatPrice = (value: number) => {
    if (options.formatPrice) return options.formatPrice(value);
    const key = `${precision()}|${locale}`;
    if (key !== priceFormatKey) {
      priceFormat = priceFormatter(precision(), locale);
      priceFormatKey = key;
    }
    return priceFormat(value);
  };
  const timeframe = () => {
    const parsed =
      options.timeframe !== undefined
        ? parseTimeframe(options.timeframe)
        : null;
    return (
      parsed ?? {
        unit: "ms" as const,
        count: inferredTimeframe,
        ms: inferredTimeframe,
      }
    );
  };
  const tfMs = () => timeframe().ms;
  const font = (size: number, weight = 400) =>
    `${weight} ${size}px ${theme.fontFamily}`;

  const isVisible = (study: Study) =>
    visibility.get(study.id) ?? study.config.visible ?? true;

  const xOf = (index: number) => plotW + (index - right) * spacing;
  const indexAt = (x: number) => right - (plotW - x) / spacing;

  /** Time of a logical index (extrapolated outside the bars) */
  const timeAt = (index: number) => {
    const count = n();
    if (!count) return 0;
    const i = Math.round(index);
    if (i < 0) return store.time[0] + i * tfMs();
    if (i >= count) return store.time[count - 1] + (i - count + 1) * tfMs();
    return store.time[i];
  };

  /** Logical index of a time (extrapolated outside the bars) */
  const indexOfTimeExt = (time: number) => {
    const count = n();
    if (!count) return 0;
    const last = store.time[count - 1];
    if (time > last) return count - 1 + (time - last) / tfMs();
    if (time < store.time[0]) return (time - store.time[0]) / tfMs();
    return indexOfTime(store.time, count, time);
  };

  /** Bars as drawn: Heikin-Ashi or the store */
  const display = (): OhlcColumns => (style() === "heikinAshi" ? ha : store);

  // ------------------------------------------------------- derived data

  const markDirty = (from: number) => {
    for (const study of studies)
      studyValid.set(study, Math.min(studyValid.get(study) ?? 0, from));
    haValid = Math.min(haValid, from);
    for (const c of compares) c.valid = Math.min(c.valid, from);
    const level = (p: typeof pyramid) => {
      for (const l of p.levels)
        if (l) l.valid = Math.min(l.valid, Math.floor(from / l.size));
    };
    level(pyramid);
    level(haPyramid);
  };

  const syncDerived = () => {
    const count = n();
    for (const study of studies) {
      const valid = studyValid.get(study) ?? 0;
      if (valid < count) {
        study.compute(store, valid);
        studyValid.set(study, count);
      }
    }
    ha.time = store.time;
    ha.volume = store.volume;
    if (style() === "heikinAshi" && haValid < count) {
      if (ha.open.length < store.capacity) {
        for (const key of ["open", "high", "low", "close"] as const) {
          const next = new Float64Array(store.capacity);
          next.set(ha[key].subarray(0, haValid));
          ha[key] = next;
        }
      }
      heikinAshiInto(
        store.open,
        store.high,
        store.low,
        store.close,
        count,
        ha,
        haValid,
      );
      haValid = count;
    }
    for (const c of compares) {
      if (c.valid >= count) continue;
      if (c.values.length < store.capacity) {
        const next = new Float64Array(store.capacity).fill(NaN);
        next.set(c.values.subarray(0, c.valid));
        c.values = next;
      }
      for (let i = c.valid; i < count; i++) {
        const j =
          lowerBoundTime(c.times, c.times.length, store.time[i] + 0.5) - 1;
        c.values[i] = j >= 0 ? c.data[j] : NaN;
      }
      c.valid = count;
    }
  };

  const afterDataChange = (from: number) => {
    markDirty(from);
    const count = n();
    if (from < count - 1) dataVersion++;
    tailVersion++;
    if (count) {
      detectedPrecision = Math.max(
        from === 0 ? 0 : detectedPrecision,
        detectPrecision(store.close, from, count),
        detectPrecision(store.open, Math.max(from, count - 50), count),
      );
      if (from === 0 || count < 80)
        inferredTimeframe = inferTimeframe(store.time, count);
    }
    invalidate();
  };

  const rebuildStudies = () => {
    const { studies: next, reused } = buildStudies(
      options.indicators ?? [],
      studies,
      options.utcOffset ?? -new Date().getTimezoneOffset(),
    );
    for (const study of studies)
      if (!reused.has(study)) studyValid.delete(study);
    for (const study of next) if (!reused.has(study)) studyValid.set(study, 0);
    studies = next;
    // drop the user's toggles of indicators whose visibility is now set
    for (const id of [...visibility.keys()])
      if (!studies.some((s) => s.id === id)) visibility.delete(id);
  };

  const rebuildCompares = () => {
    compares = (options.compare ?? []).map((series, i) => {
      const data = [...series.data].sort((a, b) => a.time - b.time);
      return {
        id: series.id ?? series.name,
        name: series.name,
        color: series.color ?? LINE_COLORS[(i + 2) % LINE_COLORS.length],
        times: Float64Array.from(data, (d) => d.time),
        data: Float64Array.from(data, (d) => d.value),
        values: new Float64Array(0),
        valid: 0,
      };
    });
  };

  // ---------------------------------------------------------- bars input

  /** Last bar visible: new bars keep the view at the latest bar */
  const followsRealtime = () => {
    const count = n();
    if (!count || !finite(right)) return true;
    const x = xOf(count - 1);
    return x >= 0 && x <= plotW + spacing * 0.5;
  };

  const replaceBars = (bars: TradingBarsInput) => {
    storeSet(store, bars);
    pyramid = createPyramid();
    haPyramid = createPyramid();
    haValid = 0;
    historyFirst = NaN;
    for (const scale of scales.values()) scale.auto = true;
    right = n() - 1 + (options.rightOffset ?? 8);
    kinetic = null;
    scrollAnim = null;
    afterDataChange(0);
  };

  /**
   * New `bars` option: streamed (same first bars plus newer ones),
   * prepended history (same last bar), or replaced
   */
  const applyBarsOption = (bars: TradingBarsInput) => {
    const count = n();
    const length = inputLength(bars);
    if (count >= 2 && length >= count) {
      const first = barAt(bars, 0).time;
      const last = store.time[count - 1];
      if (
        first === store.time[0] &&
        barAt(bars, count - 2).time === store.time[count - 2]
      ) {
        // streaming through the props: update the last bar, append the rest
        const follow = followsRealtime();
        const before = count;
        let from = count;
        for (let i = count - 1; i < length; i++) {
          const at = storeUpdate(store, barAt(bars, i));
          if (at >= 0) from = Math.min(from, at);
        }
        if (follow) right += n() - before;
        if (from < n()) afterDataChange(from);
        return;
      }
      if (barAt(bars, length - 1).time === last && length > count) {
        const added = length - count;
        storeSet(store, bars);
        pyramid = createPyramid();
        haPyramid = createPyramid();
        haValid = 0;
        right += added;
        afterDataChange(0);
        return;
      }
    }
    replaceBars(bars);
  };

  // --------------------------------------------------------------- layout

  const layoutPanes = () => {
    const paneStudies = studies.filter((s) => !s.overlay);
    const available = plotH;
    const wanted = paneStudies.map((s) => paneHeights.get(s.id) ?? s.height);
    const total = wanted.reduce((a, b) => a + b, 0);
    const max = Math.max(0, available * 0.62);
    const k = total > max && total > 0 ? max / total : 1;
    const heights = wanted.map((h) =>
      Math.max(MIN_PANE * Math.min(1, k * 2), h * k),
    );
    const priceHeight = Math.max(
      40,
      available - heights.reduce((a, b) => a + b, 0),
    );
    const next: Pane[] = [];
    const scaleOf = (id: string, mode: TradingScaleMode) => {
      let scale = scales.get(id);
      if (!scale) {
        scale = createScale(mode);
        scales.set(id, scale);
      }
      if (scale.mode !== mode) {
        scale.mode = mode;
        scale.auto = true;
      }
      return scale;
    };
    const price = scaleOf(PRICE, options.scaleMode ?? "linear");
    price.top = 0;
    price.height = priceHeight;
    price.marginTop = 0.1;
    price.marginBottom = 0.08;
    next.push({
      id: PRICE,
      study: null,
      scale: price,
      top: 0,
      height: priceHeight,
      ticks: [],
      step: 0,
    });
    let top = priceHeight;
    paneStudies.forEach((study, i) => {
      const scale = scaleOf(study.id, "linear");
      scale.top = top;
      scale.height = heights[i];
      scale.marginTop = study.type === "volume" ? 0.18 : 0.14;
      scale.marginBottom = study.type === "volume" ? 0 : 0.1;
      if (study.range) scale.marginTop = scale.marginBottom = 0.06;
      next.push({
        id: study.id,
        study,
        scale,
        top,
        height: heights[i],
        ticks: [],
        step: 0,
      });
      top += heights[i];
    });
    for (const id of [...scales.keys()])
      if (!next.some((p) => p.id === id)) scales.delete(id);
    panes = next;
  };

  const paneAt = (y: number) =>
    panes.find((p) => y >= p.top && y < p.top + p.height) ?? null;

  const clampView = () => {
    const count = n();
    const minSpacing = Math.min(1, (plotW * 0.8) / Math.max(1, count));
    spacing = clamp(spacing, Math.max(1e-4, minSpacing), MAX_SPACING);
    const bars = plotW / spacing;
    if (!finite(right)) right = count - 1 + (options.rightOffset ?? 8);
    const hi =
      Math.max(0, count - 1) + Math.max(options.rightOffset ?? 8, bars * 0.75);
    const lo = Math.min(bars * 0.25, hi);
    right = clamp(right, lo, hi);
  };

  const computeVisible = (): Visible | null => {
    const count = n();
    if (!count) return null;
    const left = right - plotW / spacing;
    const level = spacing >= 2 ? 0 : Math.ceil(Math.log2(2 / spacing));
    const size = 2 ** level;
    const src = display();
    const cols = level
      ? pyramidLevel(
          style() === "heikinAshi" ? haPyramid : pyramid,
          src,
          count,
          level,
        )
      : src;
    const last = Math.floor((count - 1) / size);
    const i0 = clamp(Math.floor(left) - 1, 0, count - 1);
    const i1 = clamp(Math.ceil(right) + 1, 0, count - 1);
    const r0 = clamp(Math.ceil(left - 0.5), 0, count - 1);
    const r1 = clamp(Math.floor(right + 0.5), 0, count - 1);
    return {
      left,
      level,
      size,
      cols,
      g0: Math.floor(i0 / size),
      g1: Math.floor(i1 / size),
      s0: Math.floor(r0 / size),
      s1: Math.floor(r1 / size),
      last,
    };
  };

  /** Center index of a group */
  const groupCenter = (v: Visible, g: number) => g * v.size + (v.size - 1) / 2;
  /** Value of a study output for a group (its last bar) */
  const groupValue = (v: Visible, values: Float64Array, g: number) =>
    values[Math.min(n() - 1, g * v.size + v.size - 1)];
  const groupBars = (v: Visible, g: number) =>
    Math.min(v.size, n() - g * v.size);

  /** First visible bar: the base of the percent scale and of the baseline */
  const firstVisibleIndex = () =>
    clamp(Math.ceil(right - plotW / spacing - 0.5), 0, Math.max(0, n() - 1));

  const compareBase = (c: CompareRuntime) => {
    const count = n();
    for (let i = firstVisibleIndex(); i < count; i++) {
      const v = c.values[i];
      if (finite(v) && v !== 0) return v;
    }
    return NaN;
  };

  /** Scaled value of a comparison series (percent: from its own base) */
  const compareScaled = (scale: PaneScale, value: number, base: number) =>
    scale.mode === "percent"
      ? (value / base - 1) * 100
      : toScaled(scale, value);

  const baselinePrice = () =>
    options.baselinePrice ?? display().close[firstVisibleIndex()];

  const autoscale = (v: Visible | null) => {
    volumeOverlayMax = 0;
    for (const pane of panes) {
      const scale = pane.scale;
      if (!v) continue;
      if (pane.id === PRICE) {
        scale.base = store.close[firstVisibleIndex()] || 1;
        const { cols } = v;
        const s = style();
        const closeOnly = s === "line" || s === "area" || s === "baseline";
        let lo = Infinity;
        let hi = -Infinity;
        for (let g = v.s0; g <= v.s1; g++) {
          const l = closeOnly ? cols.close[g] : cols.low[g];
          const h = closeOnly ? cols.close[g] : cols.high[g];
          if (l < lo) lo = l;
          if (h > hi) hi = h;
        }
        for (const study of studies) {
          if (!study.overlay || !isVisible(study)) continue;
          if (study.type === "volume") {
            for (let g = v.s0; g <= v.s1; g++) {
              const vol = cols.volume[g] / groupBars(v, g);
              if (vol > volumeOverlayMax) volumeOverlayMax = vol;
            }
            continue;
          }
          for (const out of study.outputs) {
            for (let g = v.s0; g <= v.s1; g++) {
              const value = groupValue(v, out.values, g);
              if (value < lo) lo = value;
              if (value > hi) hi = value;
            }
          }
        }
        if (s === "baseline") {
          const b = baselinePrice();
          if (b < lo) lo = b;
          if (b > hi) hi = b;
        }
        if (!scale.auto) continue;
        let a = toScaled(scale, lo);
        let b = toScaled(scale, hi);
        if (scale.mode === "log" && !(lo > 0))
          a = toScaled(scale, Math.max(hi * 1e-3, 1e-12));
        for (const c of compares) {
          const base = compareBase(c);
          for (let g = v.s0; g <= v.s1; g++) {
            const value = compareScaled(
              scale,
              groupValue(v, c.values, g),
              base,
            );
            if (value < a) a = value;
            if (value > b) b = value;
          }
        }
        fitScale(scale, a, b);
        continue;
      }
      const study = pane.study;
      if (!study || !scale.auto) continue;
      if (study.range) {
        fitScale(scale, study.range[0], study.range[1]);
        continue;
      }
      let lo = Infinity;
      let hi = -Infinity;
      if (study.type === "volume") lo = 0;
      for (const out of study.outputs) {
        for (let g = v.s0; g <= v.s1; g++) {
          const value =
            out.kind === "volume"
              ? v.cols.volume[g] / groupBars(v, g)
              : groupValue(v, out.values, g);
          if (value < lo) lo = value;
          if (value > hi) hi = value;
        }
      }
      if (study.type === "macd" && finite(lo) && finite(hi)) {
        // keep the zero line in view
        lo = Math.min(lo, 0);
        hi = Math.max(hi, 0);
      }
      fitScale(scale, lo, hi);
    }
  };

  // ----------------------------------------------------------------- ticks

  interface TimeLabel {
    x: number;
    text: string;
    bold: boolean;
  }

  const timeTicks = (
    v: Visible | null,
    ctx: CanvasRenderingContext2D,
  ): TimeLabel[] => {
    const count = n();
    if (!count || !v) return [];
    const tf = tfMs();
    const intraday = tf < DAY;
    const offset = options.utcOffset;
    // groups up to the right edge, past the last bar too
    const gEnd = Math.floor(Math.max(0, Math.ceil(right)) / v.size);
    const groupTime = (g: number) => {
      if (g <= v.last) return v.cols.time[g];
      return store.time[count - 1] + (g * v.size - (count - 1)) * tf;
    };
    const candidates: { x: number; weight: number; time: number }[] = [];
    let prev = v.g0 > 0 ? shiftTime(groupTime(v.g0 - 1), offset) : NaN;
    for (let g = v.g0; g <= gEnd; g++) {
      const time = shiftTime(groupTime(g), offset);
      const x = xOf(groupCenter(v, g));
      const weight = boundaryWeight(prev, time);
      // no labels inside a second (tick charts)
      if (x >= -20 && x <= plotW + 20 && weight > 10)
        candidates.push({ x, weight, time });
      prev = time;
    }
    ctx.font = font(theme.fontSize);
    const sample = intraday ? "00:00" : "Sep 30";
    const gap =
      Math.max(ctx.measureText(sample).width, ctx.measureText("2024").width) +
      34;
    return pickTicks(candidates, gap)
      .filter((t) => t.x > 8 && t.x < plotW - 8)
      .map((t) => ({
        x: t.x,
        text: tickText(t.time, t.weight, locale, intraday),
        bold: t.weight >= (intraday ? 50 : 60),
      }));
  };

  const paneTickText = (pane: Pane, scaled: number) => {
    if (pane.id === PRICE) {
      if (pane.scale.mode === "percent")
        return formatPercent(
          scaled,
          locale,
          Math.min(2, stepDecimals(pane.step)),
        );
      return formatPrice(fromScaled(pane.scale, scaled));
    }
    if (pane.study?.compact) return formatVolume(scaled, locale);
    return formatFixed(scaled, Math.min(4, stepDecimals(pane.step)), locale);
  };

  /** Text of a value of a study in the legend */
  const studyValueText = (study: Study, value: number) => {
    if (study.overlay && study.type !== "volume") return formatPrice(value);
    if (study.compact) return formatVolume(value, locale);
    return formatFixed(
      value,
      study.range ? 2 : Math.max(2, Math.min(6, precision())),
      locale,
    );
  };

  // ------------------------------------------------------------ GPU items

  const createLayers = (v: Visible, dpr: number): Layer[] => {
    const result: Layer[] = [];
    const cols = v.cols;
    const up = resolve(upCss());
    const down = resolve(downCss());
    const upP = packColor(up);
    const downP = packColor(down);
    const bg = theme.background;
    const metrics = candleMetrics(spacing * v.size * dpr, dpr);
    const X = (g: number) => xOf(groupCenter(v, g)) * dpr;
    const s = style();

    const histogramHalf = Math.max(0.5, metrics.body / 2);
    const volumeColors = {
      up: packColor([up[0], up[1], up[2], 0.5]),
      down: packColor([down[0], down[1], down[2], 0.5]),
    };

    for (const pane of panes) {
      const top = pane.top * dpr;
      const bottom = (pane.top + pane.height) * dpr;
      const scale = pane.scale;
      const Y = (value: number) => yOf(scale, value) * dpr;

      const lineLayer =
        (
          values: (g: number) => number,
          color: Rgba,
          lineWidth: number,
          toY: (value: number) => number = Y,
        ): Layer =>
        (ga, gb, isLive) => {
          const buffer = new LineBuffer(top, bottom);
          for (let g = isLive ? Math.max(v.g0, ga - 1) : ga; g <= gb; g++)
            buffer.push(X(g), toY(values(g)));
          return buffer.count > 1 ? [buffer.item("", 0, color, lineWidth)] : [];
        };

      if (pane.id === PRICE) {
        // volume at the bottom of the price pane
        const volumeStudy = studies.find(
          (st) => st.overlay && st.type === "volume" && isVisible(st),
        );
        if (volumeStudy && volumeOverlayMax > 0) {
          const h = (bottom - top) * 0.2;
          result.push((ga, gb) => {
            const buffer = new BarBuffer();
            for (let g = ga; g <= gb; g++) {
              const vol = cols.volume[g] / groupBars(v, g);
              if (!(vol > 0)) continue;
              const y = bottom - (vol / volumeOverlayMax) * h;
              const [a, b] = pixelRange(y, bottom);
              buffer.push(
                metrics.snap(X(g)),
                a,
                b,
                cols.close[g] >= cols.open[g]
                  ? volumeColors.up
                  : volumeColors.down,
              );
            }
            return [buffer.item("", 0, histogramHalf)];
          });
        }
        // comparison series
        for (const c of compares) {
          const base = compareBase(c);
          const color = resolve(c.color);
          result.push(
            lineLayer(
              (g) => groupValue(v, c.values, g),
              color,
              1.5,
              (value) =>
                yOfScaled(scale, compareScaled(scale, value, base)) * dpr,
            ),
          );
        }
        // the bars
        if (s === "line" || s === "area" || s === "baseline") {
          const lineColor = resolve(PRIMARY);
          if (s === "area") {
            result.push((ga, gb, isLive) => {
              const area = new AreaBuffer(top, bottom);
              for (let g = isLive ? Math.max(v.g0, ga - 1) : ga; g <= gb; g++)
                area.push(X(g), Y(cols.close[g]), bottom);
              return area.count > 1 ? [area.item("", 0, lineColor, 0.28)] : [];
            });
          }
          if (s === "baseline") {
            const yb = Y(baselinePrice());
            result.push((ga, gb, isLive) => {
              const upArea = new AreaBuffer(top, bottom);
              const downArea = new AreaBuffer(top, bottom);
              const upLine = new LineBuffer(top, bottom);
              const downLine = new LineBuffer(top, bottom);
              let px = NaN;
              let py = NaN;
              const point = (x: number, y: number) => {
                upArea.push(x, Math.min(y, yb), yb);
                downArea.push(x, Math.max(y, yb), yb);
                if (y <= yb) upLine.push(x, y);
                else upLine.break();
                if (y >= yb) downLine.push(x, y);
                else downLine.break();
              };
              for (let g = isLive ? Math.max(v.g0, ga - 1) : ga; g <= gb; g++) {
                const x = X(g);
                const y = Y(cols.close[g]);
                if (finite(py) && (py - yb) * (y - yb) < 0) {
                  const t = (yb - py) / (y - py);
                  point(px + (x - px) * t, yb);
                }
                point(x, y);
                px = x;
                py = y;
              }
              const out: RenderItem[] = [];
              if (upArea.count > 1)
                out.push(
                  upArea.item("u", 0, up, 0.22),
                  downArea.item("d", 0, down, 0.22),
                );
              if (upLine.count > 1) out.push(upLine.item("ul", 0, up, 2));
              if (downLine.count > 1) out.push(downLine.item("dl", 0, down, 2));
              return out;
            });
          } else {
            result.push(lineLayer((g) => cols.close[g], lineColor, 2));
          }
        } else {
          const hollow = s === "hollowCandles";
          const ohlc = s === "bars";
          const wick = metrics.wick;
          const body = metrics.body;
          result.push((ga, gb) => {
            const wicks = new BarBuffer();
            const bodies = new BarBuffer();
            const caps = new BarBuffer();
            const ticks = new BarBuffer();
            const tick = Math.max(wick, Math.round((body - wick) / 2));
            for (let g = ga; g <= gb; g++) {
              const o = cols.open[g];
              const h = cols.high[g];
              const l = cols.low[g];
              const c = cols.close[g];
              if (!finite(o) || !finite(c)) continue;
              const rising = hollow
                ? c >= (g > 0 ? cols.close[g - 1] : o)
                : c >= o;
              const color = rising ? upP : downP;
              const cx = metrics.snap(X(g));
              const [wt, wb] = pixelRange(Y(h), Y(l));
              if (ohlc) {
                const range = clampRange(wt, wb, top, bottom);
                if (range) wicks.push(cx, range[0], range[1], color);
                for (const [value, side] of [
                  [o, -1],
                  [c, 1],
                ] as const) {
                  const y = Math.round(Y(value) - wick / 2);
                  if (y < top || y + wick > bottom) continue;
                  ticks.push(
                    cx + side * (wick / 2 + tick / 2),
                    y,
                    y + wick,
                    color,
                  );
                }
                continue;
              }
              const [bt, bb] = pixelRange(Y(o), Y(c));
              if (body <= wick) {
                const range = clampRange(wt, wb, top, bottom);
                if (range) wicks.push(cx, range[0], range[1], color);
                continue;
              }
              if (hollow && c > o) {
                const segments: [number, number][] = [
                  [wt, bt],
                  [bb, wb],
                ];
                for (const [a, b] of segments) {
                  const range = b > a ? clampRange(a, b, top, bottom) : null;
                  if (range) wicks.push(cx, range[0], range[1], color);
                }
                const edges = clampRange(bt, bb, top, bottom);
                if (edges) {
                  wicks.push(
                    cx - body / 2 + wick / 2,
                    edges[0],
                    edges[1],
                    color,
                  );
                  wicks.push(
                    cx + body / 2 - wick / 2,
                    edges[0],
                    edges[1],
                    color,
                  );
                }
                for (const y of [bt, bb - wick]) {
                  if (y >= top && y + wick <= bottom)
                    caps.push(cx, y, y + wick, color);
                }
                continue;
              }
              const range = clampRange(wt, wb, top, bottom);
              if (range) wicks.push(cx, range[0], range[1], color);
              const box = clampRange(bt, bb, top, bottom);
              if (box) bodies.push(cx, box[0], box[1], color);
            }
            const items: RenderItem[] = [wicks.item("w", 0, wick / 2)];
            if (bodies.count) items.push(bodies.item("b", 0, body / 2));
            if (caps.count) items.push(caps.item("c", 0, body / 2));
            if (ticks.count) items.push(ticks.item("t", 0, tick / 2));
            return items;
          });
        }
      }

      // indicators of the pane
      const paneStudies =
        pane.id === PRICE
          ? studies.filter((st) => st.overlay && st.type !== "volume")
          : pane.study
            ? [pane.study]
            : [];
      for (const study of paneStudies) {
        if (!isVisible(study)) continue;
        for (const out of study.outputs) {
          if (out.kind === "volume") {
            const y0 = Y(0);
            result.push((ga, gb) => {
              const buffer = new BarBuffer();
              for (let g = ga; g <= gb; g++) {
                const vol = cols.volume[g] / groupBars(v, g);
                if (!(vol > 0)) continue;
                const range = clampRange(
                  ...pixelRange(Y(vol), y0),
                  top,
                  bottom,
                );
                if (range)
                  buffer.push(
                    metrics.snap(X(g)),
                    range[0],
                    range[1],
                    cols.close[g] >= cols.open[g]
                      ? volumeColors.up
                      : volumeColors.down,
                  );
              }
              return [buffer.item("", 0, histogramHalf)];
            });
          } else if (out.kind === "histogram") {
            const y0 = Y(0);
            const strong = { up: upP, down: downP };
            const faded = {
              up: packColor(mix(bg, up, 0.45)),
              down: packColor(mix(bg, down, 0.45)),
            };
            result.push((ga, gb) => {
              const buffer = new BarBuffer();
              for (let g = ga; g <= gb; g++) {
                const value = groupValue(v, out.values, g);
                if (!finite(value)) continue;
                const prev = g > 0 ? groupValue(v, out.values, g - 1) : value;
                const color =
                  value >= 0
                    ? value >= prev
                      ? strong.up
                      : faded.up
                    : value <= prev
                      ? strong.down
                      : faded.down;
                const range = clampRange(
                  ...pixelRange(Y(value), y0),
                  top,
                  bottom,
                );
                if (range)
                  buffer.push(metrics.snap(X(g)), range[0], range[1], color);
              }
              return [buffer.item("", 0, histogramHalf)];
            });
          } else {
            result.push(
              lineLayer(
                (g) => groupValue(v, out.values, g),
                resolve(out.color),
                out.width,
              ),
            );
          }
        }
      }
    }
    return result;
  };

  /** Builds the items of the main bars or of the last group */
  const runLayer = (
    fn: Layer,
    index: number,
    v: Visible,
    isLive: boolean,
  ): RenderItem[] => {
    const lastMain = Math.min(v.g1, v.last - 1);
    const items = isLive
      ? v.last >= v.g0 && v.last <= v.g1
        ? fn(v.last, v.last, true)
        : []
      : lastMain >= v.g0
        ? fn(v.g0, lastMain, false)
        : [];
    const version = ++itemVersion;
    return items.map((item, k) => ({
      ...item,
      key: `L${index}:${k}:${item.kind}:${item.key}${isLive ? ":live" : ""}`,
      version,
    }));
  };

  const renderData = (v: Visible | null, dpr: number) => {
    if (!renderer) return;
    const canvas = renderer.canvas;
    styleElement(canvas, {
      left: "0px",
      top: "0px",
      width: `${plotW}px`,
      height: `${plotH}px`,
    });
    const bw = Math.max(1, Math.round(plotW * dpr));
    const bh = Math.max(1, Math.round(plotH * dpr));
    if (canvas.width !== bw || canvas.height !== bh) renderer.resize(bw, bh);
    if (v) {
      const key = [
        bw,
        bh,
        dpr,
        spacing,
        right,
        v.level,
        style(),
        dataVersion,
        themeVersion,
        optionsVersion,
        volumeOverlayMax,
        style() === "baseline" ? baselinePrice() : 0,
        ...panes.map(
          (p) =>
            `${p.id}:${p.top}:${p.height}:${p.scale.min}:${p.scale.max}:${p.scale.base}:${p.scale.mode}`,
        ),
        ...studies.map((st) => `${st.id}:${isVisible(st)}`),
      ].join("|");
      if (key !== geomKey) {
        geomKey = key;
        builtTail = tailVersion;
        layers = createLayers(v, dpr).map((fn) => ({ fn, main: [], live: [] }));
        layers.forEach((l, i) => {
          l.main = runLayer(l.fn, i, v, false);
          l.live = runLayer(l.fn, i, v, true);
        });
      } else if (builtTail !== tailVersion) {
        builtTail = tailVersion;
        layers.forEach((l, i) => {
          l.live = runLayer(l.fn, i, v, true);
        });
      }
    } else {
      layers = [];
      geomKey = "";
    }
    const items = layers.flatMap((l) => [...l.main, ...l.live]);
    renderer.render(items, {
      transform: { xScale: 2 / bw, xOffset: -1, yScale: -2 / bh, yOffset: 1 },
      width: bw,
      height: bh,
      dpr,
    });
  };

  // -------------------------------------------------------- 2D painting

  const sizeCanvas = (canvas: HTMLCanvasElement, dpr: number) => {
    const w = Math.max(1, Math.round(width * dpr));
    const h = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) => {
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  };

  const paintBackground = (
    ctx: CanvasRenderingContext2D,
    v: Visible | null,
    ticks: TimeLabel[],
  ) => {
    const grid = toCss(theme.grid);
    const showGrid = options.grid !== false;
    ctx.lineWidth = 1;
    if (showGrid) {
      ctx.strokeStyle = grid;
      ctx.beginPath();
      for (const t of ticks) {
        const x = Math.round(t.x) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, plotH);
      }
      for (const pane of panes) {
        for (const t of pane.ticks) {
          const y = Math.round(yOfScaled(pane.scale, t)) + 0.5;
          if (y < pane.top + 2 || y > pane.top + pane.height - 2) continue;
          ctx.moveTo(0, y);
          ctx.lineTo(plotW, y);
        }
      }
      ctx.stroke();
    }
    // watermark
    if (options.watermark) {
      const price = panes[0];
      ctx.save();
      ctx.font = font(Math.min(56, Math.max(22, plotW / 14)), 700);
      ctx.fillStyle = toCss(theme.text, 0.07);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(options.watermark, plotW / 2, price.top + price.height / 2);
      ctx.restore();
    }
    // bands of the indicator panes, fill of the Bollinger bands
    for (const pane of panes) {
      const study = pane.study;
      if (study?.bands && isVisible(study)) {
        const color = resolve(study.outputs[0]?.color ?? PRIMARY);
        const ys = study.bands.map((b) => Math.round(yOf(pane.scale, b)) + 0.5);
        if (study.type === "rsi" && ys.length === 2) {
          ctx.fillStyle = toCss(color, 0.07);
          ctx.fillRect(
            0,
            Math.min(ys[0], ys[1]),
            plotW,
            Math.abs(ys[1] - ys[0]),
          );
        }
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = toCss(theme.textMuted, 0.45);
        ctx.beginPath();
        for (const y of ys) {
          if (y < pane.top || y > pane.top + pane.height) continue;
          ctx.moveTo(0, y);
          ctx.lineTo(plotW, y);
        }
        ctx.stroke();
        ctx.restore();
      }
    }
    if (v) {
      const price = panes[0];
      for (const study of studies) {
        if (study.type !== "boll" || !study.fill || !isVisible(study)) continue;
        const [ui, li] = study.fill;
        const upper = study.outputs[ui].values;
        const lower = study.outputs[li].values;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, price.top, plotW, price.height);
        ctx.clip();
        ctx.fillStyle = css(study.outputs[ui].color, 0.07);
        ctx.beginPath();
        let started = false;
        const back: [number, number][] = [];
        const flush = () => {
          for (let k = back.length - 1; k >= 0; k--)
            ctx.lineTo(back[k][0], back[k][1]);
          if (started) ctx.closePath();
          back.length = 0;
          started = false;
        };
        for (let g = v.g0; g <= v.g1; g++) {
          const a = groupValue(v, upper, g);
          const b = groupValue(v, lower, g);
          if (!finite(a) || !finite(b)) {
            flush();
            continue;
          }
          const x = xOf(groupCenter(v, g));
          const ya = yOf(price.scale, a);
          if (started) ctx.lineTo(x, ya);
          else ctx.moveTo(x, ya);
          started = true;
          back.push([x, yOf(price.scale, b)]);
        }
        flush();
        ctx.fill();
        ctx.restore();
      }
    }
    // separators and axis borders
    ctx.strokeStyle = toCss(theme.axis);
    ctx.beginPath();
    for (const pane of panes.slice(1)) {
      const y = Math.round(pane.top) + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.moveTo(Math.round(plotW) + 0.5, 0);
    ctx.lineTo(Math.round(plotW) + 0.5, height);
    ctx.moveTo(0, Math.round(plotH) + 0.5);
    ctx.lineTo(width, Math.round(plotH) + 0.5);
    ctx.stroke();
  };

  /** Label on the price axis; returns its vertical extent */
  const axisLabel = (
    ctx: CanvasRenderingContext2D,
    y: number,
    text: string,
    fill: string,
    textColor: string,
    second?: string,
  ) => {
    const h = second ? 32 : 18;
    const top = clamp(Math.round(y - 9), 0, plotH - h);
    roundRect(ctx, plotW + 1, top, axisW - 2, h, 3);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = font(theme.fontSize, 500);
    ctx.fillText(text, plotW + 7, top + 9.5);
    if (second) {
      ctx.font = font(theme.fontSize - 1);
      ctx.fillText(second, plotW + 7, top + 24);
    }
  };

  const priceAxisText = (value: number) =>
    panes[0]?.scale.mode === "percent"
      ? formatPercent(toScaled(panes[0].scale, value), locale)
      : formatPrice(value);

  const lineColor = (line: TradingPriceLine) => {
    if (line.color) return css(line.color);
    const kind = line.kind ?? "line";
    if (kind === "takeProfit") return css(upCss());
    if (kind === "stopLoss") return css(downCss());
    if (kind === "alert") return css(WARNING);
    if (kind === "line") return css(PRIMARY);
    return css(line.side === "sell" ? downCss() : upCss());
  };

  const linePrice = (line: TradingPriceLine) =>
    lineOverrides.get(line.id) ?? line.price;

  const crosshairState = () => {
    if (!vis || !panes.length) return null;
    if (keyboardIndex !== null) {
      const index = keyboardIndex;
      const bar = index >= 0 && index < n() ? display().close[index] : NaN;
      return { index, pane: panes[0], y: yOf(panes[0].scale, bar), price: bar };
    }
    if (!pointer || pointer.x > plotW || pointer.y > plotH) return null;
    const pane = paneAt(pointer.y);
    if (!pane) return null;
    const index = Math.round(indexAt(pointer.x));
    let y = pointer.y;
    let price = valueAt(pane.scale, y);
    if (
      pane.id === PRICE &&
      options.crosshair !== "free" &&
      index >= 0 &&
      index < n() &&
      tool === "cursor"
    ) {
      const d = display();
      let best = Infinity;
      for (const value of [
        d.open[index],
        d.high[index],
        d.low[index],
        d.close[index],
      ]) {
        const yy = yOf(pane.scale, value);
        if (Math.abs(yy - pointer.y) < best) {
          best = Math.abs(yy - pointer.y);
          y = yy;
          price = value;
        }
      }
    }
    return { index, pane, y, price };
  };

  const drawingMapper = (): DrawingMapper | null => {
    const price = panes[0];
    if (!price) return null;
    return {
      x: xOf,
      y: (p) => yOf(price.scale, p),
      index: indexOfTimeExt,
      left: 0,
      right: plotW,
      top: price.top,
      bottom: price.top + price.height,
    };
  };

  const formatSpan = (bars: number, ms: number) => {
    const l = labels();
    const abs = Math.abs(ms);
    const parts: string[] = [];
    const days = Math.floor(abs / DAY);
    const hours = Math.floor((abs % DAY) / HOUR);
    const minutes = Math.floor((abs % HOUR) / MINUTE);
    if (days) parts.push(fill(l.days, { count: days }));
    if (hours) parts.push(fill(l.hours, { count: hours }));
    if (minutes && !days) parts.push(fill(l.minutes, { count: minutes }));
    return `${fill(labels().bars, { count: bars })}, ${parts.join(" ") || fill(l.minutes, { count: 0 })}`;
  };

  const paintForeground = (
    ctx: CanvasRenderingContext2D,
    v: Visible | null,
    ticks: TimeLabel[],
  ) => {
    const price = panes[0];
    if (!price) return;
    const count = n();
    const text = toCss(theme.text);
    const muted = toCss(theme.textMuted);
    const bgCss = toCss(theme.background);
    const upC = css(upCss());
    const downC = css(downCss());

    // ---- price pane contents (clipped)
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, price.top, plotW, price.height);
    ctx.clip();

    // high / low of the visible bars
    if (
      v &&
      options.highLowMarkers !== false &&
      style() !== "line" &&
      style() !== "area" &&
      style() !== "baseline"
    ) {
      let hi = -Infinity;
      let lo = Infinity;
      let hiG = -1;
      let loG = -1;
      for (let g = v.s0; g <= v.s1; g++) {
        if (v.cols.high[g] > hi) {
          hi = v.cols.high[g];
          hiG = g;
        }
        if (v.cols.low[g] < lo) {
          lo = v.cols.low[g];
          loG = g;
        }
      }
      ctx.font = font(theme.fontSize);
      ctx.fillStyle = muted;
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      for (const [g, value, below] of [
        [hiG, hi, false],
        [loG, lo, true],
      ] as const) {
        if (g < 0 || !finite(value)) continue;
        const x = xOf(groupCenter(v, g));
        const y = yOf(price.scale, value) + (below ? 9 : -9);
        const leftSide = x > plotW * 0.6;
        const label = formatPrice(value);
        ctx.textBaseline = "middle";
        ctx.textAlign = leftSide ? "right" : "left";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (leftSide ? -14 : 14), y);
        ctx.stroke();
        ctx.fillText(label, x + (leftSide ? -17 : 17), y);
      }
    }

    // trade markers
    if (v && options.markers?.length) {
      const stack = new Map<string, number>();
      ctx.font = font(theme.fontSize, 600);
      ctx.textAlign = "center";
      const many = options.markers.length > 400;
      for (const marker of options.markers) {
        const index = indexOfTimeExt(marker.time);
        if (index < 0 || index > count - 1) continue;
        const g = Math.floor(index / v.size);
        if (g < v.g0 || g > v.g1) continue;
        const x = Math.round(xOf(groupCenter(v, g)));
        const sell = marker.side === "sell";
        const color = marker.color ? css(marker.color) : sell ? downC : upC;
        const key = `${g}:${sell}`;
        const offset = stack.get(key) ?? 0;
        stack.set(key, offset + (marker.text && !many ? 30 : 16));
        const anchor = yOf(price.scale, sell ? v.cols.high[g] : v.cols.low[g]);
        const dir = sell ? -1 : 1;
        const tip = anchor + dir * (6 + offset);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, tip);
        ctx.lineTo(x - 5.5, tip + dir * 7);
        ctx.lineTo(x - 2, tip + dir * 7);
        ctx.lineTo(x - 2, tip + dir * 12);
        ctx.lineTo(x + 2, tip + dir * 12);
        ctx.lineTo(x + 2, tip + dir * 7);
        ctx.lineTo(x + 5.5, tip + dir * 7);
        ctx.closePath();
        ctx.fill();
        if (marker.text && !many) {
          ctx.textBaseline = sell ? "bottom" : "top";
          ctx.fillText(marker.text, x, tip + dir * 14);
        }
        if (marker.price !== undefined && finite(marker.price)) {
          ctx.beginPath();
          ctx.arc(x, yOf(price.scale, marker.price), 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = bgCss;
          ctx.stroke();
        }
      }
    }

    // drawings
    const mapper = drawingMapper();
    if (mapper) {
      const context = (drawing: TradingDrawing) => ({
        color: css(drawing.color ?? PRIMARY),
        text,
        background: bgCss,
        up: upC,
        down: downC,
        font: font(theme.fontSize, 500),
        formatPrice,
        formatPercent: (value: number) => formatPercent(value, locale),
        formatSpan,
        textOn,
      });
      for (const drawing of drawings) {
        paintDrawing(ctx, drawing, mapper, context(drawing), {
          selected: drawing.id === selected,
          hovered: drawing.id === hovered,
        });
      }
      if (draft)
        paintDrawing(ctx, draft, mapper, context(draft), {
          selected: true,
          hovered: false,
        });
    }

    // price lines (orders, positions, TP / SL, alerts)
    const lastClose = count ? store.close[count - 1] : NaN;
    for (const line of options.priceLines ?? []) {
      const p = linePrice(line);
      const y = Math.round(yOf(price.scale, p)) + 0.5;
      if (!finite(y) || y < price.top || y > price.top + price.height) continue;
      const color = lineColor(line);
      const kind = line.kind ?? "line";
      const lineStyle =
        line.lineStyle ??
        (kind === "position" || kind === "line" ? "solid" : "dashed");
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth =
        hoveredLine === line.id ||
        (gesture?.kind === "order" && gesture.line.id === line.id)
          ? 1.5
          : 1;
      setDash(ctx, lineStyle, 1);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(plotW, y);
      ctx.stroke();
      ctx.restore();
      // label: [grip] title | quantity | profit
      const titleKey = PRICE_LINE_TITLES[kind];
      const title = line.title ?? (titleKey ? labels()[titleKey] : "");
      const parts: { text: string; fill: string; color: string }[] = [];
      if (title) parts.push({ text: title, fill: color, color: textOn(color) });
      if (line.quantity !== undefined && line.quantity !== "")
        parts.push({ text: String(line.quantity), fill: bgCss, color });
      if (
        kind === "position" &&
        typeof line.quantity === "number" &&
        finite(lastClose)
      ) {
        const pnl =
          (lastClose - p) * line.quantity * (line.side === "sell" ? -1 : 1);
        const pnlFill = pnl >= 0 ? upC : downC;
        parts.push({
          text: `${pnl >= 0 ? "+" : "−"}${formatPrice(Math.abs(pnl))}`,
          fill: pnlFill,
          color: textOn(pnlFill),
        });
      }
      if (!parts.length && !line.draggable) continue;
      ctx.font = font(theme.fontSize, 600);
      const widths = parts.map((part) => ctx.measureText(part.text).width + 12);
      const grip = line.draggable ? 14 : 0;
      const total = widths.reduce((a, b) => a + b, 0) + grip;
      let x = Math.round(plotW - total - 56);
      const top = Math.round(y - 9.5);
      roundRect(ctx, x - 0.5, top - 0.5, total + 1, 19, 3);
      ctx.fillStyle = bgCss;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.stroke();
      if (grip) {
        ctx.fillStyle = color;
        for (let k = 0; k < 3; k++)
          ctx.fillRect(x + 4, top + 5 + k * 3.5, 6, 1.5);
        x += grip;
      }
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      parts.forEach((part, k) => {
        if (part.fill !== bgCss) {
          ctx.fillStyle = part.fill;
          ctx.fillRect(x, top, widths[k], 18);
        }
        ctx.fillStyle = part.color;
        ctx.fillText(part.text, x + widths[k] / 2, top + 9.5);
        x += widths[k];
      });
    }

    // last price line
    const lastLine = options.lastPriceLine !== false && count > 0;
    const lastUp = count > 0 && store.close[count - 1] >= store.open[count - 1];
    const lastColor = lastUp ? upC : downC;
    if (lastLine) {
      const y = Math.round(yOf(price.scale, lastClose)) + 0.5;
      ctx.save();
      ctx.strokeStyle = lastColor;
      ctx.setLineDash([1, 2]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(plotW, y);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    // price axis ticks, except under the labels drawn over the axis
    const covered: number[] = [];
    for (const line of options.priceLines ?? [])
      covered.push(yOf(price.scale, linePrice(line)));
    for (const drawing of drawings) {
      if (drawing.type === "horizontalLine" && drawing.points[0])
        covered.push(yOf(price.scale, drawing.points[0].price));
    }
    if (lastLine)
      covered.push(yOf(price.scale, lastClose) + (options.countdown ? 7 : 0));
    ctx.font = font(theme.fontSize);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = muted;
    for (const pane of panes) {
      for (const t of pane.ticks) {
        const y = yOfScaled(pane.scale, t);
        if (y < pane.top + 8 || y > pane.top + pane.height - 8) continue;
        const gap = options.countdown ? 18 : 14;
        if (pane.id === PRICE && covered.some((c) => Math.abs(c - y) < gap))
          continue;
        ctx.fillText(paneTickText(pane, t), plotW + 8, y);
      }
    }
    // time axis ticks
    ctx.textAlign = "center";
    for (const t of ticks) {
      ctx.font = font(theme.fontSize, t.bold ? 600 : 400);
      ctx.fillStyle = t.bold ? text : muted;
      ctx.fillText(t.text, t.x, plotH + TIME_AXIS / 2);
    }

    // labels of the price lines and drawings
    for (const line of options.priceLines ?? []) {
      const p = linePrice(line);
      const y = yOf(price.scale, p);
      if (!finite(y) || y < price.top || y > price.top + price.height) continue;
      const fill = lineColor(line);
      axisLabel(ctx, y, priceAxisText(p), fill, textOn(fill));
    }
    for (const drawing of drawings) {
      if (drawing.type !== "horizontalLine" || !drawing.points[0]) continue;
      const p = drawing.points[0].price;
      const y = yOf(price.scale, p);
      if (y < price.top || y > price.top + price.height) continue;
      const fill = css(drawing.color ?? PRIMARY);
      axisLabel(ctx, y, priceAxisText(p), fill, textOn(fill));
    }
    // last price label (with the countdown)
    if (lastLine) {
      let second: string | undefined;
      if (options.countdown) {
        const tf = timeframe();
        const start = store.time[count - 1];
        let end = start + tf.ms;
        if (tf.unit === "month") {
          const date = new Date(start);
          end = Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth() + tf.count,
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
          );
        }
        second = formatCountdown(end - Date.now(), labels());
      }
      axisLabel(
        ctx,
        yOf(price.scale, lastClose),
        priceAxisText(lastClose),
        lastColor,
        textOn(lastColor),
        second,
      );
    }

    // crosshair
    const cross = crosshairState();
    if (cross && v) {
      const x = Math.round(xOf(cross.index)) + 0.5;
      ctx.save();
      ctx.strokeStyle = toCss(theme.textMuted, 0.75);
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      if (x >= 0 && x <= plotW) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, plotH);
      }
      const y = Math.round(cross.y) + 0.5;
      if (
        finite(y) &&
        y >= cross.pane.top &&
        y <= cross.pane.top + cross.pane.height
      ) {
        ctx.moveTo(0, y);
        ctx.lineTo(plotW, y);
      }
      ctx.stroke();
      ctx.restore();
      const labelBg = toCss(theme.text);
      if (
        finite(cross.y) &&
        cross.y >= cross.pane.top &&
        cross.y <= cross.pane.top + cross.pane.height
      ) {
        const scaled = scaledAt(cross.pane.scale, cross.y);
        const textValue =
          cross.pane.id === PRICE
            ? priceAxisText(fromScaled(cross.pane.scale, scaled))
            : paneTickText(cross.pane, scaled);
        axisLabel(ctx, cross.y, textValue, labelBg, bgCss);
      }
      if (x >= 0 && x <= plotW && count) {
        const label = formatCrosshairTime(
          shiftTime(timeAt(cross.index), options.utcOffset),
          tfMs(),
          locale,
        );
        ctx.font = font(theme.fontSize, 500);
        const w = ctx.measureText(label).width + 16;
        const left = clamp(x - w / 2, 0, width - w);
        roundRect(ctx, left, plotH + 3, w, 21, 3);
        ctx.fillStyle = labelBg;
        ctx.fill();
        ctx.fillStyle = bgCss;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, left + w / 2, plotH + 14);
      }
    }
  };

  // -------------------------------------------------------------- legends

  let legendKey = "";
  const legendRows = new Map<string, LegendRow>();
  const legendBoxes = new Map<string, HTMLDivElement>();

  const legendBox = (id: string) => {
    let box = legendBoxes.get(id);
    if (!box) {
      box = make("div", {
        position: "absolute",
        left: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1px",
        maxWidth: "calc(100% - 16px)",
        fontSize: "12px",
        lineHeight: "18px",
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      });
      legends.appendChild(box);
      legendBoxes.set(id, box);
    }
    return box;
  };

  const legendRow = (
    box: HTMLDivElement,
    title: string,
    study: Study | null,
    outputs: number,
  ) => {
    const row = make("div", {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "0 4px",
      marginLeft: "-4px",
      borderRadius: "4px",
      background:
        "color-mix(in srgb, var(--surface-color, var(--background-color, #fff)) 86%, transparent)",
    });
    let button: HTMLButtonElement | null = null;
    if (study) {
      button = make("button", {
        all: "unset",
        cursor: "pointer",
        pointerEvents: "auto",
        color: "var(--text-color, #1f2937)",
        fontWeight: "500",
        borderRadius: "3px",
      });
      button.type = "button";
      button.textContent = title;
      button.setAttribute(
        "aria-label",
        fill(labels().toggleIndicator, { name: title }),
      );
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const next = !isVisible(study);
        visibility.set(study.id, next);
        emit("indicatorToggle", { id: study.id, visible: next });
        updateLegends();
        invalidate();
      });
      button.addEventListener("pointerdown", (event) =>
        event.stopPropagation(),
      );
      row.appendChild(button);
    } else if (title) {
      const label = make("span", { fontWeight: "600" });
      label.textContent = title;
      row.appendChild(label);
    }
    const values: HTMLSpanElement[] = [];
    for (let i = 0; i < outputs; i++) {
      const span = make("span", {});
      row.appendChild(span);
      values.push(span);
    }
    box.appendChild(row);
    return { row, values, button };
  };

  const buildLegends = () => {
    legendRows.clear();
    for (const box of legendBoxes.values()) box.remove();
    legendBoxes.clear();
    if (options.legend === false) return;
    const priceBox = legendBox(PRICE);
    const head = [
      options.symbol,
      options.labels?.timeframe ??
        (typeof options.timeframe === "string" ? options.timeframe : ""),
    ]
      .filter(Boolean)
      .join(" · ");
    legendRows.set("ohlc", legendRow(priceBox, head, null, 1));
    for (const study of studies) {
      if (study.overlay && study.type === "volume") {
        legendRows.set(study.id, legendRow(priceBox, titleOf(study), study, 1));
      } else if (study.overlay) {
        legendRows.set(
          study.id,
          legendRow(priceBox, titleOf(study), study, study.outputs.length),
        );
      }
    }
    for (const c of compares)
      legendRows.set(`compare:${c.id}`, legendRow(priceBox, "", null, 1));
    for (const study of studies) {
      if (study.overlay) continue;
      legendRows.set(
        study.id,
        legendRow(
          legendBox(study.id),
          titleOf(study),
          study,
          study.outputs.length,
        ),
      );
    }
  };

  /** Legend title: indicator abbreviations, but a word for the volume */
  const titleOf = (study: Study) =>
    study.type === "volume" ? labels().volume : study.title;

  const setSpan = (
    span: HTMLSpanElement | undefined,
    text: string,
    color?: string,
  ) => {
    if (!span) return;
    if (span.textContent !== text) span.textContent = text;
    const c = color ?? "";
    if (span.style.color !== c) span.style.color = c;
  };

  const updateLegends = () => {
    const key = [
      options.legend !== false,
      options.symbol,
      options.timeframe,
      ...studies.map((s) => `${s.id}:${titleOf(s)}:${s.outputs.length}`),
      ...compares.map((c) => c.id),
      texts.toggleIndicator,
      options.labels?.timeframe,
    ].join("|");
    if (key !== legendKey) {
      legendKey = key;
      buildLegends();
    }
    if (options.legend === false) return;
    for (const pane of panes) {
      const box = legendBoxes.get(pane.id);
      if (box) box.style.top = `${pane.top + 6}px`;
    }
    const count = n();
    const cross = crosshairState();
    const index = clamp(
      cross && cross.index >= 0 && cross.index < count
        ? cross.index
        : count - 1,
      0,
      Math.max(0, count - 1),
    );
    const l = labels();
    const ohlc = legendRows.get("ohlc");
    const upC = css(upCss());
    const downC = css(downCss());
    if (ohlc && count) {
      const d = display();
      const o = d.open[index];
      const c = d.close[index];
      const prevClose = index > 0 ? d.close[index - 1] : o;
      const change = c - prevClose;
      const color = c >= o ? upC : downC;
      const span = ohlc.values[0];
      const html = [
        [l.open, d.open[index]],
        [l.high, d.high[index]],
        [l.low, d.low[index]],
        [l.close, c],
      ]
        .map(
          ([name, value]) =>
            `<span style="color:var(--text-secondary-color,#6b7280)">${escapeHtml(String(name))}</span><span style="color:${color}">${escapeHtml(formatPrice(value as number))}</span>`,
        )
        .join(" ");
      const pct = prevClose ? (change / prevClose) * 100 : NaN;
      const changeName = l.change
        ? `<span style="color:var(--text-secondary-color,#6b7280)">${escapeHtml(l.change)}</span>`
        : "";
      const changeHtml = `${changeName}<span style="color:${change >= 0 ? upC : downC}">${change >= 0 ? "+" : "−"}${escapeHtml(formatPrice(Math.abs(change)))} (${escapeHtml(formatPercent(pct, locale))})</span>`;
      const vol = store.hasVolume
        ? ` <span style="color:var(--text-secondary-color,#6b7280)">${escapeHtml(l.volume)}</span>${escapeHtml(formatVolume(store.volume[index], locale))}`
        : "";
      const next = `${html} ${changeHtml}${vol}`;
      if (span && span.dataset.html !== next) {
        span.innerHTML = next;
        span.dataset.html = next;
        span.style.display = "inline-flex";
        span.style.gap = "4px";
        span.style.flexWrap = "wrap";
      }
    }
    for (const study of studies) {
      const row = legendRows.get(study.id);
      if (!row) continue;
      const shown = isVisible(study);
      row.row.style.opacity = shown ? "1" : "0.5";
      if (row.button) {
        row.button.setAttribute("aria-pressed", String(shown));
        row.button.style.textDecoration = shown ? "none" : "line-through";
      }
      const slots = study.outputs.length;
      study.outputs.forEach((out, i) => {
        // the MACD histogram (drawn first, under the lines) is listed last
        const span =
          row.values[study.type === "macd" ? (i + slots - 1) % slots : i];
        if (!shown || !count) {
          setSpan(span, "");
          return;
        }
        if (out.kind === "volume") {
          const c = store.close[index] >= store.open[index] ? upC : downC;
          setSpan(span, formatVolume(store.volume[index], locale), c);
          return;
        }
        const value = out.values[index];
        let color = out.color ? css(out.color) : undefined;
        if (out.kind === "histogram") color = value >= 0 ? upC : downC;
        const prefix =
          study.outputs.length > 1 && study.type !== "boll"
            ? `${out.label} `
            : "";
        setSpan(span, `${prefix}${studyValueText(study, value)}`, color);
      });
    }
    for (const c of compares) {
      const row = legendRows.get(`compare:${c.id}`);
      if (!row) continue;
      const value = c.values[index];
      const base = compareBase(c);
      const pct = finite(base) ? (value / base - 1) * 100 : NaN;
      setSpan(
        row.values[0],
        `${c.name} ${formatPrice(value)} ${formatPercent(pct, locale)}`,
        css(c.color),
      );
    }
  };

  const escapeHtml = (text: string) =>
    text.replace(/[&<>"]/g, (ch) =>
      ch === "&"
        ? "&amp;"
        : ch === "<"
          ? "&lt;"
          : ch === ">"
            ? "&gt;"
            : "&quot;",
    );

  // ---------------------------------------------------------------- frame

  const invalidate = () => {
    if (destroyed || frameId) return;
    frameId = win?.requestAnimationFrame
      ? win.requestAnimationFrame(frame)
      : (setTimeout(() => frame(Date.now()), 16) as unknown as number);
  };

  const animate = (now: number) => {
    let active = false;
    if (scrollAnim) {
      const t = Math.min(1, (now - scrollAnim.start) / 320);
      const eased = 1 - (1 - t) ** 3;
      right = scrollAnim.from + (scrollAnim.to - scrollAnim.from) * eased;
      if (t >= 1) scrollAnim = null;
      else active = true;
    }
    if (kinetic) {
      const dt = Math.min(64, now - kinetic.t);
      kinetic.t = now;
      const before = right;
      right -= (kinetic.v * dt) / spacing;
      kinetic.v *= Math.exp(-dt / 320);
      clampView();
      if (Math.abs(kinetic.v) < 0.02 || right === before) kinetic = null;
      else active = true;
    }
    return active;
  };

  const measureAxis = (ctx: CanvasRenderingContext2D) => {
    ctx.font = font(theme.fontSize, 500);
    let widest = 0;
    for (const pane of panes) {
      for (const t of pane.ticks)
        widest = Math.max(widest, ctx.measureText(paneTickText(pane, t)).width);
    }
    const count = n();
    if (count) {
      widest = Math.max(
        widest,
        ctx.measureText(priceAxisText(store.close[count - 1])).width,
      );
      if (options.countdown)
        widest = Math.max(widest, ctx.measureText("00:00:00").width);
    }
    const wanted = Math.max(MIN_AXIS, Math.ceil(widest + 18));
    // shrink only when clearly narrower (no jitter while the price moves)
    if (wanted > axisW || wanted < axisW - 12) axisW = wanted;
  };

  function frame(now?: number) {
    frameId = 0;
    if (destroyed) return;
    width = root.clientWidth;
    height = root.clientHeight;
    if (width <= 0 || height <= 0) return;
    const time = now ?? Date.now();
    const animating = animate(
      typeof performance !== "undefined" ? performance.now() : time,
    );
    const dpr = win?.devicePixelRatio || 1;
    syncDerived();
    sizeCanvas(background, dpr);
    sizeCanvas(foreground, dpr);
    const bg = background.getContext("2d");
    const fg = foreground.getContext("2d");
    plotH = Math.max(1, height - TIME_AXIS);
    for (let pass = 0; pass < 2; pass++) {
      plotW = Math.max(1, width - axisW);
      layoutPanes();
      if (pendingRange) applyRange(pendingRange);
      clampView();
      vis = computeVisible();
      autoscale(vis);
      for (const pane of panes) {
        const ticks = scaleTicks(pane.scale, pane.id === PRICE ? 44 : 30);
        // fixed-range panes (RSI) label their bands and their middle
        const range = pane.study?.range;
        const bands = pane.study?.bands;
        pane.ticks =
          range && bands
            ? [...bands, (range[0] + range[1]) / 2].sort((a, b) => a - b)
            : ticks.scaled;
        pane.step = ticks.step;
      }
      const before = axisW;
      if (fg) measureAxis(fg);
      if (axisW === before) break;
    }
    const v = vis;
    pendingRange = null;
    const ticks = fg ? timeTicks(v, fg) : [];
    renderData(v, dpr);
    if (bg) {
      bg.setTransform(dpr, 0, 0, dpr, 0, 0);
      bg.clearRect(0, 0, width, height);
      paintBackground(bg, v, ticks);
    }
    if (fg) {
      fg.setTransform(dpr, 0, 0, dpr, 0, 0);
      fg.clearRect(0, 0, width, height);
      paintForeground(fg, v, ticks);
    }
    updateLegends();
    updateJump();
    emitView();
    if (animating) invalidate();
  }

  const updateJump = () => {
    const count = n();
    const price = panes[0];
    const show = count > 0 && price && xOf(count - 1) > plotW + spacing * 0.5;
    jump.style.display = show ? "flex" : "none";
    if (show && price) {
      jump.style.left = `${plotW - 40}px`;
      jump.style.top = `${price.top + price.height - 40}px`;
      const text = labels().scrollToRealtime;
      if (jump.getAttribute("aria-label") !== text) {
        jump.setAttribute("aria-label", text);
        jump.title = text;
      }
    }
  };

  const visibleRange = (): TradingVisibleRange => {
    const from = right - plotW / spacing;
    return { from, to: right, fromTime: timeAt(from), toTime: timeAt(right) };
  };

  const emitView = () => {
    const count = n();
    if (!count) return;
    const range = visibleRange();
    if (
      !lastRange ||
      Math.abs(lastRange.from - range.from) > 1e-6 ||
      Math.abs(lastRange.to - range.to) > 1e-6
    ) {
      lastRange = range;
      emit("visibleRangeChange", range);
    }
    if (range.from < 10 && historyFirst !== store.time[0]) {
      historyFirst = store.time[0];
      emit("historyRequest", { firstTime: store.time[0], count });
    }
    const cross = crosshairState();
    const key = cross ? `${cross.index}|${cross.price}|${cross.pane.id}` : "";
    if (key !== lastCrosshair) {
      lastCrosshair = key;
      if (!cross) {
        emit("crosshairMove", null);
      } else {
        const event: TradingCrosshairEvent = {
          index: cross.index,
          time: timeAt(cross.index),
          bar:
            cross.index >= 0 && cross.index < count
              ? readBar(store, cross.index)
              : null,
          price: cross.price,
          pane: cross.pane.id,
          x: xOf(cross.index),
          y: cross.y,
        };
        emit("crosshairMove", event);
      }
    }
  };

  // ---------------------------------------------------------- interaction

  const local = (event: { clientX: number; clientY: number }) => {
    const rect = root.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const applyRange = (range: { from: number; to: number }) => {
    spacing = plotW / (range.to - range.from);
    right = range.to;
    clampView();
  };

  /**
   * Zooms around `x`; while the latest bar is in view it stays where it is
   * (the reader is following the market), like the price scale side of
   * trading terminals
   */
  const zoomAt = (x: number, factor: number) => {
    const count = n();
    if (count && followsRealtime()) x = Math.min(plotW, xOf(count - 1));
    const anchor = indexAt(x);
    spacing = spacing * factor;
    clampView();
    right = anchor + (plotW - x) / spacing;
    clampView();
    kinetic = null;
    scrollAnim = null;
    invalidate();
  };

  const anchorAt = (x: number, y: number): TradingDrawingPoint => {
    const index = Math.round(indexAt(x));
    return { time: timeAt(index), price: valueAt(panes[0].scale, y) };
  };

  const setTool = (next: TradingDrawingTool, notify: boolean) => {
    if (next === tool) return;
    tool = next;
    draft = null;
    if (notify) emit("drawingToolChange", next);
    invalidate();
  };

  const select = (id: string | null) => {
    if (id === selected) return;
    selected = id;
    emit("drawingSelect", id);
    invalidate();
  };

  const commitDrawings = (next: readonly TradingDrawing[]) => {
    drawings = next;
    emittedDrawings = next;
    emit("drawingsChange", next);
    invalidate();
  };

  const finishDraft = () => {
    if (!draft) return;
    const done = draft;
    draft = null;
    commitDrawings([...drawings, done]);
    select(done.id);
    if (!options.keepDrawingMode) setTool("cursor", true);
  };

  const hitLine = (x: number, y: number) => {
    const price = panes[0];
    if (!price || x > plotW) return null;
    for (const line of options.priceLines ?? []) {
      if (!line.draggable) continue;
      if (Math.abs(yOf(price.scale, linePrice(line)) - y) <= 5) return line;
    }
    return null;
  };

  const hitDrawingAt = (x: number, y: number) => {
    const mapper = drawingMapper();
    if (!mapper || y < mapper.top || y > mapper.bottom || x > plotW)
      return null;
    for (let i = drawings.length - 1; i >= 0; i--) {
      const hit = hitDrawing(drawings[i], mapper, { x, y });
      if (hit) return { drawing: drawings[i], hit };
    }
    return null;
  };

  const separatorAt = (y: number) => {
    for (let i = 1; i < panes.length; i++) {
      if (Math.abs(panes[i].top - y) <= 4) return i;
    }
    return -1;
  };

  const updateCursor = (x: number, y: number) => {
    let cursor = "crosshair";
    hoveredLine = null;
    let nextHover: string | null = null;
    if (gesture?.kind === "pan" && gesture.moved) cursor = "grabbing";
    else if (separatorAt(y) > 0) cursor = "row-resize";
    else if (x > plotW && y < plotH) cursor = "ns-resize";
    else if (y > plotH) cursor = "ew-resize";
    else if (tool === "cursor") {
      const line = hitLine(x, y);
      if (line) {
        cursor = "ns-resize";
        hoveredLine = line.id;
      } else {
        const hit = hitDrawingAt(x, y);
        if (hit) {
          nextHover = hit.drawing.id;
          cursor = hit.drawing.locked
            ? "pointer"
            : hit.hit.part === "handle"
              ? "move"
              : "pointer";
        }
      }
    }
    if (nextHover !== hovered) hovered = nextHover;
    if (root.style.cursor !== cursor) root.style.cursor = cursor;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    const { x, y } = local(event);
    pointer = { x, y };
    keyboardIndex = null;
    kinetic = null;
    scrollAnim = null;
    if (event.pointerType === "touch") {
      touches.set(event.pointerId, { x, y });
      if (touches.size === 2) {
        const [a, b] = [...touches.values()];
        pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), spacing };
        gesture = null;
        return;
      }
    }
    try {
      root.setPointerCapture(event.pointerId);
    } catch {
      // the pointer may already be released
    }
    const sep = separatorAt(y);
    if (sep > 0) {
      const above = panes[sep - 1];
      const below = panes[sep];
      gesture = {
        kind: "separator",
        index: sep,
        y,
        above: above.height,
        below: below.height,
      };
      return;
    }
    if (x > plotW && y < plotH) {
      const pane = paneAt(y);
      if (pane)
        gesture = {
          kind: "axisY",
          pane,
          y,
          min: pane.scale.min,
          max: pane.scale.max,
        };
      return;
    }
    if (y > plotH) {
      gesture = { kind: "axisX", x, spacing };
      return;
    }
    const pane = paneAt(y);
    if (tool !== "cursor" && pane?.id === PRICE && n()) {
      const point = anchorAt(x, y);
      if (draft) {
        draft = { ...draft, points: [draft.points[0], point] };
        finishDraft();
        gesture = null;
        return;
      }
      const type = tool;
      draft = {
        id: `drawing-${Date.now().toString(36)}-${++drawingCounter}`,
        type,
        points: anchorCount(type) === 1 ? [point] : [point, point],
      };
      if (anchorCount(type) === 1) {
        finishDraft();
        return;
      }
      gesture = { kind: "create", x, y, moved: false };
      invalidate();
      return;
    }
    if (tool === "cursor") {
      const line = hitLine(x, y);
      if (line) {
        gesture = { kind: "order", line, startPrice: line.price };
        return;
      }
      const hit = hitDrawingAt(x, y);
      if (hit) {
        select(hit.drawing.id);
        if (!hit.drawing.locked) {
          gesture = {
            kind: "drawing",
            id: hit.drawing.id,
            handle: hit.hit.part === "handle" ? hit.hit.index : -1,
            x,
            y,
            original: hit.drawing,
            moved: false,
          };
        }
        return;
      }
    }
    gesture = {
      kind: "pan",
      x,
      y,
      right,
      pane,
      moved: false,
      lastX: x,
      lastY: y,
      lastT: event.timeStamp,
      velocity: 0,
    };
  };

  const onPointerMove = (event: PointerEvent) => {
    const { x, y } = local(event);
    pointer = { x, y };
    if (event.pointerType === "touch" && touches.has(event.pointerId)) {
      touches.set(event.pointerId, { x, y });
      if (pinch && touches.size === 2) {
        const [a, b] = [...touches.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const count = n();
        const mid =
          count && followsRealtime()
            ? Math.min(plotW, xOf(count - 1))
            : (a.x + b.x) / 2;
        const anchor = indexAt(mid);
        spacing = (pinch.spacing * distance) / Math.max(1, pinch.distance);
        clampView();
        right = anchor + (plotW - mid) / spacing;
        clampView();
        invalidate();
        return;
      }
    }
    const g = gesture;
    if (!g) {
      updateCursor(x, y);
      invalidate();
      return;
    }
    switch (g.kind) {
      case "pan": {
        const dx = x - g.x;
        if (!g.moved && Math.hypot(dx, y - g.y) < 3) break;
        g.moved = true;
        right = g.right - dx / spacing;
        if (g.pane && !g.pane.scale.auto) panScale(g.pane.scale, y - g.lastY);
        g.lastY = y;
        const dt = Math.max(1, event.timeStamp - g.lastT);
        g.velocity = 0.6 * ((x - g.lastX) / dt) + 0.4 * g.velocity;
        g.lastX = x;
        g.lastT = event.timeStamp;
        clampView();
        root.style.cursor = "grabbing";
        break;
      }
      case "axisY": {
        const scale = g.pane.scale;
        scale.min = g.min;
        scale.max = g.max;
        zoomScale(scale, Math.exp((y - g.y) * 0.006));
        break;
      }
      case "axisX": {
        const lastIndex = right;
        spacing = g.spacing * Math.exp((x - g.x) * 0.006);
        clampView();
        right = lastIndex;
        clampView();
        break;
      }
      case "separator": {
        const dy = y - g.y;
        const above = panes[g.index - 1];
        const below = panes[g.index];
        if (!above || !below) break;
        const total = g.above + g.below;
        const nextBelow = clamp(g.below - dy, MIN_PANE, total - MIN_PANE);
        paneHeights.set(below.id, nextBelow);
        if (above.id !== PRICE) paneHeights.set(above.id, total - nextBelow);
        break;
      }
      case "order": {
        const price = valueAt(panes[0].scale, y);
        const step = 10 ** -precision();
        lineOverrides.set(g.line.id, Math.round(price / step) * step);
        break;
      }
      case "drawing": {
        if (!g.moved && Math.hypot(x - g.x, y - g.y) < 3) break;
        g.moved = true;
        const scale = panes[0].scale;
        const di = Math.round(indexAt(x) - indexAt(g.x));
        const ds = scaledAt(scale, y) - scaledAt(scale, g.y);
        const points = g.original.points.map((p, i) => {
          if (g.handle >= 0 && i !== g.handle) return p;
          if (g.handle >= 0) return anchorAt(x, y);
          return {
            time: timeAt(Math.round(indexOfTimeExt(p.time)) + di),
            price: fromScaled(scale, toScaled(scale, p.price) + ds),
          };
        });
        drawings = drawings.map((d) => (d.id === g.id ? { ...d, points } : d));
        break;
      }
      case "create": {
        if (draft) {
          if (Math.hypot(x - g.x, y - g.y) >= 4) g.moved = true;
          draft = { ...draft, points: [draft.points[0], anchorAt(x, y)] };
        }
        break;
      }
    }
    invalidate();
  };

  const onPointerUp = (event: PointerEvent) => {
    touches.delete(event.pointerId);
    if (touches.size < 2) pinch = null;
    const g = gesture;
    gesture = null;
    const { x, y } = local(event);
    if (event.pointerType === "touch") pointer = null;
    if (!g) {
      invalidate();
      return;
    }
    switch (g.kind) {
      case "pan":
        if (!g.moved) {
          if (selected) select(null);
          const pane = paneAt(y);
          if (pane && x <= plotW) {
            emit("click", {
              index: Math.round(indexAt(x)),
              time: timeAt(Math.round(indexAt(x))),
              price: valueAt(pane.scale, y),
              pane: pane.id,
            });
          }
        } else if (
          options.kineticScroll !== false &&
          event.timeStamp - g.lastT < 60 &&
          Math.abs(g.velocity) > 0.25
        ) {
          kinetic = {
            v: g.velocity,
            t:
              typeof performance !== "undefined"
                ? performance.now()
                : Date.now(),
          };
        }
        break;
      case "order": {
        const next = lineOverrides.get(g.line.id);
        if (next !== undefined && next !== g.startPrice) {
          emit("orderMove", {
            id: g.line.id,
            price: next,
            previousPrice: g.startPrice,
            line: g.line,
          });
        } else {
          lineOverrides.delete(g.line.id);
        }
        break;
      }
      case "drawing":
        if (g.moved) commitDrawings(drawings);
        break;
      case "create":
        // a click starts a click-click drawing; a drag finishes it
        if (g.moved) finishDraft();
        break;
      default:
        break;
    }
    updateCursor(x, y);
    invalidate();
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (gesture || event.pointerType === "touch") return;
    pointer = null;
    hovered = null;
    hoveredLine = null;
    invalidate();
  };

  const onWheel = (event: WheelEvent) => {
    const mode = options.wheel ?? "zoom";
    if (mode === "none") return;
    const { x } = local(event);
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? plotW : 1;
    const dx = event.deltaX * unit;
    const dy = event.deltaY * unit;
    const modifier = event.ctrlKey || event.metaKey;
    if (mode === "modifier" && !modifier && Math.abs(dx) <= Math.abs(dy))
      return;
    event.preventDefault();
    keyboardIndex = null;
    if (Math.abs(dx) > Math.abs(dy) || event.shiftKey) {
      right += (Math.abs(dx) > Math.abs(dy) ? dx : dy) / spacing;
      clampView();
      kinetic = null;
      invalidate();
      return;
    }
    const factor = Math.exp(-dy * (event.ctrlKey ? 0.01 : 0.0015));
    zoomAt(Math.min(x, plotW), factor);
  };

  const onDoubleClick = (event: MouseEvent) => {
    const { x, y } = local(event);
    if (x > plotW && y < plotH) {
      const pane = paneAt(y);
      if (pane) pane.scale.auto = true;
    } else if (y > plotH) {
      spacing = options.barSpacing ?? 8;
      instance.scrollToRealtime(true);
    } else {
      for (const scale of scales.values()) scale.auto = true;
    }
    invalidate();
  };

  const announce = (index: number) => {
    if (index < 0 || index >= n()) return;
    const d = display();
    const l = labels();
    live.textContent = fill(l.announcement, {
      time: formatCrosshairTime(
        shiftTime(store.time[index], options.utcOffset),
        tfMs(),
        locale,
      ),
      open: formatPrice(d.open[index]),
      high: formatPrice(d.high[index]),
      low: formatPrice(d.low[index]),
      close: formatPrice(d.close[index]),
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const count = n();
    const page = Math.max(1, Math.floor(plotW / spacing / 2));
    const move = (index: number) => {
      keyboardIndex = clamp(index, 0, Math.max(0, count - 1));
      const x = xOf(keyboardIndex);
      if (x < spacing) right += (spacing - x) / spacing + 1;
      if (x > plotW - spacing) right -= (x - plotW + spacing) / spacing - 1;
      clampView();
      announce(keyboardIndex);
    };
    const current = keyboardIndex ?? Math.min(count - 1, Math.round(right));
    switch (event.key) {
      case "ArrowLeft":
        move(current - (event.shiftKey ? 10 : 1));
        break;
      case "ArrowRight":
        move(current + (event.shiftKey ? 10 : 1));
        break;
      case "PageUp":
        move(current - page);
        break;
      case "PageDown":
        move(current + page);
        break;
      case "Home":
        move(0);
        break;
      case "End":
        move(count - 1);
        instance.scrollToRealtime(true);
        break;
      case "+":
      case "=":
      case "ArrowUp":
        zoomAt(keyboardIndex !== null ? xOf(keyboardIndex) : plotW, 1.2);
        break;
      case "-":
      case "_":
      case "ArrowDown":
        zoomAt(keyboardIndex !== null ? xOf(keyboardIndex) : plotW, 1 / 1.2);
        break;
      case "Escape":
        if (draft) draft = null;
        else if (tool !== "cursor") setTool("cursor", true);
        else if (selected) select(null);
        else keyboardIndex = null;
        break;
      case "Delete":
      case "Backspace": {
        const target = drawings.find((d) => d.id === selected);
        if (!target || target.locked) return;
        select(null);
        commitDrawings(drawings.filter((d) => d.id !== target.id));
        break;
      }
      default:
        return;
    }
    event.preventDefault();
    invalidate();
  };

  const onFocus = () => {
    let keyboard = true;
    try {
      keyboard = root.matches(":focus-visible");
    } catch {
      // older engines: show the ring
    }
    if (keyboard)
      root.style.boxShadow = `inset 0 0 0 2px ${toCss(theme.primary, 0.6)}`;
  };
  const onBlur = () => {
    root.style.boxShadow = "";
    if (keyboardIndex !== null) {
      keyboardIndex = null;
      invalidate();
    }
  };

  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerup", onPointerUp);
  root.addEventListener("pointercancel", onPointerUp);
  root.addEventListener("pointerleave", onPointerLeave);
  root.addEventListener("wheel", onWheel, { passive: false });
  root.addEventListener("dblclick", onDoubleClick);
  root.addEventListener("keydown", onKeyDown);
  root.addEventListener("focus", onFocus);
  root.addEventListener("blur", onBlur);
  jump.addEventListener("pointerdown", (event) => event.stopPropagation());
  jump.addEventListener("click", () => instance.scrollToRealtime(true));

  const resizeObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => invalidate())
      : null;
  resizeObserver?.observe(root);

  const refreshTheme = () => {
    if (destroyed) return;
    const next = readTheme(root);
    if (themeColorsChanged(theme, next)) themeVersion++;
    theme = next;
    legendKey = "";
    invalidate();
  };
  const unwatchTheme = watchTheme(refreshTheme);

  // the page language, when no `locale` is given
  let langObserver: MutationObserver | null = null;
  if (typeof MutationObserver === "function" && root.ownerDocument) {
    langObserver = new MutationObserver(() => {
      if (options.locale) return;
      const before = locale;
      resolveTexts();
      if (locale === before) return;
      legendKey = "";
      optionsVersion++;
      applyStatic();
      invalidate();
    });
    langObserver.observe(root.ownerDocument.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // ------------------------------------------------------------- renderer

  const initRenderer = async (exclude: Set<ChartRendererKind> = new Set()) => {
    const token = ++rendererToken;
    const next = await createRenderer(
      options.renderer ?? "auto",
      () => createDataCanvas(doc),
      (kind) => {
        if (destroyed || renderer?.kind !== kind) return;
        renderer.destroy();
        renderer.canvas.remove();
        renderer = null;
        void initRenderer(new Set([...exclude, kind]));
      },
      exclude,
    );
    if (destroyed || token !== rendererToken) {
      next?.destroy();
      return;
    }
    if (renderer) {
      renderer.destroy();
      renderer.canvas.remove();
    }
    renderer = next;
    geomKey = "";
    if (next) {
      root.dataset.renderer = next.kind;
      root.insertBefore(next.canvas, foreground);
      emit("renderer", next.kind);
    }
    resolveReady(next?.kind ?? null);
    invalidate();
  };

  // ------------------------------------------------------------- options

  const applyStatic = () => {
    const symbol = options.symbol ?? "";
    root.setAttribute(
      "aria-label",
      options.ariaLabel ?? fill(labels().chart, { symbol }).trim(),
    );
    const wantTimer = !!options.countdown && options.lastPriceLine !== false;
    if (wantTimer && !countdownTimer)
      countdownTimer = setInterval(invalidate, 1000);
    if (!wantTimer && countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  };

  const applyOptions = (previous: TradingChartOptions | null) => {
    const next = options;
    resolveTexts();
    if (
      !previous ||
      next.indicators !== previous.indicators ||
      next.utcOffset !== previous.utcOffset
    ) {
      rebuildStudies();
    }
    if (!previous || next.compare !== previous.compare) rebuildCompares();
    if (next.bars && (!previous || next.bars !== previous.bars)) {
      if (previous) applyBarsOption(next.bars);
      else replaceBars(next.bars);
    } else if (!next.bars && previous?.bars) {
      replaceBars([]);
    }
    if (previous && next.barSpacing !== previous.barSpacing && next.barSpacing)
      spacing = next.barSpacing;
    if (previous && next.scaleMode !== previous.scaleMode) {
      const price = scales.get(PRICE);
      if (price) price.auto = true;
    }
    if (
      next.drawings &&
      next.drawings !== emittedDrawings &&
      (!previous || next.drawings !== previous.drawings)
    ) {
      drawings = next.drawings;
      if (selected && !drawings.some((d) => d.id === selected)) select(null);
    }
    if (
      previous &&
      (next.drawingMode ?? "cursor") !== (previous.drawingMode ?? "cursor")
    ) {
      setTool(next.drawingMode ?? "cursor", false);
    }
    if (previous && next.priceLines !== previous.priceLines)
      lineOverrides.clear();
    if (previous && next.chartStyle !== previous.chartStyle)
      haValid = Math.min(haValid, 0);
    optionsVersion++;
    applyStatic();
    invalidate();
  };

  applyOptions(null);
  void initRenderer();

  // ------------------------------------------------------------------ api

  const instance: TradingChartInstance = {
    setOptions(next) {
      if (destroyed) return;
      const previous = options;
      options = { ...next };
      applyOptions(previous);
      if ((next.renderer ?? "auto") !== (previous.renderer ?? "auto"))
        void initRenderer();
    },
    setBars(bars) {
      replaceBars(bars);
    },
    update(bar) {
      const before = n();
      const follow = followsRealtime();
      const at = storeUpdate(store, bar);
      if (at < 0) return;
      if (n() > before && follow) right += n() - before;
      afterDataChange(at);
    },
    appendBars(bars) {
      const before = n();
      const follow = followsRealtime();
      const at = storeAppend(store, bars);
      if (at < 0) return;
      if (follow) right += n() - before;
      afterDataChange(at);
    },
    prependBars(bars) {
      const added = storePrepend(store, bars);
      if (!added) return;
      pyramid = createPyramid();
      haPyramid = createPyramid();
      haValid = 0;
      right += added;
      if (keyboardIndex !== null) keyboardIndex += added;
      afterDataChange(0);
    },
    getBarCount: () => n(),
    getBar: (index) =>
      index >= 0 && index < n() ? readBar(store, Math.floor(index)) : null,
    scrollToRealtime(animateScroll = true) {
      const target = n() - 1 + (options.rightOffset ?? 8);
      kinetic = null;
      if (
        animateScroll &&
        finite(right) &&
        Math.abs(target - right) * spacing < plotW * 6
      ) {
        scrollAnim = {
          from: right,
          to: target,
          start:
            typeof performance !== "undefined" ? performance.now() : Date.now(),
        };
      } else {
        right = target;
      }
      invalidate();
    },
    fitContent() {
      const count = n();
      if (!count) return;
      instance.setVisibleRange({
        from: -0.5,
        to: count - 1 + (options.rightOffset ?? 8),
      });
    },
    getVisibleRange: () => visibleRange(),
    setVisibleRange({ from, to }) {
      if (!(to > from)) return;
      kinetic = null;
      scrollAnim = null;
      pendingRange = { from, to };
      applyRange(pendingRange);
      invalidate();
    },
    setScaleMode(mode) {
      options = { ...options, scaleMode: mode };
      const price = scales.get(PRICE);
      if (price) price.auto = true;
      invalidate();
    },
    resetPriceScales() {
      for (const scale of scales.values()) scale.auto = true;
      invalidate();
    },
    setDrawingTool: (next) => setTool(next, true),
    getDrawingTool: () => tool,
    getDrawings: () => drawings,
    setDrawings(next) {
      drawings = next;
      if (selected && !drawings.some((d) => d.id === selected)) select(null);
      invalidate();
    },
    removeDrawing(id) {
      if (!drawings.some((d) => d.id === id)) return;
      if (selected === id) select(null);
      commitDrawings(drawings.filter((d) => d.id !== id));
    },
    selectDrawing: (id) => select(id),
    setIndicatorVisible(id, visible) {
      visibility.set(id, visible);
      invalidate();
    },
    getRenderer: () => renderer?.kind ?? null,
    ready,
    refreshTheme,
    resize: () => invalidate(),
    on(type, listener) {
      let set = listeners.get(type);
      if (!set) listeners.set(type, (set = new Set()));
      set.add(listener as (event: never) => void);
      return () => set.delete(listener as (event: never) => void);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (frameId) {
        if (win?.cancelAnimationFrame) win.cancelAnimationFrame(frameId);
        else clearTimeout(frameId);
      }
      if (countdownTimer) clearInterval(countdownTimer);
      resizeObserver?.disconnect();
      unwatchTheme();
      langObserver?.disconnect();
      root.removeEventListener("wheel", onWheel);
      renderer?.destroy();
      renderer = null;
      resolveReady(null);
      listeners.clear();
      root.remove();
    },
  };
  return instance;
};
