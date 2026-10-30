import { useTranslation } from "react-i18next";
import { MixedChart } from "minerva-design/native";

// Climate of Tokyo: average rainfall (mm) and temperature (°C) per month
const rainfall = [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51];
const temperature = [
  5.4, 6.1, 9.4, 14.3, 18.8, 21.9, 25.7, 26.9, 23.3, 18.0, 12.5, 7.7,
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const month = new Intl.DateTimeFormat(locale, { month: "short" });
  const months = rainfall.map((_, m) => month.format(new Date(2026, m, 1)));
  return (
    <MixedChart
      height={260}
      locale={locale}
      ariaLabel={t("climateAria")}
      yAxis2={{ zero: true }}
      legend={{ position: "bottom" }}
      series={[
        {
          name: t("rainfall"),
          type: "bar",
          color: "var(--chart-series-5, #0ea5e9)",
          data: months.map((m, i) => [m, rainfall[i] ?? 0] as const),
        },
        {
          name: t("temperature"),
          type: "line",
          yAxis: "right",
          color: "var(--chart-series-4, #ef4444)",
          data: months.map((m, i) => [m, temperature[i] ?? 0] as const),
        },
      ]}
    />
  );
}
