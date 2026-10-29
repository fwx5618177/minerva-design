import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  formatCompact,
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

// Monthly cloud spend by service (USD)
const spend = {
  Compute: [
    18_400, 19_100, 20_600, 21_000, 22_800, 24_100, 23_500, 25_900, 27_200,
    28_000, 29_400, 31_800,
  ],
  Storage: [
    6_200, 6_500, 6_900, 7_400, 7_800, 8_300, 8_900, 9_400, 9_800, 10_500,
    11_100, 11_900,
  ],
  Network: [
    3_100, 2_900, 3_600, 4_200, 3_800, 4_600, 5_300, 4_900, 5_200, 5_800, 6_400,
    7_100,
  ],
  Databases: [
    9_800, 9_900, 10_200, 10_100, 10_800, 11_200, 11_000, 11_600, 12_100,
    12_400, 12_300, 12_900,
  ],
};

const series: ChartSeries[] = Object.entries(spend).map(([name, values]) => ({
  name,
  data: months.map((month, i) => [month, values[i]] as const),
}));

export default function StackedDemo() {
  const [mode, setMode] = useState("stacked");
  const percent = mode === "percent";

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Stack mode"
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(String(value))}
      >
        <Radio value="stacked" label="Stacked" />
        <Radio value="percent" label="100%" />
      </RadioGroup>
      <LineChart
        series={series}
        area
        stacked
        percent={percent}
        // a y format replaces the percent ticks: only set it for amounts
        yAxis={percent ? undefined : { format: (v) => `$${formatCompact(v)}` }}
        height={300}
        ariaLabel="Monthly cloud spend by service, stacked"
      />
    </div>
  );
}
