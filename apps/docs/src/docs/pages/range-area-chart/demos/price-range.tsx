import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Six months of daily trading: the low-high range of each day and the close
const days = (() => {
  const random = mulberry32(42);
  const out: { x: Date; low: number; high: number; close: number }[] = [];
  let close = 182;
  for (let d = 0; out.length < 126; d++) {
    const date = new Date(2026, 0, 2 + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const open = close;
    close = Math.max(120, open * (1 + (random() - 0.48) * 0.035));
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    out.push({ x: date, low, high, close });
  }
  return out;
})();

export default function PriceRangeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dayRange"),
        color: "var(--chart-series-2, #10b981)",
        lineWidth: 0,
        opacity: 0.3,
        format: usd,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("close"),
        type: "line",
        color: "var(--chart-series-2, #10b981)",
        format: usd,
        data: days.map((d) => [d.x, d.close] as const),
      },
    ],
    [t, usd],
  );

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: usd }}
      height={300}
      ariaLabel={t("priceAria")}
    />
  );
}
