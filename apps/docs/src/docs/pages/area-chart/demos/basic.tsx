import { useMemo } from "react";
import {
  AreaChart,
  formatCompact,
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

const DAY = 24 * 60 * 60 * 1000;
const START = new Date(2026, 3, 1).getTime();

export default function BasicDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(21);
    const data: [Date, number][] = [];
    let level = 18_000;
    for (let i = 0; i < 90; i++) {
      level *= 1.004 + (random() - 0.5) * 0.01;
      const seasonal = 1 + 0.04 * Math.sin(i / 9);
      const value = level * seasonal * (0.985 + random() * 0.03);
      data.push([new Date(START + i * DAY), Math.round(value)]);
    }
    return [{ name: "Daily active users", data }];
  }, []);

  return (
    <AreaChart
      series={series}
      yAxis={{ format: (value) => formatCompact(value) }}
      height={280}
      ariaLabel="Daily active users, April to June 2026"
    />
  );
}
