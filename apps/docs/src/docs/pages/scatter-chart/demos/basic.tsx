import { useMemo } from "react";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BasicDemo() {
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(9);
    const plan = (name: string, price: number, slope: number) => ({
      name,
      data: Array.from({ length: 40 }, () => {
        const seats = 1 + Math.round(random() * 49);
        return [
          seats,
          Math.round(price + seats * slope * (0.8 + random() * 0.4)),
        ] as const;
      }),
    });
    return [plan("Starter", 20, 9), plan("Business", 60, 14)];
  }, []);

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: "Seats" }}
      yAxis={{ title: "Monthly bill ($)" }}
      height={300}
      ariaLabel="Monthly bill by number of seats, per plan"
    />
  );
}
