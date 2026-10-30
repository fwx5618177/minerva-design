import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  CandlestickChart,
  type ChartHoverEvent,
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

/** Daily candles on trading days (weekends skipped), labelled with `date` */
function dailyCandles(
  seed: number,
  count: number,
  price: number,
  date: Intl.DateTimeFormat,
) {
  const random = mulberry32(seed);
  const candles: ChartPointDatum[] = [];
  let close = price;
  for (let t = Date.UTC(2026, 2, 2); candles.length < count; t += DAY) {
    if (new Date(t).getUTCDay() % 6 === 0) continue;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.035 + 0.001);
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    candles.push({ x: date.format(t), open, high, low, y: close });
  }
  return candles;
}

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [convention, setConvention] = useState("green-up");

  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const candles = useMemo(() => {
    // "Mar 3", "3月3日", "3 mars"...
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return dailyCandles(42, 60, 182, date);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: "ACME",
        data: candles,
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

  // OHLC tooltip in the reader's language
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
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{usd.format(value)}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("candleColors")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(String(value))}
      >
        <Radio value="green-up" label={t("greenUp")} />
        <Radio value="red-up" label={t("redUp")} />
      </RadioGroup>
      <CandlestickChart
        series={series}
        yAxis={{ format: (value) => usd.format(value) }}
        renderTooltip={tooltip}
        height={320}
        ariaLabel={t("acmeAria")}
      />
    </div>
  );
}
