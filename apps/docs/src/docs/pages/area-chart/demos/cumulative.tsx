import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly sales (thousand USD) of the first 10 months, and the yearly plan
const sales = [182, 164, 210, 225, 198, 241, 233, 219, 262, 280];
const PLAN = 2_700;
// running total of the months already closed
const runningTotal = sales.map((_, i) =>
  sales.slice(0, i + 1).reduce((sum, value) => sum + value, 0),
);

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function CumulativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    // the remaining months are unknown (null)
    const actual = months.map(
      (month, i) => [month, runningTotal[i] ?? null] as const,
    );
    // the plan grows evenly through the year
    const plan = months.map(
      (month, i) => [month, Math.round((PLAN * (i + 1)) / 12)] as const,
    );
    return [
      { name: t("actual"), data: actual },
      {
        name: t("plan"),
        type: "line",
        data: plan,
        color: "var(--text-secondary-color)",
        lineWidth: 1.5,
      },
    ];
  }, [t, locale]);
  // values are in thousands of dollars
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <AreaChart
      series={series}
      curve="linear"
      yAxis={{ zero: true, format: usd }}
      height={300}
      ariaLabel={t("cumulativeAria")}
    />
  );
}
