import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Ten years of a software company: yearly revenue (M$) grows 160-fold, its
// users 6,000-fold; a log right axis keeps both the first years and the last
// ones readable
const years = Array.from({ length: 10 }, (_, i) => String(2016 + i));
const revenue = [0.4, 1.1, 2.6, 5.2, 9.8, 17, 26, 38, 51, 66];
const users = [
  1_200, 6_800, 31_000, 120_000, 410_000, 1_100_000, 2_300_000, 3_900_000,
  5_600_000, 7_400_000,
];

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("yearlyRevenue"),
        type: "bar",
        format: usd,
        data: years.map((year, i) => [year, revenue[i] ?? 0] as const),
      },
      {
        name: t("users"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        format: (value) => number.format(value),
        data: years.map((year, i) => [year, users[i] ?? null] as const),
      },
    ],
    [t, usd, number],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("yearlyRevenue") }}
      // decades: 1k, 10k, 100k, 1M, 10M
      yAxis2={{ type: "log", format: compact, title: t("usersLog") }}
      height={320}
      ariaLabel={t("logAria")}
    />
  );
}
