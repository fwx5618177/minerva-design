import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chart, type ChartSeries } from "minerva-design/charts";

// Thousand USD per month, January to December
const revenue = [42, 48, 51, 47, 58, 63, 61, 70, 74, 69, 81, 92];
const target = [45, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function MixedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("revenue"),
        type: "bar",
        data: months.map((month, i) => [month, revenue[i]] as const),
      },
      {
        name: t("target"),
        type: "line",
        data: months.map((month, i) => [month, target[i]] as const),
      },
    ];
  }, [t, locale]);
  // "$92K", "9.2万 US$"...
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <Chart
      series={series}
      yAxis={{ format: usd }}
      legend={{ position: "bottom" }}
      height={300}
      ariaLabel={t("revenueAria")}
    />
  );
}
