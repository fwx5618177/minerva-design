import { Chart, type ChartSeries } from "minerva-design/charts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const revenue = [42, 48, 51, 47, 58, 63, 61, 70, 74, 69, 81, 92];
const target = [45, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77];

const series: ChartSeries[] = [
  {
    name: "Revenue (k$)",
    type: "bar",
    data: months.map((month, i) => [month, revenue[i]] as const),
  },
  {
    name: "Target (k$)",
    type: "line",
    data: months.map((month, i) => [month, target[i]] as const),
  },
];

export default function MixedDemo() {
  return (
    <Chart
      series={series}
      legend={{ position: "bottom" }}
      height={300}
      ariaLabel="Monthly revenue against target"
    />
  );
}
