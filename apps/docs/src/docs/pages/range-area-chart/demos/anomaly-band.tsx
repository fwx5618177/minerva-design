import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HOUR = 60 * 60 * 1000;
const START = new Date(2026, 9, 19).getTime(); // a Monday, local midnight
const HOURS = 7 * 24;
// incidents injected into the data: hour index and relative change
const INCIDENTS = new Map([
  [31, 0.55],
  [58, -0.42],
  [104, -0.6],
  [105, -0.5],
  [139, 0.48],
]);

// Requests per minute of an API: a daily cycle (busy afternoons, quiet nights,
// calmer weekends), measured values with noise and a few incidents
const random = mulberry32(2026);
const points = Array.from({ length: HOURS }, (_, i) => {
  const time = START + i * HOUR;
  const date = new Date(time);
  const hour = date.getHours();
  const weekend = [0, 6].includes(date.getDay());
  const daily = Math.max(0, Math.sin(((hour - 7) / 24) * 2 * Math.PI));
  const expected = (weekend ? 0.65 : 1) * (1200 + 3400 * daily ** 1.5);
  const sigma = 60 + expected * 0.05;
  // roughly normal noise: the sum of 3 uniforms has a standard deviation of 0.5
  const noise = (random() + random() + random() - 1.5) * 2;
  const actual = expected + noise * sigma + expected * (INCIDENTS.get(i) ?? 0);
  return { time, expected, sigma, actual };
});

export default function AnomalyBandDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [k, setK] = useState("3");

  const anomalies = useMemo(
    () =>
      points.filter(
        (p) => Math.abs(p.actual - p.expected) > Number(k) * p.sigma,
      ),
    [k],
  );
  const series = useMemo((): ChartSeries[] => {
    const width = Number(k);
    return [
      {
        name: t("expectedBand", { k: width }),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        lineWidth: 0,
        data: points.map((p) => ({
          x: p.time,
          y0: p.expected - width * p.sigma,
          y: p.expected + width * p.sigma,
        })),
      },
      {
        name: t("measured"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: points.map((p) => [p.time, Math.round(p.actual)] as const),
      },
      {
        name: t("anomalies"),
        type: "scatter",
        color: "var(--danger-color)",
        pointSize: 8,
        data: anomalies.map((p) => [p.time, Math.round(p.actual)] as const),
      },
    ];
  }, [t, k, anomalies]);

  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale, { notation: "compact" }),
      date: new Intl.DateTimeFormat(locale, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sensitivity")}
        direction="horizontal"
        value={k}
        onChange={(value) => setK(String(value))}
      >
        <Radio value="2">{t("sigmaOption", { k: 2 })}</Radio>
        <Radio value="3">{t("sigmaOption", { k: 3 })}</Radio>
      </RadioGroup>
      <RangeAreaChart
        series={series}
        curve="linear"
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{
          title: t("requestsPerMinute"),
          format: (y) => formats.number.format(y),
        }}
        locale={locale}
        height={320}
        ariaLabel={t("anomalyAria")}
      />
      <output aria-live="polite">
        {anomalies.length === 0
          ? t("noAnomaly")
          : t("anomalyCount", {
              n: anomalies.length,
              latest: formats.date.format(
                anomalies[anomalies.length - 1]?.time ?? START,
              ),
            })}
      </output>
    </div>
  );
}
