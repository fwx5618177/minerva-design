import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartCurve,
  type ChartSeries,
} from "minerva-design/charts";

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
// Average monthly temperatures (°C)
const lisbon = [
  11.6, 12.6, 14.9, 16.2, 18.8, 21.9, 23.6, 24.0, 22.6, 19.4, 15.3, 12.7,
];
const oslo = [
  -4.3, -4.0, -0.2, 4.5, 10.8, 15.2, 16.4, 15.2, 10.8, 5.0, 0.6, -3.2,
];

const series: ChartSeries[] = [
  { name: "Lisbon", data: months.map((m, i) => [m, lisbon[i]] as const) },
  { name: "Oslo", data: months.map((m, i) => [m, oslo[i]] as const) },
];

export default function CurvesDemo() {
  const [curve, setCurve] = useState<ChartCurve>("smooth");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Curve"
        direction="horizontal"
        value={curve}
        onChange={(value) => setCurve(value as ChartCurve)}
      >
        <Radio value="linear" label="linear" />
        <Radio value="smooth" label="smooth" />
        <Radio value="step" label="step" />
      </RadioGroup>
      <LineChart
        series={series}
        curve={curve}
        yAxis={{ format: (value) => `${value} °C` }}
        height={280}
        ariaLabel="Average monthly temperature in Lisbon and Oslo"
      />
    </div>
  );
}
