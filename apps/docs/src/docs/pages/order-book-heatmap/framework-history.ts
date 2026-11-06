import type {
  MarketTrade,
  OrderBookSnapshot,
  TradingBar,
} from "minerva-design/charts/core";

/** Finite simulated books and executions; candles are explicitly supplied from executions. */
export function createFrameworkHistory(now = Date.now()) {
  const end = Math.floor(now / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(
      100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12,
    );
    const size = 1 + ((i * 7) % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) =>
      Array.from(
        { length: 36 },
        (_, level) =>
          [
            round(price + sign * (level + 1) * 0.05),
            2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0),
          ] as [number, number],
      );
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0)
      bars.push({
        time: start + bucket * 1000,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: size,
      });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price);
      bar.low = Math.min(bar.low, price);
      bar.close = price;
      bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
}

/** UI copy shared by the native framework examples, keyed by configured language. */
export const frameworkHeatmapLabels = {
  en: {
    source:
      "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    latest: "Latest 10s",
    full: "Full 30s",
    follow: "Follow market",
    following: "Following market",
    manual: "Manual view",
    minimum: "Minimum liquidity intensity (%)",
    visible: "s visible",
  },
  zh: {
    source: "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    latest: "最近 10 秒",
    full: "完整 30 秒",
    follow: "跟随行情",
    following: "正在跟随行情",
    manual: "手动视图",
    minimum: "最低流动性强度（%）",
    visible: "秒可见",
  },
  ja: {
    source:
      "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    latest: "直近 10 秒",
    full: "全 30 秒",
    follow: "相場に追従",
    following: "相場に追従中",
    manual: "手動表示",
    minimum: "流動性強度の下限（%）",
    visible: "秒を表示",
  },
  fr: {
    source:
      "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    latest: "10 dernières s",
    full: "30 s complètes",
    follow: "Suivre le marché",
    following: "Suivi du marché",
    manual: "Vue manuelle",
    minimum: "Intensité minimale de liquidité (%)",
    visible: "s visibles",
  },
};

export function getFrameworkLabels(locale: string) {
  const language = locale
    .toLowerCase()
    .split(/[-_]/)[0] as keyof typeof frameworkHeatmapLabels;
  return frameworkHeatmapLabels[language] ?? frameworkHeatmapLabels.en;
}
