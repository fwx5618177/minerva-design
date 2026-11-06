import type { MarketTrade, TradingBar } from "minerva-design/charts";

/** Sparse candles from executions only: empty time buckets are never invented. */
export function createTradeBars(interval: number, limit: number) {
  const width = Number.isFinite(interval) && interval > 0 ? interval : 1000;
  const capacity = Number.isFinite(limit)
    ? Math.max(1, Math.floor(limit))
    : 180;
  const buckets = new Map<
    number,
    { bar: TradingBar; first: number; last: number }
  >();
  return {
    add(trades: readonly MarketTrade[]) {
      for (const trade of trades) {
        if (
          ![trade.time, trade.price, trade.size].every(Number.isFinite) ||
          trade.price <= 0 ||
          trade.size <= 0
        )
          continue;
        const time = Math.floor(trade.time / width) * width;
        const bucket = buckets.get(time);
        if (bucket) {
          bucket.bar.high = Math.max(bucket.bar.high, trade.price);
          bucket.bar.low = Math.min(bucket.bar.low, trade.price);
          bucket.bar.volume = (bucket.bar.volume ?? 0) + trade.size;
          if (trade.time < bucket.first) {
            bucket.first = trade.time;
            bucket.bar.open = trade.price;
          }
          if (trade.time >= bucket.last) {
            bucket.last = trade.time;
            bucket.bar.close = trade.price;
          }
        } else
          buckets.set(time, {
            first: trade.time,
            last: trade.time,
            bar: {
              time,
              open: trade.price,
              high: trade.price,
              low: trade.price,
              close: trade.price,
              volume: trade.size,
            },
          });
        if (buckets.size > capacity)
          buckets.delete(Math.min(...buckets.keys()));
      }
    },
    values(): TradingBar[] {
      return [...buckets.values()]
        .map(({ bar }) => ({ ...bar }))
        .sort((a, b) => a.time - b.time);
    },
  };
}
