import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// GDP per capita (k$), life expectancy (years), population (millions)
const countries: [string, number, number, number][] = [
  ["Japan", 34, 84.5, 124],
  ["Germany", 52, 81.2, 84],
  ["France", 44, 82.5, 68],
  ["United States", 80, 78.4, 335],
  ["Brazil", 10, 75.9, 216],
  ["India", 2.5, 70.8, 1430],
  ["China", 12.6, 78.6, 1410],
  ["Nigeria", 1.6, 54.5, 224],
  ["Mexico", 13.9, 75.1, 128],
  ["Indonesia", 4.9, 71.9, 278],
];

const series: ChartSeries[] = [
  {
    name: "Countries",
    showLabels: true,
    opacity: 0.7,
    data: countries.map(([label, x, y, population]) => ({
      x,
      y,
      label,
      size: 6 + Math.sqrt(population) * 0.6,
    })),
  },
];

export default function LabelsDemo() {
  return (
    <ScatterChart
      series={series}
      xAxis={{ title: "GDP per capita (k$)" }}
      yAxis={{ title: "Life expectancy (years)" }}
      height={320}
      ariaLabel="Life expectancy by GDP per capita; dot size is the population"
    />
  );
}
