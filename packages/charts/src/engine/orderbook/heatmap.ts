// createOrderBookHeatmap: Bookmap-style liquidity heatmap. The book is
// sampled every `interval` ms into a column of price rows; columns are
// drawn by the GPU renderers of the chart engine as bar instances (one per
// cell), in chunks of CHUNK columns uploaded once, so streaming costs one
// small chunk per column, over a solid "floor" color (the coldest end of
// the ramp). The best bid / ask step lines, the spread band, the trade
// bubbles, the grid, the axes, the book profile, the crosshair and the
// tooltip are drawn on a Canvas2D layer above.

import { luminance, mixOklab, oklabRamp, toCss, type Rgba } from "../color";
import { createRenderer } from "../renderers/detect";
import {
  BAR_STRIDE,
  type BarItem,
  type ChartRenderer,
  type RenderItem,
} from "../renderers/types";
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
import { createEmitter, createHost, localPoint, tooltipHtml } from "./host";
import {
  fitPriceRange,
  fitTimeRange,
  layoutAxisLabels,
  niceCeil,
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

/** Columns per GPU chunk */
const CHUNK = 32;
/** Colors of the ramp lookup table */
const LUT_SIZE = 128;

/**
 * Heat ramps after the floor color, interpolated in OKLab. Dark: lightness
 * rises from deep blue through cyan and green to yellow, then the hottest
 * walls turn orange / red (the Bookmap convention). Light: lightness falls
 * from pale blue through blue and violet to crimson.
 */
const DARK_RAMP = [
  "#0b2140",
  "#0f3a70",
  "#1259a3",
  "#1585bd",
  "#1fb3b0",
  "#62cf73",
  "#d9e04a",
  "#ffb23a",
  "#ff6a33",
];
const LIGHT_RAMP = [
  "#dfecfb",
  "#b3d2f5",
  "#79abe8",
  "#4580d6",
  "#3b54b8",
  "#5a33a0",
  "#962a86",
  "#cf2f55",
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
    name: "Carte de chaleur de la liquidité",
  },
};

interface Column {
  /** Sequence number (chunk = seq / CHUNK) */
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
  /** A robust "large" size of the column (4th largest), for the auto scale */
  reference: number;
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
  /** Color under the cells (no liquidity) */
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

  let scaleMax = 0;
  let bubbleRef = 0;
  /** Size at the full width of the profile (eased) */
  let profileMax = 0;
  const chunks = new Map<number, BarItem>();
  const dirtyChunks = new Set<number>();
  let itemVersion = 0;
  let headItem: BarItem | null = null;
  let headVersion = -1;
  let origin = { x: NaN, y: NaN };

  let renderer: ChartRenderer | null = null;
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
      markAllDirty();
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
    // the floor: a shade darker than the surface in dark themes (the cold
    // end of the ramp stays visible on it), the surface in light ones
    floor = dark
      ? mixOklab(background, [0, 0, 0, 1], 0.4)
      : mixOklab(
          background,
          [theme.text[0], theme.text[1], theme.text[2], 1],
          0.02,
        );
    lut = oklabRamp(
      [
        floor,
        ...(options.colors?.length
          ? options.colors
          : dark
            ? DARK_RAMP
            : LIGHT_RAMP
        ).map(resolve),
      ],
      LUT_SIZE,
    );
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

  const markAllDirty = () => {
    for (const id of chunks.keys()) dirtyChunks.add(id);
    headVersion = -1;
    host.invalidate();
  };

  const clearHistory = () => {
    columns = [];
    chunks.clear();
    dirtyChunks.clear();
    headItem = null;
    headVersion = -1;
    openStart = NaN;
    origin = { x: NaN, y: NaN };
    scaleMax = 0;
    bubbleRef = 0;
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
    const top = [0, 0, 0, 0];
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
    for (let i = 0; i < n; i++) {
      const s = sizes[i]!;
      if (s > top[3]!) {
        top[3] = s;
        top.sort((a, b) => b - a);
      }
    }
    return {
      bins: bins.subarray(0, n),
      sizes: sizes.subarray(0, n),
      reference: top[3]! || top[0]!,
    };
  };

  /** Closes the open column at `start` with the current book */
  const closeColumn = (start: number) => {
    if (!(tick > 0)) return;
    const { bins, sizes, reference } = sampleBook();
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
      reference,
    };
    open.buyVolume = open.buyNotional = open.sellVolume = open.sellNotional = 0;
    columns.push(column);
    dirtyChunks.add(Math.floor(column.seq / CHUNK));
    // the auto color scale: average reference of the recent columns, moved
    // only on a clear change (a change recolors every chunk)
    if (options.maxSize === undefined) {
      const recent = columns.slice(-100);
      let sum = 0;
      for (const c of recent) sum += c.reference;
      const target = (sum / recent.length) * 1.6;
      if (!(scaleMax > 0) || Math.abs(target / scaleMax - 1) > 0.3) {
        scaleMax = target;
        for (const id of chunks.keys()) dirtyChunks.add(id);
        headVersion = -1;
      }
    }
    // history
    const oldest = start - history();
    let drop = 0;
    while (drop < columns.length && columns[drop]!.time < oldest) drop++;
    if (drop) {
      columns = columns.slice(drop);
      const first = columns[0] ? Math.floor(columns[0].seq / CHUNK) : Infinity;
      for (const id of [...chunks.keys()]) {
        if (id < first) chunks.delete(id);
      }
    }
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

  /** Column containing a time (`null` for the open one or outside) */
  const columnAt = (time: number): Column | null => {
    let lo = 0;
    let hi = columns.length - 1;
    const step = interval();
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      const c = columns[mid]!;
      if (time < c.time) hi = mid - 1;
      else if (time >= c.time + step) lo = mid + 1;
      else return c;
    }
    return null;
  };

  // --------------------------------------------------------------- items

  const ensureOrigin = () => {
    if (Number.isFinite(origin.x)) return;
    const mid = store.mid();
    origin = {
      x: Number.isFinite(openStart) ? openStart : 0,
      y: Number.isFinite(mid) ? mid : 0,
    };
  };

  const intensityIndex = (size: number) => {
    const t = heatIntensity(
      size,
      options.maxSize ?? scaleMax,
      options.colorScale ?? "log",
      Math.max(0.01, options.contrast ?? 1),
    );
    return Math.round(t * (LUT_SIZE - 1));
  };

  /** Bar instances of a set of columns (empty cells skipped) */
  const cellsItem = (
    key: string,
    list: readonly { time: number; bins: Float64Array; sizes: Float32Array }[],
  ): BarItem => {
    const step = interval();
    let count = 0;
    for (const c of list) {
      for (let i = 0; i < c.sizes.length; i++) {
        if (intensityIndex(c.sizes[i]!) > 0) count++;
      }
    }
    const instances = new ArrayBuffer(Math.max(1, count) * BAR_STRIDE);
    const f = new Float32Array(instances);
    const u = new Uint32Array(instances);
    let k = 0;
    // cells overlap a little: no seams between neighbours after rasterization
    const half = (tick / 2) * 1.06;
    for (const c of list) {
      const x = c.time + step / 2 - origin.x;
      for (let i = 0; i < c.sizes.length; i++) {
        const level = intensityIndex(c.sizes[i]!);
        if (level <= 0) continue;
        const price = c.bins[i]! * tick - origin.y;
        f[k * 4] = x;
        f[k * 4 + 1] = price - half;
        f[k * 4 + 2] = price + half;
        u[k * 4 + 3] = lut[level]!;
        k++;
      }
    }
    return {
      kind: "bar",
      key,
      version: ++itemVersion,
      color: [1, 1, 1, 1],
      instances,
      count,
      halfWidth: (step / 2) * 1.06,
      radius: 0,
      // a positive inset turns on the renderers' overlap of small cells (no
      // seam between neighbours); 0.01 px leaves no visible gap on large ones
      inset: 0.01,
      minHalf: 0,
      sorted: true,
    };
  };

  const chunkItems = (): BarItem[] => {
    if (dirtyChunks.size) {
      const byChunk = new Map<number, Column[]>();
      for (const c of columns) {
        const id = Math.floor(c.seq / CHUNK);
        if (!dirtyChunks.has(id)) continue;
        let list = byChunk.get(id);
        if (!list) byChunk.set(id, (list = []));
        list.push(c);
      }
      for (const id of dirtyChunks) {
        const list = byChunk.get(id);
        if (list) chunks.set(id, cellsItem(`heat:${id}`, list));
        else chunks.delete(id);
      }
      dirtyChunks.clear();
    }
    return [...chunks.values()];
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
    const rows: [number, number, number][] = visible.map((c) => [
      c.time,
      c.bestBid,
      c.bestAsk,
    ]);
    if (Number.isFinite(openStart))
      rows.push([openStart, store.bestBid(), store.bestAsk()]);
    if (!rows.length) return;
    // wide columns: steps; narrow ones: a line through the column centers
    const steps = columnPx >= 2;
    clipPlot(ctx);
    ctx.beginPath();
    for (const [t, bid, ask] of rows) {
      if (!Number.isFinite(bid) || !Number.isFinite(ask) || !(ask > bid))
        continue;
      const xa = xOf(t);
      const ya = yOf(ask);
      ctx.rect(xa, ya, xOf(t + step) - xa, yOf(bid) - ya);
    }
    ctx.fillStyle = toCss(host.theme.text, dark ? 0.07 : 0.06);
    ctx.fill();
    ctx.lineJoin = "round";
    for (const [index, color] of [
      [1, colors.up],
      [2, colors.down],
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
        const xa = xOf(row[0]);
        const xb = xOf(row[0] + step);
        if (steps) {
          if (pen) ctx.lineTo(xa, y);
          else ctx.moveTo(xa, y);
          ctx.lineTo(xb, y);
        } else if (pen) ctx.lineTo((xa + xb) / 2, y);
        else ctx.moveTo((xa + xb) / 2, y);
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
    // a nice scale, changed only on a clear change (no jumping bars)
    if (
      maxSize > profileMax ||
      maxSize < profileMax * 0.35 ||
      !(profileMax > 0)
    )
      profileMax = niceCeil(maxSize);
    if (!(profileMax > 0)) return;
    const left = px + 3;
    const inner = profileW - 9;
    // guides at half and full scale
    ctx.strokeStyle = toCss(theme.text, 0.09);
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    for (const f of [0.5, 1]) {
      const x = Math.round(left + inner * f) + 0.5;
      ctx.moveTo(x, plot.y);
      ctx.lineTo(x, plot.y + plot.h);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    const gap = rowPx > 3 ? 1 : 0;
    const height = Math.max(1, rowPx - gap);
    for (const { side, price, size, count } of sides) {
      const color = side === "bid" ? colors.up : colors.down;
      ctx.beginPath();
      for (let i = 1; i < count; i++) {
        const p = price[i]!;
        if (p < y0 || p > y1) continue;
        const w = Math.max(1, Math.min(inner, (size[i]! / profileMax) * inner));
        ctx.rect(left, yOf(p) - rowPx / 2 + gap / 2, w, height);
      }
      ctx.fillStyle = toCss(color, 0.55);
      ctx.fill();
      // the best level, solid
      const best = price[0];
      if (count && best !== undefined && best >= y0 && best <= y1) {
        const w = Math.max(1, Math.min(inner, (size[0]! / profileMax) * inner));
        ctx.fillStyle = toCss(color, 0.95);
        ctx.fillRect(left, yOf(best) - rowPx / 2 + gap / 2, w, height);
      }
    }
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

  const headCells = (): BarItem | null => {
    if (!Number.isFinite(openStart) || !(tick > 0)) return null;
    const version = store.version();
    if (headItem && headVersion === version) return headItem;
    const { bins, sizes } = sampleBook();
    headItem = cellsItem("heat:head", [{ time: openStart, bins, sizes }]);
    headVersion = version;
    return headItem;
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
      options.profile === false ? 0 : Math.round(clamp(width * 0.11, 44, 96));
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

    // data layer: the cells on the GPU, over the floor color
    const floorCss = toCss(floor);
    if (renderer && tick > 0) {
      ensureOrigin();
      const canvas = renderer.canvas;
      canvas.style.left = `${plot.x}px`;
      canvas.style.top = `${plot.y}px`;
      canvas.style.width = `${plot.w}px`;
      canvas.style.height = `${plot.h}px`;
      if (canvas.dataset.floor !== floorCss) {
        canvas.dataset.floor = floorCss;
        canvas.style.background = floorCss;
      }
      const bw = Math.max(1, Math.round(plot.w * dpr));
      const bh = Math.max(1, Math.round(plot.h * dpr));
      if (canvas.width !== bw || canvas.height !== bh) renderer.resize(bw, bh);
      const items: RenderItem[] = chunkItems();
      const head = headCells();
      if (head) items.push(head);
      const xScale = 2 / (x1 - x0);
      const yScale = 2 / (y1 - y0);
      renderer.render(items, {
        transform: {
          xScale,
          xOffset: (origin.x - x0) * xScale - 1,
          yScale,
          yOffset: (origin.y - y0) * yScale - 1,
        },
        width: bw,
        height: bh,
        dpr,
      });
    } else {
      ctx.fillStyle = floorCss;
      ctx.fillRect(plot.x, plot.y, plot.w, plot.h);
    }
    if (profileW) {
      ctx.fillStyle = floorCss;
      ctx.fillRect(px, plot.y, profileW, plot.h);
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
      if (x < 20 || x > px - 20) continue;
      const text = xt.format(t);
      if (
        cell &&
        Math.abs(x - cell.hx) < hoverHalf + ctx.measureText(text).width / 2
      )
        continue;
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
      side === "bid" ? colors.up : side === "ask" ? colors.down : theme.text;
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
      },
      [
        [l.price, fmt.price(rowPrice)],
        [l.liquidity, fmt.size(size)],
        [l.buys, fmt.size(buyVolume)],
        [l.sells, fmt.size(sellVolume)],
      ],
    );
    host.tooltip.style.display = "block";
    host.tooltip.style.borderLeft = `3px solid ${toCss(sideColor)}`;
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
    const next = await createRenderer(
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
    }
    resolveReady(next?.kind ?? null);
    host.invalidate();
  };

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
      markAllDirty();
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
