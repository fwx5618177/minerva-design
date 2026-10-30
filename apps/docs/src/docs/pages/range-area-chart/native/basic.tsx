import { useTranslation } from "react-i18next";
import { RangeAreaChart } from "minerva-design/native";

// Monthly mean minimum and maximum temperatures (°C) and the mean
const low = [1.2, 1.6, 4.1, 6.7, 10.4, 13.6, 15.7, 15.4, 12.5, 9.1, 4.9, 2.1];
const high = [
  7.2, 8.6, 12.7, 16.2, 19.8, 23.3, 25.6, 25.4, 21.4, 16.4, 10.9, 7.6,
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const month = new Intl.DateTimeFormat(locale, { month: "short" });
  const months = low.map((_, m) => month.format(new Date(2026, m, 1)));
  return (
    <RangeAreaChart
      height={260}
      locale={locale}
      ariaLabel={t("temperatureAria")}
      series={[
        {
          name: t("dailyRange"),
          color: "var(--chart-series-4, #ef4444)",
          data: months.map((x, i) => ({
            x,
            y0: low[i] ?? 0,
            y: high[i] ?? 0,
          })),
        },
        {
          name: t("normal"),
          type: "line",
          color: "var(--text-secondary-color, #6b7280)",
          data: months.map(
            (x, i) => [x, ((low[i] ?? 0) + (high[i] ?? 0)) / 2] as const,
          ),
        },
      ]}
    />
  );
}
