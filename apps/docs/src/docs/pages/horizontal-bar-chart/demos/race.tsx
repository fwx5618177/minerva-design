import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Cumulative installed solar capacity at the end of each year, in GW
// (rounded figures, 2015 to 2024)
const FIRST_YEAR = 2015;
const capacity: Record<string, number[]> = {
  CN: [43, 77, 130, 175, 205, 253, 307, 393, 609, 887],
  US: [26, 41, 51, 62, 75, 95, 123, 142, 175, 225],
  JP: [34, 42, 49, 56, 63, 71, 74, 79, 87, 92],
  DE: [39, 41, 42, 45, 49, 54, 59, 67, 82, 99],
  IN: [5, 10, 18, 27, 35, 39, 49, 63, 73, 98],
  IT: [19, 19, 20, 20, 21, 22, 23, 25, 30, 37],
  AU: [6, 7, 7, 11, 16, 20, 25, 29, 33, 37],
  ES: [5, 5, 5, 5, 9, 13, 17, 24, 31, 38],
  BR: [0, 0, 1, 2, 5, 8, 13, 24, 37, 52],
  FR: [7, 7, 8, 9, 9, 11, 13, 16, 19, 24],
  NL: [2, 2, 3, 5, 7, 11, 15, 19, 23, 27],
  KR: [4, 5, 6, 8, 11, 15, 18, 21, 24, 27],
};
const countries = Object.keys(capacity);
// one stable color per country: the 8 palette colors, then 4 more
const COLORS = [
  "var(--chart-series-1, #4f46e5)",
  "var(--chart-series-2, #10b981)",
  "var(--chart-series-3, #f59e0b)",
  "var(--chart-series-4, #ef4444)",
  "var(--chart-series-5, #0ea5e9)",
  "var(--chart-series-6, #8b5cf6)",
  "var(--chart-series-7, #14b8a6)",
  "var(--chart-series-8, #f97316)",
  "#ec4899",
  "#84cc16",
  "#64748b",
  "#a16207",
];
const YEARS = 10;
const STEPS_PER_YEAR = 10;
const LAST_FRAME = (YEARS - 1) * STEPS_PER_YEAR;
const SHOWN = 8;

// capacity of a country between two year ends, linearly interpolated
const valueAt = (country: string, frame: number) => {
  const values = capacity[country] ?? [];
  const year = Math.floor(frame / STEPS_PER_YEAR);
  const t = (frame % STEPS_PER_YEAR) / STEPS_PER_YEAR;
  const from = values[year] ?? 0;
  const to = values[Math.min(year + 1, YEARS - 1)] ?? from;
  return from + (to - from) * t;
};

export default function RaceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  const finished = frame >= LAST_FRAME;
  const running = playing && !finished;

  // one step every 120 ms; the interval stops at the last year and on unmount
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setFrame((current) => Math.min(current + 1, LAST_FRAME));
    }, 120);
    return () => window.clearInterval(id);
  }, [running]);

  const names = useMemo(
    () => new Intl.DisplayNames(locale, { type: "region" }),
    [locale],
  );
  const gw = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    return (value: number) => t("gigawatts", { value: format.format(value) });
  }, [locale, t]);

  // re-sorted every frame; each country keeps its palette color
  const series = useMemo((): ChartSeries[] => {
    const rows = countries
      .map((code, i) => ({ code, i, value: valueAt(code, frame) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, SHOWN);
    return [
      {
        name: t("solarCapacity"),
        data: rows.map((row) => ({
          x: names.of(row.code) ?? row.code,
          y: row.value,
          color: COLORS[row.i % COLORS.length],
        })),
      },
    ];
  }, [t, names, frame]);

  const year = FIRST_YEAR + Math.floor(frame / STEPS_PER_YEAR);
  const play = () => {
    if (finished) setFrame(0);
    setPlaying(true);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        {running ? (
          <Button
            size="small"
            variant="outline"
            onClick={() => setPlaying(false)}
          >
            {t("pause")}
          </Button>
        ) : (
          <Button size="small" onClick={play}>
            {finished ? t("replay") : t("play")}
          </Button>
        )}
        <Button
          size="small"
          variant="outline"
          disabled={frame === 0}
          onClick={() => {
            setPlaying(false);
            setFrame(0);
          }}
        >
          {t("restart")}
        </Button>
        <output aria-live="off" style={{ marginInlineStart: "auto" }}>
          <Tag size="large">
            {new Intl.NumberFormat(locale, { useGrouping: false }).format(year)}
          </Tag>
        </output>
      </div>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        yAxis={{ format: gw }}
        height={320}
        ariaLabel={t("raceAria", {
          year: new Intl.NumberFormat(locale, { useGrouping: false }).format(
            year,
          ),
        })}
      />
    </div>
  );
}
