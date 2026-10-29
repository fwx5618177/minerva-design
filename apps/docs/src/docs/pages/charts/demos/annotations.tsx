import { useMemo } from "react";
import {
  Chart,
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

const annotations: ChartAnnotation[] = [
  {
    type: "rect",
    y0: 80,
    y1: 150,
    color: "var(--success-color)",
    label: "Normal range",
  },
  {
    type: "rect",
    x0: 70,
    x1: 82,
    color: "var(--warning-color)",
    opacity: 0.12,
    label: "Deploy",
    labelPosition: "top-right",
  },
  {
    type: "line",
    axis: "y",
    value: 200,
    color: "var(--danger-color)",
    dash: [4, 4],
    label: "SLO 200 ms",
  },
];

export default function AnnotationsDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(42);
    const data = Array.from({ length: 120 }, (_, minute) => {
      const incident = minute >= 70 && minute <= 82 ? 90 : 0;
      return [minute, 105 + random() * 40 + incident] as const;
    });
    return [{ name: "p95 latency (ms)", data }];
  }, []);

  return (
    <Chart
      series={series}
      annotations={annotations}
      xAxis={{ title: "Minutes" }}
      yAxis={{ min: 0, max: 260 }}
      height={300}
      ariaLabel="p95 latency with the SLO and the normal range"
    />
  );
}
