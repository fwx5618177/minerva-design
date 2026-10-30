import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Votes of the most requested features of a public roadmap
const requests = [
  ["darkMode", 1842],
  ["offlineMode", 1310],
  ["exportPdf", 1104],
  ["sso", 960],
  ["calendarSync", 712],
  ["bulkEdit", 655],
  ["customFields", 489],
] as const;

export default function LongLabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // long names read naturally on the left, without rotated labels
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("votes"),
        color: "var(--chart-series-5, #0ea5e9)",
        data: requests.map(
          ([key, votes]) => [t(`features.${key}`), votes] as const,
        ),
      },
    ],
    [t],
  );
  const integer = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: (value) => integer.format(value), title: t("votes") }}
      height={300}
      ariaLabel={t("featuresAria")}
    />
  );
}
