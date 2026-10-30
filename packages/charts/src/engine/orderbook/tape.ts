// createTimeAndSales: the trade tape. Trades are kept in a ring of typed
// arrays (hundreds of thousands cost a few megabytes, no object per trade);
// a second ring holds the rows after the size filter and the same
// millisecond aggregation. Only the visible rows are drawn, once per frame
// whatever the number of trades received in between.

import { toCss, type Rgba } from "../color";
import { decimalsOf } from "./book";
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
import { createEmitter, createHost, localPoint } from "./host";
import type {
  MarketTrade,
  TimeAndSalesColumn,
  TimeAndSalesEventMap,
  TimeAndSalesInstance,
  TimeAndSalesLabels,
  TimeAndSalesOptions,
  TimeAndSalesRowEvent,
} from "./types";

const LABELS: LabelDictionary<TimeAndSalesLabels> = {
  en: {
    time: "Time",
    price: "Price",
    size: "Size",
    side: "Side",
    buy: "Buy",
    sell: "Sell",
    paused: "Paused",
    newTrades: "{count} new",
    name: "Time and sales",
  },
  zh: {
    time: "时间",
    price: "价格",
    size: "数量",
    side: "方向",
    buy: "买入",
    sell: "卖出",
    paused: "已暂停",
    newTrades: "{count} 条新成交",
    name: "逐笔成交",
  },
  ja: {
    time: "時刻",
    price: "価格",
    size: "数量",
    side: "売買",
    buy: "買い",
    sell: "売り",
    paused: "一時停止中",
    newTrades: "新着 {count} 件",
    name: "歩み値",
  },
  fr: {
    time: "Heure",
    price: "Prix",
    size: "Quantité",
    side: "Sens",
    buy: "Achat",
    sell: "Vente",
    paused: "En pause",
    newTrades: "{count} nouvelles",
    name: "Historique des transactions",
  },
};

const COLUMNS: readonly TimeAndSalesColumn[] = ["time", "price", "size"];
const BUY = 1;
const SELL = 2;
/** Rows the slide-in animation may lag behind the newest one */
const MAX_LAG = 3;
const FLASH_MS = 450;

/** Growable ring of trades stored column by column */
interface Ring {
  time: Float64Array;
  price: Float64Array;
  size: Float64Array;
  side: Uint8Array;
  /** -1 down tick, 0 unchanged, 1 up tick */
  tick: Int8Array;
  /** Trades merged into the row */
  count: Uint32Array;
  /** Local arrival time of the row (flash), `-Infinity` without flash */
  arrival: Float64Array;
  start: number;
  length: number;
  readonly max: number;
}

const createRing = (max: number): Ring => {
  const cap = Math.min(max, 1024);
  return {
    time: new Float64Array(cap),
    price: new Float64Array(cap),
    size: new Float64Array(cap),
    side: new Uint8Array(cap),
    tick: new Int8Array(cap),
    count: new Uint32Array(cap),
    arrival: new Float64Array(cap),
    start: 0,
    length: 0,
    max,
  };
};

/** Physical index of the `k`-th oldest row */
const slot = (ring: Ring, k: number) => (ring.start + k) % ring.time.length;

/** Physical index of a new row (grows the arrays, drops the oldest row when full) */
const pushSlot = (ring: Ring): number => {
  const cap = ring.time.length;
  if (ring.length < cap) {
    const i = (ring.start + ring.length) % cap;
    ring.length++;
    return i;
  }
  if (cap < ring.max) {
    const next = Math.min(ring.max, cap * 2);
    const keys = [
      "time",
      "price",
      "size",
      "side",
      "tick",
      "count",
      "arrival",
    ] as const;
    for (const key of keys) {
      const old = ring[key];
      const grown = new (old.constructor as new (n: number) => typeof old)(
        next,
      );
      // unwrap: oldest row first
      grown.set(old.subarray(ring.start) as never);
      grown.set(old.subarray(0, ring.start) as never, cap - ring.start);
      (ring as unknown as Record<string, unknown>)[key] = grown;
    }
    ring.start = 0;
    ring.length++;
    return cap;
  }
  // full: the oldest row is replaced
  const i = ring.start;
  ring.start = (ring.start + 1) % cap;
  return i;
};

interface Aggregate {
  time: number;
  price: number;
  size: number;
  side: number;
  tick: number;
  count: number;
  arrival: number;
}

/**
 * Creates a time and sales tape in `container`: newest trades on top,
 * virtualized rows, large trade highlight, pause on hover.
 */
export const createTimeAndSales = (
  container: HTMLElement,
  initial: TimeAndSalesOptions = {},
): TimeAndSalesInstance => {
  let options = initial;
  const emitter = createEmitter<TimeAndSalesEventMap>();
  let capacity = Math.max(1, Math.round(options.capacity ?? 200000));
  let raw = createRing(capacity);
  let rows = createRing(capacity);
  /** Aggregate still receiving trades (aggregation only) */
  let open: Aggregate | null = null;
  /** Rows ever shown (closed rows + the open one when visible); only grows */
  let head = 0;
  let closedTotal = 0;
  let lastPrice = NaN;
  let lastTick = 0;
  let fmt: Formatters = createFormatters(options, 2, 4);
  let priceDecimals = 0;
  let sizeDecimals = 0;
  let colors = { up: [0, 0, 0, 1] as Rgba, down: [0, 0, 0, 1] as Rgba };

  // scrolling, in rows from the newest one
  let view = 0;
  let target = 0;
  let userScrolled = false;
  let hoverPaused = false;
  let paused = false;
  let lastFrame = NaN;
  let hoverAt: [number, number] | null = null;
  /** Keyboard selection: sequence number of the row (head - 1 - index) */
  let keySeq: number | null = null;
  let hoverKey = "";
  let hovered: TimeAndSalesRowEvent | null = null;
  let dragging: { offset: number } | null = null;
  // layout of the last frame
  let layout = {
    top: 0,
    rh: 20,
    visible: 0,
    track: [0, 0, 0, 0],
    badge: [0, 0, 0, 0],
  };

  const host = createHost(container, {
    className: "minerva-time-and-sales",
    draw,
    onTheme: () => {
      colors = sideColors(host.theme, options);
    },
  });
  const { root } = host;
  root.tabIndex = 0;
  root.setAttribute("role", "log");
  root.setAttribute("aria-live", "off");

  /** Texts in the locale, resolved on every option update */
  let texts = localeLabels(LABELS, options.locale, options.labels);
  const labels = () => texts;
  const applyTexts = () => {
    texts = localeLabels(LABELS, options.locale, options.labels);
    root.setAttribute("aria-label", options.ariaLabel ?? texts.name);
  };
  const minSize = () => Math.max(0, options.minSize ?? 0);
  const openVisible = () => open !== null && open.size >= minSize();
  const count = () => rows.length + (openVisible() ? 1 : 0);

  const refreshFormat = () => {
    fmt = createFormatters(options, priceDecimals, sizeDecimals);
  };

  const infer = (trade: MarketTrade) => {
    // the first trades decide the decimals (until the precision is set)
    if (raw.length > 64) return;
    const p = Math.min(8, decimalsOf(trade.price));
    const s = Math.min(6, decimalsOf(trade.size));
    if (p > priceDecimals || s > sizeDecimals) {
      priceDecimals = Math.max(priceDecimals, p);
      sizeDecimals = Math.max(sizeDecimals, s);
      refreshFormat();
    }
  };

  const writeRow = (a: Aggregate) => {
    const i = pushSlot(rows);
    rows.time[i] = a.time;
    rows.price[i] = a.price;
    rows.size[i] = a.size;
    rows.side[i] = a.side;
    rows.tick[i] = a.tick;
    rows.count[i] = a.count;
    rows.arrival[i] = a.arrival;
    closedTotal++;
  };

  /** Adds a trade to the rows (after the raw ring) */
  const ingest = (
    time: number,
    price: number,
    size: number,
    side: number,
    tick: number,
    arrival: number,
  ) => {
    if (options.aggregate) {
      if (open && open.side === side && open.time === time) {
        open.size += size;
        open.price = price;
        open.tick = tick;
        open.count++;
        open.arrival = arrival;
        return;
      }
      if (open && open.size >= minSize()) writeRow(open);
      open = { time, price, size, side, tick, count: 1, arrival };
      return;
    }
    if (size >= minSize())
      writeRow({ time, price, size, side, tick, count: 1, arrival });
  };

  /** Moves the view so that the rows on screen stay put (or slide in) */
  const advance = (before: number) => {
    const after = closedTotal + (openVisible() ? 1 : 0);
    const delta = after - before;
    head = after;
    if (delta <= 0) return;
    view += delta;
    if (paused) target += delta;
    else if (options.animate === false) view = target;
    else view = Math.min(view, target + MAX_LAG);
    const n = count();
    target = Math.min(target, Math.max(0, n - 1));
    view = Math.min(view, Math.max(0, n - 1));
  };

  const addTrade = (trade: MarketTrade, arrival: number) => {
    const { time, price, size } = trade;
    if (!Number.isFinite(price) || !Number.isFinite(size) || size <= 0) return;
    infer(trade);
    const side = trade.side === "sell" ? SELL : BUY;
    if (Number.isFinite(lastPrice) && price !== lastPrice)
      lastTick = price > lastPrice ? 1 : -1;
    lastPrice = price;
    const i = pushSlot(raw);
    raw.time[i] = time;
    raw.price[i] = price;
    raw.size[i] = size;
    raw.side[i] = side;
    raw.tick[i] = lastTick;
    ingest(time, price, size, side, lastTick, arrival);
  };

  /** Recomputes the rows from the raw trades (filter / aggregation changed) */
  const rebuild = () => {
    rows = createRing(capacity);
    open = null;
    closedTotal = 0;
    for (let k = 0; k < raw.length; k++) {
      const i = slot(raw, k);
      ingest(
        raw.time[i]!,
        raw.price[i]!,
        raw.size[i]!,
        raw.side[i]!,
        raw.tick[i]!,
        -Infinity,
      );
    }
    head = count();
    view = target = 0;
    userScrolled = false;
    keySeq = null;
  };

  /** Row `index` from the top (0 = newest) */
  const rowAt = (index: number): Aggregate | null => {
    if (index < 0) return null;
    const visibleOpen = openVisible();
    if (visibleOpen && index === 0) return open;
    const k = rows.length - 1 - (index - (visibleOpen ? 1 : 0));
    if (k < 0) return null;
    const i = slot(rows, k);
    return {
      time: rows.time[i]!,
      price: rows.price[i]!,
      size: rows.size[i]!,
      side: rows.side[i]!,
      tick: rows.tick[i]!,
      count: rows.count[i]!,
      arrival: rows.arrival[i]!,
    };
  };

  const toEvent = (row: Aggregate, index: number): TimeAndSalesRowEvent => ({
    trade: {
      time: row.time,
      price: row.price,
      size: row.size,
      side: row.side === SELL ? "sell" : "buy",
    },
    count: row.count,
    index,
  });

  const setPaused = () => {
    const next = hoverPaused || userScrolled || keySeq !== null;
    if (next === paused) return;
    paused = next;
    if (!paused) {
      // back to the newest rows: scroll at most a page, jump over the rest
      target = 0;
      view = Math.min(view, Math.max(MAX_LAG, layout.visible));
    }
    emitter.emit("pause", paused);
  };

  const scrollTo = (rowsFromTop: number, user = true) => {
    const max = Math.max(0, count() - layout.visible);
    target = clamp(Math.round(rowsFromTop), 0, max);
    if (user) userScrolled = target > 0;
    setPaused();
    host.invalidate();
  };

  function draw(now: number): boolean {
    const ctx = host.ctx;
    if (!ctx) return false;
    const { width, height, dpr, theme } = host;
    const l = labels();
    const compact = width < 240;
    const fontSize = options.fontSize ?? (compact ? 11 : 12);
    const rh = Math.max(12, options.rowHeight ?? (compact ? 18 : 20));
    const headerH = options.header === false ? 0 : rh + 2;
    const top = headerH;
    const visible = Math.max(0, Math.ceil((height - top) / rh));
    const n = count();
    const dt = Number.isFinite(lastFrame) ? now - lastFrame : 16;
    lastFrame = now;

    // scroll animation
    let animating = false;
    if (options.animate === false || !Number.isFinite(view)) view = target;
    else {
      view += (target - view) * ease(dt, 70);
      if (Math.abs(view - target) < 0.01) view = target;
      else animating = true;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const text = toCss(theme.text);
    const muted = toCss(theme.textMuted);
    const pad = compact ? 6 : 10;
    const scrollbar = n > Math.floor((height - top) / rh);
    const right = width - pad - (scrollbar ? 6 : 0);

    // columns
    const cols = (options.columns ?? COLUMNS).filter(
      (c, i, all) => all.indexOf(c) === i,
    );
    const shownCols =
      compact && cols.length > 3 ? cols.filter((c) => c !== "side") : cols;
    const weights: Record<TimeAndSalesColumn, number> = {
      time: options.milliseconds === false ? 1 : 1.25,
      price: 1.1,
      size: 1,
      side: 0.6,
    };
    const totalWeight = shownCols.reduce((s, c) => s + weights[c], 0);
    const colRight: number[] = [];
    let acc = pad;
    for (const c of shownCols) {
      acc += ((right - pad) * weights[c]) / totalWeight;
      colRight.push(acc);
    }
    const colLeft = (j: number) => (j === 0 ? pad : colRight[j - 1]!);
    // the time column (and the first one) is left aligned
    const alignLeft = (c: TimeAndSalesColumn, j: number) =>
      j === 0 || c === "time";

    // rows
    const threshold = options.largeTradeThreshold ?? Infinity;
    const first = Math.max(0, Math.floor(view));
    const offset = view - first;
    const flash = options.animate !== false;
    hovered = null;
    let hoverIndex = -1;
    if (hoverAt && hoverAt[1] >= top) {
      hoverIndex = Math.floor((hoverAt[1] - top) / rh + view);
    } else if (keySeq !== null) {
      hoverIndex = head - 1 - keySeq;
    }
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, top, width, height - top);
    ctx.clip();
    ctx.textBaseline = "middle";
    for (let r = 0; r <= visible; r++) {
      const index = first + r;
      if (index >= n) break;
      const row = rowAt(index);
      if (!row) break;
      const y = top + (r - offset) * rh;
      if (y > height) break;
      const sell = row.side === SELL;
      const color = sell ? colors.down : colors.up;
      const large = row.size >= threshold;
      if (index === hoverIndex) {
        hovered = toEvent(row, index);
        ctx.fillStyle = toCss(theme.text, 0.08);
        ctx.fillRect(0, y, width, rh);
      }
      if (large) {
        // stronger tint as the trade grows (log scale, up to 8x the threshold)
        const k = clamp(Math.log2(row.size / threshold) / 3, 0, 1);
        ctx.fillStyle = toCss(color, 0.12 + 0.2 * k);
        ctx.fillRect(0, y + 1, width, rh - 2);
        // a small dot in the left padding marks the large trade (no accent bar)
        ctx.fillStyle = toCss(color);
        ctx.beginPath();
        ctx.arc(
          pad / 2,
          y + rh / 2,
          Math.min(2.5, pad / 2 - 1),
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      if (flash && Number.isFinite(row.arrival)) {
        const age = (now - row.arrival) / FLASH_MS;
        if (age < 1 && age >= 0) {
          ctx.fillStyle = toCss(color, 0.18 * (1 - age) * (1 - age));
          ctx.fillRect(0, y, width, rh);
          animating = true;
        }
      }
      const ty = y + rh / 2 + 0.5;
      const weight = large ? 700 : 400;
      shownCols.forEach((c, j) => {
        const left = alignLeft(c, j);
        ctx.textAlign = left ? "left" : "right";
        const x = left ? colLeft(j) + (j === 0 && large ? 4 : 0) : colRight[j]!;
        switch (c) {
          case "time":
            ctx.font = fontOf(theme, options, 400, fontSize);
            ctx.fillStyle = muted;
            ctx.fillText(
              options.formatTime
                ? options.formatTime(row.time)
                : formatClock(
                    row.time,
                    options.milliseconds !== false,
                    options.timeZone,
                  ),
              x,
              ty,
            );
            break;
          case "price": {
            const tickColor =
              row.tick > 0 ? colors.up : row.tick < 0 ? colors.down : null;
            ctx.font = fontOf(theme, options, large ? 700 : 500, fontSize);
            ctx.fillStyle =
              options.priceColor === "tick"
                ? tickColor
                  ? toCss(tickColor)
                  : text
                : toCss(color);
            ctx.fillText(fmt.price(row.price), x, ty);
            break;
          }
          case "size": {
            ctx.font = fontOf(theme, options, weight, fontSize);
            ctx.fillStyle = large ? toCss(color) : text;
            const label = fmt.size(row.size);
            ctx.fillText(label, x, ty);
            if (row.count > 1 && !compact) {
              // trades merged into the row
              const w = ctx.measureText(label).width;
              ctx.font = fontOf(theme, options, 400, fontSize - 2);
              ctx.fillStyle = muted;
              ctx.fillText(`×${row.count}`, x - w - 5, ty);
            }
            break;
          }
          case "side":
            ctx.font = fontOf(theme, options, 500, fontSize);
            ctx.fillStyle = toCss(color);
            ctx.fillText(sell ? l.sell : l.buy, x, ty);
            break;
        }
      });
    }
    ctx.restore();

    // header
    if (headerH) {
      ctx.font = fontOf(theme, options, 400, fontSize - 1);
      ctx.fillStyle = muted;
      ctx.textBaseline = "middle";
      shownCols.forEach((c, j) => {
        const left = alignLeft(c, j);
        ctx.textAlign = left ? "left" : "right";
        ctx.fillText(l[c], left ? colLeft(j) : colRight[j]!, rh / 2 + 1);
      });
      ctx.fillStyle = toCss(theme.grid);
      ctx.fillRect(0, headerH - 1, width, 1);
    }

    // scrollbar
    const trackH = height - top - 4;
    let track = [0, 0, 0, 0];
    if (scrollbar && trackH > 20) {
      const pageRows = Math.max(1, (height - top) / rh);
      const thumbH = Math.max(18, (trackH * pageRows) / n);
      const maxScroll = Math.max(1, n - pageRows);
      const thumbY =
        top + 2 + (trackH - thumbH) * clamp(view / maxScroll, 0, 1);
      const active =
        dragging !== null || (hoverAt !== null && hoverAt[0] > width - 12);
      ctx.fillStyle = toCss(theme.textMuted, active ? 0.5 : 0.28);
      roundRect(ctx, width - 6, thumbY, 4, thumbH, 2);
      ctx.fill();
      track = [width - 12, top, 12, trackH + 4];
    }

    // badge: paused / new trades above the view
    let badge = [0, 0, 0, 0];
    const above = Math.round(target);
    if (paused || above > 0) {
      const textParts: string[] = [];
      if (hoverPaused && !userScrolled) textParts.push(l.paused);
      if (above > 0)
        textParts.push(
          l.newTrades.replace(
            "{count}",
            above > 9999 ? "9999+" : String(above),
          ),
        );
      if (textParts.length) {
        const label = textParts.join(" · ");
        ctx.font = fontOf(theme, options, 500, Math.max(10, fontSize - 1));
        const bw = ctx.measureText(label).width + 20;
        const bh = Math.min(22, rh + 2);
        const bx = (width - bw) / 2;
        const by = top + 6;
        ctx.fillStyle = toCss(theme.primary, 0.92);
        roundRect(ctx, bx, by, bw, bh, bh / 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, width / 2, by + bh / 2 + 0.5);
        badge = [bx, by, bw, bh];
      }
    }
    layout = {
      top,
      rh,
      visible: Math.floor((height - top) / rh),
      track,
      badge,
    };
    root.style.cursor =
      badge[2] && hoverAt && inRect(hoverAt, badge) ? "pointer" : "default";

    // hover event
    const key = hovered
      ? `${head - 1 - hovered.index}|${hovered.trade.size}`
      : "";
    if (key !== hoverKey) {
      hoverKey = key;
      emitter.emit("hover", hovered);
    }

    const latest = rowAt(0);
    if (latest)
      host.describe(
        `${options.ariaLabel ?? l.name}. ${latest.side === SELL ? l.sell : l.buy} ${fmt.size(latest.size)} @ ${fmt.price(latest.price)}.`,
      );
    return animating;
  }

  const inRect = (p: readonly number[], r: readonly number[]) =>
    r[2]! > 0 &&
    p[0]! >= r[0]! &&
    p[0]! <= r[0]! + r[2]! &&
    p[1]! >= r[1]! &&
    p[1]! <= r[1]! + r[3]!;

  // ---------------------------------------------------------- interaction

  const thumbScroll = (y: number) => {
    const [, ty, , th] = layout.track;
    const n = count();
    const ratio = clamp((y - ty!) / Math.max(1, th!), 0, 1);
    scrollTo(ratio * Math.max(0, n - layout.visible));
  };

  const onPointerMove = (event: PointerEvent) => {
    hoverAt = localPoint(root, event);
    if (dragging) thumbScroll(hoverAt[1] - dragging.offset);
    if (options.pauseOnHover !== false && !hoverPaused) {
      hoverPaused = true;
      setPaused();
    }
    host.invalidate();
  };
  const onPointerLeave = () => {
    hoverAt = null;
    if (hoverPaused) {
      hoverPaused = false;
      setPaused();
    }
    host.invalidate();
  };
  const onPointerDown = (event: PointerEvent) => {
    const p = localPoint(root, event);
    if (inRect(p, layout.track) && !inRect(p, layout.badge)) {
      dragging = { offset: 0 };
      root.setPointerCapture?.(event.pointerId);
      thumbScroll(p[1]);
      event.preventDefault();
    }
  };
  const onPointerUp = (event: PointerEvent) => {
    if (!dragging) return;
    dragging = null;
    root.releasePointerCapture?.(event.pointerId);
    host.invalidate();
  };
  const onClick = (event: MouseEvent) => {
    const p = localPoint(root, event);
    if (inRect(p, layout.badge)) {
      instance.scrollToLatest();
      return;
    }
    if (inRect(p, layout.track) || p[1] < layout.top) return;
    const index = Math.floor((p[1] - layout.top) / layout.rh + view);
    const row = rowAt(index);
    if (row && index < count()) emitter.emit("tradeClick", toEvent(row, index));
  };
  const onWheel = (event: WheelEvent) => {
    const n = count();
    const max = Math.max(0, n - layout.visible);
    const step =
      event.deltaMode === 1
        ? event.deltaY
        : event.deltaMode === 2
          ? event.deltaY * layout.visible
          : event.deltaY / layout.rh;
    // at the ends the page scrolls
    if ((step < 0 && target <= 0) || (step > 0 && target >= max)) return;
    event.preventDefault();
    scrollTo(target + (Math.abs(step) < 1 ? Math.sign(step) : step));
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const n = count();
    if (!n) return;
    const page = Math.max(1, layout.visible - 1);
    const index = keySeq === null ? -1 : head - 1 - keySeq;
    const select = (next: number) => {
      const i = clamp(next, 0, n - 1);
      keySeq = head - 1 - i;
      // keep the selection on screen
      if (i < target) scrollTo(i);
      else if (i >= target + layout.visible) scrollTo(i - layout.visible + 1);
      else setPaused();
      host.invalidate();
    };
    switch (event.key) {
      case "ArrowDown":
        select(index + 1);
        break;
      case "ArrowUp":
        select(Math.max(0, index - 1));
        break;
      case "PageDown":
        select(Math.max(0, index) + page);
        break;
      case "PageUp":
        select(index - page);
        break;
      case "Home":
        keySeq = null;
        instance.scrollToLatest();
        break;
      case "End":
        select(n - 1);
        break;
      case "Enter":
      case " ": {
        const row = index >= 0 ? rowAt(index) : null;
        if (row) emitter.emit("tradeClick", toEvent(row, index));
        break;
      }
      case "Escape":
        keySeq = null;
        instance.scrollToLatest();
        break;
      default:
        return;
    }
    event.preventDefault();
  };
  const onBlur = () => {
    if (keySeq === null) return;
    keySeq = null;
    setPaused();
    host.invalidate();
  };
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("pointerup", onPointerUp);
  root.addEventListener("click", onClick);
  root.addEventListener("wheel", onWheel, { passive: false });
  root.addEventListener("keydown", onKeyDown);
  root.addEventListener("blur", onBlur);

  const nowMs = () =>
    typeof performance !== "undefined" ? performance.now() : Date.now();

  const reset = () => {
    raw = createRing(capacity);
    rows = createRing(capacity);
    open = null;
    head = closedTotal = 0;
    lastPrice = NaN;
    lastTick = 0;
    priceDecimals = sizeDecimals = 0;
    view = target = 0;
    userScrolled = false;
    keySeq = null;
    setPaused();
    refreshFormat();
  };

  const instance: TimeAndSalesInstance = {
    addTrades(trades) {
      const list = Array.isArray(trades)
        ? (trades as readonly MarketTrade[])
        : [trades as MarketTrade];
      if (!list.length) return;
      const before = head;
      const arrival = nowMs();
      for (const trade of list) addTrade(trade, arrival);
      advance(before);
      host.invalidate();
    },
    setTrades(trades) {
      reset();
      for (const trade of trades) addTrade(trade, -Infinity);
      head = count();
      host.invalidate();
    },
    clear() {
      reset();
      host.invalidate();
    },
    setOptions(next) {
      const previous = options;
      options = next;
      applyTexts();
      colors = sideColors(host.theme, options);
      const nextCapacity = Math.max(1, Math.round(options.capacity ?? 200000));
      if (nextCapacity !== capacity) {
        // keep the newest trades that fit
        const old = raw;
        capacity = nextCapacity;
        raw = createRing(capacity);
        for (let k = Math.max(0, old.length - capacity); k < old.length; k++) {
          const i = slot(old, k);
          const j = pushSlot(raw);
          raw.time[j] = old.time[i]!;
          raw.price[j] = old.price[i]!;
          raw.size[j] = old.size[i]!;
          raw.side[j] = old.side[i]!;
          raw.tick[j] = old.tick[i]!;
        }
        rebuild();
      } else if (
        (previous.minSize ?? 0) !== (next.minSize ?? 0) ||
        !previous.aggregate !== !next.aggregate
      ) {
        rebuild();
      }
      if (options.pauseOnHover === false && hoverPaused) hoverPaused = false;
      setPaused();
      refreshFormat();
      host.invalidate();
    },
    scrollToLatest() {
      keySeq = null;
      userScrolled = false;
      target = 0;
      setPaused();
      host.invalidate();
    },
    getCount: count,
    on: (event, handler) => emitter.on(event, handler),
    resize() {
      host.invalidate();
    },
    destroy() {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("click", onClick);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("blur", onBlur);
      emitter.clear();
      host.destroy();
    },
  };
  applyTexts();
  colors = sideColors(host.theme, options);
  refreshFormat();
  host.invalidate();
  return instance;
};
