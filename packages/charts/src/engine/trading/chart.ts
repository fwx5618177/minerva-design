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
import { followDefaultRenderer } from "../renderers/follow";
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
  drawingPrices,
  handlePoints,
  hitDrawing,
  isFillable,
  isPosition,
  moveHandle,
  paintDrawing,
  setDash,
  type Box,
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
  isTimeZone,
  pickTicks,
  priceFormatter,
  redUpLocale,
  tickText,
  zoneOffset,
  type UtcOffset,
} from "./format";
import {
  AreaBuffer,
  BarBuffer,
  LineBuffer,
  TrendBuffer,
  candleMetrics,
  clampRange,
  pixelRange,
} from "./geometry";
import { heikinAshiInto, parseTimeframe, volumeProfile } from "./indicators";
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
  createRangePyramid,
  createStore,
  indexOfTime,
  inputLength,
  invalidateRangePyramid,
  barAt,
  prependBars as storePrepend,
  pyramidLevel,
  rangeLevel,
  readBar,
  setBars as storeSet,
  updateBar as storeUpdate,
  lowerBoundTime,
  type BarStore,
  type OhlcColumns,
  type RangePyramid,
} from "./store";
import {
  LINE_COLORS,
  buildStudies,
  type Study,
  type StudyOutput,
} from "./studies";
import type {
  TradingBarsInput,
  TradingChartEventMap,
  TradingChartInstance,
  TradingChartOptions,
  TradingCrosshairEvent,
  TradingDrawing,
  TradingDrawingPatch,
  TradingDrawingPoint,
  TradingDrawingTool,
  TradingLineStyle,
  TradingPriceLine,
  TradingReplayState,
  TradingScaleMode,
  TradingUndoState,
  TradingVisibleRange,
  TradingVolumeProfile,
  TradingVolumeProfileOptions,
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
const HISTORY_LIMIT = 100;

/** Colors of the drawing toolbar */
const PALETTE = [
  "#2962ff",
  "#089981",
  "#f23645",
  "#f59e0b",
  "#a855f7",
  "#0ea5e9",
  "#ec4899",
  "#787b86",
];
const LINE_STYLES: readonly TradingLineStyle[] = ["solid", "dashed", "dotted"];

/**
 * Hooks used by `syncCharts` to follow another chart without echoing its
 * events back (internal: not part of the public instance)
 */
export const syncHooks = new WeakMap<
  TradingChartInstance,
  { setTimeRange(range: { from: number; to: number }): void }
>();

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
      pane: Pane;
      handle: number;
      x: number;
      y: number;
      original: TradingDrawing;
      moved: boolean;
    }
  | { kind: "create"; pane: Pane; x: number; y: number; moved: boolean }
  | { kind: "button"; action: () => void };

/** Mounts a trading chart in `container` (which should have a height) */
/** Keys of the keyboard order entry (`aria-keyshortcuts`) */
const ORDER_KEYS =
  "B S O Shift+O ArrowUp ArrowDown Shift+ArrowUp Shift+ArrowDown Enter Escape Delete";

/** Legend items cut with an ellipsis when wider than the legend */
const ELLIPSIS: Partial<CSSStyleDeclaration> = {
  minWidth: "0",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
/** A name and its value in the OHLC legend, never split by the wrapping */
const PAIR =
  "display:inline-flex;gap:3px;max-width:100%;overflow:hidden;text-overflow:ellipsis";

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
  // floating toolbar of the selected drawing, and the editor of text drawings
  const toolbar = make("div", {
    position: "absolute",
    display: "none",
    alignItems: "center",
    gap: "1px",
    padding: "3px",
    borderRadius: "8px",
    border:
      "1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 85%, transparent)",
    background: "var(--surface-elevated-color, var(--surface-color, #fff))",
    boxShadow: "0 8px 24px -8px rgba(15, 23, 42, 0.35)",
    zIndex: "2",
    cursor: "default",
  });
  toolbar.className = "minerva-trading-toolbar";
  toolbar.setAttribute("role", "toolbar");
  const editor = make("textarea", {
    position: "absolute",
    display: "none",
    minWidth: "120px",
    minHeight: "28px",
    padding: "5px 9px",
    resize: "none",
    border: "1px solid var(--primary-color, #2962ff)",
    borderRadius: "5px",
    outline: "none",
    background: "var(--surface-elevated-color, var(--surface-color, #fff))",
    color: "var(--text-color, #1f2937)",
    font: "500 13px var(--font-family-sans, system-ui, sans-serif)",
    boxShadow: "0 6px 18px -6px rgba(15, 23, 42, 0.3)",
    zIndex: "3",
  });
  editor.rows = 1;
  const sheet = make("style", {});
  sheet.textContent = `.minerva-trading-toolbar button{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;padding:0 5px;border-radius:5px;cursor:pointer;color:var(--text-color,#1f2937)}.minerva-trading-toolbar button:hover{background:color-mix(in srgb,var(--text-color,#1f2937) 9%,transparent)}.minerva-trading-toolbar button:focus-visible{box-shadow:inset 0 0 0 2px var(--primary-color,#2962ff)}.minerva-trading-toolbar button[aria-pressed="true"]{background:color-mix(in srgb,var(--primary-color,#2962ff) 16%,transparent);color:var(--primary-color,#2962ff)}.minerva-trading-toolbar .sep{width:1px;height:18px;margin:0 3px;background:var(--border-color,#e5e7eb)}`;
  root.append(
    sheet,
    background,
    foreground,
    legends,
    jump,
    toolbar,
    editor,
    live,
  );
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
    width: number;
    times: Float64Array;
    data: Float64Array;
    values: Float64Array;
    valid: number;
    lod: RangePyramid;
  }
  let compares: CompareRuntime[] = [];
  /** Min / max pyramids of the indicator outputs (zoomed-out decimation) */
  const outputLods = new WeakMap<StudyOutput, RangePyramid>();
  /** Min / max pyramids of the trend lines (SuperTrend) */
  const trendLods = new WeakMap<Study, RangePyramid>();
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
  /**
   * Keyboard order entry: an order armed with B / S, or a price line picked
   * with O (its preview price lives in `lineOverrides`, like a drag)
   */
  let keyOrder:
    | { kind: "create"; side: "buy" | "sell"; price: number }
    | { kind: "move"; id: string; start: number; override?: number }
    | null = null;
  let gesture: Gesture | null = null;
  const touches = new Map<number, { x: number; y: number }>();
  let pinch: { distance: number; spacing: number } | null = null;
  let kinetic: { v: number; t: number } | null = null;
  let scrollAnim: { from: number; to: number; start: number } | null = null;
  /** Range asked by `setVisibleRange` / `fitContent`, applied once the plot width is known */
  let pendingRange: { from: number; to: number } | null = null;

  let drawings: readonly TradingDrawing[] = options.drawings ?? [];
  let emittedDrawings: readonly TradingDrawing[] | null = null;
  /** Drawings of the last commit: the base of the undo history */
  let committed: readonly TradingDrawing[] = drawings;
  const undoStack: (readonly TradingDrawing[])[] = [];
  const redoStack: (readonly TradingDrawing[])[] = [];
  let undoKey = "false|false";
  let tool: TradingDrawingTool = options.drawingMode ?? "cursor";
  let selected: string | null = null;
  let hovered: string | null = null;
  let draft: TradingDrawing | null = null;
  /** Clicks still needed by the drawing being made (three-anchor tools) */
  let draftClicks = 0;
  let draftPane: string = PRICE;
  let drawingCounter = 0;
  /** Text boxes measured when painted (hit tests of text drawings) */
  const textBoxes = new Map<string, Box>();
  /** Drawing whose text is being edited */
  let editing: { id: string; created: boolean } | null = null;
  let toolbarKey = "";
  let paletteOpen = false;
  const lineOverrides = new Map<string, number>();
  let hoveredLine: string | null = null;
  /** Clickable areas painted on the canvas (close buttons, order entry) */
  let canvasButtons: {
    x: number;
    y: number;
    w: number;
    h: number;
    action: () => void;
  }[] = [];
  let hoveredButton = -1;
  let lastRange: TradingVisibleRange | null = null;
  /** The next view change comes from a synchronized chart: not reported */
  let silentRange = false;
  /** Crosshair set by `setCrosshair` (synchronized charts) */
  let externalCross: { time: number; price: number } | null = null;
  let lastCrosshair = "";
  let historyFirst = NaN;
  let countdownTimer: ReturnType<typeof setInterval> | null = null;
  /** Bar replay: the full history, and the bars shown so far */
  let replay: {
    source: BarStore;
    playing: boolean;
    speed: number;
    timer: ReturnType<typeof setInterval> | null;
  } | null = null;
  let replayPicking = false;
  let replaySpeed = 4;
  let profile: { key: string; result: TradingVolumeProfile } | null = null;

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
  const redUp = () =>
    options.colorConvention === "redUp" ||
    (options.colorConvention === "auto" && redUpLocale(locale));
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

  /** Time of a fractional index, interpolated between the bars */
  const timeAtFrac = (index: number) => {
    const count = n();
    if (!count) return 0;
    const i = Math.floor(index);
    if (i < 0 || i >= count - 1) {
      const edge = i < 0 ? 0 : count - 1;
      return store.time[edge] + (index - edge) * tfMs();
    }
    const t = index - i;
    return store.time[i] + t * (store.time[i + 1] - store.time[i]);
  };

  /** Fractional index of a time (the inverse of `timeAtFrac`) */
  const indexAtTimeFrac = (time: number) => {
    const count = n();
    if (!count) return 0;
    if (time >= store.time[count - 1])
      return count - 1 + (time - store.time[count - 1]) / tfMs();
    if (time <= store.time[0]) return (time - store.time[0]) / tfMs();
    const i = indexOfTime(store.time, count, time);
    const span = store.time[i + 1] - store.time[i];
    return i + (span > 0 ? (time - store.time[i]) / span : 0);
  };

  // displayed time: a fixed offset, a time zone or the local time
  let zone: string | undefined;
  const offsetMinutes = (time: number) =>
    options.utcOffset ??
    (zone
      ? zoneOffset(time, zone)
      : -new Date(finite(time) ? time : 0).getTimezoneOffset());
  const studyOffset: UtcOffset = (time) => offsetMinutes(time);
  /** Time shifted so that the UTC getters read the displayed time */
  const shift = (time: number) => time + offsetMinutes(time) * MINUTE;

  /** CSS color of a study color: `up` / `down` stand for the bar colors */
  const colorOf = (color: string) =>
    color === "up" ? upCss() : color === "down" ? downCss() : color;

  /** Min / max / last of each visible group of a column of values */
  const groupRanges = (
    v: Visible,
    values: Float64Array,
    lod: RangePyramid,
  ): {
    min: ArrayLike<number>;
    max: ArrayLike<number>;
    last: ArrayLike<number>;
  } => {
    if (!v.level) return { min: values, max: values, last: values };
    const level = rangeLevel(lod, values, n(), v.level);
    return level;
  };
  const trendLodOf = (study: Study) => {
    let lod = trendLods.get(study);
    if (!lod) trendLods.set(study, (lod = createRangePyramid()));
    return lod;
  };
  const lodOf = (out: StudyOutput) => {
    let lod = outputLods.get(out);
    if (!lod) outputLods.set(out, (lod = createRangePyramid()));
    return lod;
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
    for (const study of studies) {
      studyValid.set(study, Math.min(studyValid.get(study) ?? 0, from));
      for (const out of study.outputs) {
        const lod = outputLods.get(out);
        if (lod) invalidateRangePyramid(lod, from);
      }
      const trendLod = trendLods.get(study);
      if (trendLod) invalidateRangePyramid(trendLod, from);
    }
    haValid = Math.min(haValid, from);
    for (const c of compares) {
      c.valid = Math.min(c.valid, from);
      invalidateRangePyramid(c.lod, from);
    }
    profile = null;
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
      studyOffset,
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
        width: series.lineWidth ?? 1.5,
        times: Float64Array.from(data, (d) => d.time),
        data: Float64Array.from(data, (d) => d.value),
        values: new Float64Array(0),
        valid: 0,
        lod: createRangePyramid(),
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

  /** Extends `[lo, hi]` with the visible groups of an output (shift included) */
  const outputExtent = (
    v: Visible,
    values: Float64Array,
    lod: RangePyramid,
    shiftBars: number,
    range: [number, number],
  ) => {
    const r = groupRanges(v, values, lod);
    const offset = Math.round(shiftBars / v.size);
    const a = clamp(v.s0 - offset, 0, v.last);
    const b = clamp(v.s1 - offset, 0, v.last);
    for (let g = a; g <= b; g++) {
      if (r.min[g] < range[0]) range[0] = r.min[g];
      if (r.max[g] > range[1]) range[1] = r.max[g];
    }
  };

  /**
   * Extends `[lo, hi]` with the visible drawings of a pane
   * (`autoscaleIncludesDrawings`); a drawing being dragged counts where it
   * started, so the scale does not move under the pointer
   */
  const drawingsExtent = (paneId: string, range: [number, number]) => {
    if (!options.autoscaleIncludesDrawings || !drawings.length) return;
    const from = right - plotW / spacing;
    const dragged = gesture?.kind === "drawing" ? gesture : null;
    for (const drawing of drawings) {
      if ((drawing.pane ?? PRICE) !== paneId) continue;
      const d =
        dragged && dragged.id === drawing.id ? dragged.original : drawing;
      for (const price of drawingPrices(d, indexOfTimeExt, from, right)) {
        if (price < range[0]) range[0] = price;
        if (price > range[1]) range[1] = price;
      }
    }
  };

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
        const range: [number, number] = [Infinity, -Infinity];
        for (let g = v.s0; g <= v.s1; g++) {
          const l = closeOnly ? cols.close[g] : cols.low[g];
          const h = closeOnly ? cols.close[g] : cols.high[g];
          if (l < range[0]) range[0] = l;
          if (h > range[1]) range[1] = h;
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
          for (const out of study.outputs)
            outputExtent(v, out.values, lodOf(out), out.shift, range);
        }
        drawingsExtent(PRICE, range);
        let [lo, hi] = range;
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
          const extent: [number, number] = [Infinity, -Infinity];
          outputExtent(v, c.values, c.lod, 0, extent);
          for (const value of extent) {
            const scaled = compareScaled(scale, value, base);
            if (scaled < a) a = scaled;
            if (scaled > b) b = scaled;
          }
        }
        if (scale.mode === "percent" && compares.length) {
          // the 0% line of a comparison stays in view
          a = Math.min(a, 0);
          b = Math.max(b, 0);
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
      const range: [number, number] = [Infinity, -Infinity];
      if (study.type === "volume") range[0] = 0;
      for (const out of study.outputs) {
        if (out.kind === "volume") {
          for (let g = v.s0; g <= v.s1; g++) {
            const value = v.cols.volume[g] / groupBars(v, g);
            if (value > range[1]) range[1] = value;
          }
          continue;
        }
        outputExtent(v, out.values, lodOf(out), out.shift, range);
      }
      drawingsExtent(pane.id, range);
      let [lo, hi] = range;
      if (study.bands && finite(lo) && finite(hi)) {
        // reference bands (CCI ±100, DMI 25) stay in view
        for (const band of study.bands) {
          lo = Math.min(lo, band);
          hi = Math.max(hi, band);
        }
      }
      if (study.zero && finite(lo) && finite(hi)) {
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
    // groups up to the right edge, past the last bar too
    const gEnd = Math.floor(Math.max(0, Math.ceil(right)) / v.size);
    const groupTime = (g: number) => {
      if (g <= v.last) return v.cols.time[g];
      return store.time[count - 1] + (g * v.size - (count - 1)) * tf;
    };
    const candidates: { x: number; weight: number; time: number }[] = [];
    let prev = v.g0 > 0 ? shift(groupTime(v.g0 - 1)) : NaN;
    for (let g = v.g0; g <= gEnd; g++) {
      const time = shift(groupTime(g));
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

      /**
       * Line of a column of values: one point per bar, or the low and high
       * of each group once zoomed out (min / max decimation), drawn
       * `shiftBars` later
       */
      const rangeLayer =
        (
          values: Float64Array,
          lod: RangePyramid,
          color: Rgba,
          lineWidth: number,
          shiftBars = 0,
          toY: (value: number) => number = Y,
        ): Layer =>
        (ga, gb, isLive) => {
          const r = groupRanges(v, values, lod);
          const dx = shiftBars * spacing * dpr;
          const extra = Math.ceil(Math.abs(shiftBars) / v.size) + 1;
          let from = isLive ? Math.max(0, ga - 1) : ga;
          let to = gb;
          if (!isLive && shiftBars > 0) from = Math.max(0, from - extra);
          if (!isLive && shiftBars < 0) to = Math.min(v.last - 1, to + extra);
          const buffer = new LineBuffer(top, bottom);
          let prevY = NaN;
          for (let g = from; g <= to; g++) {
            const x = X(g) + dx;
            const lo = r.min[g];
            const hi = r.max[g];
            if (!v.level || lo === hi || !finite(lo) || !finite(hi)) {
              prevY = toY(r.last[g]);
              buffer.push(x, prevY);
              continue;
            }
            const yLo = toY(lo);
            const yHi = toY(hi);
            // start with the extreme closest to the previous point
            const first =
              finite(prevY) && Math.abs(prevY - yHi) < Math.abs(prevY - yLo)
                ? yHi
                : yLo;
            const second = first === yHi ? yLo : yHi;
            buffer.push(x, first);
            buffer.push(x, second);
            prevY = second;
          }
          return buffer.count > 1 ? [buffer.item("", 0, color, lineWidth)] : [];
        };

      /**
       * Line colored by its direction once zoomed out: the min / max of each
       * group in the color of its last bar, each run starting at the last
       * point of the previous one so the line stays joined at the flips
       */
      const trendLayer =
        (
          trend: NonNullable<Study["trend"]>,
          lod: RangePyramid,
          upColor: Rgba,
          downColor: Rgba,
          lineWidth: number,
        ): Layer =>
        (ga, gb, isLive) => {
          const r = groupRanges(v, trend.value, lod);
          const count = n();
          const line = new TrendBuffer(top, bottom);
          let prevY = NaN;
          for (let g = isLive ? Math.max(0, ga - 1) : ga; g <= gb; g++) {
            const lo = r.min[g];
            const hi = r.max[g];
            if (!finite(lo) || !finite(hi)) {
              line.break();
              prevY = NaN;
              continue;
            }
            const up =
              trend.direction[Math.min(count - 1, g * v.size + v.size - 1)] !==
              -1;
            const x = X(g);
            const yLo = Y(lo);
            const yHi = Y(hi);
            // start with the extreme closest to the previous point
            const first =
              finite(prevY) && Math.abs(prevY - yHi) < Math.abs(prevY - yLo)
                ? yHi
                : yLo;
            const second = first === yHi ? yLo : yHi;
            line.push(x, first, up);
            if (second !== first) line.push(x, second, up);
            prevY = second;
          }
          // a halo of the background under the line: zoomed out, it runs
          // through the bars, drawn in the same colors
          const halo: Rgba = [bg[0], bg[1], bg[2], 0.9];
          const items: RenderItem[] = [];
          for (const [buffer, key] of [
            [line.up, "u"],
            [line.down, "d"],
          ] as const) {
            if (buffer.count > 1)
              items.push(buffer.item(`${key}h`, 0, halo, lineWidth + 2.5));
          }
          if (line.up.count > 1)
            items.push(line.up.item("u", 0, upColor, lineWidth));
          if (line.down.count > 1)
            items.push(line.down.item("d", 0, downColor, lineWidth));
          return items;
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
            rangeLayer(
              c.values,
              c.lod,
              color,
              c.width,
              0,
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
        const trend = study.trend;
        const [upOut, downOut] = study.outputs;
        if (trend && v.level && upOut && downOut) {
          result.push(
            trendLayer(
              trend,
              trendLodOf(study),
              resolve(colorOf(upOut.color)),
              resolve(colorOf(downOut.color)),
              upOut.width,
            ),
          );
          continue;
        }
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
            const lod = lodOf(out);
            result.push((ga, gb) => {
              const r = groupRanges(v, out.values, lod);
              const buffer = new BarBuffer();
              for (let g = ga; g <= gb; g++) {
                const value = r.last[g];
                if (!finite(value)) continue;
                const prev = g > 0 ? r.last[g - 1] : value;
                const color =
                  value >= 0
                    ? value >= prev
                      ? strong.up
                      : faded.up
                    : value <= prev
                      ? strong.down
                      : faded.down;
                // a group spans its lowest and highest values (and zero)
                const lo = Math.min(0, finite(r.min[g]) ? r.min[g] : value);
                const hi = Math.max(0, finite(r.max[g]) ? r.max[g] : value);
                const range = clampRange(
                  ...(v.level
                    ? pixelRange(Y(hi), Y(lo))
                    : pixelRange(Y(value), y0)),
                  top,
                  bottom,
                );
                if (range)
                  buffer.push(metrics.snap(X(g)), range[0], range[1], color);
              }
              return [buffer.item("", 0, histogramHalf)];
            });
          } else if (out.kind === "dots") {
            const fixed = out.color
              ? packColor(resolve(colorOf(out.color)))
              : 0;
            const radius = clamp(spacing * v.size * 0.22, 1.25, 2.6);
            const half = radius * dpr;
            result.push((ga, gb) => {
              const buffer = new BarBuffer();
              for (let g = ga; g <= gb; g++) {
                const value = v.level
                  ? out.values[Math.min(n() - 1, g * v.size + v.size - 1)]
                  : out.values[g];
                if (!finite(value)) continue;
                const y = Y(value);
                if (y < top || y > bottom) continue;
                const color = fixed || (value <= cols.close[g] ? upP : downP);
                buffer.push(X(g), y - half, y + half, color);
              }
              return buffer.count ? [buffer.item("", 0, half, 0, radius)] : [];
            });
          } else {
            const color = resolve(colorOf(out.color));
            result.push(
              rangeLayer(
                out.values,
                lodOf(out),
                [color[0], color[1], color[2], color[3] * out.alpha],
                out.width,
                out.shift,
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

  /** Area between two outputs of a study, colored by which one is above */
  const paintFill = (
    ctx: CanvasRenderingContext2D,
    v: Visible,
    pane: Pane,
    study: Study,
    f: Study["fills"][number],
  ) => {
    const outA = study.outputs[f.a];
    const outB = study.outputs[f.b];
    if (!outA || !outB) return;
    const ra = groupRanges(v, outA.values, lodOf(outA));
    const rb = groupRanges(v, outB.values, lodOf(outB));
    const shiftBars = outA.shift;
    const extra = Math.ceil(Math.abs(shiftBars) / v.size) + 1;
    const from = Math.max(0, v.g0 - (shiftBars > 0 ? extra : 0));
    const to = Math.min(v.last, v.g1 + (shiftBars < 0 ? extra : 0));
    const above = css(colorOf(f.color), f.opacity);
    const below = css(colorOf(f.colorBelow ?? f.color), f.opacity);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, pane.top, plotW, pane.height);
    ctx.clip();
    let run: { x: number; ya: number; yb: number }[] = [];
    let sign = 0;
    const flush = () => {
      if (run.length > 1) {
        ctx.fillStyle = sign >= 0 ? above : below;
        ctx.beginPath();
        run.forEach((p, i) =>
          i ? ctx.lineTo(p.x, p.ya) : ctx.moveTo(p.x, p.ya),
        );
        for (let k = run.length - 1; k >= 0; k--) {
          const p = run[k];
          if (p) ctx.lineTo(p.x, p.yb);
        }
        ctx.closePath();
        ctx.fill();
      }
      run = [];
    };
    for (let g = from; g <= to; g++) {
      const a = ra.last[g];
      const b = rb.last[g];
      if (!finite(a) || !finite(b)) {
        flush();
        sign = 0;
        continue;
      }
      const x = xOf(groupCenter(v, g) + shiftBars);
      const ya = yOf(pane.scale, a);
      const yb = yOf(pane.scale, b);
      const s = a >= b ? 1 : -1;
      const prev = run[run.length - 1];
      if (prev && s !== sign) {
        // the lines cross: close the run at the crossing
        const d0 = prev.ya - prev.yb;
        const t = d0 / (d0 - (ya - yb));
        const cx = prev.x + (x - prev.x) * t;
        const cy = prev.ya + (ya - prev.ya) * t;
        run.push({ x: cx, ya: cy, yb: cy });
        flush();
        run.push({ x: cx, ya: cy, yb: cy });
      }
      sign = s;
      run.push({ x, ya, yb });
    }
    flush();
    ctx.restore();
  };

  /** Dashed lines where a day starts (in the displayed time zone) */
  const paintSessionBreaks = (ctx: CanvasRenderingContext2D, v: Visible) => {
    if (!options.sessionBreaks || tfMs() >= DAY) return;
    const xs: number[] = [];
    let prevDay = NaN;
    for (let g = Math.max(0, v.g0 - 1); g <= Math.min(v.g1, v.last); g++) {
      const day = Math.floor(shift(v.cols.time[g]) / DAY);
      if (finite(prevDay) && day !== prevDay) {
        const x = Math.round(xOf(g * v.size - 0.5)) + 0.5;
        if (x > 0 && x < plotW) xs.push(x);
        // too dense to read: none at all
        if (xs.length > plotW / 6) return;
      }
      prevDay = day;
    }
    if (!xs.length) return;
    ctx.save();
    ctx.strokeStyle = toCss(theme.textMuted, 0.4);
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (const x of xs) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, plotH);
    }
    ctx.stroke();
    ctx.restore();
  };

  const profileOptions = (): TradingVolumeProfileOptions | null => {
    const option = options.volumeProfile;
    if (!option) return null;
    return option === true ? {} : option;
  };

  /** Volume by price of the visible bars, from the right (or left) edge */
  const paintVolumeProfile = (ctx: CanvasRenderingContext2D, v: Visible) => {
    const o = profileOptions();
    const price = panes[0];
    if (!o || !price || !store.hasVolume) return;
    const rows = clamp(Math.floor(o.rows ?? 24), 2, 400);
    const key = [
      v.level,
      v.s0,
      v.s1,
      rows,
      o.valueArea ?? 0.7,
      dataVersion,
      tailVersion,
    ].join("|");
    if (!profile || profile.key !== key) {
      // real prices, also under Heikin-Ashi bars
      const cols = v.level ? pyramidLevel(pyramid, store, n(), v.level) : store;
      profile = {
        key,
        result: volumeProfile(cols, {
          from: v.s0,
          to: v.s1,
          rows,
          valueArea: o.valueArea,
        }),
      };
    }
    const r = profile.result;
    if (r.poc < 0) return;
    let largest = 0;
    for (let i = 0; i < rows; i++)
      largest = Math.max(largest, (r.up[i] ?? 0) + (r.down[i] ?? 0));
    if (!(largest > 0)) return;
    const span = plotW * clamp(o.width ?? 0.28, 0.05, 0.9);
    const fromRight = (o.side ?? "right") === "right";
    const upColor = resolve(colorOf(o.upColor ?? "up"));
    const downColor = resolve(colorOf(o.downColor ?? "down"));
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, price.top, plotW, price.height);
    ctx.clip();
    for (let i = 0; i < rows; i++) {
      const up = r.up[i] ?? 0;
      const down = r.down[i] ?? 0;
      if (!(up + down > 0)) continue;
      const y0 = yOf(price.scale, r.low + i * r.step);
      const y1 = yOf(price.scale, r.low + (i + 1) * r.step);
      const top = Math.min(y0, y1);
      const h = Math.max(
        1,
        Math.abs(y1 - y0) - (Math.abs(y1 - y0) > 4 ? 1 : 0),
      );
      const inside = i >= r.valueAreaFrom && i <= r.valueAreaTo;
      const alpha = inside ? 0.42 : 0.17;
      const upLength = (up / largest) * span;
      const downLength = (down / largest) * span;
      const edge = fromRight ? plotW : 0;
      const dir = fromRight ? -1 : 1;
      ctx.fillStyle = toCss(upColor, alpha);
      ctx.fillRect(Math.min(edge, edge + dir * upLength), top, upLength, h);
      ctx.fillStyle = toCss(downColor, alpha);
      const start = edge + dir * upLength;
      ctx.fillRect(
        Math.min(start, start + dir * downLength),
        top,
        downLength,
        h,
      );
    }
    // point of control
    const y =
      Math.round(yOf(price.scale, r.low + (r.poc + 0.5) * r.step)) + 0.5;
    ctx.strokeStyle = css(o.pocColor ?? WARNING, 0.9);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(plotW, y);
    ctx.stroke();
    ctx.restore();
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
    // bands of the indicator panes
    for (const pane of panes) {
      const study = pane.study;
      if (study?.bands && isVisible(study)) {
        const color = resolve(colorOf(study.outputs[0]?.color ?? PRIMARY));
        const ys = study.bands.map((b) => Math.round(yOf(pane.scale, b)) + 0.5);
        if (study.bandFill && ys.length === 2) {
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
      paintSessionBreaks(ctx, v);
      for (const study of studies) {
        if (!study.fills.length || !isVisible(study)) continue;
        const pane = study.overlay
          ? panes[0]
          : panes.find((p) => p.study === study);
        if (pane)
          for (const f of study.fills) paintFill(ctx, v, pane, study, f);
      }
      const price = panes[0];
      if (price && price.scale.mode === "percent" && compares.length) {
        // the common origin of the compared series
        const y = Math.round(yOfScaled(price.scale, 0)) + 0.5;
        if (y > price.top && y < price.top + price.height) {
          ctx.save();
          ctx.strokeStyle = toCss(theme.textMuted, 0.6);
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(plotW, y);
          ctx.stroke();
          ctx.restore();
        }
      }
      paintVolumeProfile(ctx, v);
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
    if (!pointer && externalCross) {
      const index = Math.round(indexOfTimeExt(externalCross.time));
      const price = externalCross.price;
      return {
        index,
        pane: panes[0],
        y: finite(price) ? yOf(panes[0].scale, price) : NaN,
        price,
      };
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

  const paneOf = (id: string | undefined) =>
    panes.find((p) => p.id === (id ?? PRICE)) ?? null;

  const drawingMapper = (pane: Pane | null): DrawingMapper | null => {
    if (!pane) return null;
    return {
      x: xOf,
      y: (p) => yOf(pane.scale, p),
      index: indexOfTimeExt,
      left: 0,
      right: plotW,
      top: pane.top,
      bottom: pane.top + pane.height,
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

  /** A value of a pane as written by its axis (prices on the price pane) */
  const paneValueText = (pane: Pane, value: number) =>
    pane.id === PRICE ? formatPrice(value) : paneTickText(pane, value);

  /** Price rounded to the precision of the prices */
  const roundPrice = (price: number) => {
    const step = 10 ** -precision();
    return Number((Math.round(price / step) * step).toFixed(precision()));
  };

  /** A rounded label (pill) with text */
  const pill = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    fillColor: string,
    align: "left" | "center" | "right" = "center",
  ) => {
    ctx.font = font(theme.fontSize, 500);
    const w = ctx.measureText(text).width + 16;
    const left = clamp(
      align === "center" ? x - w / 2 : align === "right" ? x - w : x,
      2,
      Math.max(2, plotW - w - 2),
    );
    roundRect(ctx, left, y, w, 22, 11);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.fillStyle = textOn(fillColor);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, left + w / 2, y + 11.5);
    return w;
  };

  /** Registers a clickable area of the canvas; returns whether it is hovered */
  const canvasButton = (
    x: number,
    y: number,
    w: number,
    h: number,
    action: () => void,
  ) => {
    canvasButtons.push({ x, y, w, h, action });
    return hoveredButton === canvasButtons.length - 1;
  };

  const paintDrawings = (
    ctx: CanvasRenderingContext2D,
    colors: { text: string; background: string; up: string; down: string },
  ) => {
    const count = n();
    const last = count ? store.close[count - 1] : NaN;
    const all = draft ? [...drawings, draft] : drawings;
    if (!all.length) return;
    const l = labels();
    const position = {
      target: l.target,
      stop: l.stop,
      riskReward: l.riskReward,
      profit: l.profit,
      long: l.long,
      short: l.short,
    };
    for (const pane of panes) {
      const mapper = drawingMapper(pane);
      if (!mapper) continue;
      const own = all.filter((d) => (d.pane ?? PRICE) === pane.id);
      if (!own.length) continue;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, pane.top, plotW, pane.height);
      ctx.clip();
      for (const drawing of own) {
        const box = paintDrawing(
          ctx,
          drawing,
          mapper,
          {
            ...colors,
            color: css(drawing.color ?? PRIMARY),
            font: font(theme.fontSize, 500),
            fontFamily: theme.fontFamily,
            formatPrice: (value) => paneValueText(pane, value),
            formatPercent: (value) => formatPercent(value, locale),
            formatSpan,
            textOn,
            defaultText: l.text,
            position,
            last: pane.id === PRICE ? last : NaN,
            fill,
          },
          {
            selected: drawing === draft || drawing.id === selected,
            hovered: drawing.id === hovered,
          },
        );
        if (box) textBoxes.set(drawing.id, box);
      }
      ctx.restore();
    }
  };

  const paintForeground = (
    ctx: CanvasRenderingContext2D,
    v: Visible | null,
    ticks: TimeLabel[],
  ) => {
    const price = panes[0];
    if (!price) return;
    canvasButtons = [];
    const count = n();
    const text = toCss(theme.text);
    const muted = toCss(theme.textMuted);
    const bgCss = toCss(theme.background);
    const upC = css(upCss());
    const downC = css(downCss());
    const l = labels();

    // ---- price pane contents (clipped)
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, price.top, plotW, price.height);
    ctx.clip();

    // high / low of the visible bars, kept inside the plot
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
        const label = formatPrice(value);
        const w = ctx.measureText(label).width;
        let y = clamp(
          yOf(price.scale, value) + (below ? 9 : -9),
          price.top + 8,
          price.top + price.height - 8,
        );
        // not under a row of the legend
        const labelLeft = Math.min(x, x + (x > plotW * 0.6 ? -17 - w : 17 + w));
        for (const row of priceLegend) {
          if (
            labelLeft < row.right &&
            y - 7 < row.bottom &&
            y + 7 > row.top &&
            row.bottom + 10 < price.top + price.height - 8
          )
            y = row.bottom + 10;
        }
        // on the right of the bar, unless it does not fit there
        const roomRight = plotW - 4 - (x + 17 + w);
        const roomLeft = x - 17 - w - 4;
        const leftSide =
          (roomRight < 0 || x > plotW * 0.6) &&
          roomLeft >= Math.min(0, roomRight);
        const dir = leftSide ? -1 : 1;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dir * 14, y);
        ctx.stroke();
        const tx = clamp(leftSide ? x - 17 - w : x + 17, 2, plotW - w - 2);
        ctx.fillText(label, tx, y);
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
    ctx.restore();

    // drawings, each in its pane
    paintDrawings(ctx, { text, background: bgCss, up: upC, down: downC });

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, price.top, plotW, price.height);
    ctx.clip();
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
        (gesture?.kind === "order" && gesture.line.id === line.id) ||
        (keyOrder?.kind === "move" && keyOrder.id === line.id)
          ? 1.5
          : 1;
      setDash(ctx, lineStyle, 1);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(plotW, y);
      ctx.stroke();
      ctx.restore();
      // label: [grip] title | quantity | profit | close
      const titleKey = PRICE_LINE_TITLES[kind];
      const title = line.title ?? (titleKey ? l[titleKey] : "");
      const parts: {
        text: string;
        fill: string;
        color: string;
        cancel?: boolean;
      }[] = [];
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
      if (line.cancellable)
        parts.push({ text: "×", fill: bgCss, color, cancel: true });
      if (!parts.length && !line.draggable) continue;
      ctx.font = font(theme.fontSize, 600);
      const widths = parts.map((part) =>
        part.cancel ? 20 : ctx.measureText(part.text).width + 12,
      );
      const grip = line.draggable ? 14 : 0;
      const total = widths.reduce((a, b) => a + b, 0) + grip;
      let x = Math.round(plotW - total - 56);
      const top = Math.round(y - 9.5);
      if (keyOrder?.kind === "move" && keyOrder.id === line.id) {
        // picked with the keyboard: a focus ring around the label
        roundRect(ctx, x - 3.5, top - 3.5, total + 7, 25, 5);
        ctx.strokeStyle = css(PRIMARY);
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.stroke();
      }
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
        const w = widths[k] ?? 0;
        let partFill = part.fill;
        if (part.cancel) {
          const hover = canvasButton(x, top, w, 18, () =>
            emit("orderCancel", { id: line.id, line }),
          );
          if (hover) partFill = color;
          ctx.fillStyle = color;
          ctx.fillRect(x, top + 3, 1, 12);
        }
        if (partFill !== bgCss) {
          ctx.fillStyle = partFill;
          ctx.fillRect(x, top, w, 18);
        }
        ctx.fillStyle =
          part.cancel && partFill !== bgCss ? textOn(color) : part.color;
        if (part.cancel) ctx.font = font(theme.fontSize + 3, 500);
        ctx.fillText(part.text, x + w / 2, top + (part.cancel ? 9 : 9.5));
        ctx.font = font(theme.fontSize, 600);
        x += w;
      });
    }

    // last price line
    const lastLine = options.lastPriceLine !== false && count > 0;
    const lastUp = count > 0 && store.close[count - 1] >= store.open[count - 1];
    // a line takes its own color; bars the color of the last bar
    const lastColor =
      style() === "line" || style() === "area"
        ? css(PRIMARY)
        : lastUp
          ? upC
          : downC;
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

    // last values of the compared series
    const compareLabels: { y: number; text: string; color: string }[] = [];
    for (const c of compares) {
      let i = count - 1;
      while (i >= 0 && !finite(c.values[i])) i--;
      if (i < 0) continue;
      const value = c.values[i];
      const scaled = compareScaled(price.scale, value, compareBase(c));
      const y = yOfScaled(price.scale, scaled);
      if (!finite(y) || y < price.top || y > price.top + price.height) continue;
      compareLabels.push({
        y,
        text:
          price.scale.mode === "percent"
            ? formatPercent(scaled, locale)
            : formatPrice(value),
        color: css(c.color),
      });
    }

    // axis ticks, except under the labels drawn over the axis
    const covered: { pane: string; y: number }[] = [];
    for (const line of options.priceLines ?? [])
      covered.push({ pane: PRICE, y: yOf(price.scale, linePrice(line)) });
    for (const drawing of drawings) {
      const pane = paneOf(drawing.pane);
      if (pane && drawing.type === "horizontalLine" && drawing.points[0])
        covered.push({
          pane: pane.id,
          y: yOf(pane.scale, drawing.points[0].price),
        });
    }
    for (const label of compareLabels)
      covered.push({ pane: PRICE, y: label.y });
    if (lastLine)
      covered.push({
        pane: PRICE,
        y: yOf(price.scale, lastClose) + (options.countdown ? 7 : 0),
      });
    ctx.font = font(theme.fontSize);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = muted;
    for (const pane of panes) {
      for (const t of pane.ticks) {
        const y = yOfScaled(pane.scale, t);
        if (y < pane.top + 8 || y > pane.top + pane.height - 8) continue;
        const gap = options.countdown && pane.id === PRICE ? 18 : 14;
        if (covered.some((c) => c.pane === pane.id && Math.abs(c.y - y) < gap))
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

    // labels of the price lines, the drawings and the compared series
    for (const line of options.priceLines ?? []) {
      const p = linePrice(line);
      const y = yOf(price.scale, p);
      if (!finite(y) || y < price.top || y > price.top + price.height) continue;
      const fillColor = lineColor(line);
      axisLabel(ctx, y, priceAxisText(p), fillColor, textOn(fillColor));
    }
    for (const drawing of drawings) {
      const pane = paneOf(drawing.pane);
      if (!pane || drawing.type !== "horizontalLine" || !drawing.points[0])
        continue;
      const p = drawing.points[0].price;
      const y = yOf(pane.scale, p);
      if (y < pane.top || y > pane.top + pane.height) continue;
      const fillColor = css(drawing.color ?? PRIMARY);
      axisLabel(
        ctx,
        y,
        pane.id === PRICE ? priceAxisText(p) : paneValueText(pane, p),
        fillColor,
        textOn(fillColor),
      );
    }
    for (const label of compareLabels)
      axisLabel(ctx, label.y, label.text, label.color, textOn(label.color));
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
        second = formatCountdown(end - Date.now(), l);
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

    // replay: the badge, or the picking of the first bar (at the bottom of
    // the price pane: the legends cover its top)
    const badgeY = price.top + price.height - 32;
    if (replayPicking) {
      const x = pointer && pointer.x <= plotW ? pointer.x : NaN;
      if (finite(x)) {
        ctx.fillStyle = toCss(theme.background, 0.62);
        ctx.fillRect(x, 0, plotW - x, plotH);
        ctx.strokeStyle = css(PRIMARY);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, plotH);
        ctx.stroke();
      }
      pill(ctx, l.replayHint, plotW / 2, badgeY, css(PRIMARY));
    } else if (replay && count) {
      pill(
        ctx,
        fill(l.replay, {
          time: formatCrosshairTime(
            shift(store.time[count - 1]),
            tfMs(),
            locale,
          ),
        }),
        plotW / 2,
        badgeY,
        css(PRIMARY),
      );
    }

    // keyboard order entry: the armed order and the keys to use
    if (keyOrder && count) {
      if (keyOrder.kind === "create") {
        const color = keyOrder.side === "buy" ? upC : downC;
        const y = Math.round(yOf(price.scale, keyOrder.price)) + 0.5;
        if (finite(y) && y >= price.top && y <= price.top + price.height) {
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(plotW, y);
          ctx.stroke();
          ctx.restore();
          pill(
            ctx,
            fill(keyOrder.side === "buy" ? l.buyLimit : l.sellLimit, {
              price: formatPrice(keyOrder.price),
            }),
            plotW - 56,
            clamp(y - 11, price.top + 2, price.top + price.height - 24),
            color,
            "right",
          );
          axisLabel(
            ctx,
            y,
            priceAxisText(keyOrder.price),
            color,
            textOn(color),
          );
        }
      }
      // the keys to use, on the left: order labels sit on the right
      if (!replay && !replayPicking)
        pill(ctx, l.orderHint, 8, badgeY, toCss(theme.text, 0.86), "left");
    }

    // crosshair
    const cross = crosshairState();
    if (cross && v && !replayPicking) {
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
          shift(timeAt(cross.index)),
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
      // order entry: a "+" at the crosshair price
      if (
        options.orderEntry &&
        pointer &&
        cross.pane.id === PRICE &&
        finite(cross.y) &&
        tool === "cursor" &&
        !gesture &&
        count
      ) {
        const size = 18;
        const bx = plotW - size - 4;
        const by = clamp(
          Math.round(cross.y - size / 2),
          price.top + 1,
          price.top + price.height - size - 1,
        );
        const orderPrice = roundPrice(cross.price);
        const side = orderPrice < lastClose ? "buy" : "sell";
        const hover = canvasButton(bx, by, size, size, () =>
          emit("orderCreate", { price: orderPrice, side }),
        );
        roundRect(ctx, bx, by, size, size, 4);
        ctx.fillStyle = hover ? css(PRIMARY) : labelBg;
        ctx.fill();
        ctx.strokeStyle = hover ? textOn(css(PRIMARY)) : bgCss;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx + 5, by + size / 2);
        ctx.lineTo(bx + size - 5, by + size / 2);
        ctx.moveTo(bx + size / 2, by + 5);
        ctx.lineTo(bx + size / 2, by + size - 5);
        ctx.stroke();
        if (hover) {
          pill(
            ctx,
            fill(side === "buy" ? l.buyLimit : l.sellLimit, {
              price: formatPrice(orderPrice),
            }),
            bx - 6,
            by - 2,
            side === "buy" ? upC : downC,
            "right",
          );
        }
      }
    }
  };

  // -------------------------------------------------------------- legends

  let legendKey = "";
  /** Rows of the legend of the price pane (labels painted under them are moved) */
  let priceLegend: { right: number; top: number; bottom: number }[] = [];
  const legendRows = new Map<string, LegendRow>();
  const legendBoxes = new Map<string, HTMLDivElement>();

  const legendBox = (id: string) => {
    let box = legendBoxes.get(id);
    if (!box) {
      // narrow charts: rows wrap, long items are cut with an ellipsis and
      // the rows that do not fit in the pane are hidden
      box = make("div", {
        position: "absolute",
        left: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1px",
        maxWidth: "calc(100% - 12px)",
        overflow: "hidden",
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
      flexWrap: "wrap",
      alignItems: "center",
      columnGap: "6px",
      maxWidth: "100%",
      minWidth: "0",
      boxSizing: "border-box",
      padding: "0 4px",
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
        ...ELLIPSIS,
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
      const label = make("span", { fontWeight: "600", ...ELLIPSIS });
      label.textContent = title;
      row.appendChild(label);
    }
    const values: HTMLSpanElement[] = [];
    for (let i = 0; i < outputs; i++) {
      const span = make("span", ELLIPSIS);
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
      const slots = study.mergeLegend ? 1 : study.outputs.length;
      if (study.overlay && study.type === "volume") {
        legendRows.set(study.id, legendRow(priceBox, titleOf(study), study, 1));
      } else if (study.overlay) {
        legendRows.set(
          study.id,
          legendRow(priceBox, titleOf(study), study, slots),
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
          study.mergeLegend ? 1 : study.outputs.length,
        ),
      );
    }
  };

  /** Legend title: indicator abbreviations, but words for the volume and some indicators */
  const titleOf = (study: Study) =>
    study.type === "volume"
      ? labels().volume
      : study.titleKey
        ? `${labels()[study.titleKey]} ${study.title}`
        : study.title;

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
      if (!box) continue;
      box.style.top = `${pane.top + 6}px`;
      // over the plot only, never over the price axis nor the next pane
      const maxWidth = `${Math.max(60, Math.floor(plotW - 10))}px`;
      if (box.style.maxWidth !== maxWidth) box.style.maxWidth = maxWidth;
      const maxHeight = `${Math.max(18, Math.floor(pane.height - 10))}px`;
      if (box.style.maxHeight !== maxHeight) box.style.maxHeight = maxHeight;
    }
    const priceBox = legendBoxes.get(PRICE);
    const measured = priceBox
      ? Array.from(
          priceBox.children as HTMLCollectionOf<HTMLElement>,
          (row) => ({
            right: priceBox.offsetLeft + row.offsetLeft + row.offsetWidth,
            top: priceBox.offsetTop + row.offsetTop,
            bottom: priceBox.offsetTop + row.offsetTop + row.offsetHeight,
          }),
        )
      : [];
    // the labels avoiding the legend were painted with the previous layout
    // (a resize wraps the rows differently): paint them again
    const moved =
      measured.length !== priceLegend.length ||
      measured.some((row, i) => {
        const before = priceLegend[i];
        return (
          !before ||
          before.right !== row.right ||
          before.top !== row.top ||
          before.bottom !== row.bottom
        );
      });
    priceLegend = measured;
    if (moved) invalidate();
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
            `<span style="${PAIR}"><span style="color:var(--text-secondary-color,#6b7280)">${escapeHtml(String(name))}</span><span style="color:${color}">${escapeHtml(formatPrice(value as number))}</span></span>`,
        )
        .join("");
      const pct = prevClose ? (change / prevClose) * 100 : NaN;
      const changeName = l.change
        ? `<span style="color:var(--text-secondary-color,#6b7280)">${escapeHtml(l.change)}</span>`
        : "";
      const changeHtml = `<span style="${PAIR}">${changeName}<span style="color:${change >= 0 ? upC : downC}">${change >= 0 ? "+" : "−"}${escapeHtml(formatPrice(Math.abs(change)))} (${escapeHtml(formatPercent(pct, locale))})</span></span>`;
      const vol = store.hasVolume
        ? `<span style="${PAIR}"><span style="color:var(--text-secondary-color,#6b7280)">${escapeHtml(l.volume)}</span>${escapeHtml(formatVolume(store.volume[index], locale))}</span>`
        : "";
      const next = `${html}${changeHtml}${vol}`;
      if (span && span.dataset.html !== next) {
        span.innerHTML = next;
        span.dataset.html = next;
        span.style.display = "inline-flex";
        span.style.columnGap = "6px";
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
      if (study.mergeLegend) {
        // one value: the output in use (SuperTrend up or down)
        const out = study.outputs.find((o) => finite(o.values[index]));
        setSpan(
          row.values[0],
          shown && count && out ? studyValueText(study, out.values[index]) : "",
          out ? css(colorOf(out.color)) : undefined,
        );
        continue;
      }
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
        // a shifted output shows the value drawn at this bar
        const source = index - out.shift;
        const value = source >= 0 && source < count ? out.values[source] : NaN;
        let color = out.color ? css(colorOf(out.color)) : undefined;
        if (out.kind === "histogram") color = value >= 0 ? upC : downC;
        if (out.kind === "dots" && !out.color)
          color = value <= store.close[index] ? upC : downC;
        const prefix =
          study.outputs.length > 1 && !study.plainLegend ? `${out.label} ` : "";
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
    updateToolbar();
    positionEditor();
    emitView();
    // buttons painted this frame may now be under the pointer
    if (
      pointer &&
      !gesture &&
      buttonAt(pointer.x, pointer.y) !== hoveredButton
    ) {
      updateCursor(pointer.x, pointer.y);
      invalidate();
    }
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
      if (!silentRange) emit("visibleRangeChange", range);
    }
    silentRange = false;
    if (range.from < 10 && historyFirst !== store.time[0]) {
      historyFirst = store.time[0];
      emit("historyRequest", { firstTime: store.time[0], count });
    }
    const cross = crosshairState();
    // a crosshair set by `setCrosshair` is not reported
    const own = cross && (pointer || keyboardIndex !== null) ? cross : null;
    const key = own ? `${own.index}|${own.price}|${own.pane.id}` : "";
    if (key !== lastCrosshair) {
      lastCrosshair = key;
      if (!own) {
        emit("crosshairMove", null);
      } else {
        const event: TradingCrosshairEvent = {
          index: own.index,
          time: timeAt(own.index),
          bar:
            own.index >= 0 && own.index < count
              ? readBar(store, own.index)
              : null,
          price: own.price,
          pane: own.pane.id,
          x: xOf(own.index),
          y: own.y,
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

  const anchorAt = (x: number, y: number, pane: Pane): TradingDrawingPoint => {
    const index = Math.round(indexAt(x));
    return { time: timeAt(index), price: valueAt(pane.scale, y) };
  };

  const setTool = (next: TradingDrawingTool, notify: boolean) => {
    if (next === tool) return;
    tool = next;
    draft = null;
    draftClicks = 0;
    if (notify) emit("drawingToolChange", next);
    invalidate();
  };

  const select = (id: string | null) => {
    if (id === selected) return;
    selected = id;
    paletteOpen = false;
    emit("drawingSelect", id);
    invalidate();
  };

  // ------------------------------------------------------ drawing history

  const undoState = (): TradingUndoState => ({
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  });

  const emitUndo = () => {
    const state = undoState();
    const key = `${state.canUndo}|${state.canRedo}`;
    if (key === undoKey) return;
    undoKey = key;
    emit("undoChange", state);
  };

  /** Records a change of the drawings: undoable, and reported unless `notify` is false */
  const commitDrawings = (next: readonly TradingDrawing[], notify = true) => {
    if (next !== committed) {
      undoStack.push(committed);
      if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
      redoStack.length = 0;
      committed = next;
    }
    drawings = next;
    if (notify) {
      emittedDrawings = next;
      emit("drawingsChange", next);
    }
    if (selected && !next.some((d) => d.id === selected)) select(null);
    emitUndo();
    invalidate();
  };

  /** Shows drawings of the history (undo / redo) */
  const restoreDrawings = (next: readonly TradingDrawing[]) => {
    committed = next;
    drawings = next;
    emittedDrawings = next;
    draft = null;
    if (selected && !next.some((d) => d.id === selected)) select(null);
    emit("drawingsChange", next);
    emitUndo();
    invalidate();
  };

  const undo = () => {
    const previous = undoStack.pop();
    if (!previous) return;
    if (editing) closeEditor(false);
    redoStack.push(committed);
    restoreDrawings(previous);
  };

  const redo = () => {
    const next = redoStack.pop();
    if (!next) return;
    undoStack.push(committed);
    restoreDrawings(next);
  };

  const updateDrawing = (id: string, patch: TradingDrawingPatch) => {
    if (!drawings.some((d) => d.id === id)) return;
    commitDrawings(
      drawings.map((d) =>
        d.id === id ? { ...d, ...patch, id: d.id, type: d.type } : d,
      ),
    );
  };

  const removeDrawing = (id: string) => {
    if (!drawings.some((d) => d.id === id)) return;
    if (selected === id) select(null);
    commitDrawings(drawings.filter((d) => d.id !== id));
  };

  /** Default target and stop of a new position: a reward twice the risk */
  const positionPoints = (
    entry: TradingDrawingPoint,
    pane: Pane,
    long: boolean,
  ): TradingDrawingPoint[] => {
    const y = yOf(pane.scale, entry.price);
    const risk = Math.max(12, pane.height * 0.07);
    const target = valueAt(pane.scale, y + (long ? -2 : 2) * risk);
    const stop = valueAt(pane.scale, y + (long ? 1 : -1) * risk);
    const bars = Math.max(6, Math.round((plotW * 0.16) / spacing));
    const end = timeAt(Math.round(indexOfTimeExt(entry.time)) + bars);
    return [
      entry,
      { time: end, price: roundPrice(target) },
      { time: end, price: roundPrice(stop) },
    ];
  };

  const finishDraft = () => {
    if (!draft) return;
    const done = draft;
    draft = null;
    draftClicks = 0;
    commitDrawings([...drawings, done]);
    select(done.id);
    if (!options.keepDrawingMode) setTool("cursor", true);
    if (done.type === "text") openEditor(done.id, true);
  };

  /** Fixes the anchor following the pointer; the drawing is done after its last anchor */
  const fixDraftAnchor = () => {
    if (!draft) return;
    draftClicks--;
    if (draftClicks <= 0) {
      finishDraft();
      return;
    }
    const last = draft.points[draft.points.length - 1];
    if (last) draft = { ...draft, points: [...draft.points, last] };
  };

  /** Moves the anchor of the drawing being made to the pointer */
  const followDraft = (x: number, y: number) => {
    const pane = paneOf(draftPane);
    if (!draft || !pane || draftClicks <= 0) return;
    draft = {
      ...draft,
      points: [...draft.points.slice(0, -1), anchorAt(x, y, pane)],
    };
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
    if (x > plotW) return null;
    const pane = paneAt(y);
    const mapper = drawingMapper(pane);
    if (!pane || !mapper) return null;
    for (let i = drawings.length - 1; i >= 0; i--) {
      const drawing = drawings[i];
      if (!drawing || (drawing.pane ?? PRICE) !== pane.id) continue;
      const hit = hitDrawing(
        drawing,
        mapper,
        { x, y },
        6,
        textBoxes.get(drawing.id),
      );
      if (hit) return { drawing, hit, pane };
    }
    return null;
  };

  const buttonAt = (x: number, y: number) =>
    canvasButtons.findIndex(
      (b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h,
    );

  const separatorAt = (y: number) => {
    for (let i = 1; i < panes.length; i++) {
      if (Math.abs(panes[i].top - y) <= 4) return i;
    }
    return -1;
  };

  // --------------------------------------------------------- text editor

  const autosizeEditor = () => {
    editor.style.height = "auto";
    editor.style.height = `${Math.max(28, editor.scrollHeight + 2)}px`;
  };

  const positionEditor = () => {
    if (!editing) return;
    const id = editing.id;
    const drawing = drawings.find((d) => d.id === id);
    const pane = drawing ? paneOf(drawing.pane) : null;
    const anchor = drawing?.points[0];
    if (!drawing || !pane || !anchor) return;
    const x = xOf(indexOfTimeExt(anchor.time));
    const y = yOf(pane.scale, anchor.price);
    editor.style.left = `${clamp(x, 2, Math.max(2, plotW - 160))}px`;
    editor.style.top = `${clamp(y, 2, Math.max(2, plotH - 40))}px`;
  };

  function openEditor(id: string, created: boolean) {
    const drawing = drawings.find((d) => d.id === id);
    if (!drawing || drawing.locked) return;
    editing = { id, created };
    editor.value = created ? "" : (drawing.text ?? "");
    editor.placeholder = labels().text;
    editor.setAttribute("aria-label", labels().editText);
    editor.style.display = "block";
    positionEditor();
    autosizeEditor();
    editor.focus();
    editor.select();
    invalidate();
  }

  function closeEditor(commit: boolean) {
    if (!editing) return;
    const { id, created } = editing;
    editing = null;
    editor.style.display = "none";
    const text = editor.value.replace(/\s+$/, "");
    const drawing = drawings.find((d) => d.id === id);
    if (drawing && created && (!commit || !text)) {
      // a new text left empty or cancelled: as if it had never been made
      const previous = undoStack.pop();
      restoreDrawings(previous ?? drawings.filter((d) => d.id !== id));
    } else if (drawing && commit && text !== (drawing.text ?? "")) {
      if (created) {
        // the text completes the creation (a single undo step)
        const next = drawings.map((d) => (d.id === id ? { ...d, text } : d));
        committed = next;
        drawings = next;
        emittedDrawings = next;
        emit("drawingsChange", next);
      } else {
        updateDrawing(id, { text });
      }
    }
    if (doc.activeElement === editor || doc.activeElement === doc.body)
      root.focus();
    invalidate();
  }

  editor.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      closeEditor(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeEditor(false);
    }
  });
  editor.addEventListener("input", autosizeEditor);
  editor.addEventListener("blur", () => closeEditor(true));
  editor.addEventListener("pointerdown", (event) => event.stopPropagation());
  editor.addEventListener("dblclick", (event) => event.stopPropagation());

  // ------------------------------------------------------ drawing toolbar

  const icon = (path: string, dash = "", width = 1.5) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ""} aria-hidden="true"><path d="${path}"/></svg>`;

  const toolbarButton = (
    label: string,
    content: string,
    onClick: () => void,
    pressed?: boolean,
  ) => {
    const button = doc.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.title = label;
    if (pressed !== undefined)
      button.setAttribute("aria-pressed", String(pressed));
    button.innerHTML = content;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      onClick();
    });
    return button;
  };

  const separator = () => {
    const span = doc.createElement("span");
    span.className = "sep";
    return span;
  };

  const buildToolbar = (drawing: TradingDrawing) => {
    toolbar.textContent = "";
    const l = labels();
    toolbar.setAttribute("aria-label", l.lineStyle);
    const id = drawing.id;
    const items: HTMLElement[] = [];
    if (!drawing.locked) {
      const color = css(drawing.color ?? PRIMARY);
      const swatch = toolbarButton(
        l.color,
        `<span style="display:block;width:14px;height:14px;border-radius:50%;background:${color};box-shadow:inset 0 0 0 1px rgba(127,127,127,.35)"></span>`,
        () => {
          paletteOpen = !paletteOpen;
          toolbarKey = "";
          updateToolbar();
        },
      );
      swatch.setAttribute("aria-expanded", String(paletteOpen));
      items.push(swatch);
      const width = drawing.lineWidth ?? 1.5;
      const widths = [1, 2, 3, 4];
      items.push(
        toolbarButton(
          `${l.lineWidth}: ${width}px`,
          `${icon("M2 8h12", "", Math.min(4, width))}<span style="font-size:11px;margin-left:3px">${width}</span>`,
          () =>
            updateDrawing(id, {
              lineWidth: widths.find((w) => w > width) ?? widths[0],
            }),
        ),
      );
      const lineStyle = drawing.lineStyle ?? "solid";
      items.push(
        toolbarButton(
          l.lineStyle,
          icon(
            "M2 8h12",
            lineStyle === "dashed"
              ? "3.5 2.5"
              : lineStyle === "dotted"
                ? "0.1 3"
                : "",
            lineStyle === "dotted" ? 2.2 : 1.6,
          ),
          () =>
            updateDrawing(id, {
              lineStyle:
                LINE_STYLES[
                  (LINE_STYLES.indexOf(lineStyle) + 1) % LINE_STYLES.length
                ],
            }),
        ),
      );
      if (isFillable(drawing.type)) {
        items.push(
          toolbarButton(
            l.fill,
            '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3.5" width="11" height="9" rx="1.5" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.3"/></svg>',
            () => updateDrawing(id, { fill: drawing.fill === false }),
            drawing.fill !== false,
          ),
        );
      }
      if (drawing.type === "text") {
        items.push(
          toolbarButton(l.editText, icon("M3 13h3l7-7-3-3-7 7zM9 4l3 3"), () =>
            openEditor(id, false),
          ),
        );
      }
      items.push(separator());
    }
    items.push(
      toolbarButton(
        l.lock,
        drawing.locked
          ? icon("M4.5 7.5h7v6h-7zM6 7.5V5.5a2 2 0 0 1 4 0v2")
          : icon("M4.5 7.5h7v6h-7zM6 7.5V5.5a2 2 0 0 1 3.8-.9"),
        () => updateDrawing(id, { locked: !drawing.locked }),
        !!drawing.locked,
      ),
    );
    if (!drawing.locked) {
      const remove = toolbarButton(
        l.remove,
        icon("M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.7 8.5h5.6l.7-8.5"),
        () => removeDrawing(id),
      );
      remove.style.color = "var(--danger-color, #f23645)";
      items.push(remove);
    }
    toolbar.append(...items);
    if (paletteOpen && !drawing.locked) {
      const palette = make("div", {
        position: "absolute",
        left: "0",
        top: "calc(100% + 4px)",
        display: "flex",
        gap: "2px",
        padding: "4px",
        borderRadius: "8px",
        border:
          "1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 85%, transparent)",
        background: "var(--surface-elevated-color, var(--surface-color, #fff))",
        boxShadow: "0 8px 24px -8px rgba(15, 23, 42, 0.35)",
      });
      for (const color of PALETTE) {
        const button = toolbarButton(
          `${l.color} ${color}`,
          `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${color}"></span>`,
          () => {
            paletteOpen = false;
            updateDrawing(id, { color });
          },
          (drawing.color ?? "").toLowerCase() === color,
        );
        palette.appendChild(button);
      }
      toolbar.appendChild(palette);
    }
  };

  function updateToolbar() {
    const drawing = selected
      ? drawings.find((d) => d.id === selected)
      : undefined;
    const pane = drawing ? paneOf(drawing.pane) : null;
    const mapper = drawingMapper(pane);
    const dragging = gesture?.kind === "drawing" && gesture.moved;
    if (
      !drawing ||
      !pane ||
      !mapper ||
      options.drawingToolbar === false ||
      editing ||
      dragging ||
      draft
    ) {
      toolbar.style.display = "none";
      toolbarKey = "";
      paletteOpen = false;
      return;
    }
    const key = [
      drawing.id,
      drawing.color,
      drawing.lineWidth,
      drawing.lineStyle,
      drawing.fill,
      drawing.locked,
      paletteOpen,
      locale,
      themeVersion,
    ].join("|");
    if (key !== toolbarKey) {
      toolbarKey = key;
      buildToolbar(drawing);
    }
    toolbar.style.display = "flex";
    // above the drawing (below it when there is no room), inside the plot
    const pts = handlePoints(drawing, mapper, textBoxes.get(drawing.id));
    const box = textBoxes.get(drawing.id);
    if (drawing.type === "text" && box)
      pts.push({ x: box.x + box.w, y: box.y + box.h });
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    for (const p of pts) {
      x0 = Math.min(x0, clamp(p.x, 0, plotW));
      x1 = Math.max(x1, clamp(p.x, 0, plotW));
      y0 = Math.min(y0, clamp(p.y, pane.top, pane.top + pane.height));
      y1 = Math.max(y1, clamp(p.y, pane.top, pane.top + pane.height));
    }
    if (drawing.type === "horizontalLine") {
      x0 = plotW * 0.35;
      x1 = plotW * 0.65;
    }
    const w = toolbar.offsetWidth || 200;
    const h = toolbar.offsetHeight || 34;
    const left = clamp((x0 + x1) / 2 - w / 2, 4, Math.max(4, plotW - w - 4));
    let top = y0 - h - 14;
    // below, clear of the labels under the drawing (position stops, measures)
    if (top < 4) top = y1 + 32;
    toolbar.style.left = `${Math.round(left)}px`;
    toolbar.style.top = `${Math.round(clamp(top, 4, Math.max(4, plotH - h - 4)))}px`;
  }

  toolbar.addEventListener("pointerdown", (event) => event.stopPropagation());
  toolbar.addEventListener("dblclick", (event) => event.stopPropagation());
  // the chart under the toolbar is not hovered
  toolbar.addEventListener("pointermove", (event) => event.stopPropagation());
  toolbar.addEventListener("pointerenter", () => {
    pointer = null;
    hovered = null;
    root.style.cursor = "default";
    invalidate();
  });

  // ---------------------------------------------------------------- replay

  const replayState = (): TradingReplayState => ({
    active: !!replay,
    picking: replayPicking,
    playing: !!replay?.playing,
    speed: replay?.speed ?? replaySpeed,
    index: n(),
    total: replay ? replay.source.length : n(),
    time: n() ? store.time[n() - 1] : NaN,
  });

  const emitReplay = () => emit("replayChange", replayState());

  const columnsOf = (from: BarStore, count: number) => ({
    time: from.time.subarray(0, count),
    open: from.open.subarray(0, count),
    high: from.high.subarray(0, count),
    low: from.low.subarray(0, count),
    close: from.close.subarray(0, count),
    volume: from.volume.subarray(0, count),
  });

  /** Replaces the bars of the store by the first `count` bars of `source` */
  const showBars = (source: BarStore, count: number) => {
    const hasVolume = source.hasVolume;
    storeSet(store, columnsOf(source, count));
    store.hasVolume = hasVolume;
    pyramid = createPyramid();
    haPyramid = createPyramid();
    haValid = 0;
    historyFirst = NaN;
    afterDataChange(0);
  };

  const stopReplayTimer = () => {
    if (replay?.timer) clearInterval(replay.timer);
    if (replay) {
      replay.timer = null;
      replay.playing = false;
    }
  };

  const beginReplay = (index: number) => {
    replayPicking = false;
    if (!replay) {
      if (!n()) return;
      const source = createStore();
      storeSet(source, columnsOf(store, n()));
      source.hasVolume = store.hasVolume;
      replay = { source, playing: false, speed: replaySpeed, timer: null };
    }
    stopReplayTimer();
    const shown = clamp(Math.round(index) + 1, 1, replay.source.length);
    showBars(replay.source, shown);
    right = shown - 1 + (options.rightOffset ?? 8);
    for (const scale of scales.values()) scale.auto = true;
    emitReplay();
  };

  const replayStepBy = (count: number) => {
    if (!replay) return;
    const source = replay.source;
    const before = n();
    const follow = followsRealtime();
    let from = -1;
    for (let i = 0; i < count && n() < source.length; i++) {
      const at = storeUpdate(store, readBar(source, n()));
      if (from < 0) from = at;
    }
    store.hasVolume = source.hasVolume;
    if (from >= 0) {
      if (follow) right += n() - before;
      afterDataChange(from);
    }
    if (n() >= source.length) stopReplayTimer();
    emitReplay();
  };

  const playReplay = (speed?: number) => {
    if (!replay) return;
    if (speed !== undefined && speed > 0) replay.speed = replaySpeed = speed;
    stopReplayTimer();
    if (n() >= replay.source.length) {
      emitReplay();
      return;
    }
    const interval = Math.max(16, 1000 / replay.speed);
    const perTick = Math.max(1, Math.round((replay.speed * interval) / 1000));
    replay.playing = true;
    replay.timer = setInterval(() => replayStepBy(perTick), interval);
    emitReplay();
  };

  /** Ends the replay; `restore` shows every bar again */
  const endReplay = (restore: boolean) => {
    const wasPicking = replayPicking;
    replayPicking = false;
    if (!replay) {
      if (wasPicking) {
        emitReplay();
        invalidate();
      }
      return;
    }
    stopReplayTimer();
    const source = replay.source;
    replay = null;
    if (restore) showBars(source, source.length);
    emitReplay();
  };

  // ----------------------------------------------------------- pointer

  const updateCursor = (x: number, y: number) => {
    let cursor = "crosshair";
    hoveredLine = null;
    let nextHover: string | null = null;
    const button = gesture ? -1 : buttonAt(x, y);
    if (button !== hoveredButton) hoveredButton = button;
    if (gesture?.kind === "pan" && gesture.moved) cursor = "grabbing";
    else if (button >= 0) cursor = "pointer";
    else if (replayPicking && x <= plotW && y <= plotH) cursor = "pointer";
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
    if (keyOrder) endKeyOrder(true);
    kinetic = null;
    scrollAnim = null;
    if (editing) closeEditor(true);
    if (paletteOpen) {
      paletteOpen = false;
      invalidate();
    }
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
    const button = buttonAt(x, y);
    const target = canvasButtons[button];
    if (target) {
      gesture = { kind: "button", action: target.action };
      return;
    }
    if (replayPicking && x <= plotW && y <= plotH) {
      beginReplay(Math.min(n() - 1, Math.round(indexAt(x))));
      return;
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
    if (tool !== "cursor" && pane && n()) {
      if (draft) {
        // the next anchor of a click-by-click drawing
        followDraft(x, y);
        fixDraftAnchor();
        gesture = null;
        invalidate();
        return;
      }
      const type = tool;
      const position = isPosition(type);
      // positions need prices: on the price pane only
      const at = position ? panes[0] : pane;
      const point = anchorAt(x, clamp(y, at.top, at.top + at.height), at);
      const anchors = anchorCount(type);
      draftPane = at.id;
      draft = {
        id: `drawing-${Date.now().toString(36)}-${++drawingCounter}`,
        type,
        points: position
          ? positionPoints(
              { ...point, price: roundPrice(point.price) },
              at,
              type === "longPosition",
            )
          : anchors === 1
            ? [point]
            : [point, point],
        ...(at.id !== PRICE ? { pane: at.id } : {}),
      };
      if (anchors === 1) {
        finishDraft();
        return;
      }
      draftClicks = anchors - 1;
      gesture = { kind: "create", pane: at, x, y, moved: false };
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
            pane: hit.pane,
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
      if (draft) followDraft(x, y);
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
        lineOverrides.set(g.line.id, roundPrice(valueAt(panes[0].scale, y)));
        break;
      }
      case "drawing": {
        if (!g.moved && Math.hypot(x - g.x, y - g.y) < 3) break;
        g.moved = true;
        const scale = g.pane.scale;
        let points: TradingDrawingPoint[];
        if (g.handle >= 0) {
          points = moveHandle(g.original, g.handle, anchorAt(x, y, g.pane));
        } else {
          const di = Math.round(indexAt(x) - indexAt(g.x));
          const ds = scaledAt(scale, y) - scaledAt(scale, g.y);
          points = g.original.points.map((p) => ({
            time: timeAt(Math.round(indexOfTimeExt(p.time)) + di),
            price: fromScaled(scale, toScaled(scale, p.price) + ds),
          }));
        }
        drawings = drawings.map((d) => (d.id === g.id ? { ...d, points } : d));
        break;
      }
      case "create": {
        if (Math.hypot(x - g.x, y - g.y) >= 4) g.moved = true;
        followDraft(x, y);
        break;
      }
      default:
        updateCursor(x, y);
        break;
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
        // a click starts a click-by-click drawing; a drag fixes the anchor
        if (g.moved) fixDraftAnchor();
        break;
      case "button":
        if (buttonAt(x, y) >= 0) g.action();
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
    const hit = tool === "cursor" ? hitDrawingAt(x, y) : null;
    if (hit?.drawing.type === "text") {
      openEditor(hit.drawing.id, false);
      return;
    }
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
      time: formatCrosshairTime(shift(store.time[index]), tfMs(), locale),
      open: formatPrice(d.open[index]),
      high: formatPrice(d.high[index]),
      low: formatPrice(d.low[index]),
      close: formatPrice(d.close[index]),
    });
  };

  const say = (text: string) => {
    live.textContent = text;
  };

  /** Price lines the keyboard can pick: draggable or cancellable ones */
  const keyLines = () =>
    (options.priceLines ?? []).filter(
      (line) => line.draggable || line.cancellable,
    );

  const lineTitle = (line: TradingPriceLine) => {
    const key = PRICE_LINE_TITLES[line.kind ?? "line"];
    return line.title ?? (key ? labels()[key] : "");
  };

  /** Leaves the keyboard order entry; `restore` puts a picked line back */
  const endKeyOrder = (restore: boolean) => {
    if (keyOrder?.kind === "move" && restore) {
      if (keyOrder.override === undefined) lineOverrides.delete(keyOrder.id);
      else lineOverrides.set(keyOrder.id, keyOrder.override);
    }
    keyOrder = null;
  };

  /** Order entry keys (`orderEntry`); returns whether the key was used */
  const onOrderKey = (event: KeyboardEvent): boolean => {
    const count = n();
    if (
      !options.orderEntry ||
      !count ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return false;
    const l = labels();
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const orderText = (side: "buy" | "sell", value: number) =>
      fill(side === "buy" ? l.buyLimit : l.sellLimit, {
        price: formatPrice(value),
      });
    if (key === "b" || key === "s") {
      endKeyOrder(true);
      const cross = crosshairState();
      const at =
        cross && cross.pane.id === PRICE && finite(cross.price)
          ? cross.price
          : store.close[count - 1];
      const side = key === "b" ? "buy" : "sell";
      keyOrder = { kind: "create", side, price: roundPrice(at) };
      say(`${orderText(side, keyOrder.price)}. ${l.orderHint}`);
      return true;
    }
    if (key === "o") {
      const lines = keyLines();
      if (!lines.length) return false;
      const current = keyOrder?.kind === "move" ? keyOrder.id : null;
      endKeyOrder(true);
      const at = lines.findIndex((line) => line.id === current);
      const step = event.shiftKey ? -1 : 1;
      const next =
        at < 0
          ? step > 0
            ? 0
            : lines.length - 1
          : (at + step + lines.length) % lines.length;
      const line = lines[next];
      if (!line) return false;
      keyOrder = {
        kind: "move",
        id: line.id,
        start: linePrice(line),
        override: lineOverrides.get(line.id),
      };
      const name = fill(l.orderLine, {
        title: lineTitle(line),
        price: formatPrice(linePrice(line)),
      });
      say(
        [
          name,
          line.draggable ? l.orderHint : "",
          line.cancellable ? l.orderCancelHint : "",
        ]
          .filter(Boolean)
          .join(". "),
      );
      return true;
    }
    if (!keyOrder) return false;
    const pickedId = keyOrder.kind === "move" ? keyOrder.id : null;
    const picked = (options.priceLines ?? []).find(
      (line) => line.id === pickedId,
    );
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown": {
        const tick =
          10 ** -precision() *
          (event.shiftKey ? 10 : 1) *
          (event.key === "ArrowUp" ? 1 : -1);
        if (keyOrder.kind === "create") {
          keyOrder.price = roundPrice(keyOrder.price + tick);
          say(orderText(keyOrder.side, keyOrder.price));
        } else if (picked?.draggable) {
          const next = roundPrice(linePrice(picked) + tick);
          lineOverrides.set(picked.id, next);
          say(formatPrice(next));
        }
        return true;
      }
      case "Enter": {
        if (keyOrder.kind === "create") {
          const { price, side } = keyOrder;
          endKeyOrder(false);
          emit("orderCreate", { price, side });
          say(fill(l.orderPlaced, { price: formatPrice(price) }));
          return true;
        }
        const start = keyOrder.start;
        endKeyOrder(false);
        const next = picked ? lineOverrides.get(picked.id) : undefined;
        if (picked && next !== undefined && next !== start) {
          emit("orderMove", {
            id: picked.id,
            price: next,
            previousPrice: start,
            line: picked,
          });
          say(fill(l.orderPlaced, { price: formatPrice(next) }));
        }
        return true;
      }
      case "Escape":
        if (keyOrder.kind === "create") say(l.orderCancelled);
        else if (picked)
          say(
            fill(l.orderLine, {
              title: lineTitle(picked),
              price: formatPrice(keyOrder.start),
            }),
          );
        endKeyOrder(true);
        return true;
      case "Delete":
      case "Backspace":
        if (picked?.cancellable) {
          endKeyOrder(true);
          emit("orderCancel", { id: picked.id, line: picked });
          say(l.orderCancelled);
        }
        return true;
      default:
        return false;
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.target === root && onOrderKey(event)) {
      event.preventDefault();
      invalidate();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && !event.altKey) {
      const key = event.key.toLowerCase();
      if (key === "z" || key === "y") {
        if (key === "y" || event.shiftKey) redo();
        else undo();
        event.preventDefault();
      }
      return;
    }
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
        if (paletteOpen) paletteOpen = false;
        else if (replayPicking) endReplay(false);
        else if (draft) {
          draft = null;
          draftClicks = 0;
        } else if (tool !== "cursor") setTool("cursor", true);
        else if (selected) select(null);
        else keyboardIndex = null;
        break;
      case "Delete":
      case "Backspace": {
        const target = drawings.find((d) => d.id === selected);
        if (!target || target.locked) return;
        removeDrawing(target.id);
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
    if (keyOrder) {
      endKeyOrder(true);
      invalidate();
    }
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

  // ----------------------------------------------------- image, full screen

  /** Every layer of the chart (and the legends) drawn on one canvas */
  const compose = (): HTMLCanvasElement | null => {
    if (destroyed) return null;
    // a fresh frame: the GPU canvas is read in the same task
    if (frameId) {
      if (win?.cancelAnimationFrame) win.cancelAnimationFrame(frameId);
      else clearTimeout(frameId);
      frameId = 0;
    }
    frame();
    const dpr = win?.devicePixelRatio || 1;
    const canvas = doc.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = toCss(theme.background);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    try {
      ctx.drawImage(background, 0, 0);
      if (renderer)
        ctx.drawImage(
          renderer.canvas,
          0,
          0,
          Math.round(plotW * dpr),
          Math.round(plotH * dpr),
        );
      ctx.drawImage(foreground, 0, 0);
    } catch {
      // a canvas that can't be read (lost context): skipped
    }
    // the legends are DOM text: written at their place
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const origin = root.getBoundingClientRect();
    const view = win ?? null;
    legends.querySelectorAll("span, button").forEach((element) => {
      const text = element.textContent ?? "";
      if (element.children.length || !text.trim() || !view) return;
      const rect = element.getBoundingClientRect();
      const computed = view.getComputedStyle(element);
      ctx.font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
      ctx.fillStyle = computed.color || toCss(theme.text);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(
        text,
        rect.left - origin.left,
        rect.top - origin.top + rect.height / 2,
      );
    });
    return canvas;
  };

  let fullscreen = false;
  const onFullscreen = () => {
    const next = doc.fullscreenElement === root;
    if (next === fullscreen) return;
    fullscreen = next;
    root.style.background = next ? toCss(theme.background) : "";
    emit("fullscreenChange", next);
    invalidate();
  };
  doc.addEventListener("fullscreenchange", onFullscreen);

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
    const nextZone =
      next.timeZone && isTimeZone(next.timeZone) ? next.timeZone : undefined;
    const timeChanged =
      !!previous &&
      (next.utcOffset !== previous.utcOffset || nextZone !== zone);
    zone = nextZone;
    if (!previous || next.indicators !== previous.indicators) rebuildStudies();
    // session periods (VWAP) follow the displayed time
    if (timeChanged) for (const study of studies) studyValid.set(study, 0);
    if (!previous || next.compare !== previous.compare) rebuildCompares();
    if (next.bars && (!previous || next.bars !== previous.bars)) {
      if (replay) endReplay(false);
      if (previous) applyBarsOption(next.bars);
      else replaceBars(next.bars);
    } else if (!next.bars && previous?.bars) {
      if (replay) endReplay(false);
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
      if (previous) commitDrawings(next.drawings, false);
      else drawings = committed = next.drawings;
    }
    if (
      previous &&
      (next.drawingMode ?? "cursor") !== (previous.drawingMode ?? "cursor")
    ) {
      setTool(next.drawingMode ?? "cursor", false);
    }
    if (previous && next.priceLines !== previous.priceLines) {
      lineOverrides.clear();
      // the picked line is gone, or its new price is the reference now
      if (keyOrder?.kind === "move") {
        const id = keyOrder.id;
        const line = keyLines().find((l) => l.id === id);
        keyOrder = line
          ? { kind: "move", id, start: line.price, override: undefined }
          : null;
      }
    }
    if (next.orderEntry) root.setAttribute("aria-keyshortcuts", ORDER_KEYS);
    else {
      root.removeAttribute("aria-keyshortcuts");
      if (keyOrder) endKeyOrder(true);
    }
    if (previous && next.chartStyle !== previous.chartStyle)
      haValid = Math.min(haValid, 0);
    optionsVersion++;
    applyStatic();
    invalidate();
  };

  applyOptions(null);
  void initRenderer();
  const unfollowDefault = followDefaultRenderer(
    () => options.renderer,
    () => void initRenderer(),
  );

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
      if (replay) endReplay(false);
      replaceBars(bars);
    },
    update(bar) {
      if (replay) {
        // the stream goes on behind the replay
        storeUpdate(replay.source, bar);
        return;
      }
      const before = n();
      const follow = followsRealtime();
      const at = storeUpdate(store, bar);
      if (at < 0) return;
      if (n() > before && follow) right += n() - before;
      afterDataChange(at);
    },
    appendBars(bars) {
      if (replay) {
        storeAppend(replay.source, bars);
        return;
      }
      const before = n();
      const follow = followsRealtime();
      const at = storeAppend(store, bars);
      if (at < 0) return;
      if (follow) right += n() - before;
      afterDataChange(at);
    },
    prependBars(bars) {
      if (replay) storePrepend(replay.source, bars);
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
    getVisibleTimeRange() {
      const range = visibleRange();
      return { from: timeAtFrac(range.from), to: timeAtFrac(range.to) };
    },
    setVisibleTimeRange({ from, to }) {
      if (!n() || !(to > from)) return;
      instance.setVisibleRange({
        from: indexAtTimeFrac(from),
        to: indexAtTimeFrac(to),
      });
    },
    setCrosshair(time, price) {
      externalCross =
        time === null || !finite(time) ? null : { time, price: price ?? NaN };
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
      commitDrawings(next, false);
    },
    removeDrawing,
    updateDrawing,
    selectDrawing: (id) => select(id),
    undo,
    redo,
    getUndoState: undoState,
    startReplay(time) {
      if (!n() && !replay) return;
      if (time === undefined) {
        if (replay) endReplay(true);
        replayPicking = true;
        emitReplay();
        invalidate();
        return;
      }
      const source = replay ? replay.source : store;
      beginReplay(indexOfTime(source.time, source.length, time));
    },
    replayStep: (count = 1) => replayStepBy(Math.max(1, Math.floor(count))),
    replayPlay: (speed) => playReplay(speed),
    replayPause() {
      if (!replay) return;
      stopReplayTimer();
      emitReplay();
    },
    stopReplay: () => endReplay(true),
    getReplayState: replayState,
    toDataURL(type = "image/png", quality) {
      return compose()?.toDataURL(type, quality) ?? "";
    },
    toBlob(type = "image/png", quality) {
      const canvas = compose();
      return new Promise((resolve) => {
        if (!canvas || typeof canvas.toBlob !== "function") resolve(null);
        else canvas.toBlob(resolve, type, quality);
      });
    },
    async requestFullscreen() {
      if (typeof root.requestFullscreen === "function")
        await root.requestFullscreen();
    },
    async exitFullscreen() {
      if (
        doc.fullscreenElement === root &&
        typeof doc.exitFullscreen === "function"
      )
        await doc.exitFullscreen();
    },
    isFullscreen: () => doc.fullscreenElement === root,
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
      if (replay?.timer) clearInterval(replay.timer);
      doc.removeEventListener("fullscreenchange", onFullscreen);
      resizeObserver?.disconnect();
      unfollowDefault();
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
  syncHooks.set(instance, {
    setTimeRange(range) {
      silentRange = true;
      instance.setVisibleTimeRange(range);
    },
  });
  return instance;
};
