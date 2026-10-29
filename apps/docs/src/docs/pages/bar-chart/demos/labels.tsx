import { BarChart, type ChartSeries } from "minerva-design/charts";

const quarters = ["Q1", "Q2", "Q3", "Q4"];
// Revenue in thousands of dollars
const revenue = {
  "2025": [312, 348, 365, 421],
  "2026": [356, 402, 431, 488],
};

const series: ChartSeries[] = Object.entries(revenue).map(([name, values]) => ({
  name,
  data: quarters.map((quarter, i) => [quarter, values[i]] as const),
}));

export default function LabelsDemo() {
  return (
    <BarChart
      series={series}
      labels
      // the labels use the y axis format
      yAxis={{ format: (value) => (value === 0 ? "$0" : `$${value}k`) }}
      height={300}
      ariaLabel="Quarterly revenue, 2025 and 2026"
    />
  );
}
