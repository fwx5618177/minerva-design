import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
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
const GOAL = 8; // hours
const FIRST = "2026-05-01";
const LAST = "2026-10-31";

// Hours of sleep recorded by a watch each night: shorter on weeknights,
// catching up at weekends, a few nights without the watch
const random = mulberry32(88);
const START = Date.UTC(2026, 4, 1);
const NIGHTS: CalendarDatum[] = [];
for (let i = 0; i < 184; i++) {
  const time = START + i * DAY;
  const weekday = new Date(time).getUTCDay();
  if (random() < 0.06) continue;
  const weekend = weekday === 0 || weekday === 6;
  const hours = (weekend ? 8.2 : 6.9) + (random() - 0.5) * 1.8;
  NIGHTS.push({
    date: new Date(time).toISOString().slice(0, 10),
    value: Math.round(hours * 4) / 4,
  });
}

export default function SleepDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;

  const hours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      unitDisplay: "short",
      maximumFractionDigits: 2,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const signedHours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      unitDisplay: "short",
      maximumFractionDigits: 2,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const average = NIGHTS.reduce((sum, d) => sum + d.value, 0) / NIGHTS.length;
  const reached = NIGHTS.filter((d) => d.value >= GOAL).length;

  // the date in `name` is already formatted in the locale; value is the
  // total of the day (0 for the nights without data)
  const tooltip = (event: ShapeHoverEvent) => {
    if (!event.value) {
      return (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{event.name}</strong>
          <span>{t("noRecord")}</span>
        </div>
      );
    }
    const delta = event.value - GOAL;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>{hours(event.value)}</span>
        <span
          style={{
            color: delta >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {t("vsGoal", { value: signedHours(delta), goal: hours(GOAL) })}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("sleepSummary", {
          average: hours(Math.round(average * 10) / 10),
          reached: new Intl.NumberFormat(locale).format(reached),
          nights: new Intl.NumberFormat(locale).format(NIGHTS.length),
          goal: hours(GOAL),
        })}
      </output>
      <CalendarHeatmap
        data={NIGHTS}
        range={[FIRST, LAST]}
        // under 6 h, 6-7 h, 7-8 h, 8 h or more
        thresholds={[6, 7, 7.75]}
        color="var(--chart-series-3)"
        format={hours}
        locale={locale}
        renderTooltip={tooltip}
        ariaLabel={t("sleepAria")}
      />
    </div>
  );
}
