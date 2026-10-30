import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  quantiles,
  type ChartAnnotation,
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

// One million request latencies (ms): log-normal, with a slow tail
const latencies = (() => {
  const random = mulberry32(11);
  const values = new Float64Array(1_000_000);
  for (let i = 0; i < values.length; i++) {
    // Box-Muller
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    values[i] =
      Math.exp(4.1 + 0.42 * z) + (random() < 0.02 ? 250 * random() : 0);
  }
  return values;
})();

export default function LatencyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // exact percentiles: one sort of the million values
  const marks = useMemo(() => quantiles(latencies, [0.5, 0.95, 0.99]), []);
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      (["p50", "p95", "p99"] as const).map((name, i) => ({
        type: "line",
        axis: "x",
        value: marks[i] ?? 0,
        color:
          i === 0
            ? "var(--success-color, #16a34a)"
            : i === 1
              ? "var(--warning-color, #f59e0b)"
              : "var(--danger-color, #dc2626)",
        label: `${name} ${ms(marks[i] ?? 0)}`,
      })),
    [marks, ms],
  );

  return (
    <HistogramChart
      values={latencies}
      domain={[0, 400]}
      bins={80}
      name={t("requests")}
      formatBin={ms}
      xAxis={{ format: ms }}
      annotations={annotations}
      height={320}
      ariaLabel={t("latencyAria")}
    />
  );
}
