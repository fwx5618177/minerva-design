// createOrderBookHeatmap: Bookmap-style liquidity heatmap. The book is
// sampled every `interval` ms into a column of price rows; the visible
// columns are rasterized into one image (a texel per column and price row,
// see field.ts) drawn with nearest filtering by a WebGPU / WebGL / Canvas2D
// backend over the cold end of the ramp: a continuous field without seams.
// The best bid / ask step lines, the spread band, the trade bubbles, the
// grid, the axes, the book profile, the crosshair and the tooltip are drawn
// on a Canvas2D layer above.

import {
  fromOklab,
  luminance,
  mixOklab,
  oklabRamp,
  packColor,
  parseColor,
  toCss,
  toOklab,
  type Rgba,
} from "../color";
import { followDefaultRenderer } from "../renderers/follow";
import { linearTicks } from "../scale";
import { timeTicks } from "../time";
import type { ChartRendererKind } from "../types";
import {
  createOrderBookStore,
  decimalsOf,
  inferPriceDecimals,
  inferSizeDecimals,
  inferTickSize,
  roundToStep,
} from "./book";
import {
  clamp,
  createFormatters,
  ease,
  fontOf,
  formatClock,
  roundRect,
  sideColors,
  type Formatters,
} from "./format";
import { localeLabels, type LabelDictionary } from "../locale";
import {
  HEAT_TABLE_SIZE,
  buildHeatGrid,
  createHeatFieldRenderer,
  heatTable,
  paintHeatGrid,
  percentile,
  type HeatFieldRenderer,
  type HeatGrid,
  type HeatSource,
} from "./field";
import { createEmitter, createHost, localPoint, tooltipHtml } from "./host";
import {
  fineCeil,
  fitPriceRange,
  fitTimeRange,
  layoutAxisLabels,
  type AxisLabel,
} from "./layout";
import type {
  OrderBookDelta,
  OrderBookHeatmapEventMap,
  OrderBookHeatmapHoverEvent,
  OrderBookHeatmapInstance,
  OrderBookHeatmapLabels,
  OrderBookHeatmapOptions,
  OrderBookHeatmapScale,
  OrderBookSide,
  MarketTrade,
} from "./types";

/** Colors of the ramp lookup table */
const LUT_SIZE = 256;
/** Largest heat image (texels per side) */
const MAX_TEXELS = 4096;
/**
 * Quantile of the visible (non-empty) cells at the hottest color (auto
 * scale): typical levels stay dark, only the top 1 % of the liquidity glows
 */
const SCALE_QUANTILE = 0.99;
/** Thinnest price row on screen (CSS px); thinner rows are bucketed */
const MIN_ROW_PX = 2;

/** A ramp color at a position (0-1) */
type RampStop = readonly [number, string];

/**
 * Heat ramps (positioned stops, interpolated in OKLab, lightness rising
 * monotonically with the size); the first color is also the empty field.
 * Dark: a long dark segment close to the panel (thin liquidity stays dim),
 * then blue, cyan, yellow, orange and a white-hot end for the walls (the
 * Bookmap convention). Light: the mirror, near white to deep blue, violet
 * and crimson.
 */
const DARK_RAMP: readonly RampStop[] = [
  [0, "#0b1322"],
  [0.3, "#0d1a2e"],
  [0.5, "#102a4e"],
  [0.65, "#154a8a"],
  [0.76, "#1b86b8"],
  [0.85, "#3fc3c0"],
  [0.91, "#e8d84a"],
  [0.96, "#ff8c2b"],
  [1, "#ffe6c2"],
];
const LIGHT_RAMP: readonly RampStop[] = [
  [0, "#fbfcfe"],
  [0.3, "#f3f6fc"],
  [0.5, "#dde7f7"],
  [0.65, "#a8c4ec"],
  [0.76, "#5b8bd6"],
  [0.85, "#2f4fb0"],
  [0.93, "#6a2a9c"],
  [1, "#c4173f"],
];
/** Height of the price tags of the axis, in pixels */
const TAG_HEIGHT = 16;
/** Smallest distance between two trade bubbles' columns, in pixels */
const BUBBLE_SPACING = 6;
/** Diameter of the largest trade bubble (default), in pixels */
const BUBBLE_SIZE = 14;
/** Diameter of the smallest trade bubble, in pixels */
const BUBBLE_MIN = 3;

/**
 * Lookup table of a ramp with positioned stops (`[position 0-1, color]`,
 * ascending), interpolated in OKLab
 */
export const positionedRamp = (
  stops: readonly (readonly [number, Rgba])[],
  size = LUT_SIZE,
): Uint32Array => {
  const lut = new Uint32Array(size);
  if (!stops.length) return lut;
  const lab = stops.map(([, c]) => toOklab(c));
  let i = 0;
  for (let k = 0; k < size; k++) {
    const t = k / Math.max(1, size - 1);
    while (i + 1 < stops.length - 1 && t > stops[i + 1]![0]) i++;
    const [p0] = stops[i]!;
    const j = Math.min(stops.length - 1, i + 1);
    const [p1] = stops[j]!;
    const f = p1 > p0 ? Math.min(1, Math.max(0, (t - p0) / (p1 - p0))) : 0;
    const a = lab[i]!;
    const b = lab[j]!;
    lut[k] = packColor(
      fromOklab([
        a[0] + (b[0] - a[0]) * f,
        a[1] + (b[1] - a[1]) * f,
        a[2] + (b[2] - a[2]) * f,
        1,
      ]),
    );
  }
  return lut;
};

/**
 * Rows (ticks) per drawn price row: 1 while a tick is at least 2 px tall,
 * otherwise the smallest 1 / 2 / 5 × 10ⁿ bucket that is (Bookmap sums the
 * sizes within a price bucket)
 */
export const rowBucket = (tickPx: number): number => {
  if (!(tickPx > 0) || tickPx >= MIN_ROW_PX) return 1;
  const need = MIN_ROW_PX / tickPx;
  for (let p = 1; p < 1e12; p *= 10) {
    for (const m of [1, 2, 5]) if (m * p >= need) return m * p;
  }
  return 1;
};

const LABELS: LabelDictionary<OrderBookHeatmapLabels> = {
  en: {
    time: "Time",
    price: "Price",
    liquidity: "Liquidity",
    buys: "Buys",
    sells: "Sells",
    bid: "Bid",
    ask: "Ask",
    bidSide: "Bid side",
    askSide: "Ask side",
    bubbleHint: "Bubble area = trade size",
    name: "Liquidity heatmap",
  },
  zh: {
    time: "时间",
    price: "价格",
    liquidity: "挂单量",
    buys: "主动买入",
    sells: "主动卖出",
    bid: "买一",
    ask: "卖一",
    bidSide: "买盘",
    askSide: "卖盘",
    bubbleHint: "气泡面积 = 成交量",
    name: "订单簿热力图",
  },
  ja: {
    time: "時刻",
    price: "価格",
    liquidity: "指値量",
    buys: "買い約定",
    sells: "売り約定",
    bid: "最良買気配",
    ask: "最良売気配",
    bidSide: "買い板",
    askSide: "売り板",
    bubbleHint: "バブル面積 = 出来高",
    name: "板ヒートマップ",
  },
  fr: {
    time: "Heure",
    price: "Prix",
    liquidity: "Liquidité",
    buys: "Achats",
    sells: "Ventes",
    bid: "Meilleur achat",
    ask: "Meilleure vente",
    bidSide: "Côté achat",
    askSide: "Côté vente",
    bubbleHint: "Aire de la bulle = volume",
    name: "Carte de chaleur de la liquidité",
  },
};

interface Column extends HeatSource {
  /** Sequence number */
  seq: number;
  /** Start time */
  time: number;
  /** Price rows (price / tick, rounded) */
  bins: Float64Array;
  sizes: Float32Array;
  bestBid: number;
  bestAsk: number;
  buyVolume: number;
  buyNotional: number;
  sellVolume: number;
  sellNotional: number;
}

/** Normalized intensity (0-1) of a size */
export const heatIntensity = (
  size: number,
  max: number,
  scale: OrderBookHeatmapScale,
  contrast: number,
): number => {
  if (!(size > 0) || !(max > 0)) return 0;
  const r = Math.min(1, (size * contrast) / max);
  switch (scale) {
    case "linear":
      return r;
    case "log":
      // one decade: a tenth of the hottest size is a fifth of the ramp
      return Math.pow(Math.log10(1 + 9 * r), 1.2);
    default:
      // square root: thin liquidity stays cool, walls reach the warm end
      return Math.sqrt(r);
  }
};

/**
 * Cumulative distribution of the visible sizes (a coarse log histogram):
 * the rank of a size among the cells on screen, 0-1. It spreads a field of
 * similar sizes over the ramp (no flat wash) while the biggest walls stay
 * at its hot end. `version` of the grid it was built from.
 */
export interface SizeCdf {
  version: number;
  min: number;
  max: number;
  /** Bins of equal width in log space */
  cdf: Float32Array;
}

const CDF_BINS = 48;

/** Rank (0-1) of a size in the visible cells, `0` below the smallest */
const rankOf = (dist: SizeCdf, size: number): number => {
  if (!(size >= dist.min) || !(dist.max > dist.min)) return 0;
  const t = Math.log(size / dist.min) / Math.log(dist.max / dist.min);
  const x = Math.min(CDF_BINS - 1e-6, Math.max(0, t * CDF_BINS));
  const i = Math.floor(x);
  const f = x - i;
  const a = dist.cdf[i] ?? 0;
  const b = dist.cdf[i + 1] ?? a;
  return a + (b - a) * f;
};

/** Cumulative distribution of the positive sizes of a grid */
export const sizeCdf = (cells: Float32Array, version = 0): SizeCdf | null => {
  let min = Infinity;
  let max = 0;
  let count = 0;
  for (let i = 0; i < cells.length; i++) {
    const v = cells[i]!;
    if (!(v > 0)) continue;
    count++;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (!count || !(max > min)) return null;
  const bins = new Float32Array(CDF_BINS + 1);
  const span = Math.log(max / min);
  for (let i = 0; i < cells.length; i++) {
    const v = cells[i]!;
    if (!(v > 0)) continue;
    const t = Math.log(v / min) / span;
    bins[Math.min(CDF_BINS, Math.floor(t * CDF_BINS))]! += 1;
  }
  let sum = 0;
  for (let i = 0; i <= CDF_BINS; i++) {
    sum += bins[i]!;
    bins[i] = sum / count;
  }
  return { version, min, max, cdf: bins };
};

/** Mix of the absolute curve and the rank (0-1 → 0-1) */
export const heatCurve =
  (dist: SizeCdf | null, max: number, base: (r: number) => number) =>
  (r: number): number => {
    const absolute = Math.min(1, Math.max(0, base(r)));
    if (!dist || !(max > 0)) return absolute;
    const rank = rankOf(dist, r * max);
    // the absolute size keeps the meaning of the ramp, the rank spreads the
    // mid-range over it (a field of similar sizes is not a flat wash)
    return Math.min(1, 0.55 * absolute + 0.45 * rank);
  };

/**
 * Creates a liquidity heatmap in `container`: resting size over time and
 * price on the GPU, trades as bubbles, best bid / ask lines, the current
 * book profile, zoom / pan and a crosshair tooltip.
 */
export const createOrderBookHeatmap = (
  container: HTMLElement,
  initial: OrderBookHeatmapOptions = {},
): OrderBookHeatmapInstance => {
  let options = initial;
  const store = createOrderBookStore();
  const emitter = createEmitter<OrderBookHeatmapEventMap>();
  let fmt: Formatters = createFormatters(options, 2, 4);
  let colors = { up: [0, 0, 0, 1] as Rgba, down: [0, 0, 0, 1] as Rgba };
  let lut: Uint32Array = new Uint32Array(LUT_SIZE);
  /** Size → color table of the current ramp and color scale */
  let table: Uint32Array = new Uint32Array(HEAT_TABLE_SIZE + 1);
  /** Base intensity curve (0-1 → 0-1) of the color scale */
  let curve: (r: number) => number = (r) => Math.sqrt(r);
  /** Distribution of the visible sizes (rank blending), rebuilt with the grid */
  let dist: SizeCdf | null = null;
  /** The empty field: the cold end of the ramp */
  let floor: Rgba = [0, 0, 0, 1];
  let dark = false;

  let tick = 0;
  let columns: Column[] = [];
  let seq = 0;
  /** Start of the open column (the live book), NaN before the first data */
  let openStart = NaN;
  const open = { buyVolume: 0, buyNotional: 0, sellVolume: 0, sellNotional: 0 };
  let lastTrade: MarketTrade | null = null;

  /** Time source: exchange times once any is given, the local clock otherwise */
  let dataTime = NaN;
  let dataWall = 0;

  /** Size at the hottest color (auto scale, eased) and its target */
  let scaleMax = 0;
  let scaleTarget = 0;
  let scaleAt = -Infinity;
  let bubbleRef = 0;
  /** Size at the full width of the profile */
  let profileMax = 0;
  /** The rasterized field and the inputs it was built from */
  let grid: HeatGrid | null = null;
  let gridKey = "";
  let paintKey = "";
  /** The live book as a column, cached by store version */
  let head: {
    version: number;
    bins: Float64Array;
    sizes: Float32Array;
  } | null = null;

  let renderer: HeatFieldRenderer | null = null;
  let rendererToken = 0;
  let destroyed = false;
  let resolveReady: (kind: ChartRendererKind | null) => void = () => {};
  const ready = new Promise<ChartRendererKind | null>((resolve) => {
    resolveReady = resolve;
  });

  /** View: time range and price range; follows the market unless panned */
  let follow = true;
  let windowSpan = NaN;
  let viewX: [number, number] = [0, 1];
  let viewY: [number, number] = [0, 1];
  /** `viewY` holds a fitted range (it eases toward `yTarget` afterwards) */
  let viewYReady = false;
  /** Price range the following view eases to */
  let yTarget: [number, number] | null = null;
  /** Price span chosen by the user (zoom), NaN for the auto fit */
  let ySpan = NaN;
  /** Monotonic clock of the view (no jitter back when data arrives) */
  let shownTime = NaN;
  let lastFrame = 0;
  let plot = { x: 0, y: 0, w: 0, h: 0 };
  let hoverAt: [number, number] | null = null;
  let hoverKey = "";
  let drag: {
    x: number;
    y: number;
    viewX: [number, number];
    viewY: [number, number];
    axis: boolean;
    span: number;
  } | null = null;

  const host = createHost(container, {
    className: "minerva-orderbook-heatmap",
    draw,
    onTheme: () => {
      refreshColors();
      host.invalidate();
    },
  });
  const { root, doc } = host;
  root.tabIndex = 0;
  root.setAttribute("role", "figure");
  root.style.touchAction = "none";

  /** Texts in the locale, resolved on every option update */
  let texts = localeLabels(LABELS, options.locale, options.labels);
  const labels = () => texts;
  const applyTexts = () => {
    texts = localeLabels(LABELS, options.locale, options.labels);
    root.setAttribute("aria-label", options.ariaLabel ?? texts.name);
  };
  const interval = () => Math.max(10, options.interval ?? 100);
  const history = () => Math.max(interval() * 4, options.history ?? 300_000);
  const depth = () => Math.max(4, Math.round(options.depth ?? 160));
  const nowTime = () => {
    if (!Number.isFinite(dataTime)) return Date.now();
    const elapsed = perfNow() - dataWall;
    return dataTime + Math.min(Math.max(0, elapsed), interval() * 3);
  };
  const perfNow = () =>
    typeof performance !== "undefined" ? performance.now() : Date.now();

  function refreshColors() {
    const theme = host.theme;
    colors = sideColors(theme, options);
    const resolve = (value: string) => {
      const c = theme.resolve
        ? theme.resolve(value, theme.primary)
        : theme.primary;
      return [c[0], c[1], c[2], 1] as Rgba;
    };
    const background: Rgba = [
      theme.background[0],
      theme.background[1],
      theme.background[2],
      1,
    ];
    dark = theme.background[3] > 0 ? luminance(background) < 0.4 : false;
    if (options.colors?.length) {
      const ramp = options.colors.map(resolve);
      // the field is opaque: the empty color is the cold end of the ramp
      floor = ramp[0] ?? background;
      lut = oklabRamp(ramp.length > 1 ? ramp : [floor, floor], LUT_SIZE);
    } else {
      const stops = (dark ? DARK_RAMP : LIGHT_RAMP).map(
        ([at, hex]) => [at, parseColor(hex) ?? background] as const,
      );
      floor = stops[0]![1];
      lut = positionedRamp(stops, LUT_SIZE);
    }
    const scale = options.colorScale ?? "sqrt";
    curve = (r) => heatIntensity(r, 1, scale, 1);
    table = heatTable(lut, curve);
    paintKey = "";
  }

  const refreshFormat = () => {
    fmt = createFormatters(
      options,
      tick > 0
        ? Math.max(decimalsOf(tick), inferPriceDecimals(store))
        : inferPriceDecimals(store),
      inferSizeDecimals(store),
    );
  };

  /** A size with its unit, when `sizeUnit` is set */
  const withUnit = (text: string) => {
    const unit = options.sizeUnit?.trim();
    return unit ? `${text} ${unit}` : text;
  };

  const clearHistory = () => {
    columns = [];
    grid = null;
    gridKey = paintKey = "";
    head = null;
    dist = null;
    openStart = NaN;
    scaleMax = scaleTarget = 0;
    scaleAt = -Infinity;
    bubbleRef = 0;
    profileMax = 0;
    shownTime = NaN;
    open.buyVolume = open.buyNotional = open.sellVolume = open.sellNotional = 0;
  };

  // --------------------------------------------------------------- columns

  const ensureTick = () => {
    if (tick > 0) return;
    const base = inferTickSize(store);
    const mid = store.mid();
    if (options.tickSize && options.tickSize > 0) tick = options.tickSize;
    else if (base > 0 && Number.isFinite(mid)) {
      // rows of about 0.1 basis point: a round multiple of the tick (BTC at
      // 64,000 with a 0.1 tick: 0.5 rows)
      const ratio = (mid * 1e-5) / base;
      let multiple = 1;
      for (let p = 1; p <= 1e9 && multiple < ratio * 0.75; p *= 10) {
        for (const m of [1, 2, 5]) {
          multiple = m * p;
          if (multiple >= ratio * 0.75) break;
        }
      }
      tick = roundToStep(base * multiple, base);
    } else tick = Number.isFinite(mid) ? Math.max(1e-8, mid * 1e-5) : 0;
    if (tick > 0) refreshFormat();
  };

  /** Samples the book into price rows */
  const sampleBook = () => {
    const limit = depth();
    const bins = new Float64Array(limit * 2);
    const sizes = new Float32Array(limit * 2);
    let n = 0;
    for (const side of ["bid", "ask"] as const) {
      const count = store.count(side);
      let rows = 0;
      for (let i = 0; i < count; i++) {
        const bin = Math.round(store.priceAt(side, i) / tick);
        const size = store.sizeAt(side, i);
        if (n > 0 && bins[n - 1] === bin && rows > 0) {
          sizes[n - 1] += size;
          continue;
        }
        if (rows >= limit) break;
        bins[n] = bin;
        sizes[n] = size;
        n++;
        rows++;
      }
    }
    return { bins: bins.slice(0, n), sizes: sizes.slice(0, n) };
  };

  /** Closes the open column at `start` with the current book */
  const closeColumn = (start: number) => {
    if (!(tick > 0)) return;
    const { bins, sizes } = sampleBook();
    const column: Column = {
      seq: seq++,
      time: start,
      bins,
      sizes,
      bestBid: store.bestBid(),
      bestAsk: store.bestAsk(),
      buyVolume: open.buyVolume,
      buyNotional: open.buyNotional,
      sellVolume: open.sellVolume,
      sellNotional: open.sellNotional,
    };
    open.buyVolume = open.buyNotional = open.sellVolume = open.sellNotional = 0;
    columns.push(column);
    // history
    const oldest = start - history();
    let drop = 0;
    while (drop < columns.length && columns[drop]!.time < oldest) drop++;
    if (drop) columns = columns.slice(drop);
  };

  /** Closes every column ending before `time` */
  const advance = (time: number) => {
    if (!Number.isFinite(time)) return;
    const step = interval();
    if (!Number.isFinite(openStart)) {
      openStart = Math.floor(time / step) * step;
      return;
    }
    if (time - openStart > history()) {
      // a long gap: one column, then jump
      closeColumn(openStart);
      openStart = Math.floor(time / step) * step;
      return;
    }
    while (time >= openStart + step) {
      closeColumn(openStart);
      openStart += step;
    }
  };

  const noteTime = (time: number | undefined) => {
    if (time === undefined || !Number.isFinite(time)) return Date.now();
    if (!Number.isFinite(dataTime) || time >= dataTime) {
      dataTime = time;
      dataWall = perfNow();
    }
    return time;
  };

  /**
   * Column showing a time: the last one starting at or before it (a column
   * lasts until the next one), `null` for the open one or before the data
   */
  const columnAt = (time: number): Column | null => {
    if (Number.isFinite(openStart) && time >= openStart) return null;
    let lo = 0;
    let hi = columns.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (columns[mid]!.time <= time) lo = mid + 1;
      else hi = mid;
    }
    return lo > 0 ? columns[lo - 1]! : null;
  };

  // ----------------------------------------------------------------- field

  /** The live book as a column (sampled once per store version) */
  const headSource = (): HeatSource | null => {
    if (!Number.isFinite(openStart) || !(tick > 0)) return null;
    const version = store.version();
    if (!head || head.version !== version) head = { version, ...sampleBook() };
    return { time: openStart, bins: head.bins, sizes: head.sizes };
  };

  /**
   * The heat image of the view, rebuilt when its inputs change; the color
   * scale follows the 99th percentile of the visible non-empty cells
   * (eased): typical levels stay dim, only significant liquidity glows
   */
  const heatGrid = (
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    end: number,
    dt: number,
  ): HeatGrid | null => {
    const step = interval();
    const live = headSource();
    const maxWidth = Math.min(MAX_TEXELS, Math.ceil(plot.w));
    const maxHeight = Math.min(MAX_TEXELS, Math.ceil(plot.h));
    const rowBins = rowBucket((tick / (y1 - y0)) * plot.h);
    const lastSeq = columns.length ? columns[columns.length - 1]!.seq : -1;
    const key = [
      x0,
      x1,
      y0,
      y1,
      Math.floor(end / step),
      columns.length,
      lastSeq,
      head?.version ?? -1,
      maxWidth,
      maxHeight,
      rowBins,
      tick,
    ].join("|");
    if (key !== gridKey) {
      const sources: HeatSource[] = live ? [...columns, live] : columns;
      grid = buildHeatGrid(
        {
          sources,
          step,
          tick,
          x0,
          x1,
          y0,
          y1,
          end,
          maxWidth,
          maxHeight,
          rowBins,
        },
        grid,
      );
      gridKey = key;
      paintKey = "";
    }
    if (!grid) return null;
    // auto scale: a robust "hot" size, sampled at most 4 times a second
    const fixed = options.maxSize;
    if (fixed !== undefined && fixed > 0) scaleMax = fixed;
    else {
      const now = perfNow();
      if (now - scaleAt > 250 || !(scaleTarget > 0)) {
        const target = percentile(grid.cells, SCALE_QUANTILE);
        if (target > 0) scaleTarget = target;
        scaleAt = now;
        dist = sizeCdf(grid.cells, grid.version);
      }
      if (!(scaleMax > 0)) scaleMax = scaleTarget;
      else if (scaleTarget > 0 && Math.abs(scaleTarget / scaleMax - 1) > 1e-3)
        scaleMax += (scaleTarget - scaleMax) * ease(dt, 700);
    }
    const contrast = Math.max(0.01, options.contrast ?? 1);
    const k = scaleMax > 0 ? (HEAT_TABLE_SIZE * contrast) / scaleMax : 0;
    const paint = `${grid.version}|${k}|${dist?.version ?? -1}`;
    if (paint !== paintKey) {
      // the table maps a size (through `k`) to the mix of its absolute
      // intensity and its rank among the visible cells
      table = heatTable(lut, heatCurve(dist, scaleMax / contrast, curve));
      paintHeatGrid(grid, table, k);
      paintKey = paint;
    }
    return grid;
  };

  const visibleColumns = () => {
    const step = interval();
    const out: Column[] = [];
    // binary search of the first visible column
    let lo = 0;
    let hi = columns.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (columns[mid]!.time + step < viewX[0]) lo = mid + 1;
      else hi = mid;
    }
    for (let i = lo; i < columns.length; i++) {
      const c = columns[i]!;
      if (c.time > viewX[1]) break;
      out.push(c);
    }
    return out;
  };

  /** Trade volumes of a group of columns */
  interface Bubble {
    time: number;
    price: number;
    volume: number;
    buy: boolean;
  }
  type Flow = Pick<
    Column,
    "buyVolume" | "buyNotional" | "sellVolume" | "sellNotional"
  >;

  /**
   * Trades of the visible columns as bubbles: columns are grouped (by their
   * sequence, so groups stay put while the view scrolls) until a group is
   * BUBBLE_SPACING px wide; one bubble per side at the average price
   */
  const tradeBubbles = (
    visible: readonly Column[],
    columnPx: number,
  ): Bubble[] => {
    const step = interval();
    const k = Math.max(1, Math.ceil(BUBBLE_SPACING / Math.max(1e-6, columnPx)));
    const out: Bubble[] = [];
    let group = NaN;
    let t0 = 0;
    let t1 = 0;
    const sum = { bv: 0, bn: 0, sv: 0, sn: 0 };
    const flush = () => {
      const time = (t0 + t1) / 2;
      if (sum.sv > 0)
        out.push({ time, price: sum.sn / sum.sv, volume: sum.sv, buy: false });
      if (sum.bv > 0)
        out.push({ time, price: sum.bn / sum.bv, volume: sum.bv, buy: true });
      sum.bv = sum.bn = sum.sv = sum.sn = 0;
    };
    const add = (id: number, start: number, flow: Flow) => {
      const g = Math.floor(id / k);
      if (g !== group) {
        if (Number.isFinite(group)) flush();
        group = g;
        t0 = start;
      }
      t1 = start + step;
      sum.bv += flow.buyVolume;
      sum.bn += flow.buyNotional;
      sum.sv += flow.sellVolume;
      sum.sn += flow.sellNotional;
    };
    for (const c of visible) add(c.seq, c.time, c);
    if (Number.isFinite(openStart) && openStart <= viewX[1])
      add(seq, openStart, open);
    if (Number.isFinite(group)) flush();
    return out;
  };

  const clipPlot = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(plot.x, plot.y, plot.w, plot.h);
    ctx.clip();
  };

  /** Best bid / ask step lines and the translucent spread band between them */
  const drawBest = (
    ctx: CanvasRenderingContext2D,
    visible: readonly Column[],
    xOf: (t: number) => number,
    yOf: (p: number) => number,
    columnPx: number,
  ) => {
    if (options.bestLines === false) return;
    const step = interval();
    // [start, end, bid, ask]: a column lasts until the next one
    const rows: [number, number, number, number][] = visible.map((c) => [
      c.time,
      c.time + step,
      c.bestBid,
      c.bestAsk,
    ]);
    if (Number.isFinite(openStart))
      rows.push([
        openStart,
        openStart + step,
        store.bestBid(),
        store.bestAsk(),
      ]);
    if (!rows.length) return;
    for (let i = 0; i + 1 < rows.length; i++) rows[i]![1] = rows[i + 1]![0];
    // wide columns: steps; narrow ones: a line through the column centers
    const steps = columnPx >= 2;
    const xs = (row: readonly number[]): [number, number] => {
      const xa = xOf(row[0]!);
      const xb = xOf(row[1]!);
      return steps ? [xa, xb] : [(xa + xb) / 2, (xa + xb) / 2];
    };
    clipPlot(ctx);
    // the spread band: one polygon per run of valid columns (no overlapping
    // rectangles, so no seams where neighbours meet)
    ctx.beginPath();
    let run: (typeof rows)[number][] = [];
    const flushRun = () => {
      if (!run.length) return;
      run.forEach((row, i) => {
        const [xa, xb] = xs(row);
        const y = yOf(row[3]);
        if (i) ctx.lineTo(xa, y);
        else ctx.moveTo(xa, y);
        ctx.lineTo(xb, y);
      });
      for (let i = run.length - 1; i >= 0; i--) {
        const [xa, xb] = xs(run[i]!);
        const y = yOf(run[i]![2]);
        ctx.lineTo(xb, y);
        ctx.lineTo(xa, y);
      }
      ctx.closePath();
      run = [];
    };
    for (const row of rows) {
      const [, , bid, ask] = row;
      if (Number.isFinite(bid) && Number.isFinite(ask) && ask > bid)
        run.push(row);
      else flushRun();
    }
    flushRun();
    ctx.fillStyle = toCss(host.theme.text, dark ? 0.08 : 0.07);
    ctx.fill();
    ctx.lineJoin = "round";
    for (const [index, color] of [
      [2, colors.up],
      [3, colors.down],
    ] as const) {
      ctx.beginPath();
      let pen = false;
      for (const row of rows) {
        const price = row[index];
        if (!Number.isFinite(price)) {
          pen = false;
          continue;
        }
        const y = yOf(price);
        const [xa, xb] = xs(row);
        if (pen) ctx.lineTo(xa, y);
        else ctx.moveTo(xa, y);
        if (steps) ctx.lineTo(xb, y);
        pen = true;
      }
      // a dark halo keeps the line readable on hot cells
      ctx.strokeStyle = toCss(floor, 0.55);
      ctx.lineWidth = 3.5;
      ctx.stroke();
      ctx.strokeStyle = toCss(color);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  };

  /**
   * Trade bubbles: area ∝ volume (relative to the largest visible trade,
   * eased), translucent with a thin outline; the largest with their volume
   */
  const drawBubbles = (
    ctx: CanvasRenderingContext2D,
    bubbles: Bubble[],
    xOf: (t: number) => number,
    yOf: (p: number) => number,
    fontSize: number,
  ) => {
    if (!bubbles.length) return;
    let max = 0;
    for (const b of bubbles) {
      const x = xOf(b.time);
      if (x >= plot.x && x <= plot.x + plot.w) max = Math.max(max, b.volume);
    }
    // the reference follows the visible trades: fast up, slowly down
    if (max > 0)
      bubbleRef = bubbleRef > 0 ? Math.max(max, bubbleRef * 0.995) : max;
    const ref = options.bubbleVolume ?? bubbleRef;
    if (!(ref > 0)) return;
    const maxD = Math.max(BUBBLE_MIN, options.bubbleSize ?? BUBBLE_SIZE);
    const minD = Math.min(BUBBLE_MIN, maxD);
    const sized = bubbles
      .map((b) => ({
        ...b,
        d: clamp(Math.sqrt(b.volume / ref) * maxD, minD, maxD),
      }))
      .sort((a, b) => a.d - b.d);
    clipPlot(ctx);
    ctx.lineWidth = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = fontOf(host.theme, options, 600, Math.max(8, fontSize - 1));
    const rim: Rgba = dark ? [1, 1, 1, 1] : [0, 0, 0, 1];
    for (const b of sized) {
      const x = xOf(b.time);
      const y = yOf(b.price);
      const r = b.d / 2;
      if (x < plot.x - r || x > plot.x + plot.w + r) continue;
      if (y < plot.y - r || y > plot.y + plot.h + r) continue;
      const color = b.buy ? colors.up : colors.down;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(1, r - 0.5), 0, Math.PI * 2);
      ctx.fillStyle = toCss(color, 0.35);
      ctx.fill();
      ctx.strokeStyle = toCss(mixOklab(color, rim, 0.2), 0.9);
      ctx.stroke();
      if (b.d >= 26) {
        const text = fmt.compact(b.volume);
        if (ctx.measureText(text).width <= b.d - 6) {
          ctx.fillStyle = toCss(dark ? [1, 1, 1, 1] : [0.08, 0.08, 0.1, 1]);
          ctx.fillText(text, x, y + 0.5);
        }
      }
    }
    ctx.restore();
  };

  /**
   * Price buckets of `ry` rows of a side of the live book (the rows of the
   * field: bucket `b` holds the rows `b × ry` to `b × ry + ry - 1`), best first
   */
  const bookBuckets = (side: OrderBookSide, ry: number) => {
    const buckets: number[] = [];
    const sizes: number[] = [];
    const count = store.count(side);
    let rows = 0;
    let lastBin = NaN;
    for (let i = 0; i < count; i++) {
      const bin = Math.round(store.priceAt(side, i) / tick);
      if (bin !== lastBin) {
        if (++rows > depth()) break;
        lastBin = bin;
      }
      const b = Math.floor(bin / ry);
      const size = store.sizeAt(side, i);
      if (buckets.length && buckets[buckets.length - 1] === b)
        sizes[sizes.length - 1] += size;
      else {
        buckets.push(b);
        sizes.push(size);
      }
    }
    return { side, buckets, sizes };
  };

  /** The current book as horizontal bars right of the plot, with a size scale */
  const drawProfile = (
    ctx: CanvasRenderingContext2D,
    px: number,
    profileW: number,
    yOf: (p: number) => number,
    fontSize: number,
    ry: number,
  ) => {
    const theme = host.theme;
    const [y0, y1] = viewY;
    const rowPx = Math.max(1, ((tick * ry) / (y1 - y0)) * plot.h);
    // bucket b spans [(b ry - ½) tick, (b ry + ry - ½) tick)
    const lowOf = (b: number) => (b * ry - 0.5) * tick;
    const highOf = (b: number) => (b * ry + ry - 0.5) * tick;
    let maxSize = 0;
    const sides = (["bid", "ask"] as const).map((side) => {
      const levels = bookBuckets(side, ry);
      levels.buckets.forEach((b, i) => {
        if (highOf(b) >= y0 && lowOf(b) <= y1)
          maxSize = Math.max(maxSize, levels.sizes[i]!);
      });
      return levels;
    });
    // a fine "nice" scale (the largest bar fills 75-100 % of the panel),
    // changed only on a clear change: no jumping bars
    if (maxSize > profileMax || maxSize < profileMax * 0.6 || !(profileMax > 0))
      profileMax = fineCeil(maxSize);
    if (!(profileMax > 0)) return;
    const left = px + 2;
    const inner = Math.max(4, profileW - 6);
    // faint guides at half and full scale
    ctx.strokeStyle = toCss(theme.text, 0.07);
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    for (const f of [0.5, 1]) {
      const x = Math.round(left + inner * f) - 0.5;
      ctx.moveTo(x, plot.y);
      ctx.lineTo(x, plot.y + plot.h);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.save();
    ctx.beginPath();
    ctx.rect(px, plot.y, profileW, plot.h);
    ctx.clip();
    // rows on whole pixels from the bucket edges; a 1 px gap when tall
    const gap = rowPx >= 4 ? 1 : 0;
    const bar = (b: number, s: number) => {
      const top = Math.round(yOf(highOf(b)));
      const bottom = Math.max(top + 1, Math.round(yOf(lowOf(b))) - gap);
      const w = Math.max(1, Math.min(inner, (s / profileMax) * inner));
      ctx.rect(left, top, w, bottom - top);
    };
    for (const { side, buckets, sizes } of sides) {
      const color = side === "bid" ? colors.up : colors.down;
      ctx.beginPath();
      for (let i = 1; i < buckets.length; i++) {
        const b = buckets[i]!;
        if (highOf(b) >= y0 && lowOf(b) <= y1) bar(b, sizes[i]!);
      }
      ctx.fillStyle = toCss(color, dark ? 0.62 : 0.55);
      ctx.fill();
      // the best bucket, solid
      const best = buckets[0];
      if (best !== undefined && highOf(best) >= y0 && lowOf(best) <= y1) {
        ctx.beginPath();
        bar(best, sizes[0]!);
        ctx.fillStyle = toCss(color);
        ctx.fill();
      }
    }
    ctx.restore();
    // size scale below the panel
    const y = Math.round(plot.y + plot.h + 4) + 0.5;
    ctx.strokeStyle = toCss(theme.textMuted, 0.7);
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(left + inner, y);
    for (const f of [0, 0.5, 1]) {
      const x = Math.round(left + inner * f) + 0.5;
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 3);
    }
    ctx.stroke();
    ctx.font = fontOf(theme, options, 400, Math.max(8, fontSize - 1));
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.textBaseline = "top";
    const text = fmt.compact(profileMax);
    const tw = ctx.measureText(text).width;
    ctx.textAlign = "right";
    ctx.fillText(text, left + inner + 2, y + 4);
    if (tw + ctx.measureText("0").width + 8 < inner) {
      ctx.textAlign = "left";
      ctx.fillText("0", left - 1, y + 4);
    }
  };

  /** Hovered cell: pointer, time, price row (bucket of `ry` ticks) */
  interface HoverCell {
    hx: number;
    hy: number;
    /** Time under the pointer */
    time: number;
    /** Start of the hovered column (NaN outside the data) */
    start: number;
    column: Column | null;
    /** Bucket: rows `bucket × ry` to `bucket × ry + ry - 1` */
    bucket: number;
    ry: number;
    /** Lowest / highest row price of the bucket and its center */
    low: number;
    high: number;
    rowPrice: number;
  }

  const hoverCell = (ry: number): HoverCell | null => {
    if (!hoverAt || options.tooltip === false || !(tick > 0) || drag)
      return null;
    if (!viewYReady) return null;
    const [hx, hy] = hoverAt;
    if (
      hx < plot.x ||
      hx > plot.x + plot.w ||
      hy < plot.y ||
      hy > plot.y + plot.h
    )
      return null;
    const [x0, x1] = viewX;
    const [y0, y1] = viewY;
    const time = x0 + ((hx - plot.x) / plot.w) * (x1 - x0);
    const price = y0 + ((plot.y + plot.h - hy) / plot.h) * (y1 - y0);
    const bucket = Math.floor(Math.round(price / tick) / ry);
    const digits = Math.min(12, decimalsOf(tick) + 2);
    const low = +(bucket * ry * tick).toFixed(digits);
    const high = +((bucket * ry + ry - 1) * tick).toFixed(digits);
    const rowPrice = +((low + high) / 2).toFixed(digits);
    const column = columnAt(time);
    const start = column
      ? column.time
      : Number.isFinite(openStart) && time >= openStart
        ? openStart
        : NaN;
    return { hx, hy, time, start, column, bucket, ry, low, high, rowPrice };
  };

  /** Price / time tag: filled (best bid / ask, hover) or outlined (last trade) */
  const drawTag = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    color: Rgba,
    filled: boolean,
    align: "left" | "center" = "left",
  ) => {
    const w = Math.min(ctx.measureText(text).width + 10, maxWidth);
    const left = align === "center" ? x - w / 2 : x;
    ctx.fillStyle = filled ? toCss(color) : toCss(floor);
    roundRect(ctx, left, y - TAG_HEIGHT / 2, w, TAG_HEIGHT, 3);
    ctx.fill();
    if (!filled) {
      ctx.strokeStyle = toCss(color);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.fillStyle = filled
      ? luminance(color) > 0.6
        ? "#111"
        : "#fff"
      : toCss(color);
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(text, align === "center" ? x : left + 5, y + 0.5);
  };

  // ---------------------------------------------------------------- draw

  /** A packed ramp color as CSS (`packColor`), alpha dropped */
  const rampCss = (packed: number) => {
    const r = packed & 255;
    const g = (packed >>> 8) & 255;
    const b = (packed >>> 16) & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  /**
   * Legend in the top-left corner of the plot: the color ramp with the size
   * range it covers (cold = empty, hot = the largest size) and what the
   * bubbles are, so a color can be read as a size
   */
  const drawLegend = (ctx: CanvasRenderingContext2D, fontSize: number) => {
    if (plot.w < 200 || plot.h < 96) return;
    const theme = host.theme;
    const l = labels();
    const unit = options.sizeUnit?.trim();
    const title = unit ? `${l.liquidity} · ${unit}` : l.liquidity;
    const bold = fontOf(theme, options, 600, fontSize - 1);
    const regular = fontOf(theme, options, 400, fontSize - 1);
    const small = fontSize - 2;
    const barW = 76;
    const barH = 7;
    const max = scaleMax > 0 ? fmt.size(scaleMax) : "–";
    // measures
    ctx.font = bold;
    const titleW = ctx.measureText(title).width;
    ctx.font = fontOf(theme, options, 400, small);
    const lowW = ctx.measureText("0").width;
    const highW = ctx.measureText(max).width;
    ctx.font = regular;
    const hintW = ctx.measureText(l.bubbleHint).width;
    const dotsW = small + 10;
    const innerW = Math.max(barW, titleW, hintW + dotsW);
    const pad = 7;
    const boxW = innerW + pad * 2;
    const rowH = fontSize - 1;
    const boxH = pad * 2 + rowH + 3 + barH + 2 + small + 6 + rowH;
    const bx = plot.x + 8;
    const by = plot.y + 8;
    if (bx + boxW > plot.x + plot.w - 8) return;
    // panel: a full subtle border, no accent edge
    ctx.fillStyle = toCss(theme.background, dark ? 0.82 : 0.88);
    ctx.strokeStyle = toCss(theme.axis, 0.6);
    ctx.lineWidth = 1;
    roundRect(ctx, bx + 0.5, by + 0.5, boxW, boxH, 6);
    ctx.fill();
    ctx.stroke();
    const left = bx + pad;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    // title
    ctx.font = bold;
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.fillText(title, left, by + pad + rowH / 2);
    // ramp
    const rampY = by + pad + rowH + 3;
    const gradient = ctx.createLinearGradient(left, rampY, left + barW, rampY);
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const packed = lut[Math.round(t * (lut.length - 1))] ?? 0;
      gradient.addColorStop(t, rampCss(packed));
    }
    ctx.fillStyle = gradient;
    roundRect(ctx, left, rampY, barW, barH, 2);
    ctx.fill();
    // its size range
    ctx.font = fontOf(theme, options, 400, small);
    ctx.fillStyle = toCss(theme.textMuted);
    const labelY = rampY + barH + 2 + small / 2;
    ctx.fillText("0", left, labelY);
    ctx.textAlign = "right";
    ctx.fillText(max, left + Math.max(barW, highW + lowW), labelY);
    ctx.textAlign = "left";
    // trades
    const hintY = labelY + small / 2 + 6 + rowH / 2;
    const dot = small / 2;
    for (const [i, color] of [colors.up, colors.down].entries()) {
      ctx.fillStyle = toCss(color, 0.9);
      ctx.beginPath();
      ctx.arc(left + dot + i * (small + 4), hintY, dot, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.font = regular;
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.fillText(l.bubbleHint, left + dotsW, hintY);
  };

  function draw(now: number): boolean {
    const ctx = host.ctx;
    if (!ctx) return false;
    const { width, height, dpr, theme } = host;
    const dt = lastFrame ? now - lastFrame : 0;
    lastFrame = now;
    const l = labels();
    const fontSize = options.fontSize ?? (width < 420 ? 10 : 11);
    const regular = fontOf(theme, options, 400, fontSize);
    const bold = fontOf(theme, options, 600, fontSize);
    const step = interval();
    const live = !Number.isFinite(dataTime);
    if (live && store.count("bid") + store.count("ask") > 0)
      advance(Date.now());
    // a monotonic clock: the view never jumps back when data arrives late
    const clock = nowTime();
    shownTime =
      Number.isFinite(shownTime) && clock > shownTime - step * 4
        ? Math.max(shownTime, clock)
        : clock;
    const time = shownTime;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // layout
    ensureTick();
    const mid = store.mid();
    ctx.font = bold;
    const sample = fmt.price(Number.isFinite(mid) ? mid * 1.0001 : 0);
    const axisW = Math.ceil(ctx.measureText(sample).width) + 18;
    ctx.font = regular;
    const profileW =
      options.profile === false ? 0 : Math.round(clamp(width * 0.12, 56, 120));
    const timeH = fontSize + 12;
    plot = {
      x: 0,
      y: 0,
      w: Math.max(10, width - axisW - profileW),
      h: Math.max(10, height - timeH),
    };
    const px = plot.x + plot.w;
    const right = px + profileW;

    // view: the following view fits the data (history fills the plot from
    // the left) and keeps the price range while the market stays inside it
    if (!Number.isFinite(windowSpan))
      windowSpan = Math.max(step * 10, options.window ?? 60_000);
    if (follow) {
      const first = columns.length ? columns[0]!.time : openStart;
      // the view ends at the live time: the open column (the live book) is
      // cut by the right edge, so no gap opens while it is being sampled
      viewX = fitTimeRange(
        first,
        time,
        windowSpan,
        Math.min(windowSpan, step * 60),
      );
      let lo = store.bestBid();
      let hi = store.bestAsk();
      for (const c of visibleColumns()) {
        if (Number.isFinite(c.bestBid) && !(c.bestBid >= lo)) lo = c.bestBid;
        if (Number.isFinite(c.bestAsk) && !(c.bestAsk <= hi)) hi = c.bestAsk;
      }
      if (!Number.isFinite(lo)) lo = hi;
      if (!Number.isFinite(hi)) hi = lo;
      const minSpan = tick > 0 ? tick * Math.max(40, plot.h / 6) : 0;
      const fixed =
        options.priceSpan ?? (Number.isFinite(ySpan) ? ySpan : undefined);
      if (minSpan > 0 || fixed !== undefined) {
        yTarget = fitPriceRange(yTarget, lo, hi, minSpan, fixed);
        const [t0, t1] = yTarget;
        if (Number.isFinite(t0) && Number.isFinite(t1)) {
          if (!viewYReady) {
            viewY = [t0, t1];
            viewYReady = true;
          } else {
            const k = ease(dt, 280);
            viewY = [
              viewY[0] + (t0 - viewY[0]) * k,
              viewY[1] + (t1 - viewY[1]) * k,
            ];
          }
        }
      }
    }
    const [x0, x1] = viewX;
    const [y0, y1] = viewY;
    const xOf = (t: number) => plot.x + ((t - x0) / (x1 - x0)) * plot.w;
    const yOf = (p: number) =>
      plot.y + plot.h - ((p - y0) / (y1 - y0)) * plot.h;
    const ready = viewYReady && tick > 0;
    const visible = visibleColumns();
    const columnPx = (step / (x1 - x0)) * plot.w;
    /** Price rows per drawn row (bucketing of thin rows), as the field */
    let ry = ready ? rowBucket((tick / (y1 - y0)) * plot.h) : 1;

    // data layer: the heat field (an opaque image over the cold color)
    const floorCss = toCss(floor);
    if (renderer) {
      const canvas = renderer.canvas;
      canvas.style.left = `${plot.x}px`;
      canvas.style.top = `${plot.y}px`;
      canvas.style.width = `${plot.w}px`;
      canvas.style.height = `${plot.h}px`;
      const bw = Math.max(1, Math.round(plot.w * dpr));
      const bh = Math.max(1, Math.round(plot.h * dpr));
      if (canvas.width !== bw || canvas.height !== bh) renderer.resize(bw, bh);
      const heat =
        ready && Number.isFinite(openStart)
          ? heatGrid(x0, x1, y0, y1, time, dt)
          : null;
      if (heat) ry = heat.rowBins;
      // the image rectangle in device pixels of the plot canvas
      const sx = bw / plot.w;
      const sy = bh / plot.h;
      const rect: [number, number, number, number] = heat
        ? [
            (xOf(heat.t0) - plot.x) * sx,
            (yOf(heat.p1) - plot.y) * sy,
            (xOf(heat.t1) - plot.x) * sx,
            (yOf(heat.p0) - plot.y) * sy,
          ]
        : [0, 0, 0, 0];
      renderer.render(heat, rect, floor);
    } else {
      ctx.fillStyle = floorCss;
      ctx.fillRect(plot.x, plot.y, plot.w, plot.h);
    }

    // no grid inside the field (it would read as liquidity): short tick
    // marks on the time and price axes instead
    const yTicks = ready
      ? linearTicks(y0, y1, Math.max(2, Math.floor(plot.h / 44)))
      : [];
    const xt = timeTicks(
      x0,
      x1,
      Math.max(2, Math.floor(plot.w / 75)),
      undefined,
      options.timeZone ?? "local",
    );
    ctx.strokeStyle = toCss(theme.axis);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const p of yTicks) {
      const y = Math.round(yOf(p)) + 0.5;
      ctx.moveTo(right, y);
      ctx.lineTo(right + 4, y);
    }
    for (const t of xt.values) {
      const x = Math.round(xOf(t)) + 0.5;
      if (x <= plot.x + 1 || x >= px - 1) continue;
      ctx.moveTo(x, plot.y + plot.h);
      ctx.lineTo(x, plot.y + plot.h + 4);
    }
    ctx.stroke();

    // trades, then the best bid / ask on top of them, the current book
    if (ready) {
      if (options.bubbles !== false)
        drawBubbles(ctx, tradeBubbles(visible, columnPx), xOf, yOf, fontSize);
      drawBest(ctx, visible, xOf, yOf, columnPx);
      if (profileW) drawProfile(ctx, px, profileW, yOf, fontSize, ry);
    }

    // frame
    ctx.strokeStyle = toCss(theme.axis);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, Math.round(plot.y + plot.h) + 0.5);
    ctx.lineTo(width, Math.round(plot.y + plot.h) + 0.5);
    if (profileW) {
      ctx.moveTo(Math.round(px) + 0.5, plot.y);
      ctx.lineTo(Math.round(px) + 0.5, plot.y + plot.h);
    }
    ctx.moveTo(Math.round(right) + 0.5, plot.y);
    ctx.lineTo(Math.round(right) + 0.5, plot.y + plot.h);
    ctx.stroke();

    if (options.legend !== false) drawLegend(ctx, fontSize);

    const cell = ready ? hoverCell(ry) : null;

    // time axis (the hover time tag hides the ticks it covers)
    ctx.font = regular;
    const hoverTime = cell
      ? formatClock(
          Number.isFinite(cell.start) ? cell.start : cell.time,
          step < 1000,
          options.timeZone,
        )
      : "";
    const hoverHalf = cell ? ctx.measureText(hoverTime).width / 2 + 8 : 0;
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (const t of xt.values) {
      const x = xOf(t);
      const text = xt.format(t);
      const half = ctx.measureText(text).width / 2;
      // labels stay whole inside the plot
      if (x - half < plot.x + 2 || x + half > px - 2) continue;
      if (cell && Math.abs(x - cell.hx) < hoverHalf + half) continue;
      ctx.fillText(text, x, plot.y + plot.h + 6);
    }

    // price axis: pinned tags (best ask / bid, last trade) win over the
    // ticks, the hover tag over everything
    const last = lastTrade;
    const pins: { price: number; color: Rgba; filled: boolean }[] = [
      { price: store.bestAsk(), color: colors.down, filled: true },
      { price: store.bestBid(), color: colors.up, filled: true },
    ];
    if (
      last &&
      last.price !== store.bestBid() &&
      last.price !== store.bestAsk()
    )
      pins.push({
        price: last.price,
        color: last.side === "buy" ? colors.up : colors.down,
        filled: false,
      });
    const shownPins = ready
      ? pins.filter(
          (p) => Number.isFinite(p.price) && p.price >= y0 && p.price <= y1,
        )
      : [];
    const hoverY = cell ? Math.round(yOf(cell.rowPrice)) + 0.5 : NaN;
    const layout = layoutAxisLabels(
      shownPins.map((p): AxisLabel => ({ y: yOf(p.price), h: TAG_HEIGHT })),
      cell ? { y: hoverY, h: TAG_HEIGHT } : null,
      yTicks.map(yOf),
      fontSize + 2,
      [plot.y, plot.y + plot.h],
    );
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    yTicks.forEach((p, i) => {
      if (layout.ticks[i]) ctx.fillText(fmt.price(p), right + 6, yOf(p));
    });
    ctx.font = bold;
    shownPins.forEach((pin, i) => {
      const y = layout.pinned[i];
      if (y === null || y === undefined) return;
      const at = yOf(pin.price);
      if (Math.abs(y - at) > 1) {
        // a moved tag points at its price
        ctx.strokeStyle = toCss(pin.color);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(right - 4, at);
        ctx.lineTo(right + 1, y);
        ctx.stroke();
      }
      drawTag(
        ctx,
        fmt.price(pin.price),
        right + 1,
        y,
        width - right - 2,
        pin.color,
        pin.filled,
      );
    });

    // crosshair, hover tags and tooltip
    drawHover(ctx, xOf, yOf, right, l, cell, hoverY, hoverTime);
    ctx.font = regular;

    host.describe(
      `${options.ariaLabel ?? l.name}. ${l.bid} ${fmt.price(store.bestBid())}, ${l.ask} ${fmt.price(store.bestAsk())}.`,
    );
    // keep scrolling while following a live market
    const fresh = live || perfNow() - dataWall < 2000;
    return (
      (follow && fresh && Number.isFinite(openStart)) ||
      (viewYReady && yTarget !== null && Math.abs(viewY[0] - yTarget[0]) > 1e-9)
    );
  }

  function drawHover(
    ctx: CanvasRenderingContext2D,
    xOf: (t: number) => number,
    yOf: (p: number) => number,
    right: number,
    l: OrderBookHeatmapLabels,
    cell: HoverCell | null,
    hoverY: number,
    timeText: string,
  ) {
    const { theme } = host;
    if (!cell) {
      host.tooltip.style.display = "none";
      if (hoverKey) {
        hoverKey = "";
        emitter.emit("hover", null);
      }
      return;
    }
    const { hx, hy, time, start, column, bucket, ry, low, high, rowPrice } =
      cell;
    const inBucket = (bin: number) => Math.floor(bin / ry) === bucket;
    const step = interval();
    let size = 0;
    let bestBid = NaN;
    let bestAsk = NaN;
    let buyVolume = 0;
    let sellVolume = 0;
    if (column) {
      for (let i = 0; i < column.bins.length; i++) {
        if (inBucket(column.bins[i]!)) size += column.sizes[i]!;
      }
      ({ bestBid, bestAsk, buyVolume, sellVolume } = column);
    } else if (Number.isFinite(start)) {
      const live = headSource();
      if (live) {
        for (let i = 0; i < live.bins.length; i++) {
          if (inBucket(live.bins[i]!)) size += live.sizes[i]!;
        }
      }
      bestBid = store.bestBid();
      bestAsk = store.bestAsk();
      buyVolume = open.buyVolume;
      sellVolume = open.sellVolume;
    }
    // a bucket holding both sides (around the spread) has no side
    const side: OrderBookSide | null =
      high <= bestBid ? "bid" : low >= bestAsk ? "ask" : null;

    // crosshair
    ctx.strokeStyle = toCss(theme.text, 0.5);
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(Math.round(hx) + 0.5, plot.y);
    ctx.lineTo(Math.round(hx) + 0.5, plot.y + plot.h);
    ctx.moveTo(plot.x, hoverY);
    ctx.lineTo(right, hoverY);
    ctx.stroke();
    ctx.setLineDash([]);
    if (Number.isFinite(start)) {
      // outline of the hovered cell
      const cx0 = xOf(start);
      const cx1 = xOf(start + step);
      const cy0 = yOf((bucket * ry + ry - 0.5) * tick);
      const cy1 = yOf((bucket * ry - 0.5) * tick);
      ctx.strokeStyle = toCss(theme.text, 0.85);
      ctx.strokeRect(cx0, cy0, Math.max(2, cx1 - cx0), Math.max(2, cy1 - cy0));
    }
    // price and time tags
    ctx.font = fontOf(
      theme,
      options,
      600,
      options.fontSize ?? (host.width < 420 ? 10 : 11),
    );
    drawTag(
      ctx,
      fmt.price(rowPrice),
      right + 1,
      hoverY,
      host.width - right - 2,
      theme.text,
      true,
    );
    drawTag(
      ctx,
      timeText,
      clamp(hx, plot.x + 40, plot.x + plot.w - 40),
      plot.y + plot.h + TAG_HEIGHT / 2 + 2,
      plot.w,
      theme.text,
      true,
      "center",
    );

    const sideColor =
      side === "bid" ? colors.up : side === "ask" ? colors.down : null;
    tooltipHtml(
      doc,
      host.tooltip,
      {
        text: formatClock(
          Number.isFinite(start) ? start : time,
          true,
          options.timeZone,
        ),
        color: undefined,
        // the side as a small colored badge (no accent border)
        badge:
          side && sideColor
            ? {
                text: side === "bid" ? l.bidSide : l.askSide,
                color: toCss(sideColor),
              }
            : undefined,
      },
      [
        [
          l.price,
          ry > 1
            ? `${fmt.price(low)} – ${fmt.price(high)}`
            : fmt.price(rowPrice),
        ],
        [l.liquidity, withUnit(fmt.size(size))],
        [l.buys, withUnit(fmt.size(buyVolume))],
        [l.sells, withUnit(fmt.size(sellVolume))],
      ],
    );
    host.tooltip.style.display = "block";
    host.placeTooltip(
      host.tooltip,
      hx,
      hy,
      hx > plot.w * 0.6 ? "left" : "right",
    );

    const key = `${start}|${bucket}|${ry}|${size}|${buyVolume}|${sellVolume}`;
    if (key !== hoverKey) {
      hoverKey = key;
      const event: OrderBookHeatmapHoverEvent = {
        time: Number.isFinite(start) ? start : time,
        price: low,
        priceHigh: high,
        size,
        side,
        buyVolume,
        sellVolume,
      };
      emitter.emit("hover", event);
    }
  }

  // ------------------------------------------------------------ renderer

  const initRenderer = async (exclude: Set<ChartRendererKind> = new Set()) => {
    const token = ++rendererToken;
    const next = await createHeatFieldRenderer(
      options.renderer ?? "auto",
      () => {
        const canvas = doc.createElement("canvas");
        Object.assign(canvas.style, {
          position: "absolute",
          left: "0",
          top: "0",
          pointerEvents: "none",
        });
        canvas.setAttribute("aria-hidden", "true");
        return canvas;
      },
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
    if (next) {
      root.dataset.renderer = next.kind;
      root.insertBefore(next.canvas, host.canvas);
      emitter.emit("renderer", next.kind);
    } else delete root.dataset.renderer;
    resolveReady(next?.kind ?? null);
    host.invalidate();
  };
  const unfollowDefault = followDefaultRenderer(
    () => options.renderer,
    () => void initRenderer(),
  );

  // --------------------------------------------------------- interaction

  const setFollow = (value: boolean) => {
    if (follow === value) return;
    follow = value;
    emitter.emit("follow", value);
  };

  /** Keeps a panned time range near the data (half a view of margin) */
  const clampTime = (range: [number, number]): [number, number] => {
    const first = columns.length ? columns[0]!.time : openStart;
    if (!Number.isFinite(first)) return range;
    const span = range[1] - range[0];
    const latest = Number.isFinite(shownTime) ? shownTime : nowTime();
    const max = latest + interval() + span / 2;
    const start = Math.max(first - span / 2, Math.min(range[0], max - span));
    return [start, start + span];
  };

  const onPointerDown = (event: PointerEvent) => {
    if (options.interactive === false) return;
    const [x, y] = localPoint(root, event);
    root.setPointerCapture?.(event.pointerId);
    drag = {
      x,
      y,
      viewX: [...viewX],
      viewY: [...viewY],
      axis: x > plot.x + plot.w,
      span: viewY[1] - viewY[0],
    };
  };
  const onPointerMove = (event: PointerEvent) => {
    const [x, y] = localPoint(root, event);
    hoverAt = [x, y];
    if (drag) {
      const dx = x - drag.x;
      const dy = y - drag.y;
      if (drag.axis) {
        // dragging the price axis scales the prices around the center
        const span = drag.span * Math.exp(dy * 0.006);
        const c = (drag.viewY[0] + drag.viewY[1]) / 2;
        ySpan = span;
        viewY = [c - span / 2, c + span / 2];
        yTarget = [viewY[0], viewY[1]];
      } else if (Math.abs(dx) + Math.abs(dy) > 3) {
        setFollow(false);
        const tx = ((drag.viewX[1] - drag.viewX[0]) / plot.w) * dx;
        const ty = ((drag.viewY[1] - drag.viewY[0]) / plot.h) * dy;
        viewX = clampTime([drag.viewX[0] - tx, drag.viewX[1] - tx]);
        viewY = [drag.viewY[0] + ty, drag.viewY[1] + ty];
      }
    }
    host.invalidate();
  };
  const onPointerUp = (event: PointerEvent) => {
    root.releasePointerCapture?.(event.pointerId);
    drag = null;
    host.invalidate();
  };
  const onPointerLeave = () => {
    if (drag) return;
    hoverAt = null;
    host.invalidate();
  };
  const zoomTime = (factor: number, anchorX: number) => {
    const [a, b] = viewX;
    const span = clamp(
      (follow ? windowSpan : b - a) * factor,
      interval() * 10,
      history(),
    );
    windowSpan = span;
    if (!follow) {
      const t = a + ((anchorX - plot.x) / plot.w) * (b - a);
      const r = (t - a) / (b - a);
      viewX = clampTime([t - span * r, t + span * (1 - r)]);
    }
    host.invalidate();
  };
  const zoomPrice = (factor: number) => {
    const span = clamp(
      (viewY[1] - viewY[0]) * factor,
      tick * 6 || 1e-9,
      Infinity,
    );
    const c = (viewY[0] + viewY[1]) / 2;
    ySpan = span;
    viewY = [c - span / 2, c + span / 2];
    yTarget = [viewY[0], viewY[1]];
    host.invalidate();
  };
  const onWheel = (event: WheelEvent) => {
    if (options.interactive === false || !(event.ctrlKey || event.metaKey))
      return;
    event.preventDefault();
    const [x] = localPoint(root, event);
    const factor = Math.exp(event.deltaY * 0.002);
    if (event.shiftKey || x > plot.x + plot.w) zoomPrice(factor);
    else zoomTime(factor, x);
  };
  const onDoubleClick = () => {
    if (options.interactive === false) return;
    instance.resetView();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (options.interactive === false) return;
    switch (event.key) {
      case "+":
      case "=":
        zoomTime(0.8, plot.x + plot.w);
        break;
      case "-":
        zoomTime(1.25, plot.x + plot.w);
        break;
      case "ArrowUp":
      case "ArrowDown": {
        if (event.shiftKey) {
          zoomPrice(event.key === "ArrowUp" ? 0.8 : 1.25);
          break;
        }
        setFollow(false);
        const d =
          (viewY[1] - viewY[0]) * 0.1 * (event.key === "ArrowUp" ? 1 : -1);
        viewY = [viewY[0] + d, viewY[1] + d];
        host.invalidate();
        break;
      }
      case "ArrowLeft":
      case "ArrowRight": {
        setFollow(false);
        const d =
          (viewX[1] - viewX[0]) * 0.1 * (event.key === "ArrowLeft" ? -1 : 1);
        viewX = clampTime([viewX[0] + d, viewX[1] + d]);
        host.invalidate();
        break;
      }
      case "0":
      case "Home":
        instance.resetView();
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerup", onPointerUp);
  root.addEventListener("pointercancel", onPointerUp);
  root.addEventListener("pointerleave", onPointerLeave);
  root.addEventListener("wheel", onWheel, { passive: false });
  root.addEventListener("dblclick", onDoubleClick);
  root.addEventListener("keydown", onKeyDown);

  // ----------------------------------------------------------------- api

  const applyOne = (delta: OrderBookDelta) => {
    const time = noteTime(delta.time);
    if (store.count("bid") + store.count("ask") > 0) {
      ensureTick();
      advance(time);
    }
    store.applyDelta(delta);
  };

  const instance: OrderBookHeatmapInstance = {
    setBook(snapshot) {
      const time = noteTime(snapshot.time);
      if (store.count("bid") + store.count("ask") > 0) advance(time);
      store.setSnapshot(snapshot);
      ensureTick();
      refreshFormat();
      if (!Number.isFinite(openStart)) advance(time);
      host.invalidate();
    },
    applyDeltas(deltas) {
      if (Array.isArray(deltas)) {
        for (const d of deltas as readonly OrderBookDelta[]) applyOne(d);
      } else applyOne(deltas as OrderBookDelta);
      if (!Number.isFinite(openStart) && tick > 0) advance(nowTime());
      host.invalidate();
    },
    addTrades(trades) {
      const list: readonly MarketTrade[] = Array.isArray(trades)
        ? (trades as readonly MarketTrade[])
        : [trades as MarketTrade];
      for (const trade of list) {
        if (!(trade.size > 0) || !Number.isFinite(trade.price)) continue;
        if (Number.isFinite(dataTime)) {
          noteTime(trade.time);
          advance(trade.time);
        }
        const target =
          !Number.isFinite(openStart) || trade.time >= openStart
            ? open
            : columnAt(trade.time);
        if (target) {
          if (trade.side === "buy") {
            target.buyVolume += trade.size;
            target.buyNotional += trade.size * trade.price;
          } else {
            target.sellVolume += trade.size;
            target.sellNotional += trade.size * trade.price;
          }
        }
        if (!lastTrade || trade.time >= lastTrade.time) lastTrade = trade;
      }
      host.invalidate();
    },
    clear() {
      store.clear();
      clearHistory();
      lastTrade = null;
      dataTime = NaN;
      tick = 0;
      ySpan = NaN;
      yTarget = null;
      viewYReady = false;
      host.invalidate();
    },
    setOptions(next) {
      const previous = options;
      options = next;
      applyTexts();
      if (
        next.tickSize !== previous.tickSize ||
        (next.interval ?? 100) !== (previous.interval ?? 100)
      ) {
        clearHistory();
        tick = 0;
        ySpan = NaN;
        ensureTick();
      }
      if (next.window !== previous.window) windowSpan = NaN;
      if (next.priceSpan !== previous.priceSpan) ySpan = NaN;
      if ((next.renderer ?? "auto") !== (previous.renderer ?? "auto"))
        void initRenderer();
      refreshColors();
      refreshFormat();
      host.invalidate();
    },
    resetView() {
      windowSpan = NaN;
      ySpan = NaN;
      yTarget = null;
      setFollow(true);
      host.invalidate();
    },
    getRenderer: () => renderer?.kind ?? null,
    ready,
    getStore: () => store,
    on: (event, handler) => emitter.on(event, handler),
    resize() {
      host.invalidate();
    },
    destroy() {
      destroyed = true;
      unfollowDefault();
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("dblclick", onDoubleClick);
      root.removeEventListener("keydown", onKeyDown);
      renderer?.destroy();
      renderer = null;
      emitter.clear();
      host.destroy();
      resolveReady(null);
    },
  };

  applyTexts();
  refreshColors();
  void initRenderer();
  return instance;
};
