import { AreaChart, type ChartSeries } from "minerva-design/charts";

const years = [
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
];

// Units shipped (millions) by vendor; `percent` turns them into shares
const vendors = {
  Aurora: [38, 41, 47, 52, 58, 66, 71, 74, 79, 83, 88],
  Borealis: [52, 50, 49, 47, 44, 43, 41, 40, 38, 37, 35],
  Cobalt: [12, 16, 21, 27, 31, 34, 36, 41, 44, 49, 54],
  Others: [44, 42, 39, 36, 33, 30, 28, 25, 23, 21, 19],
};

const series: ChartSeries[] = Object.entries(vendors).map(([name, values]) => ({
  name,
  data: years.map((year, i) => [year, values[i]] as const),
}));

export default function PercentDemo() {
  return (
    <AreaChart
      series={series}
      percent
      height={300}
      ariaLabel="Market share by vendor, 2016 to 2026"
    />
  );
}
