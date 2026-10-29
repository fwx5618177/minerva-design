import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Interview scorecard of one candidate, each skill rated out of 10
const indicators: RadarIndicator[] = [
  { name: "Problem solving", max: 10 },
  { name: "Coding", max: 10 },
  { name: "System design", max: 10 },
  { name: "Communication", max: 10 },
  { name: "Collaboration", max: 10 },
  { name: "Ownership", max: 10 },
];

const series: RadarSeries[] = [
  { name: "Candidate", values: [8.5, 9, 6.5, 7, 8, 9] },
];

const format = (value: number) => `${value} / 10`;

export default function BasicDemo() {
  return (
    <RadarChart
      indicators={indicators}
      series={series}
      format={format}
      height={340}
      ariaLabel="Interview scorecard of a candidate"
    />
  );
}
