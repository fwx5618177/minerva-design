import { LineChart, type ChartSeries } from "minerva-design/charts";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const thisWeek = [1200, 1350, 1280, 1490, 1610, 980, 870];
const lastWeek = [1100, 1180, 1250, 1300, 1420, 1010, 760];

const series: ChartSeries[] = [
  {
    name: "This week",
    data: days.map((day, i) => [day, thisWeek[i]] as const),
  },
  {
    name: "Last week",
    data: days.map((day, i) => [day, lastWeek[i]] as const),
  },
];

export default function BasicDemo() {
  return (
    <LineChart
      series={series}
      height={280}
      ariaLabel="Daily visitors, this week and last week"
    />
  );
}
