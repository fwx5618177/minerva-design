// Order book store: both sides kept as sorted typed arrays (ascending
// prices), updated in place by snapshots and deltas. Inserting next to the
// best price moves the rest of the side with one copyWithin, which stays
// far below a microsecond per update for books of a few thousand levels.

import type {
  OrderBookDelta,
  OrderBookLevelColumns,
  OrderBookLevels,
  OrderBookSide,
  OrderBookStore,
  OrderBookStoreOptions,
} from "./types";

interface Side {
  prices: Float64Array;
  sizes: Float64Array;
  count: number;
}

const createSide = (capacity = 64): Side => ({
  prices: new Float64Array(capacity),
  sizes: new Float64Array(capacity),
  count: 0,
});

/** First index whose price is >= `price` */
const lowerBound = (side: Side, price: number): number => {
  let lo = 0;
  let hi = side.count;
  const prices = side.prices;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (prices[mid] < price) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

const grow = (side: Side, needed: number) => {
  if (needed <= side.prices.length) return;
  const capacity = Math.max(needed, side.prices.length * 2);
  const prices = new Float64Array(capacity);
  const sizes = new Float64Array(capacity);
  prices.set(side.prices.subarray(0, side.count));
  sizes.set(side.sizes.subarray(0, side.count));
  side.prices = prices;
  side.sizes = sizes;
};

/** Sets the size of a price (<= 0 removes it); `true` when it changed */
const setLevel = (side: Side, price: number, size: number): boolean => {
  if (!Number.isFinite(price)) return false;
  const i = lowerBound(side, price);
  const found = i < side.count && side.prices[i] === price;
  const valid = Number.isFinite(size) && size > 0;
  if (found) {
    if (!valid) {
      side.prices.copyWithin(i, i + 1, side.count);
      side.sizes.copyWithin(i, i + 1, side.count);
      side.count--;
      return true;
    }
    if (side.sizes[i] === size) return false;
    side.sizes[i] = size;
    return true;
  }
  if (!valid) return false;
  grow(side, side.count + 1);
  side.prices.copyWithin(i + 1, i, side.count);
  side.sizes.copyWithin(i + 1, i, side.count);
  side.prices[i] = price;
  side.sizes[i] = size;
  side.count++;
  return true;
};

/** Iterates `[price, size]` tuples or columns */
export const forEachLevel = (
  levels: OrderBookLevels | undefined,
  fn: (price: number, size: number) => void,
) => {
  if (!levels) return;
  if (Array.isArray(levels)) {
    for (const level of levels as readonly (readonly [number, number])[]) {
      fn(level[0], level[1]);
    }
    return;
  }
  const { price, size } = levels as OrderBookLevelColumns;
  const n = Math.min(price.length, size.length);
  for (let i = 0; i < n; i++) fn(price[i]!, size[i]!);
};

/** Number of decimals of a step (0.25 -> 2, 5 -> 0) */
export const decimalsOf = (value: number): number => {
  if (!Number.isFinite(value) || value === 0) return 0;
  const abs = Math.abs(value);
  for (let d = 0; d <= 10; d++) {
    const scaled = abs * 10 ** d;
    if (Math.abs(scaled - Math.round(scaled)) < 1e-7 * Math.max(1, scaled))
      return d;
  }
  return 10;
};

/** Rounds a multiple of a step without float noise */
export const roundToStep = (value: number, step: number): number =>
  +value.toFixed(Math.min(12, decimalsOf(step) + 1));

/**
 * Bucket of a price for a grouping step: bids round down, asks up (the
 * aggregated level never looks better than its orders)
 */
export const groupPrice = (
  price: number,
  step: number,
  side: OrderBookSide,
): number => {
  if (!(step > 0)) return price;
  const k = price / step;
  const index = side === "bid" ? Math.floor(k + 1e-9) : Math.ceil(k - 1e-9);
  return roundToStep(index * step, step);
};

/**
 * Creates an order book store: snapshots and deltas in, sorted levels
 * (optionally grouped by a price step) out
 */
export const createOrderBookStore = (
  options: OrderBookStoreOptions = {},
): OrderBookStore => {
  const maxLevels = Math.max(1, options.maxLevels ?? 5000);
  const bids = createSide();
  const asks = createSide();
  let version = 0;
  let time = NaN;

  const sideOf = (side: OrderBookSide) => (side === "bid" ? bids : asks);

  /** Drops the farthest levels above the cap */
  const trim = () => {
    if (bids.count > maxLevels) {
      const drop = bids.count - maxLevels;
      bids.prices.copyWithin(0, drop, bids.count);
      bids.sizes.copyWithin(0, drop, bids.count);
      bids.count = maxLevels;
    }
    if (asks.count > maxLevels) asks.count = maxLevels;
  };

  /** Physical index of the `index`-th level from the best one */
  const physical = (side: OrderBookSide, index: number) =>
    side === "bid" ? bids.count - 1 - index : index;

  const store: OrderBookStore = {
    setSnapshot(snapshot) {
      bids.count = 0;
      asks.count = 0;
      forEachLevel(snapshot.bids, (p, s) => setLevel(bids, p, s));
      forEachLevel(snapshot.asks, (p, s) => setLevel(asks, p, s));
      trim();
      if (snapshot.time !== undefined) time = snapshot.time;
      version++;
    },
    applyDelta(delta: OrderBookDelta) {
      let changed = false;
      forEachLevel(delta.bids, (p, s) => {
        if (setLevel(bids, p, s)) changed = true;
      });
      forEachLevel(delta.asks, (p, s) => {
        if (setLevel(asks, p, s)) changed = true;
      });
      if (delta.time !== undefined) time = delta.time;
      if (changed) {
        trim();
        version++;
      }
      return changed;
    },
    clear() {
      bids.count = 0;
      asks.count = 0;
      time = NaN;
      version++;
    },
    count: (side) => sideOf(side).count,
    priceAt(side, index) {
      const s = sideOf(side);
      return index >= 0 && index < s.count
        ? s.prices[physical(side, index)]!
        : NaN;
    },
    sizeAt(side, index) {
      const s = sideOf(side);
      return index >= 0 && index < s.count
        ? s.sizes[physical(side, index)]!
        : 0;
    },
    sizeOf(side, price) {
      const s = sideOf(side);
      const i = lowerBound(s, price);
      return i < s.count && s.prices[i] === price ? s.sizes[i]! : 0;
    },
    bestBid: () => (bids.count ? bids.prices[bids.count - 1]! : NaN),
    bestAsk: () => (asks.count ? asks.prices[0]! : NaN),
    mid: () => (store.bestBid() + store.bestAsk()) / 2,
    spread: () => store.bestAsk() - store.bestBid(),
    levels(side, { step = 0, limit = Infinity } = {}) {
      const s = sideOf(side);
      const n = s.count;
      const max = Math.min(n, limit);
      const price = new Float64Array(max);
      const size = new Float64Array(max);
      let count = 0;
      for (let k = 0; k < n; k++) {
        const i = side === "bid" ? n - 1 - k : k;
        const p =
          step > 0 ? groupPrice(s.prices[i]!, step, side) : s.prices[i]!;
        if (count > 0 && price[count - 1] === p) {
          size[count - 1] += s.sizes[i]!;
          continue;
        }
        if (count >= max) break;
        price[count] = p;
        size[count] = s.sizes[i]!;
        count++;
      }
      return {
        price: price.subarray(0, count),
        size: size.subarray(0, count),
        count,
      };
    },
    time: () => time,
    version: () => version,
  };
  return store;
};

/** Applies one delta or a list of deltas; `true` when something changed */
export const applyDeltas = (
  store: OrderBookStore,
  deltas: OrderBookDelta | readonly OrderBookDelta[],
): boolean => {
  if (!Array.isArray(deltas)) return store.applyDelta(deltas as OrderBookDelta);
  let changed = false;
  for (const delta of deltas as readonly OrderBookDelta[]) {
    if (store.applyDelta(delta)) changed = true;
  }
  return changed;
};

/**
 * Decimals of the prices of a book (largest decimals among the best levels),
 * for the default price format
 */
export const inferPriceDecimals = (store: OrderBookStore): number => {
  let decimals = 0;
  for (const side of ["bid", "ask"] as const) {
    const n = Math.min(store.count(side), 40);
    for (let i = 0; i < n; i++) {
      decimals = Math.max(decimals, decimalsOf(store.priceAt(side, i)));
    }
  }
  return Math.min(8, decimals);
};

/** Decimals of the sizes of a book, for the default size format */
export const inferSizeDecimals = (store: OrderBookStore): number => {
  let decimals = 0;
  for (const side of ["bid", "ask"] as const) {
    const n = Math.min(store.count(side), 40);
    for (let i = 0; i < n; i++) {
      decimals = Math.max(decimals, decimalsOf(store.sizeAt(side, i)));
    }
  }
  return Math.min(6, decimals);
};

/** Smallest gap between neighbouring prices of the best levels (the tick size) */
export const inferTickSize = (store: OrderBookStore): number => {
  let tick = Infinity;
  for (const side of ["bid", "ask"] as const) {
    const n = Math.min(store.count(side), 60);
    for (let i = 1; i < n; i++) {
      const gap = Math.abs(store.priceAt(side, i) - store.priceAt(side, i - 1));
      if (gap > 0 && gap < tick) tick = gap;
    }
  }
  if (!Number.isFinite(tick)) return 0;
  return roundToStep(tick, tick);
};
