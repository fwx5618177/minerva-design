import { useMemo, useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
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
  for (let t = Date.UTC(2026, 2, 2); candles.length < count; t += DAY) {
    const date = new Date(t);
    if (date.getUTCDay() % 6 === 0) continue;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.035 + 0.001);
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
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

const usd = (value: number) => `$${value.toFixed(2)}`;

export default function BasicDemo() {
  const [convention, setConvention] = useState("green-up");
  const candles = useMemo(() => dailyCandles(42, 60, 182), []);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: "ACME",
        data: candles,
        format: usd,
        // the defaults are --success-color up and --danger-color down
        ...(convention === "red-up"
          ? {
              upColor: "var(--danger-color)",
              downColor: "var(--success-color)",
            }
          : {}),
      },
    ],
    [candles, convention],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Candle colors"
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(String(value))}
      >
        <Radio value="green-up" label="Green up, red down" />
        <Radio value="red-up" label="Red up, green down" />
      </RadioGroup>
      <CandlestickChart
        series={series}
        yAxis={{ format: (value) => `$${value}` }}
        height={320}
        ariaLabel="ACME daily prices over 60 trading days"
      />
    </div>
  );
}
