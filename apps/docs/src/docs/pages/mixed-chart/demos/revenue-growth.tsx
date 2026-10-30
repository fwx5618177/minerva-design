import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Quarterly revenue (M$) and its growth over the same quarter of last year
const revenue = [18.2, 19.5, 21.1, 26.8, 21.4, 23.9, 25.2, 31.6];
const growth = revenue.map((value, i) =>
  i >= 4 ? value / (revenue[i - 4] ?? value) - 1 : null,
);

export default function RevenueGrowthDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const quarters = revenue.map((_, i) =>
      t("quarter", { n: (i % 4) + 1, year: 2025 + Math.floor(i / 4) }),
    );
    return [
      {
        name: t("revenue"),
        type: "bar",
        format: usd,
        data: quarters.map((q, i) => [q, revenue[i] ?? 0] as const),
      },
      {
        name: t("growth"),
        type: "line",
        // plotted against yAxis2, formatted with its own format
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        data: quarters.map((q, i) => [q, growth[i] ?? null] as const),
      },
    ];
  }, [t, usd]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("revenue") }}
      yAxis2={{ format: percent, title: t("growth") }}
      height={320}
      ariaLabel={t("revenueAria")}
    />
  );
}
