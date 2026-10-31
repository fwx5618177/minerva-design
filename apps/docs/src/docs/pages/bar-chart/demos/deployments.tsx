import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
// a Monday, local midnight: the time axis places its ticks in local time
const START = new Date(2026, 8, 7).getTime();
const DAYS = 56;
const FREEZE = [38, 43] as const; // a change freeze before a big launch

// Production deployments per day, and the ones that were rolled back
const random = mulberry32(42);
const days = Array.from({ length: DAYS }, (_, i) => {
  const time = START + i * DAY;
  const weekend = [0, 6].includes(new Date(time).getDay());
  const frozen = i >= FREEZE[0] && i <= FREEZE[1];
  const total =
    weekend || frozen
      ? random() < 0.15
        ? 1
        : 0
      : Math.round(4 + random() * 6 + i / 14);
  const failed = total > 0 && random() < 0.35 ? (random() < 0.8 ? 1 : 2) : 0;
  return { time, weekend, ok: total - Math.min(failed, total), failed };
});
const workingDays = days.filter((d) => !d.weekend).length;
const deployed = days.reduce((sum, d) => sum + d.ok + d.failed, 0);
const rolledBack = days.reduce((sum, d) => sum + d.failed, 0);

export default function DeploymentsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("deploysOk"),
        color: "var(--success-color)",
        data: days.map((d) => [d.time, d.ok] as const),
      },
      {
        name: t("deploysFailed"),
        color: "var(--danger-color)",
        data: days.map((d) => [d.time, d.failed] as const),
      },
    ],
    [t],
  );
  // every weekend, from Saturday to Monday (bars are centered on midnight)
  const annotations = useMemo((): ChartAnnotation[] => {
    const weekends: ChartAnnotation[] = days
      .filter((d) => new Date(d.time).getDay() === 6)
      .map((d) => ({
        type: "rect",
        x0: d.time - DAY / 2,
        x1: d.time + (3 * DAY) / 2,
        color: "var(--text-secondary-color)",
        opacity: 0.07,
      }));
    return [
      ...weekends,
      {
        type: "rect",
        x0: START + FREEZE[0] * DAY - DAY / 2,
        x1: START + FREEZE[1] * DAY + DAY / 2,
        color: "var(--warning-color)",
        opacity: 0.14,
        label: t("changeFreeze"),
        labelPosition: "top-right",
      },
    ];
  }, [t]);
  const formats = useMemo(
    () => ({
      decimal: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),

      tick: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        xAxis={{ type: "time", format: (x) => formats.tick.format(x) }}
        tooltip={{ mode: "axis" }}
        height={300}
        ariaLabel={t("deploysAria")}
      />
      <p style={{ margin: 0 }}>
        {t("deploysSummary", {
          perDay: formats.decimal.format(deployed / workingDays),
          failure: formats.percent.format(rolledBack / deployed),
        })}
      </p>
    </div>
  );
}
