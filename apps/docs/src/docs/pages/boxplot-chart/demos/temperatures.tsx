import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  boxplotStats,
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

// 30 years of daily maximum temperatures (°C) per month
const months = Array.from({ length: 12 }, (_, m) => {
  const random = mulberry32(m + 1);
  const normal = 13 - 9 * Math.cos(((m + 0.5) / 12) * Math.PI * 2);
  return Array.from(
    { length: 900 },
    () => normal + (random() + random() + random() - 1.5) * 6,
  );
});

export default function TemperaturesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // boxplotStats gives the five numbers and the mean: the whiskers reach the
  // extremes ("minmax", no outliers) and a line joins the means
  const series = useMemo((): ChartSeries[] => {
    const names = Array.from({ length: 12 }, (_, m) =>
      new Intl.DateTimeFormat(locale, { month: "short" }).format(
        new Date(2026, m, 1),
      ),
    );
    const stats = months.map((values) =>
      boxplotStats(values, { whisker: "minmax" }),
    );
    return [
      {
        name: t("dailyHigh"),
        color: "var(--chart-series-4, #ef4444)",
        format: celsius,
        data: stats.map((s, m) => ({
          x: names[m],
          low: s.low,
          q1: s.q1,
          y: s.median,
          q3: s.q3,
          high: s.high,
        })),
      },
      {
        name: t("mean"),
        type: "line",
        curve: "smooth",
        color: "var(--text-secondary-color, #6b7280)",
        lineWidth: 1.5,
        format: celsius,
        data: stats.map((s, m) => [names[m] ?? "", s.mean] as const),
      },
    ];
  }, [t, locale, celsius]);

  return (
    <BoxPlotChart
      series={series}
      yAxis={{ format: celsius }}
      height={320}
      ariaLabel={t("temperaturesAria")}
    />
  );
}
