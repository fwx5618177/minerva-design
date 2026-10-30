import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// Country code, GDP per capita (k$), life expectancy (years), population (millions)
const countries: [string, number, number, number][] = [
  ["JP", 34, 84.5, 124],
  ["DE", 52, 81.2, 84],
  ["FR", 44, 82.5, 68],
  ["US", 80, 78.4, 335],
  ["BR", 10, 75.9, 216],
  ["IN", 2.5, 70.8, 1430],
  ["CN", 12.6, 78.6, 1410],
  ["NG", 1.6, 54.5, 224],
  ["MX", 13.9, 75.1, 128],
  ["ID", 4.9, 71.9, 278],
];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return [
      {
        name: t("countries"),
        showLabels: true,
        opacity: 0.7,
        data: countries.map(([code, x, y, population]) => ({
          x,
          y,
          label: names.of(code) ?? code,
          size: 6 + Math.sqrt(population) * 0.6,
        })),
      },
    ];
  }, [t, locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );
  const years = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "year",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{
        title: t("gdp"),
        format: (value) => usd.format(value * 1000),
      }}
      yAxis={{
        title: t("lifeExpectancy"),
        format: (value) => years.format(value),
      }}
      height={320}
      ariaLabel={t("countriesAria")}
    />
  );
}
