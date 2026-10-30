// createOrderBook: the price ladder (asks above the spread row, bids below)
// drawn with Canvas2D. Any number of deltas between two frames cost one
// draw of the visible rows; changed levels flash, walls stand out, hovering
// sums the levels up to the pointer.

import { toCss, type Rgba } from "../color";
import {
  applyDeltas,
  createOrderBookStore,
  decimalsOf,
  inferPriceDecimals,
  inferSizeDecimals,
} from "./book";
import {
  clamp,
  createFormatters,
  fontOf,
  numberFormat,
  roundRect,
  sideColors,
  type Formatters,
} from "./format";
import { localeLabels, type LabelDictionary } from "../locale";
import { createEmitter, createHost, localPoint, tooltipHtml } from "./host";
import type {
  OrderBookEventMap,
  OrderBookInstance,
  OrderBookLabels,
  OrderBookLevelEvent,
  OrderBookOptions,
  OrderBookSide,
} from "./types";

const LABELS: LabelDictionary<OrderBookLabels> = {
  en: {
    price: "Price",
    size: "Size",
    total: "Total",
    spread: "Spread",
    average: "Avg. price",
    sum: "Sum",
    notional: "Notional",
    buyShare: "B",
    sellShare: "S",
    bid: "Bid",
    ask: "Ask",
    basisPoints: "bp",
    name: "Order book",
  },
  zh: {
    price: "价格",
    size: "数量",
    total: "累计",
    spread: "价差",
    average: "均价",
    sum: "累计数量",
    notional: "累计金额",
    buyShare: "买",
    sellShare: "卖",
    bid: "买一",
    ask: "卖一",
    basisPoints: "基点",
    name: "订单簿",
  },
  ja: {
    price: "価格",
    size: "数量",
    total: "累計",
    spread: "スプレッド",
    average: "平均価格",
    sum: "累計数量",
    notional: "累計金額",
    buyShare: "買",
    sellShare: "売",
    bid: "最良買気配",
    ask: "最良売気配",
    basisPoints: "bp",
    name: "板情報",
  },
  fr: {
    price: "Prix",
    size: "Quantité",
    total: "Cumul",
    spread: "Écart",
    average: "Prix moyen",
    sum: "Somme",
    notional: "Montant",
    buyShare: "A",
    sellShare: "V",
    bid: "Meilleur achat",
    ask: "Meilleure vente",
    basisPoints: "pb",
    name: "Carnet d’ordres",
  },
};

const COLUMNS = ["price", "size", "total"] as const;

interface Row extends OrderBookLevelEvent {
  /** Top of the row, CSS pixels */
  y: number;
}

interface Flash {
  size: number;
  at: number;
  grew: boolean;
}

/**
 * Creates an order book ladder in `container`: asks, spread row and bids
 * with depth bars, grouping, flashes on changes and a hover summary.
 */
export const createOrderBook = (
  container: HTMLElement,
  initial: OrderBookOptions = {},
): OrderBookInstance => {
  let options = initial;
  const store = createOrderBookStore();
  const emitter = createEmitter<OrderBookEventMap>();
  let fmt: Formatters = createFormatters(options, 2, 4);
  let finePrice = fmt.price;
  /** Texts in the locale, resolved on every option update */
  let texts = localeLabels(LABELS, options.locale, options.labels);
  let inferred = false;
  let colors = { up: [0, 0, 0, 1] as Rgba, down: [0, 0, 0, 1] as Rgba };
  let lastPrice: number | null = null;
  let previousLast = NaN;
  let lastDirection = 0;
  let flashes = new Map<string, Flash>();
  /** Price range of the rows of the previous frame, per side */
  const shownRange: Record<OrderBookSide, [number, number]> = {
    bid: [NaN, NaN],
    ask: [NaN, NaN],
  };
  let drawn = false;
  let rows: Row[] = [];
  let hoverAt: [number, number] | null = null;
  /** Keyboard selection: side and index from the spread */
  let keyRow: { side: OrderBookSide; index: number } | null = null;
  let hoverKey = "";
  let hovered: Row | null = null;
  let rowHeight = 20;

  const host = createHost(container, {
    className: "minerva-order-book",
    draw,
    onTheme: () => {
      colors = sideColors(host.theme, options);
    },
  });
  const { root, doc } = host;
  root.tabIndex = 0;
  root.setAttribute("role", "figure");
  root.style.cursor = "default";

  const labels = () => texts;

  const refreshFormat = () => {
    const grouping = options.grouping ?? 0;
    const raw = inferPriceDecimals(store);
    fmt = createFormatters(
      options,
      grouping > 0 ? Math.max(decimalsOf(grouping), 0) : raw,
      inferSizeDecimals(store),
    );
    // the spread row keeps the raw tick precision (a 0.1 spread is not "0")
    const fine = numberFormat(
      options.locale,
      Math.max(fmt.priceDecimals, options.grouping ? raw : 0),
    );
    finePrice = options.formatPrice
      ? fmt.price
      : (v) => (Number.isFinite(v) ? fine.format(v) : "–");
  };

  const applyTexts = () => {
    texts = localeLabels(LABELS, options.locale, options.labels);
    root.setAttribute("aria-label", options.ariaLabel ?? texts.name);
  };

  const applyOptions = () => {
    applyTexts();
    colors = sideColors(host.theme, options);
    refreshFormat();
    // grouping changes the rows: no flash for the new buckets
    flashes = new Map();
    drawn = false;
    host.invalidate();
  };

  /** Levels of a side with their cumulative values */
  const sideRows = (side: OrderBookSide, limit: number): Row[] => {
    const { price, size, count } = store.levels(side, {
      step: options.grouping ?? 0,
      limit,
    });
    const out: Row[] = [];
    let sum = 0;
    let notional = 0;
    for (let i = 0; i < count; i++) {
      const p = price[i]!;
      const s = size[i]!;
      sum += s;
      notional += s * p;
      out.push({
        side,
        index: i,
        price: p,
        size: s,
        sum,
        notional,
        average: notional / sum,
        y: 0,
      });
    }
    return out;
  };

  function draw(now: number): boolean {
    const ctx = host.ctx;
    if (!ctx) return false;
    const { width, height, dpr, theme } = host;
    const l = labels();
    const mode = options.mode ?? "both";
    const compact = width < 260;
    const fontSize = options.fontSize ?? (compact ? 11 : 12);
    const rh = (rowHeight = Math.max(
      12,
      options.rowHeight ?? (compact ? 18 : 20),
    ));
    const headerH = options.header === false ? 0 : rh + 2;
    const spreadH = options.spreadRow === false ? 0 : Math.round(rh * 1.7);
    const imbalanceH = options.imbalance === false ? 0 : 24;
    const sides = mode === "both" ? 2 : 1;
    const avail = Math.max(0, height - headerH - spreadH - imbalanceH);
    const perSide = Math.max(0, options.rows ?? Math.floor(avail / rh / sides));
    const pad = compact ? 6 : 10;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const asks = mode === "bids" ? [] : sideRows("ask", perSide);
    const bids = mode === "asks" ? [] : sideRows("bid", perSide);

    // vertical layout
    let y = headerH;
    const asksTop = y;
    if (mode !== "bids") {
      for (const row of asks) row.y = asksTop + (perSide - 1 - row.index) * rh;
      y += perSide * rh;
    }
    const spreadY = mode === "bids" ? headerH : y;
    if (mode !== "bids") y += spreadH;
    else y = headerH + spreadH;
    const bidsTop = y;
    for (const row of bids) row.y = bidsTop + row.index * rh;
    rows = [...asks, ...bids];
    const spreadTop = mode === "asks" ? asksTop + perSide * rh : spreadY;

    // columns
    const cols = (options.columns ?? COLUMNS).filter(
      (c, i, all) => all.indexOf(c) === i,
    );
    const shownCols = compact && cols.length > 2 ? cols.slice(0, 2) : cols;
    const n = shownCols.length;
    const inner = width - pad * 2;
    const colX = shownCols.map((_, j) =>
      j === 0
        ? pad
        : pad + inner * (j === n - 1 ? 1 : 0.24 + (0.76 * j) / (n - 1)),
    );

    // depth bar scale
    const barsMode = options.depthBars ?? "cumulative";
    let barMax = 0;
    for (const row of rows) {
      barMax = Math.max(barMax, barsMode === "level" ? row.size : row.sum);
    }

    // flashes: compare with the sizes of the previous frame
    const flash = options.flash !== false;
    const duration = Math.max(1, options.flashDuration ?? 450);
    const nextFlashes = new Map<string, Flash>();
    let animating = false;
    const inside = (row: Row) => {
      const range = shownRange[row.side];
      return drawn && row.price > range[0] && row.price < range[1];
    };
    for (const row of rows) {
      const key = `${row.side}:${row.price}`;
      const previous = flashes.get(key);
      let entry: Flash;
      // a level scrolling into view is not new: only levels appearing
      // between the rows already shown flash
      if (!previous)
        entry = {
          size: row.size,
          at: inside(row) ? now : -Infinity,
          grew: true,
        };
      else if (previous.size !== row.size)
        entry = { size: row.size, at: now, grew: row.size > previous.size };
      else entry = previous;
      nextFlashes.set(key, entry);
    }
    flashes = nextFlashes;
    drawn = true;
    for (const side of ["bid", "ask"] as const) {
      const list = side === "bid" ? bids : asks;
      const prices = list.map((r) => r.price);
      shownRange[side] = prices.length
        ? [Math.min(...prices), Math.max(...prices)]
        : [NaN, NaN];
    }

    // hover: rows from the spread to the hovered one
    hovered = null;
    if (hoverAt) {
      const [hx, hy] = hoverAt;
      if (hx >= 0 && hx <= width)
        hovered = rows.find((r) => hy >= r.y && hy < r.y + rh) ?? null;
    } else if (keyRow) {
      const list = keyRow.side === "ask" ? asks : bids;
      hovered = list[Math.min(keyRow.index, list.length - 1)] ?? null;
    }

    const threshold = options.largeOrderThreshold ?? Infinity;
    const text = toCss(theme.text);
    const muted = toCss(theme.textMuted);

    // header
    if (headerH) {
      ctx.font = fontOf(theme, options, 400, fontSize - 1);
      ctx.fillStyle = muted;
      ctx.textBaseline = "middle";
      shownCols.forEach((c, j) => {
        ctx.textAlign = j === 0 ? "left" : "right";
        ctx.fillText(l[c], colX[j]!, rh / 2 + 1);
      });
    }

    // rows
    for (const row of rows) {
      const color = row.side === "bid" ? colors.up : colors.down;
      const key = `${row.side}:${row.price}`;
      const large = row.size >= threshold;
      // hover band (cumulative selection)
      if (hovered && hovered.side === row.side && row.index <= hovered.index) {
        ctx.fillStyle = toCss(theme.text, row === hovered ? 0.09 : 0.045);
        ctx.fillRect(0, row.y, width, rh);
      }
      // depth bar
      if (barsMode !== "none" && barMax > 0) {
        const value = barsMode === "level" ? row.size : row.sum;
        const w = (value / barMax) * width;
        ctx.fillStyle = toCss(color, 0.14);
        ctx.fillRect(width - w, row.y + 1, w, rh - 2);
      }
      if (large) {
        ctx.fillStyle = toCss(color, 0.16);
        ctx.fillRect(0, row.y + 1, width, rh - 2);
        ctx.fillStyle = toCss(color);
        ctx.fillRect(0, row.y + 2, 3, rh - 4);
      }
      // flash: behind the size that changed (a whole-row flash makes a
      // ladder at 200 updates/s flicker)
      const f = flashes.get(key);
      let flashAlpha = 0;
      if (flash && f && Number.isFinite(f.at)) {
        const age = (now - f.at) / duration;
        if (age < 1) {
          flashAlpha = (1 - age) * (1 - age);
          animating = true;
        }
      }
      // texts
      ctx.textBaseline = "middle";
      const ty = row.y + rh / 2 + 0.5;
      shownCols.forEach((c, j) => {
        ctx.textAlign = j === 0 ? "left" : "right";
        if (c === "price") {
          ctx.font = fontOf(theme, options, 500, fontSize);
          ctx.fillStyle = toCss(color);
          ctx.fillText(
            fmt.price(row.price),
            colX[j]! + (large && j === 0 ? 4 : 0),
            ty,
          );
        } else if (c === "size") {
          ctx.font = fontOf(theme, options, large ? 700 : 400, fontSize);
          const label = fmt.size(row.size);
          if (flashAlpha > 0 && f) {
            const w = ctx.measureText(label).width + 10;
            const x = j === 0 ? colX[j]! - 5 : colX[j]! - w + 5;
            ctx.fillStyle = toCss(
              f.grew ? color : theme.textMuted,
              (f.grew ? 0.45 : 0.3) * flashAlpha,
            );
            roundRect(ctx, x, row.y + 2, w, rh - 4, 3);
            ctx.fill();
          }
          ctx.fillStyle = text;
          ctx.fillText(label, colX[j]!, ty);
        } else {
          ctx.font = fontOf(theme, options, 400, fontSize);
          ctx.fillStyle = muted;
          ctx.fillText(
            options.total === "quote"
              ? fmt.notional(row.notional)
              : fmt.total(row.sum),
            colX[j]!,
            ty,
          );
        }
      });
    }
    if (hovered) {
      // edge of the selection
      ctx.strokeStyle = toCss(theme.textMuted, 0.7);
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      const edge =
        hovered.side === "bid" ? hovered.y + rh - 0.5 : hovered.y + 0.5;
      ctx.moveTo(0, edge);
      ctx.lineTo(width, edge);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // spread row
    if (spreadH) {
      const mid = store.mid();
      const shown = lastPrice ?? mid;
      if (Number.isFinite(shown) && shown !== previousLast) {
        if (Number.isFinite(previousLast))
          lastDirection =
            shown > previousLast
              ? 1
              : shown < previousLast
                ? -1
                : lastDirection;
        previousLast = shown;
      }
      const sy = spreadTop;
      ctx.fillStyle = toCss(theme.text, 0.035);
      ctx.fillRect(0, sy, width, spreadH);
      ctx.strokeStyle = toCss(theme.grid);
      ctx.beginPath();
      ctx.moveTo(0, Math.round(sy) + 0.5);
      ctx.lineTo(width, Math.round(sy) + 0.5);
      ctx.moveTo(0, Math.round(sy + spreadH) - 0.5);
      ctx.lineTo(width, Math.round(sy + spreadH) - 0.5);
      ctx.stroke();
      const dirColor =
        lastDirection > 0
          ? colors.up
          : lastDirection < 0
            ? colors.down
            : theme.text;
      const cy = sy + spreadH / 2 + 0.5;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.font = fontOf(theme, options, 700, fontSize + (compact ? 2 : 4));
      ctx.fillStyle = toCss(dirColor);
      const priceText = finePrice(shown);
      ctx.fillText(priceText, pad, cy);
      let x = pad + ctx.measureText(priceText).width + 6;
      if (lastDirection !== 0) {
        // arrow of the last move
        const s = compact ? 4 : 5;
        ctx.beginPath();
        if (lastDirection > 0) {
          ctx.moveTo(x, cy + s * 0.6);
          ctx.lineTo(x + s, cy - s * 0.7);
          ctx.lineTo(x + s * 2, cy + s * 0.6);
        } else {
          ctx.moveTo(x, cy - s * 0.6);
          ctx.lineTo(x + s, cy + s * 0.7);
          ctx.lineTo(x + s * 2, cy - s * 0.6);
        }
        ctx.closePath();
        ctx.fill();
        x += s * 2 + 6;
      }
      const spread = store.spread();
      if (Number.isFinite(spread)) {
        ctx.textAlign = "right";
        ctx.font = fontOf(theme, options, 400, fontSize - 1);
        const bps = (spread / mid) * 1e4;
        const right = `${finePrice(spread)} · ${fmt.fixed(bps, bps < 10 ? 2 : 1)} ${l.basisPoints}`;
        ctx.fillStyle = text;
        ctx.fillText(right, width - pad, cy);
        if (!compact) {
          const rw = ctx.measureText(right).width;
          ctx.fillStyle = muted;
          const label = `${l.spread}`;
          if (width - pad - rw - 8 - ctx.measureText(label).width > x)
            ctx.fillText(label, width - pad - rw - 8, cy);
        }
      }
    }

    // imbalance bar
    if (imbalanceH) {
      let bidSum = 0;
      let askSum = 0;
      for (const r of bids) bidSum += r.size;
      for (const r of asks) askSum += r.size;
      const all = bidSum + askSum;
      const share = all > 0 ? bidSum / all : 0.5;
      const by = height - imbalanceH + 6;
      const bh = imbalanceH - 10;
      const bw = width - pad * 2;
      const split = pad + bw * share;
      ctx.save();
      roundRect(ctx, pad, by, bw, bh, 3);
      ctx.clip();
      ctx.fillStyle = toCss(colors.up, 0.22);
      ctx.fillRect(pad, by, split - pad, bh);
      ctx.fillStyle = toCss(colors.down, 0.22);
      ctx.fillRect(split, by, pad + bw - split, bh);
      ctx.restore();
      ctx.fillStyle = toCss(theme.background);
      ctx.fillRect(split - 1, by, 2, bh);
      ctx.font = fontOf(theme, options, 600, fontSize - 1);
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = toCss(colors.up);
      const mid = by + bh / 2 + 0.5;
      ctx.fillText(
        `${l.buyShare} ${fmt.percent(share, 1, false)}`,
        pad + 6,
        mid,
      );
      ctx.textAlign = "right";
      ctx.fillStyle = toCss(colors.down);
      ctx.fillText(
        `${fmt.percent(1 - share, 1, false)} ${l.sellShare}`,
        pad + bw - 6,
        mid,
      );
    }

    // tooltip and hover event
    if (hovered && options.tooltip !== false) {
      const color = hovered.side === "bid" ? colors.up : colors.down;
      tooltipHtml(
        doc,
        host.tooltip,
        { text: fmt.price(hovered.price), color: toCss(color) },
        [
          [l.average, finePrice(hovered.average)],
          [l.sum, fmt.total(hovered.sum)],
          [l.notional, fmt.notional(hovered.notional)],
        ],
      );
      host.tooltip.style.display = "block";
      const ax = hoverAt ? hoverAt[0] : width * 0.4;
      host.placeTooltip(
        host.tooltip,
        ax,
        hovered.y + rh / 2,
        ax > width / 2 ? "left" : "right",
      );
    } else {
      host.tooltip.style.display = "none";
    }
    const key = hovered
      ? `${hovered.side}|${hovered.index}|${hovered.price}|${hovered.size}|${hovered.sum}`
      : "";
    if (key !== hoverKey) {
      hoverKey = key;
      emitter.emit("hover", hovered ? toEvent(hovered) : null);
    }

    const bb = store.bestBid();
    const ba = store.bestAsk();
    host.describe(
      `${options.ariaLabel ?? l.name}. ${l.bid} ${finePrice(bb)}, ${l.ask} ${finePrice(ba)}, ${l.spread} ${finePrice(ba - bb)}.`,
    );
    return animating;
  }

  const toEvent = (row: Row): OrderBookLevelEvent => ({
    side: row.side,
    index: row.index,
    price: row.price,
    size: row.size,
    sum: row.sum,
    notional: row.notional,
    average: row.average,
  });

  // ---------------------------------------------------------- interaction

  const onPointerMove = (event: PointerEvent) => {
    hoverAt = localPoint(root, event);
    keyRow = null;
    host.invalidate();
  };
  const onPointerLeave = () => {
    hoverAt = null;
    host.invalidate();
  };
  const onClick = (event: MouseEvent) => {
    const [x, y] = localPoint(root, event);
    const row = rows.find((r) => y >= r.y && y < r.y + rowHeight);
    if (row && x >= 0) emitter.emit("levelClick", toEvent(row));
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const order: { side: OrderBookSide; index: number }[] = [];
    const asks = rows.filter((r) => r.side === "ask");
    const bids = rows.filter((r) => r.side === "bid");
    for (let i = asks.length - 1; i >= 0; i--)
      order.push({ side: "ask", index: i });
    for (let i = 0; i < bids.length; i++) order.push({ side: "bid", index: i });
    if (!order.length) return;
    const current = keyRow
      ? order.findIndex(
          (o) => o.side === keyRow!.side && o.index === keyRow!.index,
        )
      : -1;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        const down = event.key === "ArrowDown";
        // first press: the best level on that side of the spread
        const next =
          current >= 0
            ? clamp(current + (down ? 1 : -1), 0, order.length - 1)
            : down
              ? Math.min(asks.length, order.length - 1)
              : Math.max(0, asks.length - 1);
        keyRow = order[next] ?? null;
        hoverAt = null;
        host.invalidate();
        break;
      }
      case "Enter":
      case " ":
        if (hovered) emitter.emit("levelClick", toEvent(hovered));
        break;
      case "Escape":
        keyRow = null;
        host.invalidate();
        break;
      default:
        return;
    }
    event.preventDefault();
  };
  const onBlur = () => {
    if (keyRow) {
      keyRow = null;
      host.invalidate();
    }
  };
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKeyDown);
  root.addEventListener("blur", onBlur);

  const changed = () => {
    if (!inferred && store.count("bid") + store.count("ask") > 0) {
      inferred = true;
      refreshFormat();
    }
    host.invalidate();
  };

  const instance: OrderBookInstance = {
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
      flashes = new Map();
      drawn = false;
      host.invalidate();
    },
    setLastPrice(price) {
      lastPrice = price !== null && Number.isFinite(price) ? price : null;
      host.invalidate();
    },
    setOptions(next) {
      const regroup =
        (next.grouping ?? 0) !== (options.grouping ?? 0) ||
        next.mode !== options.mode;
      options = next;
      if (regroup) applyOptions();
      else {
        applyTexts();
        colors = sideColors(host.theme, options);
        refreshFormat();
        host.invalidate();
      }
    },
    getStore: () => store,
    on: (event, handler) => emitter.on(event, handler),
    resize() {
      host.invalidate();
    },
    destroy() {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("blur", onBlur);
      emitter.clear();
      host.destroy();
    },
  };
  applyOptions();
  return instance;
};
