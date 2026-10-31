import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  BoxPlotChart,
  boxplotStats,
  type BoxplotGroup,
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

// 300 CI runs (minutes) of every pipeline over a month: a typical duration,
// a spread, and a share of runs that miss the cache and take much longer
const pipelines = [
  ["lint", 2.1, 0.3, 0.02],
  ["unit", 6.5, 0.9, 0.04],
  ["integration", 14, 2.2, 0.06],
  ["e2e", 22, 4, 0.08],
  ["release", 11, 1.2, 0.12],
] as const;
const runs = pipelines.map(([, typical, spread, misses], p) => {
  const random = mulberry32(500 + p);
  return Float64Array.from({ length: 300 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const miss = random() < misses ? typical * (0.8 + random()) : 0;
    return Math.max(0.5, typical + spread * z + miss);
  });
});

const whiskers = { tukey: 1.5, wide: 3, minmax: "minmax" } as const;
type Whisker = keyof typeof whiskers;

export default function BuildTimesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [whisker, setWhisker] = useState<Whisker>("tukey");
  const [shape, setShape] = useState<"hollow" | "filled">("hollow");

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const groups = useMemo(
    (): BoxplotGroup[] =>
      pipelines.map(([key], i) => ({
        x: t(`pipelines.${key}`),
        values: runs[i] ?? [],
      })),
    [t],
  );
  // the same rule as the chart, to count the runs drawn as outliers
  const outliers = useMemo(
    () =>
      runs.reduce(
        (n, values) =>
          n +
          boxplotStats(values, { whisker: whiskers[whisker] }).outliers.length,
        0,
      ),
    [whisker],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("whiskerRule")}
        direction="horizontal"
        value={whisker}
        onChange={(value) => setWhisker(value as Whisker)}
      >
        <Radio value="tukey" label={t("whiskers.tukey")} />
        <Radio value="wide" label={t("whiskers.wide")} />
        <Radio value="minmax" label={t("whiskers.minmax")} />
      </RadioGroup>
      <RadioGroup
        aria-label={t("outlierShape")}
        direction="horizontal"
        value={shape}
        onChange={(value) => setShape(value as "hollow" | "filled")}
      >
        <Radio value="hollow" label={t("shapes.hollow")} />
        <Radio value="filled" label={t("shapes.filled")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("outlierRuns", {
          value: new Intl.NumberFormat(locale).format(outliers),
        })}
      </output>
      <BoxPlotChart
        groups={groups}
        name={t("buildTime")}
        whisker={whiskers[whisker]}
        outlierShape={shape}
        outlierSize={shape === "filled" ? 5 : 8}
        yAxis={{ format: minutes, min: 0 }}
        height={340}
        ariaLabel={t("buildsAria")}
      />
    </div>
  );
}
