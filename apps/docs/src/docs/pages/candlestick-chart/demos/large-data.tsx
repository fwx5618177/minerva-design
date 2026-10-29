import { useMemo, useState } from "react";
import {
  CandlestickChart,
  type ChartRendererKind,
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

const COUNT = 50_000;
const MINUTE = 60 * 1000;
const START = Date.UTC(2026, 4, 1);

export default function LargeDataDemo() {
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // One-minute candles of a market that never closes, as typed-array columns
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(50);
    const x = new Float64Array(COUNT);
    const open = new Float64Array(COUNT);
    const high = new Float64Array(COUNT);
    const low = new Float64Array(COUNT);
    const close = new Float64Array(COUNT);
    let price = 3200;
    let volatility = 0.0012;
    for (let i = 0; i < COUNT; i++) {
      // calm and busy periods alternate
      volatility = Math.min(
        0.004,
        Math.max(0.0005, volatility * (1 + (random() - 0.5) * 0.1)),
      );
      const o = price;
      const c = o * (1 + (random() + random() - 1) * volatility);
      x[i] = START + i * MINUTE;
      open[i] = o;
      close[i] = c;
      high[i] = Math.max(o, c) * (1 + random() * volatility * 0.6);
      low[i] = Math.min(o, c) * (1 - random() * volatility * 0.6);
      price = c;
    }
    return [
      {
        name: "ETH / USD",
        data: { x, open, high, low, y: close },
        format: (value) => value.toFixed(2),
      },
    ];
  }, []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CandlestickChart
        series={series}
        xAxis={{ type: "time" }}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel="50,000 one-minute candles"
      />
      <p role="status">
        {COUNT.toLocaleString("en")} candles · drawn with {renderer ?? "…"} ·
        Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset
      </p>
    </div>
  );
}
