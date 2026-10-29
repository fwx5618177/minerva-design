import { BarChart, type ChartSeries } from "minerva-design/charts";

const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East",
];

// Survey answers (respondents) grouped as Net Promoter Score categories
const answers = [
  {
    name: "Promoters",
    color: "var(--success-color)",
    values: [612, 540, 702, 288, 164],
  },
  {
    name: "Passives",
    color: "var(--warning-color)",
    values: [254, 310, 268, 131, 92],
  },
  {
    name: "Detractors",
    color: "var(--danger-color)",
    values: [134, 196, 118, 97, 61],
  },
];

const series: ChartSeries[] = answers.map(({ name, color, values }) => ({
  name,
  color,
  data: regions.map((region, i) => [region, values[i]] as const),
}));

export default function PercentDemo() {
  return (
    <BarChart
      series={series}
      percent
      height={300}
      ariaLabel="Share of promoters, passives and detractors by region"
    />
  );
}
