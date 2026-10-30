import { useMemo, useState } from "react";
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
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);

// A developer's commits over the last year: busy weekdays, quiet weekends,
// a two-week holiday and a few release crunches
const random = mulberry32(7);
const END = Date.UTC(2026, 9, 24);
const COMMITS: CalendarDatum[] = [];
for (let i = 364; i >= 0; i--) {
  const time = END - i * DAY;
  const weekday = new Date(time).getUTCDay();
  const weekend = weekday === 0 || weekday === 6;
  const holiday = i > 290 && i < 305;
  const crunch = i % 61 < 6;
  const chance = holiday ? 0.05 : weekend ? 0.2 : 0.82;
  if (random() < chance)
    COMMITS.push({
      date: iso(time),
      value: Math.max(
        1,
        Math.round(random() * (weekend ? 4 : 9) * (crunch ? 2.2 : 1)),
      ),
    });
}

export default function ContributionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const total = useMemo(() => COMMITS.reduce((sum, d) => sum + d.value, 0), []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <p style={{ margin: 0 }}>{t("commitsTotal", { total })}</p>
      <CalendarHeatmap
        data={COMMITS}
        locale={i18n.language}
        color="#2da44e"
        onClick={setSelected}
        ariaLabel={t("commitsAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? t("commitsDay", { date: selected.name, value: selected.value })
          : t("commitsHint")}
      </p>
    </div>
  );
}
