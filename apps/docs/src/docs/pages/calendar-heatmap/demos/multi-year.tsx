import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

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

// Three years of running, in km per day: long runs on Sundays, more running
// in spring and autumn, a winter break and a marathon block in 2025
const random = mulberry32(42);
const RUNS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2024, 0, 1);
  time <= Date.UTC(2026, 11, 31);
  time += DAY
) {
  const date = new Date(time);
  const month = date.getUTCMonth();
  const sunday = date.getUTCDay() === 0;
  const season =
    month === 0 || month === 11 ? 0.25 : month >= 6 && month <= 7 ? 0.5 : 0.65;
  const marathon = date.getUTCFullYear() === 2025 && month >= 7 && month <= 9;
  if (random() < season + (marathon ? 0.2 : 0))
    RUNS.push({
      date: date.toISOString().slice(0, 10),
      value:
        Math.round(
          (sunday ? 14 + random() * 14 : 4 + random() * 8) *
            (marathon ? 1.3 : 1) *
            10,
        ) / 10,
    });
}

const TOTALS = RUNS.reduce<Record<string, number>>((totals, run) => {
  const year = String(run.date).slice(0, 4);
  totals[year] = (totals[year] ?? 0) + run.value;
  return totals;
}, {});

export default function MultiYearDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const format = useMemo(
    () => (value: number) => t("km", { value: number.format(value) }),
    [number, t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CalendarHeatmap
        data={RUNS}
        range={["2024-01-01", "2026-12-31"]}
        thresholds={[6, 10, 16]}
        color="#f97316"
        format={format}
        locale={locale}
        ariaLabel={t("runsAria")}
      />
      <p style={{ margin: 0 }}>
        {Object.entries(TOTALS)
          .map(([year, km]) => t("runsYear", { year, value: format(km) }))
          .join(" · ")}
      </p>
    </div>
  );
}
