import { useMemo } from "react";
import {
  CandlestickChart,
  type ChartPointDatum,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;

/** Daily candles on trading days (weekends skipped), labelled "Mar 3" */
function dailyCandles(seed: number, count: number, price: number) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 0, 5); candles.length < count; t += DAY) {
    const date = new Date(t);
    if (date.getUTCDay() % 6 === 0) continue;
    // a slow regime change: rally, pullback, recovery
    const day = candles.length;
    const drift = day < 50 ? 0.004 : day < 80 ? -0.005 : 0.003;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.032 + drift);
    const high = Math.max(open, close) * (1 + random() * 0.014);
    const low = Math.min(open, close) * (1 - random() * 0.014);
    candles.push({
      x: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      open,
      high,
      low,
      y: close,
    });
  }
  return candles;
}

/** Simple moving average of the closes; `null` until the window is full */
const movingAverage = (candles: ChartPointDatum[], window: number) =>
  candles.map((candle, i) => {
    if (i < window - 1) return [candle.x as string, null] as const;
    let sum = 0;
    for (let k = i - window + 1; k <= i; k++) sum += candles[k].y as number;
    return [candle.x as string, sum / window] as const;
  });

const usd = (value: number) => `$${value.toFixed(2)}`;

export default function MovingAverageDemo() {
  const series = useMemo((): ChartSeries[] => {
    const candles = dailyCandles(7, 120, 64);
    return [
      { name: "NOVA", data: candles, format: usd },
      {
        name: "MA 5",
        type: "line",
        data: movingAverage(candles, 5),
        curve: "smooth",
        lineWidth: 1.5,
        color: "var(--warning-color)",
        format: usd,
      },
      {
        name: "MA 20",
        type: "line",
        data: movingAverage(candles, 20),
        curve: "smooth",
        lineWidth: 2,
        color: "var(--primary-color)",
        format: usd,
      },
    ];
  }, []);

  return (
    <CandlestickChart
      series={series}
      yAxis={{ format: (value) => `$${value}` }}
      height={360}
      ariaLabel="NOVA daily prices over 120 trading days with 5 and 20 day moving averages"
    />
  );
}
