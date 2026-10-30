import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly orders (thousands): two years of history, then a 12-month
// forecast whose uncertainty widens with the horizon
const history = [
  41, 39, 44, 47, 52, 55, 53, 51, 56, 60, 68, 74, 49, 46, 52, 55, 61, 64, 62,
  60, 66, 71, 79, 86,
];
const month = (i: number) => new Date(2024, i, 1);

export default function ForecastDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const last = history.length - 1;
    const forecast = Array.from({ length: 13 }, (_, k) => {
      const i = last + k;
      // the same month of last year, plus 12% of growth
      const mean =
        k === 0 ? (history[last] ?? 0) : (history[i - 12] ?? 0) * 1.12;
      // standard error growing like √horizon
      const sd = 2.4 * Math.sqrt(k);
      return { i, mean, sd };
    });
    return [
      {
        name: t("interval95"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.14,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.96 * f.sd,
          y: f.mean + 1.96 * f.sd,
        })),
      },
      {
        name: t("interval80"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.22,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.28 * f.sd,
          y: f.mean + 1.28 * f.sd,
        })),
      },
      {
        name: t("actual"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        data: history.map((y, i) => [month(i), y] as const),
      },
      {
        name: t("forecast"),
        type: "line",
        color: "var(--chart-series-1, #4f46e5)",
        data: forecast.map((f) => [month(f.i), f.mean] as const),
      },
    ];
  }, [t]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(Math.round(value) * 1000);
  }, [locale]);

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: thousands, title: t("orders") }}
      annotations={[
        {
          type: "line",
          axis: "x",
          value: month(history.length - 1).getTime(),
          label: t("today"),
        },
      ]}
      height={320}
      ariaLabel={t("forecastAria")}
    />
  );
}
