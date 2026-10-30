import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Climate of Tokyo: average rainfall (mm) and temperature (°C) per month
const rainfall = [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51];
const temperature = [
  5.4, 6.1, 9.4, 14.3, 18.8, 21.9, 25.7, 26.9, 23.3, 18.0, 12.5, 7.7,
];

export default function ClimateDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const mm = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millimeter",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const months = Array.from({ length: 12 }, (_, m) =>
      new Intl.DateTimeFormat(locale, { month: "short" }).format(
        new Date(2026, m, 1),
      ),
    );
    return [
      {
        name: t("rainfall"),
        type: "bar",
        color: "var(--chart-series-5, #0ea5e9)",
        format: mm,
        data: months.map((m, i) => [m, rainfall[i] ?? 0] as const),
      },
      {
        name: t("temperature"),
        type: "line",
        curve: "smooth",
        yAxis: "right",
        color: "var(--chart-series-4, #ef4444)",
        data: months.map((m, i) => [m, temperature[i] ?? 0] as const),
      },
    ];
  }, [t, locale, mm]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: mm }}
      yAxis2={{ format: celsius, zero: true }}
      height={300}
      ariaLabel={t("climateAria")}
    />
  );
}
