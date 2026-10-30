import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const years = Array.from({ length: 11 }, (_, i) => String(2016 + i));

// Units shipped (millions) by vendor; `percent` turns them into shares
const vendors = {
  aurora: [38, 41, 47, 52, 58, 66, 71, 74, 79, 83, 88],
  borealis: [52, 50, 49, 47, 44, 43, 41, 40, 38, 37, 35],
  cobalt: [12, 16, 21, 27, 31, 34, 36, 41, 44, 49, 54],
  others: [44, 42, 39, 36, 33, 30, 28, 25, 23, 21, 19],
};

export default function PercentDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = {
      aurora: "Aurora",
      borealis: "Borealis",
      cobalt: "Cobalt",
      others: t("others"),
    };
    // "88 million units" in the tooltip
    const units = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(vendors) as (keyof typeof vendors)[]).map((key) => ({
      name: names[key],
      format: (value: number) => units.format(value * 1_000_000),
      data: years.map((year, i) => [year, vendors[key][i]] as const),
    }));
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      percent
      height={300}
      ariaLabel={t("shareAria")}
    />
  );
}
