import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

const START = 1990;
const END = 2025;

// Fertility (children per woman), life expectancy (years) and population
// (millions) in 1990 and 2025, approximate, by continent
const countries = {
  asia: [
    ["CN", 2.5, 1.0, 69, 78, 1135, 1410],
    ["IN", 4.0, 2.0, 58, 72, 870, 1450],
    ["BD", 4.5, 2.0, 58, 74, 107, 175],
    ["JP", 1.5, 1.2, 79, 85, 124, 123],
  ],
  europe: [
    ["DE", 1.5, 1.4, 75, 81, 79, 84],
    ["IT", 1.3, 1.2, 77, 84, 57, 59],
    ["PL", 2.0, 1.2, 71, 78, 38, 37],
  ],
  americas: [
    ["US", 2.1, 1.6, 75, 79, 250, 345],
    ["BR", 2.8, 1.6, 66, 76, 150, 212],
    ["MX", 3.4, 1.8, 70, 75, 84, 131],
  ],
  africa: [
    ["NG", 6.4, 4.5, 46, 55, 95, 233],
    ["ET", 7.1, 3.9, 47, 67, 48, 132],
    ["EG", 4.4, 2.7, 64, 72, 57, 117],
    ["KE", 6.0, 3.2, 57, 64, 24, 57],
  ],
} as const;
type Continent = keyof typeof countries;
const largest = Math.max(
  ...Object.values(countries).flatMap((rows) => rows.map((row) => row[6])),
);

/** Smooth interpolation between the 1990 and the 2025 values */
const between = (from: number, to: number, year: number) => {
  const p = (year - START) / (END - START);
  return from + (to - from) * (p * p * (3 - 2 * p));
};

export default function PlaybackDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [year, setYear] = useState(START);
  const [playing, setPlaying] = useState(false);
  const atEnd = year >= END;

  // one year every 300 ms, stops on the last year
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setYear((value) => Math.min(value + 1, END)),
      300,
    );
    return () => clearInterval(timer);
  }, [playing]);

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const people = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as Continent[]).map((continent) => ({
      name: t(`continents.${continent}`),
      valueName: t("population"),
      format: (value: number) => people.format(value * 1e6),
      data: countries[continent].map(
        ([code, f0, f1, life0, life1, pop0, pop1]) => ({
          x: between(f0, f1, year),
          y: between(life0, life1, year),
          value: between(pop0, pop1, year),
          label: names.of(code) ?? code,
        }),
      ),
    }));
  }, [t, locale, year]);
  const yearText = new Intl.NumberFormat(locale, {
    useGrouping: false,
  }).format(year);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => {
            if (atEnd) setYear(START);
            setPlaying(atEnd || !playing);
          }}
        >
          {atEnd ? t("replay") : playing ? t("pause") : t("play")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          onClick={() => {
            setPlaying(false);
            setYear(START);
          }}
        >
          {t("restart")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("yearStatus", { year: yearText })}
        </output>
      </div>
      <BubbleChart
        series={series}
        minSize={6}
        maxSize={64}
        // constant maxValue: a bubble grows only when its population does
        maxValue={largest}
        // fixed ranges, so the bubbles move and the axes stay still
        xAxis={{ title: t("fertility"), min: 0.5, max: 8 }}
        yAxis={{ title: t("lifeExpectancy"), min: 40, max: 90 }}
        annotations={[
          {
            type: "text",
            x: 7.8,
            y: 88,
            text: yearText,
            anchor: "right",
            weight: 700,
          },
        ]}
        height={380}
        ariaLabel={t("playbackAria")}
      />
    </div>
  );
}
