import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
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
const FIRST = Date.UTC(2026, 7, 1);
const LAST = Date.UTC(2026, 9, 31);
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);
const ALL_DAYS: string[] = [];
for (let time = FIRST; time <= LAST; time += DAY) ALL_DAYS.push(iso(time));

// days a workout was logged since August, before any click
const INITIAL = (() => {
  const random = mulberry32(31);
  return ALL_DAYS.filter(() => random() < 0.6);
})();

/** Days in a row up to the last day */
const currentStreak = (done: ReadonlySet<string>) => {
  let run = 0;
  for (let i = ALL_DAYS.length - 1; i >= 0 && done.has(ALL_DAYS[i] ?? ""); i--)
    run++;
  return run;
};

export default function HabitToggleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const [done, setDone] = useState<ReadonlySet<string>>(() => new Set(INITIAL));
  const [last, setLast] = useState<{ name: string; done: boolean } | null>(
    null,
  );

  // the chart only draws the data it gets: a click updates the state
  const data = useMemo(
    (): CalendarDatum[] => [...done].map((date) => ({ date, value: 1 })),
    [done],
  );
  const toggle = (event: ShapeHoverEvent) => {
    const date = event.date;
    if (!date) return;
    const next = new Set(done);
    const nowDone = !next.has(date);
    if (nowDone) next.add(date);
    else next.delete(date);
    setDone(next);
    setLast({ name: event.name, done: nowDone });
  };
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span>
          {t("habitSummary", {
            done: number.format(done.size),
            share: percent.format(done.size / ALL_DAYS.length),
            streak: number.format(currentStreak(done)),
          })}
        </span>
        <Button
          size="small"
          variant="ghost"
          onClick={() => {
            setDone(new Set(INITIAL));
            setLast(null);
          }}
        >
          {t("reset")}
        </Button>
      </div>
      <CalendarHeatmap
        data={data}
        range={[iso(FIRST), iso(LAST)]}
        layout="months"
        levels={1}
        color="var(--success-color)"
        legend={false}
        format={(value) => (value ? t("workoutDone") : t("workoutMissed"))}
        locale={locale}
        onClick={toggle}
        height={280}
        ariaLabel={t("habitAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {last
          ? last.done
            ? t("markedDone", { date: last.name })
            : t("markedMissed", { date: last.name })
          : t("habitHint")}
      </output>
    </div>
  );
}
