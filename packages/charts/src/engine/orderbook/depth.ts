// createDepthChart: cumulative bid / ask depth around the mid price, drawn
// with Canvas2D. The curves are sampled once per pixel column (a sweep over
// the levels, so the cost follows the width, not the book) and eased from
// one snapshot to the next.

import { toCss, type Rgba } from "../color";
import { localeLabels, type LabelDictionary } from "../locale";
import { linearTicks, niceDomain } from "../scale";
import {
  applyDeltas,
  createOrderBookStore,
  inferPriceDecimals,
  inferSizeDecimals,
} from "./book";
import {
  clamp,
  createFormatters,
  ease,
  fontOf,
  roundRect,
  sideColors,
  type Formatters,
} from "./format";
import { createEmitter, createHost, localPoint, tooltipHtml } from "./host";
import type {
  DepthChartEventMap,
  DepthChartHoverEvent,
  DepthChartInstance,
  DepthChartLabels,
  DepthChartOptions,
  DepthPoint,
  OrderBookSide,
} from "./types";

const LABELS: LabelDictionary<DepthChartLabels> = {
  en: {
    bids: "Bids",
    asks: "Asks",
    price: "Price",
    amount: "Amount",
    total: "Total",
    average: "Avg. price",
    distance: "From mid",
    mid: "Mid",
    spread: "Spread",
    basisPoints: "bp",
    name: "Depth chart",
  },
  zh: {
    bids: "买盘",
    asks: "卖盘",
    price: "价格",
    amount: "累计数量",
    total: "累计金额",
    average: "均价",
    distance: "距中间价",
    mid: "中间价",
    spread: "价差",
    basisPoints: "基点",
    name: "深度图",
  },
  ja: {
    bids: "買い",
    asks: "売り",
    price: "価格",
    amount: "累計数量",
    total: "累計金額",
    average: "平均価格",
    distance: "仲値から",
    mid: "仲値",
    spread: "スプレッド",
    basisPoints: "bp",
    name: "デプスチャート",
  },
  fr: {
    bids: "Achats",
    asks: "Ventes",
    price: "Prix",
    amount: "Quantité",
    total: "Montant",
    average: "Prix moyen",
    distance: "Écart au médian",
    mid: "Médian",
    spread: "Écart",
    basisPoints: "pb",
    name: "Graphique de profondeur",
  },
};

interface Plot {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Creates a depth chart in `container`: cumulative bid and ask areas around
 * the mid price, with a mirrored hover tooltip and incremental updates
 * coalesced into one frame.
 */
export const createDepthChart = (
  container: HTMLElement,
  initial: DepthChartOptions = {},
): DepthChartInstance => {
  let options = initial;
  const store = createOrderBookStore();
  const emitter = createEmitter<DepthChartEventMap>();
  let fmt: Formatters = createFormatters(options, 2, 4);
  /** Texts in the locale, resolved on every option update */
  let texts = localeLabels(LABELS, options.locale, options.labels);
  let inferred = false;
  let colors = { up: [0, 0, 0, 1] as Rgba, down: [0, 0, 0, 1] as Rgba };

  let rangeOverride: number | null = null;
  /** Range drawn (eased) */
  let shownRange = NaN;
  let shownMax = NaN;
  let shownMid = NaN;
  let bidShown = new Float64Array(0);
  let askShown = new Float64Array(0);
  let bidTarget = new Float64Array(0);
  let askTarget = new Float64Array(0);
  let lastFrame = 0;
  let plot: Plot = { x: 0, y: 0, w: 0, h: 0 };
  /** Hover position in CSS pixels (pointer or keyboard) */
  let hoverAt: [number, number] | null = null;
  let hoverKey = "";
  let lastHover: DepthChartHoverEvent | null = null;
  const pointers = new Map<number, [number, number]>();
  let pinch: { distance: number; range: number } | null = null;

  const host = createHost(container, {
    className: "minerva-depth-chart",
    draw,
    onTheme: () => refreshColors(),
  });
  const { root, doc } = host;
  const mirrorTip = host.createTooltip();
  root.tabIndex = 0;
  root.setAttribute("role", "figure");
  root.style.touchAction = "pan-y";

  const labels = () => texts;

  function refreshColors() {
    colors = sideColors(host.theme, options);
  }

  function refreshFormat() {
    fmt = createFormatters(
      options,
      inferPriceDecimals(store),
      inferSizeDecimals(store),
    );
  }

  const applyOptions = () => {
    texts = localeLabels(LABELS, options.locale, options.labels);
    root.setAttribute("aria-label", options.ariaLabel ?? texts.name);
    refreshColors();
    refreshFormat();
    host.invalidate();
  };

  const limits = (): [number, number] => {
    const [a, b] = options.rangeLimits ?? [0.0005, 0.5];
    return [Math.min(a, b), Math.max(a, b)];
  };

  /** Range fitting the shorter side of the book */
  const autoRange = (mid: number) => {
    const nb = store.count("bid");
    const na = store.count("ask");
    if (!nb && !na) return 0.01;
    const bidExtent = nb
      ? (mid - store.priceAt("bid", nb - 1)) / mid
      : Infinity;
    const askExtent = na
      ? (store.priceAt("ask", na - 1) - mid) / mid
      : Infinity;
    const extent = Math.min(bidExtent, askExtent);
    return Number.isFinite(extent) && extent > 0 ? extent : 0.01;
  };

  const currentRange = (mid: number) => {
    const [min, max] = limits();
    return clamp(rangeOverride ?? options.range ?? autoRange(mid), min, max);
  };

  const currentMid = () => {
    const mid = store.mid();
    if (Number.isFinite(mid)) return mid;
    const bid = store.bestBid();
    return Number.isFinite(bid) ? bid : store.bestAsk();
  };

  // ---------------------------------------------------------- depth values

  /** Cumulative depth of a side down to (bids) / up to (asks) a price */
  const depthAt = (side: OrderBookSide, price: number, mid: number) => {
    let amount = 0;
    let total = 0;
    const n = store.count(side);
    for (let i = 0; i < n; i++) {
      const p = store.priceAt(side, i);
      if (side === "bid" ? p < price : p > price) break;
      const s = store.sizeAt(side, i);
      amount += s;
      total += s * p;
    }
    const point: DepthPoint = {
      side,
      price,
      amount,
      total,
      average: amount > 0 ? total / amount : NaN,
      distance: (price - mid) / mid,
    };
    return point;
  };

  /**
   * Target cumulative values per pixel column (NaN outside the side): one
   * sweep from the best level outwards
   */
  const sampleSide = (
    side: OrderBookSide,
    target: Float64Array,
    lo: number,
    hi: number,
  ) => {
    const cols = target.length;
    target.fill(NaN);
    const n = store.count(side);
    if (!n) return;
    const quote = options.amount === "quote";
    const linear = options.curve === "linear";
    const priceOf = (c: number) => lo + ((c + 0.5) / cols) * (hi - lo);
    const best = store.priceAt(side, 0);
    let i = 0;
    let cum = 0;
    /** Price of the last level included (linear curves) */
    let prevPrice = best;
    const step = side === "bid" ? -1 : 1;
    const start =
      side === "bid"
        ? Math.min(cols - 1, Math.floor(((best - lo) / (hi - lo)) * cols))
        : Math.max(0, Math.ceil(((best - lo) / (hi - lo)) * cols - 1));
    for (let c = start; c >= 0 && c < cols; c += step) {
      const price = priceOf(c);
      const inside = side === "bid" ? price <= best : price >= best;
      if (!inside) continue;
      while (i < n) {
        const p = store.priceAt(side, i);
        if (side === "bid" ? p < price : p > price) break;
        const s = store.sizeAt(side, i);
        prevPrice = p;
        cum += quote ? s * p : s;
        i++;
      }
      if (linear && i < n) {
        // between the last included level and the next one
        const next = store.priceAt(side, i);
        const nextCum = cum + store.sizeAt(side, i) * (quote ? next : 1);
        const t = (price - prevPrice) / (next - prevPrice);
        target[c] = Number.isFinite(t) ? cum + (nextCum - cum) * t : cum;
      } else {
        target[c] = cum;
      }
    }
  };

  // ------------------------------------------------------------------ draw

  const ensureColumns = (cols: number) => {
    if (bidShown.length === cols) return;
    bidShown = new Float64Array(cols).fill(NaN);
    askShown = new Float64Array(cols).fill(NaN);
    bidTarget = new Float64Array(cols);
    askTarget = new Float64Array(cols);
  };

  /** Eases `shown` towards `target`; `true` while it still moves */
  const easeColumns = (
    shown: Float64Array,
    target: Float64Array,
    k: number,
    epsilon: number,
  ) => {
    let moving = false;
    for (let c = 0; c < shown.length; c++) {
      const t = target[c]!;
      const s = shown[c]!;
      if (!Number.isFinite(t) || !Number.isFinite(s) || k >= 1) {
        shown[c] = t;
        continue;
      }
      const next = s + (t - s) * k;
      if (Math.abs(t - next) > epsilon) moving = true;
      else {
        shown[c] = t;
        continue;
      }
      shown[c] = next;
    }
    return moving;
  };

  function draw(now: number): boolean {
    const ctx = host.ctx;
    if (!ctx) return false;
    const { width, height, dpr, theme } = host;
    const dt = lastFrame ? now - lastFrame : 0;
    lastFrame = now;
    const animate = options.animate !== false;
    const k = animate && dt > 0 ? ease(dt, 70) : 1;
    const l = labels();
    const fontSize = options.fontSize ?? (width < 360 ? 11 : 12);
    const axes = options.axes !== false;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.font = fontOf(theme, options, 400, fontSize);

    const mid = currentMid();
    const range = Number.isFinite(mid) ? currentRange(mid) : 0.01;
    shownRange =
      Number.isFinite(shownRange) && animate
        ? shownRange + (range - shownRange) * k
        : range;
    shownMid =
      Number.isFinite(shownMid) && Number.isFinite(mid) && animate
        ? shownMid + (mid - shownMid) * Math.min(1, k * 1.5)
        : mid;
    let moving = Math.abs(shownRange - range) > range * 1e-3;
    if (Math.abs(shownMid - mid) > Math.abs(mid) * 1e-7) moving = true;

    const lo = shownMid * (1 - shownRange);
    const hi = shownMid * (1 + shownRange);

    // y scale: largest cumulative value inside the range
    const top = options.legend === false && options.midLine === false ? 10 : 30;
    const bottom = axes ? fontSize + 12 : 4;
    const probe = linearTicks(0, Math.max(1, shownMax || 1), 4);
    const axisWidth = axes
      ? Math.ceil(
          Math.max(
            ...probe.map((v) => ctx.measureText(fmt.compact(v)).width),
            24,
          ),
        ) + 12
      : 0;
    plot = {
      x: 0,
      y: top,
      w: Math.max(10, width - axisWidth),
      h: Math.max(10, height - top - bottom),
    };
    const cols = Math.max(1, Math.floor(plot.w));
    ensureColumns(cols);
    if (Number.isFinite(lo) && hi > lo) {
      sampleSide("bid", bidTarget, lo, hi);
      sampleSide("ask", askTarget, lo, hi);
    } else {
      bidTarget.fill(NaN);
      askTarget.fill(NaN);
    }
    let max = 0;
    for (let c = 0; c < cols; c++) {
      const b = bidTarget[c]!;
      const a = askTarget[c]!;
      if (b > max) max = b;
      if (a > max) max = a;
    }
    const domainMax = max > 0 ? niceDomain(0, max * 1.08, 4)[1] : 1;
    shownMax =
      Number.isFinite(shownMax) && animate
        ? shownMax + (domainMax - shownMax) * k
        : domainMax;
    if (Math.abs(shownMax - domainMax) > domainMax * 1e-3) moving = true;
    const epsilon = shownMax * 1e-4;
    if (easeColumns(bidShown, bidTarget, k, epsilon)) moving = true;
    if (easeColumns(askShown, askTarget, k, epsilon)) moving = true;

    const yOf = (v: number) => plot.y + plot.h - (v / shownMax) * plot.h;
    const xOfPrice = (p: number) => plot.x + ((p - lo) / (hi - lo)) * plot.w;
    const base = plot.y + plot.h;

    // grid and axes
    const yTicks = linearTicks(
      0,
      shownMax,
      Math.max(2, Math.floor(plot.h / 48)),
    );
    if (options.grid !== false) {
      ctx.strokeStyle = toCss(theme.grid);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const v of yTicks) {
        const y = Math.round(yOf(v)) + 0.5;
        ctx.moveTo(plot.x, y);
        ctx.lineTo(plot.x + plot.w, y);
      }
      ctx.stroke();
    }
    if (axes) {
      ctx.fillStyle = toCss(theme.textMuted);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      for (const v of yTicks) {
        if (v === 0) continue;
        ctx.fillText(fmt.compact(v), plot.x + plot.w + 6, yOf(v));
      }
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      const count = Math.max(2, Math.floor(plot.w / 110));
      const xTicks = Number.isFinite(lo) ? linearTicks(lo, hi, count) : [];
      for (const p of xTicks) {
        const x = xOfPrice(p);
        const text = fmt.price(p);
        const w = ctx.measureText(text).width;
        if (x - w / 2 < 2 || x + w / 2 > plot.x + plot.w - 2) continue;
        ctx.fillText(text, x, base + 6);
      }
      ctx.strokeStyle = toCss(theme.axis);
      ctx.beginPath();
      ctx.moveTo(plot.x, Math.round(base) + 0.5);
      ctx.lineTo(plot.x + plot.w, Math.round(base) + 0.5);
      ctx.stroke();
    }

    // areas
    const fill = options.fillOpacity ?? 0.28;
    const drawSide = (shown: Float64Array, color: Rgba) => {
      let first = -1;
      let last = -1;
      for (let c = 0; c < cols; c++) {
        if (Number.isFinite(shown[c]!)) {
          if (first < 0) first = c;
          last = c;
        }
      }
      if (first < 0) return;
      const x0 = plot.x + (first / cols) * plot.w;
      const x1 = plot.x + ((last + 1) / cols) * plot.w;
      ctx.beginPath();
      ctx.moveTo(x0, yOf(shown[first]!));
      for (let c = first; c <= last; c++) {
        const y = yOf(shown[c]!);
        const xl = plot.x + (c / cols) * plot.w;
        const xr = plot.x + ((c + 1) / cols) * plot.w;
        ctx.lineTo(xl, y);
        ctx.lineTo(xr, y);
      }
      const gradient = ctx.createLinearGradient(0, plot.y, 0, base);
      gradient.addColorStop(0, toCss(color, fill));
      gradient.addColorStop(1, toCss(color, fill * 0.15));
      ctx.save();
      ctx.lineTo(x1, base);
      ctx.lineTo(x0, base);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(x0, yOf(shown[first]!));
      for (let c = first; c <= last; c++) {
        const y = yOf(shown[c]!);
        ctx.lineTo(plot.x + (c / cols) * plot.w, y);
        ctx.lineTo(plot.x + ((c + 1) / cols) * plot.w, y);
      }
      ctx.lineTo(x1, base);
      ctx.strokeStyle = toCss(color);
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.stroke();
    };
    ctx.save();
    ctx.beginPath();
    ctx.rect(plot.x, plot.y - 2, plot.w, plot.h + 2);
    ctx.clip();
    drawSide(bidShown, colors.up);
    drawSide(askShown, colors.down);

    // price lines
    for (const line of options.priceLines ?? []) {
      const x = Math.round(xOfPrice(line.price)) + 0.5;
      if (x < plot.x || x > plot.x + plot.w) continue;
      const color =
        line.color && theme.resolve
          ? theme.resolve(line.color, theme.text)
          : theme.text;
      ctx.strokeStyle = toCss(color, 0.8);
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x, plot.y);
      ctx.lineTo(x, base);
      ctx.stroke();
      ctx.setLineDash([]);
      if (line.label) {
        ctx.font = fontOf(theme, options, 500, fontSize - 1);
        const w = ctx.measureText(line.label).width + 10;
        const lx = clamp(x - w / 2, plot.x + 2, plot.x + plot.w - w - 2);
        ctx.fillStyle = toCss(color);
        roundRect(ctx, lx, base - fontSize - 10, w, fontSize + 6, 4);
        ctx.fill();
        ctx.fillStyle = toCss(theme.background);
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(line.label, lx + 5, base - fontSize / 2 - 7);
        ctx.font = fontOf(theme, options, 400, fontSize);
      }
    }
    ctx.restore();

    // mid line and spread label
    const midX = xOfPrice(shownMid);
    if (options.midLine !== false && Number.isFinite(midX)) {
      ctx.strokeStyle = toCss(theme.textMuted, 0.55);
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(Math.round(midX) + 0.5, plot.y);
      ctx.lineTo(Math.round(midX) + 0.5, base);
      ctx.stroke();
      ctx.setLineDash([]);
      const spread = store.spread();
      const title = `${l.mid} ${fmt.price(mid)}`;
      const bps = (spread / mid) * 1e4;
      const sub = Number.isFinite(spread)
        ? `${l.spread} ${fmt.price(spread)} · ${fmt.fixed(bps, bps < 10 ? 2 : 1)} ${l.basisPoints}`
        : "";
      ctx.font = fontOf(theme, options, 600, fontSize);
      const w1 = ctx.measureText(title).width;
      ctx.font = fontOf(theme, options, 400, fontSize - 1);
      const w2 = sub ? ctx.measureText(sub).width : 0;
      const narrow = width < 420;
      const boxW = narrow ? Math.max(w1, w2) + 16 : w1 + w2 + 28;
      const boxH = narrow && sub ? fontSize * 2 + 10 : fontSize + 10;
      const bx = clamp(midX - boxW / 2, 2, width - boxW - 2);
      const by = 4;
      ctx.fillStyle = toCss(theme.background, 0.92);
      ctx.strokeStyle = toCss(theme.axis);
      roundRect(ctx, bx, by, boxW, boxH, 6);
      ctx.fill();
      ctx.stroke();
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = toCss(theme.text);
      ctx.font = fontOf(theme, options, 600, fontSize);
      ctx.fillText(title, bx + 8, by + fontSize / 2 + 5);
      if (sub) {
        ctx.font = fontOf(theme, options, 400, fontSize - 1);
        ctx.fillStyle = toCss(theme.textMuted);
        if (narrow) ctx.fillText(sub, bx + 8, by + fontSize * 1.5 + 6);
        else ctx.fillText(sub, bx + 20 + w1, by + fontSize / 2 + 5);
      }
      ctx.font = fontOf(theme, options, 400, fontSize);
    }

    // legend
    if (options.legend !== false && width >= 300) {
      ctx.textBaseline = "middle";
      const y = 4 + fontSize / 2 + 5;
      ctx.font = fontOf(theme, options, 500, fontSize);
      ctx.fillStyle = toCss(colors.up);
      ctx.beginPath();
      ctx.arc(8, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.textAlign = "left";
      ctx.fillStyle = toCss(theme.textMuted);
      ctx.fillText(l.bids, 16, y);
      const right = plot.x + plot.w;
      ctx.textAlign = "right";
      ctx.fillText(l.asks, right - 16, y);
      ctx.fillStyle = toCss(colors.down);
      ctx.beginPath();
      ctx.arc(right - 8, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = fontOf(theme, options, 400, fontSize);
    }

    drawHover(ctx, mid, lo, hi, cols, yOf, fontSize);

    host.describe(
      Number.isFinite(mid)
        ? `${options.ariaLabel ?? l.name}. ${l.bids} ${fmt.price(store.bestBid())}, ${l.asks} ${fmt.price(store.bestAsk())}, ${l.spread} ${fmt.price(store.spread())}.`
        : (options.ariaLabel ?? l.name),
    );
    return moving;
  }

  function drawHover(
    ctx: CanvasRenderingContext2D,
    mid: number,
    lo: number,
    hi: number,
    cols: number,
    yOf: (v: number) => number,
    fontSize: number,
  ) {
    const { theme } = host;
    const hide = () => {
      host.tooltip.style.display = "none";
      mirrorTip.style.display = "none";
      if (lastHover) {
        lastHover = null;
        hoverKey = "";
        emitter.emit("hover", null);
      }
    };
    if (!hoverAt || options.tooltip === false || !Number.isFinite(mid)) {
      hide();
      return;
    }
    const x = clamp(hoverAt[0], plot.x, plot.x + plot.w - 1);
    const price = lo + ((x - plot.x) / plot.w) * (hi - lo);
    const bestBid = store.bestBid();
    const bestAsk = store.bestAsk();
    let side: OrderBookSide = price < shownMid ? "bid" : "ask";
    if (side === "bid" && !Number.isFinite(bestBid)) side = "ask";
    if (side === "ask" && !Number.isFinite(bestAsk)) side = "bid";
    const point = depthAt(side, price, mid);
    const mirrorPrice = 2 * shownMid - price;
    const other: OrderBookSide = side === "bid" ? "ask" : "bid";
    const mirror =
      options.mirror !== false && store.count(other)
        ? depthAt(other, mirrorPrice, mid)
        : null;
    const event: DepthChartHoverEvent = { ...point, mirror };
    const l = labels();

    const column = (px: number) =>
      clamp(Math.floor(((px - plot.x) / plot.w) * cols), 0, cols - 1);
    const shownOf = (s: OrderBookSide, px: number) =>
      (s === "bid" ? bidShown : askShown)[column(px)]!;
    const colorOf = (s: OrderBookSide) =>
      s === "bid" ? colors.up : colors.down;

    const marker = (s: OrderBookSide, px: number) => {
      const value = shownOf(s, px);
      if (!Number.isFinite(value)) return NaN;
      const y = yOf(value);
      ctx.strokeStyle = toCss(theme.textMuted, 0.6);
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(Math.round(px) + 0.5, plot.y);
      ctx.lineTo(Math.round(px) + 0.5, plot.y + plot.h);
      ctx.moveTo(plot.x, Math.round(y) + 0.5);
      ctx.lineTo(plot.x + plot.w, Math.round(y) + 0.5);
      ctx.stroke();
      ctx.setLineDash([]);
      const color = colorOf(s);
      ctx.fillStyle = toCss(color, 0.2);
      ctx.beginPath();
      ctx.arc(px, y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = toCss(color);
      ctx.strokeStyle = toCss(theme.background);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 1;
      // amount tag on the axis
      if (options.axes !== false) {
        const text = fmt.compact(value);
        ctx.font = fontOf(theme, options, 500, fontSize - 1);
        const w = ctx.measureText(text).width + 8;
        ctx.fillStyle = toCss(color);
        roundRect(ctx, plot.x + plot.w + 2, y - 9, w, 18, 3);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(text, plot.x + plot.w + 6, y);
        ctx.font = fontOf(theme, options, 400, fontSize);
      }
      return y;
    };

    const y = marker(side, x);
    const mx = plot.x + ((mirrorPrice - lo) / (hi - lo)) * plot.w;
    const my =
      mirror && mx >= plot.x && mx <= plot.x + plot.w ? marker(other, mx) : NaN;

    const rows = (p: DepthPoint): [string, string][] => [
      [l.price, fmt.price(p.price)],
      [l.amount, fmt.total(p.amount)],
      [l.total, fmt.notional(p.total)],
      [l.average, fmt.price(p.average)],
      [
        l.distance,
        fmt.percent(p.distance, Math.abs(p.distance) < 0.01 ? 3 : 2),
      ],
    ];
    const show = (
      tip: HTMLDivElement,
      p: DepthPoint,
      px: number,
      py: number,
    ) => {
      tooltipHtml(
        doc,
        tip,
        {
          text: p.side === "bid" ? l.bids : l.asks,
          color: toCss(colorOf(p.side)),
        },
        rows(p),
      );
      tip.style.display = "block";
      host.placeTooltip(
        tip,
        px,
        Number.isFinite(py) ? py : plot.y + plot.h / 2,
        p.side === "bid" ? "left" : "right",
      );
    };
    show(host.tooltip, point, x, y);
    // the mirror needs room for both tooltips side by side (phones: one)
    const room = plot.w >= 2 * (host.tooltip.offsetWidth + 24);
    if (mirror && Number.isFinite(my) && room) show(mirrorTip, mirror, mx, my);
    else mirrorTip.style.display = "none";

    const key = `${point.price}|${point.amount}|${mirror?.amount ?? ""}`;
    lastHover = event;
    if (key !== hoverKey) {
      hoverKey = key;
      emitter.emit("hover", event);
    }
  }

  // ---------------------------------------------------------- interaction

  const setRangeInternal = (range: number | null, emit: boolean) => {
    if (range === null) rangeOverride = null;
    else {
      const [min, max] = limits();
      rangeOverride = clamp(range, min, max);
    }
    host.invalidate();
    if (emit) emitter.emit("range", instance.getRange());
  };

  const inPlot = (x: number, y: number) =>
    x >= plot.x &&
    x <= plot.x + plot.w &&
    y >= plot.y - 30 &&
    y <= plot.y + plot.h;

  const onPointerMove = (event: PointerEvent) => {
    const point = localPoint(root, event);
    pointers.set(event.pointerId, point);
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()] as [
        [number, number],
        [number, number],
      ];
      const distance = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (distance > 0 && options.zoomable !== false)
        setRangeInternal((pinch.range * pinch.distance) / distance, true);
      return;
    }
    hoverAt = inPlot(point[0], point[1]) ? point : null;
    host.invalidate();
  };
  const onPointerDown = (event: PointerEvent) => {
    const point = localPoint(root, event);
    pointers.set(event.pointerId, point);
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()] as [
        [number, number],
        [number, number],
      ];
      pinch = {
        distance: Math.hypot(a[0] - b[0], a[1] - b[1]),
        range: instance.getRange(),
      };
      hoverAt = null;
    } else {
      hoverAt = inPlot(point[0], point[1]) ? point : null;
    }
    host.invalidate();
  };
  const onPointerUp = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinch = null;
  };
  const onPointerLeave = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (event.pointerType === "mouse") {
      hoverAt = null;
      host.invalidate();
    }
  };
  const onClick = () => {
    if (lastHover) emitter.emit("click", lastHover);
  };
  const onWheel = (event: WheelEvent) => {
    if (options.zoomable === false || !(event.ctrlKey || event.metaKey)) return;
    event.preventDefault();
    setRangeInternal(
      instance.getRange() * Math.exp(event.deltaY * 0.0025),
      true,
    );
  };
  const onDoubleClick = () => {
    if (options.zoomable === false) return;
    setRangeInternal(null, true);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const zoom = options.zoomable !== false;
    switch (event.key) {
      case "+":
      case "=":
        if (zoom) setRangeInternal(instance.getRange() / 1.25, true);
        break;
      case "-":
        if (zoom) setRangeInternal(instance.getRange() * 1.25, true);
        break;
      case "0":
        if (zoom) setRangeInternal(null, true);
        break;
      case "ArrowLeft":
      case "ArrowRight": {
        const dx =
          (event.key === "ArrowLeft" ? -1 : 1) * Math.max(2, plot.w / 50);
        const x = hoverAt ? hoverAt[0] + dx : plot.x + plot.w / 2 + dx;
        hoverAt = [clamp(x, plot.x, plot.x + plot.w - 1), plot.y + plot.h / 2];
        host.invalidate();
        break;
      }
      case "Escape":
        hoverAt = null;
        host.invalidate();
        break;
      case "Enter":
        onClick();
        break;
      default:
        return;
    }
    event.preventDefault();
  };
  const onBlur = () => {
    if (hoverAt && !pointers.size) {
      hoverAt = null;
      host.invalidate();
    }
  };

  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("pointerup", onPointerUp);
  root.addEventListener("pointercancel", onPointerUp);
  root.addEventListener("pointerleave", onPointerLeave);
  root.addEventListener("click", onClick);
  root.addEventListener("wheel", onWheel, { passive: false });
  root.addEventListener("dblclick", onDoubleClick);
  root.addEventListener("keydown", onKeyDown);
  root.addEventListener("blur", onBlur);

  const changed = () => {
    if (!inferred && store.count("bid") + store.count("ask") > 0) {
      inferred = true;
      refreshFormat();
    }
    host.invalidate();
  };

  const instance: DepthChartInstance = {
    setBook(snapshot) {
      store.setSnapshot(snapshot);
      inferred = false;
      changed();
    },
    applyDeltas(deltas) {
      if (applyDeltas(store, deltas)) changed();
    },
    clear() {
      store.clear();
      inferred = false;
      host.invalidate();
    },
    setOptions(next) {
      // a new range option replaces the zoom of the user
      if (next.range !== options.range) rangeOverride = null;
      options = next;
      applyOptions();
    },
    setRange(range) {
      setRangeInternal(range, false);
    },
    getRange() {
      const mid = currentMid();
      return Number.isFinite(mid)
        ? currentRange(mid)
        : (rangeOverride ?? options.range ?? 0.01);
    },
    getStore: () => store,
    on: (event, handler) => emitter.on(event, handler),
    resize() {
      host.invalidate();
    },
    destroy() {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("click", onClick);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("dblclick", onDoubleClick);
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("blur", onBlur);
      emitter.clear();
      host.destroy();
    },
  };
  applyOptions();
  return instance;
};
