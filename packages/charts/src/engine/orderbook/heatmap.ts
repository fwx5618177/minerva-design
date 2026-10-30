// createOrderBookHeatmap: Bookmap-style liquidity heatmap. The book is
// sampled every `interval` ms into a column of price rows; the visible
// columns are rasterized into one image (a texel per column and price row,
// see field.ts) drawn with nearest filtering by a WebGPU / WebGL / Canvas2D
// backend over the cold end of the ramp: a continuous field without seams.
// The best bid / ask step lines, the spread band, the trade bubbles, the
// grid, the axes, the book profile, the crosshair and the tooltip are drawn
// on a Canvas2D layer above.

import { luminance, mixOklab, oklabRamp, toCss, type Rgba } from "../color";
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
/** Quantile of the visible sizes at the hottest color (auto scale) */
const SCALE_QUANTILE = 0.98;
/** Gamma of the color curve (> 1: less noise at the cold end) */
const HEAT_GAMMA = 1.4;

/**
 * Heat ramps, interpolated in OKLab; the first color is also the empty
 * field. Dark: from deep navy, lightness rises through blue, cyan and green
 * to yellow, then the hottest walls turn orange / red (the Bookmap
 * convention). Light: from a pale tint, lightness falls through blue and
 * violet to crimson.
 */
const DARK_RAMP = [
  "#0a1830",
  "#0f2c57",
  "#134a8a",
  "#1670b4",
  "#1aa0bf",
  "#2fc3a0",
  "#8ad65a",
  "#e8dc3f",
  "#ffa733",
  "#ff5a2e",
];
const LIGHT_RAMP = [
  "#eef4fb",
  "#cfe1f6",
  "#9fc2ee",
  "#679ee2",
  "#3a73cf",
  "#3f4bb0",
  "#62309a",
  "#9c2783",
  "#d12c52",
];
/** Height of the price tags of the axis, in pixels */
const TAG_HEIGHT = 16;
/** Smallest distance between two trade bubbles' columns, in pixels */
const BUBBLE_SPACING = 6;

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
    case "sqrt":
      return Math.sqrt(r);
    default:
      // one decade: a tenth of the hottest size is a fifth of the ramp
      return Math.log10(1 + 9 * r);
  }
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
    const ramp = (
      options.colors?.length ? options.colors : dark ? DARK_RAMP : LIGHT_RAMP
    ).map(resolve);
    // the field is opaque: the empty color is the cold end of the ramp
    floor = ramp[0] ?? background;
    lut = oklabRamp(ramp.length > 1 ? ramp : [floor, floor], LUT_SIZE);
    const scale = options.colorScale ?? "log";
    // a mild gamma after the scale: the thin noise of the book stays near
    // the cold end, the walls stand out
    table = heatTable(lut, (r) => heatIntensity(r, 1, scale, 1) ** HEAT_GAMMA);
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

  const clearHistory = () => {
    columns = [];
    grid = null;
    gridKey = paintKey = "";
    head = null;
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
   * scale follows the 98th percentile of the visible sizes (eased), so the
   * whole ramp is used in light and dark themes alike
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
      tick,
    ].join("|");
    if (key !== gridKey) {
      const sources: HeatSource[] = live ? [...columns, live] : columns;
      grid = buildHeatGrid(
        { sources, step, tick, x0, x1, y0, y1, end, maxWidth, maxHeight },
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
      }
      if (!(scaleMax > 0)) scaleMax = scaleTarget;
      else if (scaleTarget > 0 && Math.abs(scaleTarget / scaleMax - 1) > 1e-3)
        scaleMax += (scaleTarget - scaleMax) * ease(dt, 700);
    }
    const contrast = Math.max(0.01, options.contrast ?? 1);
    const k = scaleMax > 0 ? (HEAT_TABLE_SIZE * contrast) / scaleMax : 0;
    const paint = `${grid.version}|${k}`;
    if (paint !== paintKey) {
      paintHeatGrid(grid, table, k);
      paintKey = `${grid.version}|${k}`;
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

  /** Trade bubbles, area ∝ volume, the largest with their volume */
  const drawBubbles = (
    ctx: CanvasRenderingContext2D,
    bubbles: Bubble[],
    xOf: (t: number) => number,
    yOf: (p: number) => number,
    fontSize: number,
  ) => {
    if (!bubbles.length) return;
    let max = 0;
    for (const b of bubbles) max = Math.max(max, b.volume);
    bubbleRef = bubbleRef > 0 ? Math.max(max, bubbleRef * 0.995) : max;
    const ref = options.bubbleVolume ?? bubbleRef;
    const maxD = Math.max(4, options.bubbleSize ?? 28);
    const sized = bubbles
      .map((b) => ({
        ...b,
        d: clamp(Math.sqrt(b.volume / ref) * maxD, 3, maxD),
      }))
      .sort((a, b) => a.d - b.d);
    clipPlot(ctx);
    ctx.lineWidth = 1.25;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = fontOf(host.theme, options, 600, Math.max(8, fontSize - 1));
    for (const b of sized) {
      const x = xOf(b.time);
      const y = yOf(b.price);
      const r = b.d / 2;
      if (x < plot.x - r || x > plot.x + plot.w + r) continue;
      if (y < plot.y - r || y > plot.y + plot.h + r) continue;
      const color = b.buy ? colors.up : colors.down;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = toCss(color, 0.62);
      ctx.fill();
      ctx.strokeStyle = toCss(mixOklab(color, [1, 1, 1, 1], 0.25));
      ctx.stroke();
      if (b.d >= 26) {
        const text = fmt.compact(b.volume);
        if (ctx.measureText(text).width <= b.d - 6) {
          ctx.fillStyle = "#fff";
          ctx.fillText(text, x, y + 0.5);
        }
      }
    }
    ctx.restore();
  };

  /** The current book as horizontal bars right of the plot, with a size scale */
  const drawProfile = (
    ctx: CanvasRenderingContext2D,
    px: number,
    profileW: number,
    yOf: (p: number) => number,
    fontSize: number,
  ) => {
    const theme = host.theme;
    const [y0, y1] = viewY;
    const rowPx = Math.max(1, (tick / (y1 - y0)) * plot.h);
    let maxSize = 0;
    const sides = (["bid", "ask"] as const).map((side) => {
      const levels = store.levels(side, { step: tick, limit: depth() });
      for (let i = 0; i < levels.count; i++) {
        const p = levels.price[i]!;
        if (p >= y0 && p <= y1) maxSize = Math.max(maxSize, levels.size[i]!);
      }
      return { side, ...levels };
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
    // rows on whole pixels from the price edges; a 1 px gap when tall
    const gap = rowPx >= 4 ? 1 : 0;
    const bar = (p: number, s: number) => {
      const top = Math.round(yOf(p + tick / 2));
      const bottom = Math.max(top + 1, Math.round(yOf(p - tick / 2)) - gap);
      const w = Math.max(1, Math.min(inner, (s / profileMax) * inner));
      ctx.rect(left, top, w, bottom - top);
    };
    for (const { side, price, size, count } of sides) {
      const color = side === "bid" ? colors.up : colors.down;
      ctx.beginPath();
      for (let i = 1; i < count; i++) {
        const p = price[i]!;
        if (p >= y0 - tick && p <= y1 + tick) bar(p, size[i]!);
      }
      ctx.fillStyle = toCss(color, dark ? 0.62 : 0.55);
      ctx.fill();
      // the best level, solid
      const best = price[0];
      if (count && best !== undefined && best >= y0 && best <= y1) {
        ctx.beginPath();
        bar(best, size[0]!);
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

  /** Hovered cell: pointer, time, price row */
  interface HoverCell {
    hx: number;
    hy: number;
    /** Time under the pointer */
    time: number;
    /** Start of the hovered column (NaN outside the data) */
    start: number;
    column: Column | null;
    bin: number;
    rowPrice: number;
  }

  const hoverCell = (): HoverCell | null => {
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
    const bin = Math.round(price / tick);
    const rowPrice = +(bin * tick).toFixed(Math.min(12, decimalsOf(tick) + 2));
    const column = columnAt(time);
    const start = column
      ? column.time
      : Number.isFinite(openStart) && time >= openStart
        ? openStart
        : NaN;
    return { hx, hy, time, start, column, bin, rowPrice };
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

    // grid over the cells
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
    ctx.strokeStyle = toCss(theme.text, dark ? 0.07 : 0.09);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const p of yTicks) {
      const y = Math.round(yOf(p)) + 0.5;
      ctx.moveTo(plot.x, y);
      ctx.lineTo(right, y);
    }
    for (const t of xt.values) {
      const x = Math.round(xOf(t)) + 0.5;
      if (x <= plot.x + 1 || x >= px - 1) continue;
      ctx.moveTo(x, plot.y);
      ctx.lineTo(x, plot.y + plot.h);
    }
    ctx.stroke();

    // best bid / ask, trades, the current book
    if (ready) {
      drawBest(ctx, visible, xOf, yOf, columnPx);
      if (options.bubbles !== false)
        drawBubbles(ctx, tradeBubbles(visible, columnPx), xOf, yOf, fontSize);
      if (profileW) drawProfile(ctx, px, profileW, yOf, fontSize);
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

    const cell = ready ? hoverCell() : null;

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
    ry: number,
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
    const { hx, hy, time, start, column, bin, rowPrice } = cell;
    const step = interval();
    let size = 0;
    let bestBid = NaN;
    let bestAsk = NaN;
    let buyVolume = 0;
    let sellVolume = 0;
    if (column) {
      for (let i = 0; i < column.bins.length; i++) {
        if (column.bins[i] === bin) size += column.sizes[i]!;
      }
      ({ bestBid, bestAsk, buyVolume, sellVolume } = column);
    } else if (Number.isFinite(start)) {
      const levels = (["bid", "ask"] as const).map((side) =>
        store.levels(side, { step: tick, limit: depth() }),
      );
      for (const lv of levels) {
        for (let i = 0; i < lv.count; i++) {
          if (Math.round(lv.price[i]! / tick) === bin) size += lv.size[i]!;
        }
      }
      bestBid = store.bestBid();
      bestAsk = store.bestAsk();
      buyVolume = open.buyVolume;
      sellVolume = open.sellVolume;
    }
    const side: OrderBookSide | null =
      rowPrice <= bestBid ? "bid" : rowPrice >= bestAsk ? "ask" : null;

    // crosshair
    ctx.strokeStyle = toCss(theme.text, 0.5);
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(Math.round(hx) + 0.5, plot.y);
    ctx.lineTo(Math.round(hx) + 0.5, plot.y + plot.h);
    ctx.moveTo(plot.x, ry);
    ctx.lineTo(right, ry);
    ctx.stroke();
    ctx.setLineDash([]);
    if (Number.isFinite(start)) {
      // outline of the hovered cell
      const cx0 = xOf(start);
      const cx1 = xOf(start + step);
      const cy0 = yOf(rowPrice + tick / 2);
      const cy1 = yOf(rowPrice - tick / 2);
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
      ry,
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
        [l.price, fmt.price(rowPrice)],
        [l.liquidity, fmt.size(size)],
        [l.buys, fmt.size(buyVolume)],
        [l.sells, fmt.size(sellVolume)],
      ],
    );
    host.tooltip.style.display = "block";
    host.placeTooltip(
      host.tooltip,
      hx,
      hy,
      hx > plot.w * 0.6 ? "left" : "right",
    );

    const key = `${start}|${bin}|${size}|${buyVolume}|${sellVolume}`;
    if (key !== hoverKey) {
      hoverKey = key;
      const event: OrderBookHeatmapHoverEvent = {
        time: Number.isFinite(start) ? start : time,
        price: rowPrice,
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
