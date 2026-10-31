import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkline,
  type ChartHoverEvent,
  type ChartPointDatum,
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
const START = Date.UTC(2026, 9, 4);
const GOAL = 10_000;

// Steps counted by a phone over four weeks: long walks at weekends, a
// sick week in the middle
const steps = (() => {
  const random = mulberry32(10);
  return Array.from({ length: 28 }, (_, i) => {
    const weekday = new Date(START + i * DAY).getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    const sick = i >= 12 && i <= 15;
    const base = sick ? 2_500 : weekend ? 12_500 : 8_800;
    return Math.round(base * (0.75 + random() * 0.5));
  });
})();

export default function StepGoalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );
  // the days reaching the goal are green
  const data = useMemo(
    (): ChartPointDatum[] =>
      steps.map((y, x) => ({
        x,
        y,
        color: y >= GOAL ? "var(--success-color)" : "var(--chart-series-1)",
      })),
    [],
  );
  const reached = steps.filter((value) => value >= GOAL).length;

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    const share = item.y / GOAL;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{date.format(START + item.index * DAY)}</strong>
        <span>{t("stepsN", { value: number.format(item.y) })}</span>
        <span
          style={{
            color:
              share >= 1
                ? "var(--success-color)"
                : "var(--text-secondary-color)",
          }}
        >
          {t("ofGoal", { value: percent.format(share) })}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 4, width: "100%", maxWidth: 480 }}>
      <span>
        {t("goalSummary", {
          reached: number.format(reached),
          days: number.format(steps.length),
          goal: number.format(GOAL),
        })}
      </span>
      <Sparkline
        data={data}
        type="bar"
        name={t("steps")}
        // dashed line at the daily goal
        reference={GOAL}
        renderTooltip={tooltip}
        height={72}
        ariaLabel={t("stepsAria")}
      />
    </div>
  );
}
