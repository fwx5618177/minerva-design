import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Yearly budget and actual spend per department (k€)
const departments = {
  engineering: [1450, 1520],
  marketing: [620, 540],
  sales: [880, 910],
  support: [310, 295],
  finance: [240, 228],
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(departments) as (keyof typeof departments)[];
    return (["budget", "actual"] as const).map((name, k) => ({
      name: t(name),
      data: keys.map(
        (d) => [t(`departments.${d}`), departments[d][k] ?? 0] as const,
      ),
    }));
  }, [t]);
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      yAxis={{ format: euros }}
      height={340}
      ariaLabel={t("budgetAria")}
    />
  );
}
