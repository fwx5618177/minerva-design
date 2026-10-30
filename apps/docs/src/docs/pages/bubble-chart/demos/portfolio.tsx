import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Product portfolio: relative market share (x), market growth (y, %) and
// yearly revenue (M€, the bubbles), split in four quadrants
const products = [
  ["cloudStorage", 1.8, 14, 120],
  ["analytics", 0.6, 18, 45],
  ["mobileSdk", 0.3, 11, 12],
  ["payments", 2.4, 4, 210],
  ["desktop", 1.2, 1.5, 95],
  ["hardware", 0.4, -2, 30],
  ["consulting", 0.8, 6, 38],
] as const;

export default function PortfolioDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("products"),
        valueName: t("revenue"),
        format: euros,
        showLabels: true,
        data: products.map(([key, share, growth, revenue]) => ({
          x: share,
          y: growth,
          value: revenue,
          label: t(`portfolio.${key}`),
        })),
      },
    ],
    [t, euros],
  );

  return (
    <BubbleChart
      series={series}
      minSize={10}
      maxSize={70}
      xAxis={{ title: t("marketShare"), min: 0, max: 3 }}
      yAxis={{ title: t("marketGrowth"), format: (v) => `${v}%` }}
      annotations={[
        { type: "line", axis: "x", value: 1, label: t("leader") },
        { type: "line", axis: "y", value: 8, label: t("highGrowth") },
      ]}
      legend={false}
      height={380}
      ariaLabel={t("portfolioAria")}
    />
  );
}
