import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

// Revenue (bar height) and margin (bar color) of five products in four
// markets: the tallest bars are not the most profitable ones
const PRODUCTS = ["laptops", "phones", "tablets", "watches", "audio"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = [
  [42, 31, 38, 6],
  [55, 40, 61, 8],
  [18, 14, 22, 3],
  [12, 11, 9, 2],
  [16, 13, 15, 3],
];
const MARGIN = [
  [8, 11, 6, 12],
  [21, 24, 17, 25],
  [14, 16, 9, 18],
  [34, 31, 28, 36],
  [27, 29, 22, 30],
];

export default function MarginDemo() {
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
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = PRODUCTS.flatMap((_, p) =>
      MARKETS.map((_, m) => ({
        x: p,
        y: m,
        z: REVENUE[p]![m]!,
        value: MARGIN[p]![m]!,
      })),
    );
    return [
      {
        name: t("revenue"),
        data,
        colorBy: "value",
        format: (value) => percent.format(value / 100),
      },
    ];
  }, [t, percent]);

  return (
    <Bar3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("product"),
        categories: PRODUCTS.map((key) => t(`productNames.${key}`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((key) => t(`markets.${key}`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      colorBar={{
        title: t("margin"),
        format: (value) => percent.format(value / 100),
      }}
      camera={{ azimuth: 38, elevation: 24 }}
      height={440}
      ariaLabel={t("marginAria")}
    />
  );
}
