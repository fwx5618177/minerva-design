import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Share of developers using each language (%), survey of 2026
const languages: [string, number][] = [
  ["JavaScript", 62.3],
  ["Python", 51.0],
  ["TypeScript", 43.4],
  ["Java", 30.3],
  ["C#", 27.1],
  ["Go", 17.7],
  ["Rust", 15.2],
  ["Kotlin", 10.1],
  ["Swift", 8.4],
  ["Ruby", 5.9],
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // ranked from the top: the first category is drawn at the top
  const series = useMemo(
    (): ChartSeries[] => [{ name: t("developers"), data: languages }],
    [t],
  );
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={340}
      ariaLabel={t("languagesAria")}
    />
  );
}
