import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  RangeAreaChart,
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

const DAYS = 28;
const VISITORS = 1200; // per variant and per day
// two-sided z values of the confidence levels
const Z = { "80": 1.2816, "90": 1.6449, "95": 1.96, "99": 2.5758 } as const;
type Level = keyof typeof Z;

// A checkout test: variant B converts about 15% better than A. Cumulative
// conversions per day, with a roughly normal daily noise
const random = mulberry32(15);
const noise = () => random() + random() + random() - 1.5;
const days = (() => {
  let a = 0;
  let b = 0;
  return Array.from({ length: DAYS }, (_, i) => {
    a += Math.round(VISITORS * 0.04 + noise() * 13);
    b += Math.round(VISITORS * 0.046 + noise() * 14);
    const n = VISITORS * (i + 1);
    // relative lift B / A - 1 and the standard error of its logarithm
    const lift = b / a - 1;
    const se = Math.sqrt(1 / a - 1 / n + 1 / b - 1 / n);
    return { day: i + 1, lift, se };
  });
})();

export default function AbTestDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [level, setLevel] = useState<Level>("95");

  const intervals = useMemo(
    () =>
      days.map((d) => {
        const log = Math.log(1 + d.lift);
        return {
          day: d.day,
          lift: d.lift,
          low: Math.exp(log - Z[level] * d.se) - 1,
          high: Math.exp(log + Z[level] * d.se) - 1,
        };
      }),
    [level],
  );
  // first day from which the whole interval stays above zero
  const significantFrom = useMemo(() => {
    let from: number | undefined;
    for (const d of intervals) {
      if (d.low > 0) from ??= d.day;
      else from = undefined;
    }
    return from;
  }, [intervals]);

  const formats = useMemo(
    () => ({
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      level: new Intl.NumberFormat(locale, { style: "percent" }),
      day: new Intl.NumberFormat(locale),
    }),
    [locale],
  );
  const confidence = formats.level.format(Number(level) / 100);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("confidenceInterval", { level: confidence }),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.2,
        lineWidth: 0,
        data: intervals.map((d) => ({ x: d.day, y0: d.low, y: d.high })),
      },
      {
        name: t("lift"),
        type: "line",
        color: "var(--chart-series-1, #4f46e5)",
        data: intervals.map((d) => [d.day, d.lift] as const),
      },
    ],
    [t, intervals, confidence],
  );
  const annotations = useMemo((): ChartAnnotation[] => {
    const zero: ChartAnnotation = {
      type: "line",
      axis: "y",
      value: 0,
      color: "var(--text-secondary-color)",
      label: t("noDifference"),
    };
    if (significantFrom === undefined) return [zero];
    return [
      zero,
      {
        type: "rect",
        x0: significantFrom,
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("significant"),
        labelPosition: "top-right",
      },
    ];
  }, [t, significantFrom]);

  const last = intervals[intervals.length - 1];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("confidenceLevel")}
        direction="horizontal"
        value={level}
        onChange={(value) => setLevel(value as Level)}
      >
        {(Object.keys(Z) as Level[]).map((key) => (
          <Radio key={key} value={key}>
            {formats.level.format(Number(key) / 100)}
          </Radio>
        ))}
      </RadioGroup>
      <RangeAreaChart
        series={series}
        curve="linear"
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{
          title: t("testDay"),
          format: (x) => formats.day.format(x),
        }}
        yAxis={{
          title: t("liftOfB"),
          format: (y) => formats.percent.format(y),
        }}
        height={300}
        ariaLabel={t("abTestAria")}
      />
      {last && (
        <output aria-live="polite">
          {significantFrom === undefined
            ? t("notSignificant", {
                lift: formats.percent.format(last.lift),
                level: confidence,
              })
            : t("significantSince", {
                lift: formats.percent.format(last.lift),
                low: formats.percent.format(last.low),
                high: formats.percent.format(last.high),
                level: confidence,
                day: formats.day.format(significantFrom),
              })}
        </output>
      )}
    </div>
  );
}
