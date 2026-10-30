import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Online sales by country (thousand units), in no particular order
const salesByCountry: [string, number][] = [
  ["FR", 182],
  ["US", 541],
  ["JP", 326],
  ["DE", 248],
  ["BR", 97],
  ["CN", 463],
  ["GB", 205],
  ["IN", 151],
  ["CA", 118],
  ["KR", 134],
];

export default function RankingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language: "Japan", "日本", "Japon"...
    const countries = new Intl.DisplayNames([locale], { type: "region" });
    const ranked = [...salesByCountry].sort((a, b) => b[1] - a[1]);
    return [
      {
        name: t("unitsSold"),
        showLabels: true,
        data: ranked.map(
          ([code, value]) => [countries.of(code) ?? code, value] as const,
        ),
      },
    ];
  }, [t, locale]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      yAxis={{ format: thousands }}
      height={320}
      ariaLabel={t("rankingAria")}
    />
  );
}
