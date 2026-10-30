import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const DAY = 24 * 60 * 60 * 1000;
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 2, 1).getTime();
const LAUNCH = START + 34 * DAY;
const OUTAGE = [START + 61 * DAY, START + 64 * DAY] as const;

// Daily unique visitors over 90 days: weekly rhythm, a launch spike and an outage
const visitors = Array.from({ length: 90 }, (_, i) => {
  const time = START + i * DAY;
  const weekday = new Date(time).getDay();
  const weekly = weekday === 0 || weekday === 6 ? 0.7 : 1;
  const launch = i >= 34 ? 1.35 + 1.4 * Math.exp(-(i - 34) / 3) : 1;
  const outage = time >= OUTAGE[0] && time < OUTAGE[1] ? 0.35 : 1;
  const value = 8200 * weekly * launch * outage * (1 + Math.sin(i * 1.7) / 20);
  return [time, Math.round(value)] as const;
});

export default function TrafficEventsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("visitors"), data: visitors }],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "x",
        value: LAUNCH,
        color: "var(--success-color)",
        dash: [4, 4],
        label: t("launch"),
      },
      {
        type: "rect",
        x0: OUTAGE[0],
        x1: OUTAGE[1],
        color: "var(--danger-color)",
        opacity: 0.12,
        label: t("outage"),
        labelPosition: "top-right",
      },
    ],
    [t],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      annotations={annotations}
      area
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => number.format(value) }}
      height={300}
      ariaLabel={t("eventsAria")}
    />
  );
}
