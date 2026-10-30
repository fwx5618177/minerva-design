import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

// Hourly temperatures (°C); `null` = no reading, the line is interrupted
const indoor = [
  20.8,
  20.6,
  20.4,
  20.3,
  20.1,
  20.0,
  20.4,
  21.0,
  21.6,
  21.9,
  null,
  null,
  null,
  22.8,
  23.0,
  23.1,
  22.9,
  22.6,
  22.3,
  22.0,
  21.7,
  21.4,
  21.2,
  21.0,
];
const outdoor = [
  9.1,
  8.7,
  8.2,
  7.9,
  7.6,
  7.4,
  8.0,
  9.3,
  11.2,
  13.0,
  14.6,
  15.9,
  16.8,
  17.4,
  17.6,
  17.2,
  null,
  null,
  14.1,
  12.8,
  11.7,
  10.9,
  10.2,
  9.6,
];
const hours = Array.from({ length: 24 }, (_, hour) => hour);

export default function GapsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // the time of day in the reader's language: "14:00", "2 PM"...
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 0, 1, hour));
    return [
      {
        name: t("indoor"),
        data: hours.map((hour) => [label(hour), indoor[hour]] as const),
      },
      {
        name: t("outdoor"),
        data: hours.map((hour) => [label(hour), outdoor[hour]] as const),
      },
    ];
  }, [t, locale]);
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        curve="smooth"
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("gapsAria")}
      />
      <p>{t("gapsNote")}</p>
    </div>
  );
}
