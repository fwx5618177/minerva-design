import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RACKS = 10;
const UNITS = 8; // sensors per rack, bottom to top
const LIMIT = 32; // °C, the inlet temperature alarm

/**
 * Inlet temperatures of the sensors at refresh `tick`, rack by rack: warmer
 * at the top of the racks, with a cooling unit failing now and then.
 * Derived from the tick alone, so the readings are deterministic.
 */
const readingsAt = (tick: number) => {
  const random = mulberry32(tick * 7919 + 3);
  // the failing cooling unit drifts along the aisle
  const failing = Math.floor(tick / 12) % RACKS;
  const heat = Math.max(0, Math.sin((tick % 12) / 3.8)) * 12;
  const values: number[] = [];
  for (let r = 0; r < RACKS; r++) {
    for (let u = 0; u < UNITS; u++) {
      const distance = Math.abs(r - failing);
      const hot = distance < 2 ? heat * (1 - distance * 0.5) : 0;
      values.push(20 + u * 0.9 + hot * (0.5 + u / UNITS) + random() * 1.5);
    }
  }
  return values;
};

export default function RackTemperaturesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  // the sensors are polled every 1.5 s
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1500);
    return () => clearInterval(timer);
  }, [running]);

  const racks = useMemo(
    () => Array.from({ length: RACKS }, (_, r) => t("rackN", { n: r + 1 })),
    [t],
  );
  const units = useMemo(
    () => Array.from({ length: UNITS }, (_, u) => t("sensorN", { n: u + 1 })),
    [t],
  );
  const readings = useMemo(() => readingsAt(tick), [tick]);
  const data = useMemo(
    (): HeatmapCell[] =>
      readings.map((value, i) => ({
        x: racks[Math.floor(i / UNITS)] ?? "",
        y: units[i % UNITS] ?? "",
        value,
      })),
    [readings, racks, units],
  );
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const hottest = readings.reduce(
    (best, value, i) => (value > (readings[best] ?? -Infinity) ? i : best),
    0,
  );
  const alarms = readings.filter((value) => value > LIMIT).length;

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
            color: alarms
              ? "var(--danger-color)"
              : "var(--text-secondary-color)",
          }}
        >
          {t("rackStatus", {
            rack: racks[Math.floor(hottest / UNITS)],
            sensor: units[hottest % UNITS],
            value: celsius(readings[hottest] ?? 0),
            alarms: new Intl.NumberFormat(locale).format(alarms),
            limit: celsius(LIMIT),
          })}
        </output>
      </div>
      <HeatmapChart
        data={data}
        xCategories={racks}
        yCategories={units}
        // a fixed range: the same color means the same temperature at every refresh
        valueRange={[18, 40]}
        colorScale={[
          "var(--primary-color)",
          "var(--success-color)",
          "var(--warning-color)",
          "var(--danger-color)",
        ]}
        name={t("inletTemperature")}
        format={celsius}
        radius={2}
        height={340}
        ariaLabel={t("racksAria")}
      />
    </div>
  );
}
