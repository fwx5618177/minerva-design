import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Change of the monthly active users per region since last quarter (%)
const changes = [
  ["northAmerica", 6.4],
  ["europe", 3.1],
  ["asiaPacific", 11.8],
  ["latinAmerica", -2.7],
  ["middleEast", -5.2],
  ["africa", 8.9],
] as const;

export default function NegativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  // negative values grow to the left of zero; each bar sets its color
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("growth"),
        format: percent,
        data: changes.map(([region, value]) => ({
          x: t(`regions.${region}`),
          y: value,
          color:
            value >= 0
              ? "var(--success-color, #16a34a)"
              : "var(--danger-color, #dc2626)",
        })),
      },
    ],
    [t, percent],
  );

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={300}
      ariaLabel={t("growthAria")}
    />
  );
}
