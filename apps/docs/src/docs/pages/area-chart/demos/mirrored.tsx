import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const MINUTE = 60 * 1000;
const START = new Date(2026, 9, 30, 9).getTime();

// Bandwidth of a server every minute for two hours (Mbit/s)
const minutes = Array.from({ length: 120 }, (_, i) => i);
const download = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      Math.round(420 + 180 * Math.sin(i / 11) + 90 * Math.sin(i / 2.3)),
    ] as const,
);
// upload is drawn below zero: same scale, mirrored
const upload = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      -Math.round(160 + 60 * Math.sin(i / 7 + 1) + 40 * Math.cos(i / 1.7)),
    ] as const,
);

export default function MirroredDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("download"), data: download },
      { name: t("upload"), data: upload },
    ],
    [t],
  );
  // "420 Mb/s", "420 Mbit/s"...: the sign only says the direction
  const bandwidth = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabit-per-second",
    });
    return (value: number) => format.format(Math.abs(value));
  }, [locale]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="linear"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ format: bandwidth }}
      annotations={[{ type: "line", axis: "y", value: 0 }]}
      height={300}
      ariaLabel={t("bandwidthAria")}
    />
  );
}
