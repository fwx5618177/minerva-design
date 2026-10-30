import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Service level objectives of an API this month. Availability starts its
// scale at 99% (min) so that the interesting part is visible.
const SLOS: BulletDatum[] = [
  {
    name: "availability",
    value: 99.95,
    target: 99.9,
    ranges: [99.5, 99.9, 100],
    min: 99,
  },
  { name: "apdex", value: 0.91, target: 0.94, ranges: [0.7, 0.85, 1] },
  { name: "throughput", value: 1240, target: 1000, ranges: [800, 1200, 1600] },
  { name: "budget", value: 38, target: 50, ranges: [25, 50, 100] },
];

// red / amber / green, translucent so that they suit both themes
const TRAFFIC_LIGHTS = [
  "rgba(239, 68, 68, 0.3)",
  "rgba(245, 158, 11, 0.3)",
  "rgba(34, 197, 94, 0.3)",
];

const format = (value: number) =>
  value >= 100 ? String(Math.round(value)) : String(+value.toFixed(2));

export default function TrafficLightsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      SLOS.map((slo) => ({
        ...slo,
        name: t(`slo.${slo.name}`),
        subtitle: t(`slo.${slo.name}Unit`),
        color: "var(--text-color)",
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.breach"), t("ranges.atRisk"), t("ranges.healthy")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      rangeColors={TRAFFIC_LIGHTS}
      rangeLabels={rangeLabels}
      targetColor="#2563eb"
      barSize={0.3}
      format={format}
      ariaLabel={t("sloAria")}
    />
  );
}
