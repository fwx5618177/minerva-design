import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  HistogramChart,
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

// Specification of a machined shaft: 25 mm ± 0.05 mm
const NOMINAL = 25;
const LSL = 24.95;
const USL = 25.05;
const DOMAIN = [24.94, 25.06] as const;
const BINS = 48;
const WIDTH = (DOMAIN[1] - DOMAIN[0]) / BINS;

/** 5,000 measured diameters, around `mean` */
const measure = (mean: number, sd: number) => {
  const random = mulberry32(42);
  const values = new Float64Array(5000);
  for (let i = 0; i < values.length; i++) {
    // Box-Muller
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    values[i] = mean + sd * z;
  }
  return values;
};
// the worn tool cuts a little wide; after the adjustment the process is centered
const drifted = measure(25.021, 0.0125);
const centered = measure(25.001, 0.0115);

const statsOf = (values: Float64Array) => {
  let sum = 0;
  let out = 0;
  for (const v of values) {
    sum += v;
    if (v < LSL || v > USL) out++;
  }
  const mean = sum / values.length;
  let squares = 0;
  for (const v of values) squares += (v - mean) ** 2;
  const sd = Math.sqrt(squares / (values.length - 1));
  const cpk = Math.min(USL - mean, mean - LSL) / (3 * sd);
  return { mean, sd, cpk, ppm: (out / values.length) * 1e6 };
};

export default function QualityControlDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [adjusted, setAdjusted] = useState(false);
  const values = adjusted ? centered : drifted;
  const stats = useMemo(() => statsOf(values), [values]);

  const mm = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millimeter",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const integer = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    [locale],
  );

  // the fitted normal curve, scaled to counts per bin
  const fit = useMemo((): ChartSeries[] => {
    const { mean, sd } = stats;
    const scale = (values.length * WIDTH) / (sd * Math.sqrt(2 * Math.PI));
    const data = Array.from({ length: 121 }, (_, i) => {
      const x = DOMAIN[0] + ((DOMAIN[1] - DOMAIN[0]) * i) / 120;
      return [x, scale * Math.exp(-(((x - mean) / sd) ** 2) / 2)] as const;
    });
    return [
      {
        name: t("normalFit"),
        type: "line",
        curve: "smooth",
        data,
        color: "var(--text-color)",
        tooltip: false,
      },
    ];
  }, [stats, values, t]);

  const annotations = useMemo(
    (): ChartAnnotation[] => [
      // out of specification on both sides
      { type: "rect", x1: LSL, color: "var(--danger-color)", opacity: 0.1 },
      { type: "rect", x0: USL, color: "var(--danger-color)", opacity: 0.1 },
      {
        type: "line",
        axis: "x",
        value: LSL,
        color: "var(--danger-color)",
        label: t("lsl"),
      },
      {
        type: "line",
        axis: "x",
        value: USL,
        color: "var(--danger-color)",
        label: t("usl"),
      },
      {
        type: "line",
        axis: "x",
        value: NOMINAL,
        dash: [4, 4],
        label: t("nominal"),
      },
    ],
    [t],
  );
  const capable = stats.cpk >= 1.33;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch
        checked={adjusted}
        onChange={setAdjusted}
        label={t("adjustTool")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("capability", {
          mean: mm(stats.mean),
          sd: mm(stats.sd),
          cpk: decimal.format(stats.cpk),
          ppm: integer.format(stats.ppm),
        })}{" "}
        <strong
          style={{
            color: capable ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {capable ? t("capable") : t("notCapable")}
        </strong>
      </output>
      <HistogramChart
        values={values}
        domain={DOMAIN}
        bins={BINS}
        nice={false}
        name={t("parts")}
        formatBin={mm}
        series={fit}
        xAxis={{ title: t("diameter"), format: mm }}
        annotations={annotations}
        height={320}
        ariaLabel={t("qualityAria")}
      />
    </div>
  );
}
