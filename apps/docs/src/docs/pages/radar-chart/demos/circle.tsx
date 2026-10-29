import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Cupping notes of two coffees, each attribute scored from 0 to 5
const indicators: RadarIndicator[] = [
  { name: "Aroma", max: 5 },
  { name: "Acidity", max: 5 },
  { name: "Sweetness", max: 5 },
  { name: "Body", max: 5 },
  { name: "Bitterness", max: 5 },
  { name: "Aftertaste", max: 5 },
];

const series: RadarSeries[] = [
  {
    name: "Ethiopia Yirgacheffe",
    values: [4.6, 4.4, 3.8, 2.4, 1.6, 3.9],
    opacity: 0.25,
  },
  {
    name: "Sumatra Mandheling",
    values: [3.6, 1.8, 3.1, 4.7, 3.9, 4.2],
    opacity: 0.25,
  },
];

export default function CircleDemo() {
  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      dots={false}
      height={360}
      ariaLabel="Flavor profiles of two coffees"
    />
  );
}
