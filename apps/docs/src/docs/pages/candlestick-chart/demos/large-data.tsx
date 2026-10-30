import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartHoverEvent,
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
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 4, 1).getTime();

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
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
      },
    ];
  }, []);

  const price = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale],
  );
  // OHLC tooltip in the reader's language, with the full date and time
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item || item.open === undefined) return null;
    const rows = [
      [t("open"), item.open],
      [t("high"), item.high ?? item.y],
      [t("low"), item.low ?? item.y],
      [t("close"), item.y],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{time.format(item.x)}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{price.format(value)}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CandlestickChart
        series={series}
        xAxis={{ type: "time" }}
        yAxis={{ format: (value) => price.format(value) }}
        renderTooltip={tooltip}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel={t("candlesAria")}
      />
      <p role="status">
        {t("largeStatus", {
          candles: new Intl.NumberFormat(locale).format(COUNT),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
