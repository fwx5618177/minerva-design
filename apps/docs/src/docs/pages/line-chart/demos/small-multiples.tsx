import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
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
const START = new Date(2026, 10, 1).getTime();
const GUIDELINE = 15; // µg/m³, daily guideline of the World Health Organization
const MAX = 120; // one y range for every panel, so they compare at a glance

// Daily mean of fine particles (PM2.5) over 30 days in six cities
const cities = [
  { key: "delhi", base: 78, swing: 30 },
  { key: "beijing", base: 42, swing: 28 },
  { key: "paris", base: 14, swing: 8 },
  { key: "mexicoCity", base: 24, swing: 10 },
  { key: "tokyo", base: 10, swing: 5 },
  { key: "saoPaulo", base: 17, swing: 7 },
] as const;
const readings = cities.map(({ key, base, swing }, c) => {
  const random = mulberry32(100 + c);
  const data = Array.from({ length: 30 }, (_, i) => {
    const weather = Math.sin(i / 3.2 + c) * 0.6 + (random() - 0.5) * 0.8;
    const value = Math.max(3, base + swing * weather);
    return [START + i * DAY, Math.round(value)] as const;
  });
  return { key, data };
});

export default function SmallMultiplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const date = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const micrograms = useMemo(
    () => (value: number) => t("micrograms", { value: number.format(value) }),
    [t, number],
  );

  const panels = useMemo(
    () =>
      readings.map(({ key, data }) => {
        const name = t(`cities.${key}`);
        // the unit in the tooltip, bare numbers on the small axes
        const series: ChartSeries[] = [
          { name, data, opacity: 0.18, format: micrograms },
        ];
        const above = data.filter(([, value]) => value > GUIDELINE).length;
        return { key, name, series, above };
      }),
    [t, micrograms],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: GUIDELINE,
        color: "var(--warning-color)",
        dash: [3, 3],
      },
    ],
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("guidelineNote", { value: micrograms(GUIDELINE) })}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {panels.map((panel) => (
          <figure key={panel.key} style={{ margin: 0, minWidth: 0 }}>
            <figcaption
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                fontSize: 13,
              }}
            >
              <strong>{panel.name}</strong>
              <span style={{ color: "var(--text-secondary-color)" }}>
                {t("daysAbove", { days: panel.above, total: 30 })}
              </span>
            </figcaption>
            <LineChart
              series={panel.series}
              area
              curve="smooth"
              annotations={annotations}
              interaction={false}
              legend={false}
              xAxis={{
                type: "time",
                tickCount: 3,
                format: (x) => date.format(x),
              }}
              yAxis={{
                min: 0,
                max: MAX,
                tickCount: 3,
                format: (y) => number.format(y),
              }}
              height={150}
              ariaLabel={t("pmAria", { city: panel.name })}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
