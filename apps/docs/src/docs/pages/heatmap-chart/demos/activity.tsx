import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

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
const WEEKS = 52;
// first Monday of the year shown
const START = Date.UTC(2025, 10, 3);

// Contributions per day: weekdays busier, a quiet holiday period, a few streaks
const random = mulberry32(52);
const contributions: { week: number; day: number; count: number }[] = [];
for (let week = 0; week < WEEKS; week++) {
  const holiday = week >= 7 && week <= 8;
  const streak = week % 13 > 8;
  for (let day = 0; day < 7; day++) {
    const weekend = day >= 5;
    const busy =
      (weekend ? 0.15 : 0.7) * (holiday ? 0.1 : 1) * (streak ? 1.8 : 1);
    const count = random() < busy ? Math.round(random() * 12 * busy) : 0;
    contributions.push({ week, day, count });
  }
}

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

// GitHub-like greens; 0 contributions = the empty cell color
const greens = [
  "var(--surface-muted-color)",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

export default function ActivityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => weekdays(locale), [locale]);

  // columns are weeks (numbers), rows are weekdays (categories)
  const data = useMemo(
    (): HeatmapCell[] =>
      contributions.map(({ week, day, count }) => ({
        x: week,
        y: days[day],
        value: count,
      })),
    [days],
  );
  // the x ticks show the month of the week
  const month = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
    [locale],
  );
  const total = contributions.reduce((sum, { count }) => sum + count, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        yCategories={[...days].reverse()}
        colorScale={greens}
        valueRange={[0, 12]}
        name={t("contributions")}
        xAxis={{
          format: (week) => month.format(START + Math.round(week) * 7 * DAY),
          tickCount: 12,
        }}
        radius={2}
        height={200}
        ariaLabel={t("activityAria")}
      />
      <p>
        {t("activityTotal", {
          total: new Intl.NumberFormat(locale).format(total),
        })}
      </p>
    </div>
  );
}
