import { BarChart, type ChartSeries } from "minerva-design/charts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const byChannel = {
  Web: [120, 135, 150, 148, 170, 190],
  Mobile: [80, 95, 110, 125, 140, 160],
  Partners: [30, 28, 35, 42, 40, 51],
};

const series: ChartSeries[] = Object.entries(byChannel).map(
  ([name, values]) => ({
    name,
    data: months.map((month, i) => [month, values[i]] as const),
  }),
);

export default function StackedDemo() {
  return (
    <BarChart
      series={series}
      stacked
      height={300}
      ariaLabel="Monthly orders by channel, stacked"
    />
  );
}
