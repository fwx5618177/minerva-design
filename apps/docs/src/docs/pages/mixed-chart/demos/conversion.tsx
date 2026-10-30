import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Daily sessions of an online shop over two months, and the share of them
// ending with an order: the weekly rhythm and a campaign in the middle
const days = Array.from({ length: 61 }, (_, d) => {
  const weekend = [0, 6].includes(new Date(2026, 3, 1 + d).getDay());
  const campaign = d >= 30 && d < 37 ? 1 : 0;
  return {
    x: new Date(2026, 3, 1 + d),
    sessions: Math.round(
      (weekend ? 21000 : 15500) * (1 + d / 400) * (1 + campaign * 0.6),
    ),
    rate:
      (weekend ? 0.031 : 0.024) + campaign * 0.009 + Math.sin(d * 1.7) * 0.0015,
  };
});

export default function ConversionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("sessions"),
        type: "area",
        curve: "smooth",
        data: days.map((d) => [d.x, d.sessions] as const),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-2, #10b981)",
        data: days.map((d) => [d.x, d.rate] as const),
      },
    ],
    [t],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: compact }}
      yAxis2={{ format: percent, zero: true }}
      annotations={[
        {
          type: "rect",
          x0: new Date(2026, 4, 1).getTime(),
          x1: new Date(2026, 4, 8).getTime(),
          label: t("campaign"),
          color: "var(--warning-color, #f59e0b)",
        },
      ]}
      height={320}
      ariaLabel={t("conversionAria")}
    />
  );
}
