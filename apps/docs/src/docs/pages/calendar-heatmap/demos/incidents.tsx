import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
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
const YEARS = [2024, 2025, 2026] as const;
const LAST_DAY = "2026-10-31";
type Year = (typeof YEARS)[number];

// Production incidents per day, from 2024 to Oct 31, 2026: fewer every year
// as the on-call team automates, with bad weeks after big releases
const random = mulberry32(404);
const INCIDENTS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2024, 0, 1);
  time <= Date.UTC(2026, 9, 31);
  time += DAY
) {
  const year = new Date(time).getUTCFullYear();
  const rate = year === 2024 ? 0.55 : year === 2025 ? 0.35 : 0.2;
  const dayOfYear = Math.floor((time - Date.UTC(year, 0, 1)) / DAY);
  const release = dayOfYear % 91 < 5 ? 3 : 1;
  let n = 0;
  while (random() < rate * release * 0.6 && n < 8) n++;
  if (n)
    INCIDENTS.push({
      date: new Date(time).toISOString().slice(0, 10),
      value: n,
    });
}

export default function IncidentsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const [year, setYear] = useState<Year>(2026);
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const yearName = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { useGrouping: false });
    return (value: number) => format.format(value);
  }, [locale]);
  const days = useMemo(
    () => INCIDENTS.filter((d) => String(d.date).startsWith(`${year}-`)),
    [year],
  );
  const total = days.reduce((sum, d) => sum + d.value, 0);
  const quiet = (year === 2026 ? 304 : year === 2024 ? 366 : 365) - days.length;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("year")}
        direction="horizontal"
        value={String(year)}
        onChange={(value) => {
          setYear(Number(value) as Year);
          setHovered(null);
        }}
      >
        {YEARS.map((y) => (
          <Radio key={y} value={String(y)} label={yearName(y)} />
        ))}
      </RadioGroup>
      <p style={{ margin: 0 }}>
        {t("incidentsYear", {
          year: yearName(year),
          total: number.format(total),
          quiet: number.format(quiet),
        })}
      </p>
      <CalendarHeatmap
        data={INCIDENTS}
        // the range picks the year shown out of the same data
        range={year}
        thresholds={[1, 2, 4]}
        color="var(--danger-color)"
        format={(value) => t("incidentsN", { value: number.format(value) })}
        locale={locale}
        onHover={setHovered}
        ariaLabel={t("incidentsAria", { year: yearName(year) })}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? (hovered.date ?? "") > LAST_DAY
            ? t("futureDay", { date: hovered.name })
            : hovered.value
              ? t("incidentsDay", {
                  date: hovered.name,
                  value: number.format(hovered.value),
                })
              : t("quietDay", { date: hovered.name })
          : t("hoverDay")}
      </output>
    </div>
  );
}
