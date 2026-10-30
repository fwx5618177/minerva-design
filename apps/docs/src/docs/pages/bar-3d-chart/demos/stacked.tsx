import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Quarterly revenue (M$) of three product lines in four markets: the bars of
// the same quarter and market are stacked
const QUARTERS = ["q1", "q2", "q3", "q4"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = {
  hardware: [
    [4.2, 3.1, 3.8, 0.9],
    [4.5, 3.0, 4.1, 1.0],
    [4.1, 2.8, 4.6, 1.1],
    [5.6, 3.9, 5.2, 1.4],
  ],
  software: [
    [2.8, 2.2, 1.6, 0.5],
    [3.1, 2.4, 1.9, 0.6],
    [3.4, 2.5, 2.3, 0.6],
    [3.9, 2.9, 2.6, 0.8],
  ],
  services: [
    [1.2, 1.4, 0.7, 0.3],
    [1.3, 1.5, 0.8, 0.3],
    [1.5, 1.6, 0.9, 0.4],
    [1.7, 1.8, 1.1, 0.4],
  ],
};
type Product = keyof typeof REVENUE;

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] =>
      (Object.keys(REVENUE) as Product[]).map((product) => ({
        name: t(`products.${product}`),
        data: REVENUE[product].flatMap((row, q) =>
          row.map((value, m) => [q, m, value] as const),
        ),
      })),
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.6}
      xAxis={{
        title: t("quarter"),
        categories: QUARTERS.map((q) => t(`quarters.${q}`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((m) => t(`markets.${m}`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      legend={{ position: "bottom" }}
      camera={{ azimuth: 40, elevation: 26 }}
      height={440}
      ariaLabel={t("stackedAria")}
    />
  );
}
