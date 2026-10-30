import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const regions = [
  "northAmerica",
  "europe",
  "asiaPacific",
  "latinAmerica",
  "middleEast",
];

// Survey answers (respondents) grouped as Net Promoter Score categories
const answers = [
  {
    key: "promoters",
    color: "var(--success-color)",
    values: [612, 540, 702, 288, 164],
  },
  {
    key: "passives",
    color: "var(--warning-color)",
    values: [254, 310, 268, 131, 92],
  },
  {
    key: "detractors",
    color: "var(--danger-color)",
    values: [134, 196, 118, 97, 61],
  },
];

export default function PercentDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] =>
      answers.map(({ key, color, values }) => ({
        name: t(`nps.${key}`),
        color,
        data: regions.map(
          (region, i) => [t(`regions.${region}`), values[i]] as const,
        ),
      })),
    [t],
  );

  return (
    <BarChart series={series} percent height={300} ariaLabel={t("npsAria")} />
  );
}
