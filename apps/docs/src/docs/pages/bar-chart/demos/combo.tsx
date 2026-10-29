import { useMemo } from "react";
import { BarChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ComboDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(5);
    const orders = Array.from({ length: 30 }, (_, day) =>
      Math.round(60 + day * 1.5 + random() * 40),
    );
    // trailing 7-day average of the bars
    const average = orders.map((_, day) => {
      const week = orders.slice(Math.max(0, day - 6), day + 1);
      return Math.round(week.reduce((sum, v) => sum + v, 0) / week.length);
    });
    return [
      { name: "Orders", data: orders },
      { name: "7-day average", type: "line", data: average, lineWidth: 3 },
    ];
  }, []);

  return (
    <BarChart
      series={series}
      xAxis={{ title: "Day" }}
      height={300}
      ariaLabel="Daily orders with their 7-day average"
    />
  );
}
