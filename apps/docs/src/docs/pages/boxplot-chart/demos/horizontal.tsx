import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart, type ChartSeries } from "minerva-design/charts";

// Yearly salaries (k€) per role, from a public salary survey: the summary
// statistics are already computed, one datum per box
const roles = [
  ["junior", 38, 42, 46, 51, 58, [66, 71]],
  ["developer", 45, 52, 58, 64, 76, [88]],
  ["senior", 58, 66, 72, 80, 95, [110, 118]],
  ["lead", 70, 78, 86, 95, 112, []],
  ["manager", 72, 84, 92, 104, 128, [145]],
] as const;

export default function HorizontalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("salary"),
        color: "var(--chart-series-6, #8b5cf6)",
        format: euros,
        data: roles.map(([key, low, q1, median, q3, high, outliers]) => ({
          x: t(`roles.${key}`),
          low,
          q1,
          y: median,
          q3,
          high,
          outliers,
        })),
      },
    ],
    [t, euros],
  );

  // orientation="horizontal": one row per role, the values along the bottom
  return (
    <BoxPlotChart
      series={series}
      orientation="horizontal"
      yAxis={{ format: euros }}
      height={300}
      ariaLabel={t("salariesAria")}
    />
  );
}
