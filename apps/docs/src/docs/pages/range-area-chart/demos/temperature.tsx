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

// A year of daily minimum and maximum temperatures (°C) of a temperate city
const days = (() => {
  const random = mulberry32(7);
  return Array.from({ length: 365 }, (_, d) => {
    const season = -Math.cos(((d - 18) / 365) * Math.PI * 2);
    const weather = (random() - 0.5) * 6;
    const mean = 11.5 + season * 8.5 + weather;
    const spread = 6 + season * 2.5 + random() * 3;
    return {
      x: new Date(2025, 0, d + 1),
      low: mean - spread / 2,
      high: mean + spread / 2,
      normal: 11.5 + season * 8.5,
    };
  });
})();

export default function TemperatureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
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

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dailyRange"),
        color: "var(--chart-series-4, #ef4444)",
        // many narrow days: a filled band without edges reads better
        lineWidth: 0,
        opacity: 0.45,
        format: celsius,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("normal"),
        type: "line",
        curve: "smooth",
        color: "var(--text-secondary-color, #6b7280)",
        lineWidth: 1.5,
        format: celsius,
        data: days.map((d) => [d.x, d.normal] as const),
      },
    ],
    [t, celsius],
  );

  // zoom with Ctrl / ⌘ + wheel to read single days
  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: celsius }}
      height={300}
      ariaLabel={t("temperatureAria")}
    />
  );
}
