import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// A two-week sprint of 10 working days, 7 of them done: story points
// completed each day and a scope change on day 4
const COMMITTED = 80;
const SPRINT_DAYS = 10;
const completed = [0, 5, 8, 3, 6, 9, 4, 11];
const added = [0, 0, 0, 0, 8, 0, 0, 0];
const remaining = completed.reduce<number[]>((list, done, day) => {
  const before = list[day - 1] ?? COMMITTED;
  return [...list, before - done + (added[day] ?? 0)];
}, []);
const ideal = (day: number) => COMMITTED * (1 - day / SPRINT_DAYS);
// end of each working day: Monday 19 October 2026, weekends skipped
const workingDays = Array.from(
  { length: SPRINT_DAYS },
  (_, k) => new Date(2026, 9, 19 + k + (k >= 5 ? 2 : 0)),
);

export default function BurndownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      points: (value: number) => t("points", { value: number.format(value) }),
      day: new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "numeric",
      }),
    };
  }, [locale, t]);
  const labels = useMemo(
    () => [t("sprintStart"), ...workingDays.map((d) => formats.day.format(d))],
    [t, formats],
  );

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("remainingWork"),
        type: "area",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        format: formats.points,
        data: remaining.map((y, day) => [labels[day] ?? "", y] as const),
      },
      {
        name: t("completedPerDay"),
        type: "bar",
        color: "var(--success-color)",
        format: formats.points,
        data: completed.map((y, day) => [labels[day] ?? "", y] as const),
      },
      {
        name: t("idealBurn"),
        type: "line",
        color: "var(--text-secondary-color)",
        lineWidth: 1.5,
        format: formats.points,
        data: labels.map((label, day) => [label, ideal(day)] as const),
      },
    ],
    [t, formats, labels],
  );
  const scopeDay = added.findIndex((points) => points > 0);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "text",
        x: scopeDay,
        y: (remaining[scopeDay] ?? 0) + 6,
        anchor: "bottom",
        text: t("scopeAdded", {
          value: formats.points(added[scopeDay] ?? 0),
        }),
        color: "var(--warning-color)",
        weight: 600,
      },
    ],
    [t, formats, scopeDay],
  );

  // where the sprint stands on the hovered day compared with the ideal line
  const renderTooltip = (event: ChartHoverEvent) => {
    const day = event.items[0]?.index ?? -1;
    const left = remaining[day];
    const label = labels[day];
    if (label === undefined) return null;
    if (left === undefined) {
      return (
        <div>
          <strong>{label}</strong>
          <div>{t("idealLeft", { value: formats.points(ideal(day)) })}</div>
        </div>
      );
    }
    const gap = left - ideal(day);
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{label}</strong>
        <span>{t("remainingLeft", { value: formats.points(left) })}</span>
        <span>
          {t("doneThatDay", { value: formats.points(completed[day] ?? 0) })}
        </span>
        <span
          style={{
            color: gap > 0 ? "var(--danger-color)" : "var(--success-color)",
          }}
        >
          {gap > 0
            ? t("behindBy", { value: formats.points(gap) })
            : t("aheadBy", { value: formats.points(-gap) })}
        </span>
      </div>
    );
  };

  const today = remaining.length - 1;
  const velocity = completed.slice(1).reduce((sum, p) => sum + p, 0) / today;
  const left = remaining[today] ?? 0;
  const forecast = left - velocity * (SPRINT_DAYS - today);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <MixedChart
        series={series}
        annotations={annotations}
        renderTooltip={renderTooltip}
        xAxis={{ type: "category", categories: labels }}
        yAxis={{ title: t("storyPoints"), format: formats.points }}
        height={320}
        ariaLabel={t("burndownAria")}
      />
      <p style={{ margin: 0 }}>
        {forecast > 0
          ? t("burndownLate", {
              left: formats.points(left),
              velocity: formats.points(velocity),
              forecast: formats.points(forecast),
            })
          : t("burndownOnTrack", {
              left: formats.points(left),
              velocity: formats.points(velocity),
            })}
      </p>
    </div>
  );
}
