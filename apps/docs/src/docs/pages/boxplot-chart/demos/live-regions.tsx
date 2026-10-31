import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
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

const WINDOW = 200; // requests kept per region
const PER_TICK = 20; // requests per region every second
const SLA = 300; // ms

const regions = [
  ["usEast", 120],
  ["usWest", 140],
  ["euWest", 110],
  ["apSouth", 190],
  ["saEast", 170],
] as const;

/**
 * Latency (ms) of request `n` of region `r`, derived from both alone so the
 * stream is deterministic; every region has a slow period now and then
 */
const latencyOf = (r: number, n: number) => {
  const random = mulberry32(r * 1_000_003 + n * 7919);
  const z =
    Math.sqrt(-2 * Math.log(random() || 1e-12)) *
    Math.cos(2 * Math.PI * random());
  const base = regions[r]?.[1] ?? 100;
  const degraded = Math.sin(n / 90 + r * 1.7) > 0.8 ? 2.4 : 1;
  return base * degraded * Math.exp(0.35 * z);
};

export default function LiveRegionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  // the last WINDOW requests of every region
  const samples = useMemo(() => {
    const last = WINDOW + tick * PER_TICK;
    return regions.map((_, r) =>
      Float64Array.from({ length: WINDOW }, (_, i) =>
        latencyOf(r, last - WINDOW + i),
      ),
    );
  }, [tick]);
  const breaching = useMemo(
    () =>
      samples.map((values) => {
        const stats = boxplotStats(values);
        return stats.q3 > SLA;
      }),
    [samples],
  );
  // a region turns red when a quarter of its requests exceed the SLA
  const groups = useMemo(
    (): BoxplotGroup[] =>
      regions.map(([key], r) => ({
        x: t(`regions.${key}`),
        values: samples[r] ?? [],
        color: breaching[r] ? "var(--danger-color)" : undefined,
      })),
    [t, samples, breaching],
  );
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const names = regions
    .filter((_, r) => breaching[r])
    .map(([key]) => t(`regions.${key}`));
  const list = new Intl.ListFormat(locale, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <output
          aria-live="polite"
          style={{
            color: names.length
              ? "var(--danger-color)"
              : "var(--text-secondary-color)",
          }}
        >
          {names.length
            ? t("slaBreached", { regions: list.format(names) })
            : t("slaOk")}
        </output>
      </div>
      <BoxPlotChart
        groups={groups}
        name={t("latency")}
        // a fixed range keeps the boxes comparable from one second to the next
        yAxis={{ format: ms, min: 0, max: 1200 }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: SLA,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("sla"),
          },
        ]}
        height={340}
        ariaLabel={t("regionsAria")}
      />
    </div>
  );
}
