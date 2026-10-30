// createOrderBookHeatmap: Bookmap-style liquidity heatmap. The book is
// sampled every `interval` ms into a column of price rows; columns are
// drawn by the GPU renderers of the chart engine as bar instances (one per
// cell), in chunks of CHUNK columns uploaded once, so streaming costs one
// small chunk per column. Trades are bubbles (scatter instances), the best
// bid / ask are lines; axes, the book profile, the crosshair and the
// tooltip are drawn on a Canvas2D layer above.

import { packColor, rampColor, toCss, luminance, type Rgba } from "../color";
import { createRenderer } from "../renderers/detect";
import {
  BAR_STRIDE,
  GAP,
  SCATTER_STRIDE,
  type BarItem,
  type ChartRenderer,
  type LineItem,
  type RenderItem,
  type ScatterItem,
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

const DARK_RAMP = [
  "#0b2a4f",
  "#12508f",
  "#1c7fd0",
  "#25b3d6",
  "#4fd6a0",
  "#e9e35a",
  "#ffa23d",
  "#ff5533",
];
const LIGHT_RAMP = [
  "#dbeafe",
  "#93c5fd",
  "#3b82f6",
  "#4338ca",
  "#9333ea",
  "#db2777",
  "#f97316",
];

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
  let lut = new Uint32Array(LUT_SIZE);

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
  let yCenter = NaN;
  let ySpan = NaN;
  /** The price range was zoomed by the user: no more auto fit */
  let userSpan = false;
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
    const resolve = (value: string) =>
      theme.resolve ? theme.resolve(value, theme.primary) : theme.primary;
    const dark = luminance(theme.background) < 0.4;
    const stops: Rgba[] = [
      theme.background,
      ...(options.colors?.length
        ? options.colors
        : dark
          ? DARK_RAMP
          : LIGHT_RAMP
      ).map(resolve),
    ];
    lut = new Uint32Array(LUT_SIZE);
    for (let i = 0; i < LUT_SIZE; i++) {
      const c = rampColor(stops, i / (LUT_SIZE - 1));
      lut[i] = packColor([c[0], c[1], c[2], 1]);
    }
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

  const bubblesItem = (visible: readonly Column[]): ScatterItem | null => {
    if (options.bubbles === false) return null;
    const step = interval();
    const all: [number, number, number, boolean][] = [];
    const push = (
      time: number,
      volume: number,
      notional: number,
      buy: boolean,
    ) => {
      if (volume > 0)
        all.push([time + step / 2, notional / volume, volume, buy]);
    };
    for (const c of visible) {
      push(c.time, c.sellVolume, c.sellNotional, false);
      push(c.time, c.buyVolume, c.buyNotional, true);
    }
    if (Number.isFinite(openStart)) {
      push(openStart, open.sellVolume, open.sellNotional, false);
      push(openStart, open.buyVolume, open.buyNotional, true);
    }
    if (!all.length) return null;
    let max = 0;
    for (const b of all) max = Math.max(max, b[2]);
    bubbleRef = bubbleRef > 0 ? Math.max(max, bubbleRef * 0.995) : max;
    const ref = options.bubbleVolume ?? bubbleRef;
    const maxD = Math.max(4, options.bubbleSize ?? 28);
    const buffer = new ArrayBuffer(all.length * SCATTER_STRIDE);
    const f = new Float32Array(buffer);
    const u = new Uint32Array(buffer);
    const up = packColor([colors.up[0], colors.up[1], colors.up[2], 0.78]);
    const down = packColor([
      colors.down[0],
      colors.down[1],
      colors.down[2],
      0.78,
    ]);
    all.forEach(([x, price, volume, buy], i) => {
      f[i * 4] = x - origin.x;
      f[i * 4 + 1] = price - origin.y;
      f[i * 4 + 2] = clamp(Math.sqrt(volume / ref) * maxD, 3, maxD);
      u[i * 4 + 3] = buy ? up : down;
    });
    return {
      kind: "scatter",
      key: "trades",
      version: ++itemVersion,
      color: colors.up,
      instances: buffer,
      count: all.length,
      opacity: 1,
      stroke: 1.25,
    };
  };

  const lineItems = (visible: readonly Column[]): LineItem[] => {
    if (options.bestLines === false) return [];
    const step = interval();
    const build = (key: string, pick: (c: Column) => number, color: Rgba) => {
      const n = visible.length + (Number.isFinite(openStart) ? 1 : 0);
      const points = new Float32Array(n * 4);
      const write = (i: number, time: number, price: number) => {
        const y = Number.isFinite(price) ? price - origin.y : GAP;
        points[i * 4] = time - origin.x;
        points[i * 4 + 1] = y;
        points[i * 4 + 2] = time + step - origin.x;
        points[i * 4 + 3] = y;
      };
      visible.forEach((c, i) => write(i, c.time, pick(c)));
      if (Number.isFinite(openStart)) {
        const price = key === "bid" ? store.bestBid() : store.bestAsk();
        write(visible.length, openStart, price);
      }
      const item: LineItem = {
        kind: "line",
        key: `best:${key}`,
        version: ++itemVersion,
        color,
        points,
        count: n * 2,
        width: 1.5,
        sorted: true,
      };
      return item;
    };
    return [
      build("bid", (c) => c.bestBid, colors.up),
      build("ask", (c) => c.bestAsk, colors.down),
    ];
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

  // ---------------------------------------------------------------- draw

  function draw(now: number): boolean {
    const ctx = host.ctx;
    if (!ctx) return false;
    const { width, height, dpr, theme } = host;
    const dt = lastFrame ? now - lastFrame : 0;
    lastFrame = now;
    const l = labels();
    const fontSize = options.fontSize ?? (width < 420 ? 10 : 11);
    const step = interval();
    const live = !Number.isFinite(dataTime);
    if (live && store.count("bid") + store.count("ask") > 0)
      advance(Date.now());
    const time = nowTime();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.font = fontOf(theme, options, 400, fontSize);

    // layout
    const mid = store.mid();
    const sample = fmt.price(Number.isFinite(mid) ? mid * 1.0001 : 0);
    const axisW = Math.ceil(ctx.measureText(sample).width) + 16;
    const profileW =
      options.profile === false ? 0 : Math.round(clamp(width * 0.1, 36, 84));
    const timeH = fontSize + 12;
    plot = {
      x: 0,
      y: 0,
      w: Math.max(10, width - axisW - profileW),
      h: Math.max(10, height - timeH),
    };

    // view
    if (!Number.isFinite(windowSpan))
      windowSpan = Math.max(step * 10, options.window ?? 60_000);
    if (!Number.isFinite(ySpan) || ySpan <= 0) {
      ensureTick();
      ySpan = options.priceSpan ?? (tick > 0 ? tick * 60 : NaN);
    }
    if (follow) {
      const right = time + step * 1.5;
      viewX = [right - windowSpan, right];
      // fit the prices traded in the window (best bid / ask), with room
      let lo = store.bestBid();
      let hi = store.bestAsk();
      if (!Number.isFinite(lo)) lo = hi;
      if (!Number.isFinite(hi)) hi = lo;
      for (const c of visibleColumns()) {
        if (c.bestBid < lo) lo = c.bestBid;
        if (c.bestAsk > hi) hi = c.bestAsk;
      }
      if (Number.isFinite(lo) && Number.isFinite(hi)) {
        const k = Number.isFinite(yCenter) ? ease(dt, 260) : 1;
        const center = (lo + hi) / 2;
        yCenter = Number.isFinite(yCenter)
          ? yCenter + (center - yCenter) * k
          : center;
        if (!userSpan && options.priceSpan === undefined && tick > 0) {
          const target = Math.max(tick * 60, (hi - lo) * 1.5);
          ySpan += (target - ySpan) * k;
        }
      } else if (Number.isFinite(mid)) {
        yCenter = Number.isFinite(yCenter)
          ? yCenter + (mid - yCenter) * ease(dt, 220)
          : mid;
      }
      if (Number.isFinite(yCenter) && Number.isFinite(ySpan))
        viewY = [yCenter - ySpan / 2, yCenter + ySpan / 2];
    }
    const [x0, x1] = viewX;
    const [y0, y1] = viewY;
    const xOf = (t: number) => plot.x + ((t - x0) / (x1 - x0)) * plot.w;
    const yOf = (p: number) =>
      plot.y + plot.h - ((p - y0) / (y1 - y0)) * plot.h;

    // data layer
    const visible = visibleColumns();
    if (renderer && tick > 0) {
      ensureOrigin();
      const canvas = renderer.canvas;
      canvas.style.left = `${plot.x}px`;
      canvas.style.top = `${plot.y}px`;
      canvas.style.width = `${plot.w}px`;
      canvas.style.height = `${plot.h}px`;
      const bw = Math.max(1, Math.round(plot.w * dpr));
      const bh = Math.max(1, Math.round(plot.h * dpr));
      if (canvas.width !== bw || canvas.height !== bh) renderer.resize(bw, bh);
      const items: RenderItem[] = chunkItems();
      const head = headCells();
      if (head) items.push(head);
      items.push(...lineItems(visible));
      const bubbles = bubblesItem(visible);
      if (bubbles) items.push(bubbles);
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
    }

    // price grid and axis
    const right = plot.x + plot.w + profileW;
    const yTicks = Number.isFinite(y0)
      ? linearTicks(y0, y1, Math.max(2, Math.floor(plot.h / 44)))
      : [];
    ctx.strokeStyle = toCss(theme.text, 0.07);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const p of yTicks) {
      const y = Math.round(yOf(p)) + 0.5;
      ctx.moveTo(plot.x, y);
      ctx.lineTo(right, y);
    }
    ctx.stroke();
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    for (const p of yTicks) {
      const y = yOf(p);
      if (y < 6 || y > plot.h - 6) continue;
      ctx.fillText(fmt.price(p), right + 6, y);
    }

    // time axis
    const xt = timeTicks(x0, x1, Math.max(2, Math.floor(plot.w / 90)));
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (const t of xt.values) {
      const x = xOf(t);
      if (x < 20 || x > plot.x + plot.w - 20) continue;
      ctx.fillText(xt.format(t), x, plot.y + plot.h + 6);
    }
    ctx.strokeStyle = toCss(theme.axis);
    ctx.beginPath();
    ctx.moveTo(0, Math.round(plot.y + plot.h) + 0.5);
    ctx.lineTo(width, Math.round(plot.y + plot.h) + 0.5);
    ctx.moveTo(Math.round(right) + 0.5, 0);
    ctx.lineTo(Math.round(right) + 0.5, plot.y + plot.h);
    ctx.stroke();

    // current book profile
    if (profileW && tick > 0 && Number.isFinite(y0)) {
      const px = plot.x + plot.w;
      ctx.fillStyle = toCss(theme.background, 0.85);
      ctx.fillRect(px, plot.y, profileW, plot.h);
      const rowPx = Math.max(1, (tick / (y1 - y0)) * plot.h);
      let maxSize = 0;
      const sides = (["bid", "ask"] as const).map((side) => {
        const { price, size, count } = store.levels(side, {
          step: tick,
          limit: depth(),
        });
        for (let i = 0; i < count; i++) {
          if (price[i]! >= y0 && price[i]! <= y1)
            maxSize = Math.max(maxSize, size[i]!);
        }
        return { side, price, size, count };
      });
      for (const { side, price, size, count } of sides) {
        ctx.fillStyle = toCss(side === "bid" ? colors.up : colors.down, 0.6);
        for (let i = 0; i < count; i++) {
          const p = price[i]!;
          if (p < y0 || p > y1 || maxSize <= 0) continue;
          const w = (size[i]! / maxSize) * (profileW - 4);
          const y = yOf(p) - rowPx / 2;
          ctx.fillRect(
            px + 2,
            y + (rowPx > 3 ? 0.5 : 0),
            w,
            Math.max(1, rowPx - (rowPx > 3 ? 1 : 0)),
          );
        }
      }
    }

    // price tags: best bid / ask and the last trade
    const tag = (price: number, color: Rgba, filled: boolean) => {
      if (!Number.isFinite(price) || price < y0 || price > y1) return;
      const y = clamp(yOf(price), 8, plot.h - 8);
      const text = fmt.price(price);
      ctx.font = fontOf(theme, options, 600, fontSize);
      const w = ctx.measureText(text).width + 10;
      ctx.fillStyle = filled ? toCss(color) : toCss(theme.background);
      roundRect(ctx, right + 1, y - 8, Math.min(w, width - right - 2), 16, 3);
      ctx.fill();
      if (!filled) {
        ctx.strokeStyle = toCss(color);
        ctx.stroke();
      }
      ctx.fillStyle = filled ? "#fff" : toCss(color);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(text, right + 6, y + 0.5);
      ctx.font = fontOf(theme, options, 400, fontSize);
    };
    tag(store.bestBid(), colors.up, true);
    tag(store.bestAsk(), colors.down, true);
    // the last trade only when it does not cover the best bid / ask tags
    const clear = (price: number) =>
      !Number.isFinite(price) ||
      Math.abs(yOf(price) - yOf(lastTrade?.price ?? NaN)) >= 17;
    if (lastTrade && clear(store.bestBid()) && clear(store.bestAsk()))
      tag(
        lastTrade.price,
        lastTrade.side === "buy" ? colors.up : colors.down,
        false,
      );

    // crosshair and tooltip
    drawHover(ctx, xOf, yOf, fontSize, right, l);

    if (!renderer && !host.root.dataset.renderer) {
      // no backend yet: nothing else to draw
    }
    host.describe(
      `${options.ariaLabel ?? l.name}. ${l.bid} ${fmt.price(store.bestBid())}, ${l.ask} ${fmt.price(store.bestAsk())}.`,
    );
    // keep scrolling while following a live market
    const fresh = live || perfNow() - dataWall < 2000;
    return follow && fresh && Number.isFinite(openStart);
  }

  function drawHover(
    ctx: CanvasRenderingContext2D,
    xOf: (t: number) => number,
    yOf: (p: number) => number,
    fontSize: number,
    right: number,
    l: OrderBookHeatmapLabels,
  ) {
    const { theme } = host;
    const hide = () => {
      host.tooltip.style.display = "none";
      if (hoverKey) {
        hoverKey = "";
        emitter.emit("hover", null);
      }
    };
    if (!hoverAt || options.tooltip === false || !(tick > 0) || drag) {
      hide();
      return;
    }
    const [hx, hy] = hoverAt;
    if (
      hx < plot.x ||
      hx > plot.x + plot.w ||
      hy < plot.y ||
      hy > plot.y + plot.h
    ) {
      hide();
      return;
    }
    const [x0, x1] = viewX;
    const [y0, y1] = viewY;
    const time = x0 + ((hx - plot.x) / plot.w) * (x1 - x0);
    const price = y0 + ((plot.y + plot.h - hy) / plot.h) * (y1 - y0);
    const bin = Math.round(price / tick);
    const rowPrice = +(bin * tick).toFixed(Math.min(12, decimalsOf(tick) + 2));
    const column = columnAt(time);
    const step = interval();
    let size = 0;
    let bestBid = NaN;
    let bestAsk = NaN;
    let buyVolume = 0;
    let sellVolume = 0;
    let start = NaN;
    if (column) {
      for (let i = 0; i < column.bins.length; i++) {
        if (column.bins[i] === bin) size += column.sizes[i]!;
      }
      ({ bestBid, bestAsk, buyVolume, sellVolume } = column);
      start = column.time;
    } else if (Number.isFinite(openStart) && time >= openStart) {
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
      start = openStart;
    }
    const side: OrderBookSide | null =
      rowPrice <= bestBid ? "bid" : rowPrice >= bestAsk ? "ask" : null;

    // crosshair
    ctx.strokeStyle = toCss(theme.text, 0.45);
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(Math.round(hx) + 0.5, plot.y);
    ctx.lineTo(Math.round(hx) + 0.5, plot.y + plot.h);
    const ry = Math.round(yOf(rowPrice)) + 0.5;
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
    // price label on the axis
    ctx.font = fontOf(theme, options, 600, fontSize);
    const text = fmt.price(rowPrice);
    const w = Math.min(
      ctx.measureText(text).width + 10,
      host.width - right - 2,
    );
    ctx.fillStyle = toCss(theme.text);
    roundRect(ctx, right + 1, ry - 8, w, 16, 3);
    ctx.fill();
    ctx.fillStyle = toCss(theme.background);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, right + 6, ry + 0.5);
    ctx.font = fontOf(theme, options, 400, fontSize);

    const sideColor =
      side === "bid" ? colors.up : side === "ask" ? colors.down : theme.text;
    tooltipHtml(
      doc,
      host.tooltip,
      {
        text: Number.isFinite(start) ? formatClock(start) : formatClock(time),
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
        userSpan = true;
        viewY = [c - span / 2, c + span / 2];
        if (follow) yCenter = c;
      } else if (Math.abs(dx) + Math.abs(dy) > 3) {
        setFollow(false);
        const tx = ((drag.viewX[1] - drag.viewX[0]) / plot.w) * dx;
        const ty = ((drag.viewY[1] - drag.viewY[0]) / plot.h) * dy;
        viewX = [drag.viewX[0] - tx, drag.viewX[1] - tx];
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
    const span = clamp((b - a) * factor, interval() * 10, history());
    windowSpan = span;
    if (!follow) {
      const t = a + ((anchorX - plot.x) / plot.w) * (b - a);
      const r = (t - a) / (b - a);
      viewX = [t - span * r, t + span * (1 - r)];
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
    userSpan = true;
    viewY = [c - span / 2, c + span / 2];
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
        viewX = [viewX[0] + d, viewX[1] + d];
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
      yCenter = NaN;
      ySpan = NaN;
      userSpan = false;
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
      userSpan = false;
      yCenter = NaN;
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
