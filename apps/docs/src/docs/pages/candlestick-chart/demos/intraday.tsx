import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartAnnotation,
  type ChartHoverEvent,
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

const MINUTE = 60 * 1000;
// one session, 09:30 to 16:00 New York time, written in UTC
const OPEN = Date.UTC(2026, 9, 29, 13, 30);
const NEWS = OPEN + 150 * MINUTE;

// 5-minute candles and the volume-weighted average price (VWAP)
const random = mulberry32(23);
const candles: {
  x: number;
  open: number;
  high: number;
  low: number;
  y: number;
}[] = [];
const vwap: [number, number][] = [];
let price = 212;
let volumeSum = 0;
let valueSum = 0;
for (let i = 0; i < 78; i++) {
  const time = OPEN + i * 5 * MINUTE;
  const shock = time === NEWS ? -0.025 : 0;
  const open = price;
  const close = open * (1 + (random() + random() - 1) * 0.004 + shock);
  const high = Math.max(open, close) * (1 + random() * 0.002);
  const low = Math.min(open, close) * (1 - random() * 0.002);
  // more volume at the open, the close and after the news
  const volume =
    1 +
    3 * Math.exp(-i / 6) +
    2 * Math.exp((i - 77) / 6) +
    (time >= NEWS && time < NEWS + 30 * MINUTE ? 3 : 0);
  volumeSum += volume;
  valueSum += volume * ((high + low + close) / 3);
  candles.push({ x: time, open, high, low, y: close });
  vwap.push([time, valueSum / volumeSum]);
  price = close;
}

export default function IntradayDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: "ORBT", data: candles },
      {
        name: t("vwap"),
        type: "line",
        data: vwap,
        lineWidth: 1.5,
        color: "var(--warning-color)",
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "x",
        value: NEWS,
        dash: [4, 4],
        color: "var(--danger-color)",
        label: t("guidanceCut"),
      },
    ],
    [t],
  );
  // the exchange's local time, in the reader's language
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
      }),
    [locale],
  );
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{time.format(event.x)}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <CandlestickChart
      series={series}
      annotations={annotations}
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ format: (value) => usd.format(value) }}
      renderTooltip={tooltip}
      height={340}
      ariaLabel={t("intradayAria")}
    />
  );
}
