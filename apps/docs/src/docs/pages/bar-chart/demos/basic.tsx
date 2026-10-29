import { BarChart, type ChartSeries } from "minerva-design/charts";

const series: ChartSeries[] = [
  {
    name: "Tickets closed",
    data: [
      ["Q1", 320],
      ["Q2", 410],
      ["Q3", 385],
      ["Q4", 470],
    ],
  },
];

export default function BasicDemo() {
  return (
    <BarChart
      series={series}
      height={280}
      ariaLabel="Support tickets closed per quarter"
    />
  );
}
