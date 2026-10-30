import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartHandle,
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
// local midnight: the time axis places its ticks in local time
const END = new Date(2026, 9, 30).getTime();
const DAYS = 2 * 365;

// Two years of daily closing prices (a random walk with a slight upward drift)
const random = mulberry32(7);
const closes: [number, number][] = [];
let price = 84;
for (let i = DAYS - 1; i >= 0; i--) {
  price *= 1 + (random() - 0.48) * 0.035;
  closes.push([END - i * DAY, Math.round(price * 100) / 100]);
}

const RANGES = { "1m": 30, "3m": 91, "6m": 182, "1y": 365, all: DAYS } as const;
type Range = keyof typeof RANGES;

export default function ZoomDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [range, setRange] = useState<Range>("all");

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("close"), data: closes }],
    [t],
  );
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  const select = (next: Range) => {
    setRange(next);
    // the visible window, with the y range fitted to the prices inside it
    const from = END - (RANGES[next] - 1) * DAY;
    const visible = closes.filter(([time]) => time >= from).map(([, y]) => y);
    const low = Math.min(...visible);
    const high = Math.max(...visible);
    const margin = (high - low) * 0.08;
    chart.current?.setView({
      x: [from, END],
      y: [low - margin, high + margin],
    });
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={range}
        onChange={(value) => select(value as Range)}
      >
        {(Object.keys(RANGES) as Range[]).map((key) => (
          <Radio key={key} value={key} label={t(`ranges.${key}`)} />
        ))}
      </RadioGroup>
      <LineChart
        ref={chart}
        series={series}
        area
        xAxis={{ type: "time", format: (value) => date.format(value) }}
        yAxis={{ format: (value) => usd.format(value) }}

        height={300}
        ariaLabel={t("priceAria")}
      />
    </div>
  );
}
