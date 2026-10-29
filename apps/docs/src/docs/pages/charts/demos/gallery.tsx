import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TextLink,
} from "minerva-design";
import {
  AreaChart,
  BarChart,
  CandlestickChart,
  DonutChart,
  FunnelChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  PieChart,
  QuadrantChart,
  RadarChart,
  ScatterChart,
  Sparkline,
  TreemapChart,
  type ChartSeries,
  type HeatmapCell,
  type QuadrantPoint,
  type RadarIndicator,
  type RadarSeries,
  type ShapeDatum,
  type TreemapNode,
} from "minerva-design/charts";

// Every data set lives at module level: stable references never trigger updates.

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const pairs = (values: readonly number[]) =>
  values.map((value, i) => [months[i], value] as const);

const lineSeries: ChartSeries[] = [
  { name: "Visits", data: pairs([32, 41, 38, 52, 49, 61, 66, 72]) },
  { name: "Sign-ups", data: pairs([12, 15, 19, 18, 24, 27, 26, 34]) },
];

const areaSeries: ChartSeries[] = [
  { name: "Web", data: pairs([20, 24, 22, 30, 34, 31, 38, 42]) },
  { name: "iOS", data: pairs([12, 14, 18, 17, 20, 24, 23, 27]) },
  { name: "Android", data: pairs([8, 11, 10, 14, 16, 15, 19, 22]) },
];

const barSeries: ChartSeries[] = [
  {
    name: "Orders",
    data: [
      { x: "Q1", y: 128 },
      { x: "Q2", y: 164 },
      { x: "Q3", y: 212, color: "var(--success-color)" },
      { x: "Q4", y: 187 },
    ],
  },
];

const scatterSeries: ChartSeries[] = (() => {
  const next = random(7);
  const group = (name: string, cx: number, cy: number) => ({
    name,
    data: Array.from({ length: 40 }, () => ({
      x: cx + (next() - 0.5) * 30,
      y: cy + (next() - 0.5) * 30,
      size: 4 + next() * 6,
    })),
  });
  return [group("Team A", 35, 60), group("Team B", 65, 35)];
})();

const candleSeries: ChartSeries[] = (() => {
  const next = random(42);
  let close = 100;
  const data = Array.from({ length: 36 }, (_, x) => {
    const open = close;
    close = Math.max(60, open + (next() - 0.48) * 8);
    const high = Math.max(open, close) + next() * 3;
    const low = Math.min(open, close) - next() * 3;
    return { x, open, high, low, y: close };
  });
  return [{ name: "ACME", data }];
})();

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = ["0h", "4h", "8h", "12h", "16h", "20h"];
const heatmapCells: HeatmapCell[] = (() => {
  const next = random(3);
  return days.flatMap((day, d) =>
    slots.map((slot, s) => ({
      x: day,
      y: slot,
      value: Math.round(
        (d < 5 ? 40 : 15) + (s >= 2 && s <= 4 ? 40 : 0) + next() * 20,
      ),
    })),
  );
})();

const revenueTrend = [18, 22, 19, 26, 24, 31, 29, 35, 33, 41, 38, 46];
const errorTrend = [9, 7, 8, 5, 6, 4, 5, 3, 4, 2, 3, 2];

const browsers: ShapeDatum[] = [
  { name: "Chrome", value: 64 },
  { name: "Safari", value: 19 },
  { name: "Edge", value: 9 },
  { name: "Firefox", value: 8 },
];

const plans: ShapeDatum[] = [
  { name: "Free", value: 5400 },
  { name: "Pro", value: 2100 },
  { name: "Team", value: 860 },
];

const skills: RadarIndicator[] = [
  { name: "Speed", max: 10 },
  { name: "Quality", max: 10 },
  { name: "Cost", max: 10 },
  { name: "Support", max: 10 },
  { name: "Scale", max: 10 },
];
const vendors: RadarSeries[] = [
  { name: "Vendor A", values: [8, 6, 7, 5, 9] },
  { name: "Vendor B", values: [5, 9, 6, 8, 6] },
];

const gaugeBands = [
  { to: 60, color: "var(--danger-color)" },
  { to: 85, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

const stages: ShapeDatum[] = [
  { name: "Visited", value: 12000 },
  { name: "Signed up", value: 4800 },
  { name: "Activated", value: 2600 },
  { name: "Paid", value: 900 },
];

const budget: TreemapNode[] = [
  {
    name: "Product",
    children: [
      { name: "Design", value: 18 },
      { name: "Engineering", value: 42 },
    ],
  },
  {
    name: "Go to market",
    children: [
      { name: "Sales", value: 24 },
      { name: "Marketing", value: 16 },
    ],
  },
];

const tasks: QuadrantPoint[] = [
  { x: 8, y: 8.5, label: "Release" },
  { x: 3, y: 7.5, label: "Roadmap" },
  { x: 7, y: 3, label: "Emails" },
  { x: 2, y: 2, label: "Cleanup" },
];
const regions = {
  topLeft: { label: "Plan" },
  topRight: { label: "Do first" },
  bottomLeft: { label: "Drop" },
  bottomRight: { label: "Delegate" },
};

const HEIGHT = 180;
const compactPercent = (value: number) => `${Math.round(value)}%`;

function GalleryCard({
  title,
  page,
  description,
  children,
}: {
  title: string;
  page: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink href={`#/${page}`}>{title}</TextLink>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function GalleryDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      <GalleryCard title="LineChart" page="line-chart" description="Trends">
        <LineChart
          series={lineSeries}
          height={HEIGHT}
          legend={false}
          ariaLabel="Visits and sign-ups per month"
        />
      </GalleryCard>

      <GalleryCard
        title="AreaChart"
        page="area-chart"
        description="Smooth, stacked"
      >
        <AreaChart
          series={areaSeries}
          stacked
          height={HEIGHT}
          legend={false}
          ariaLabel="Users per platform, stacked"
        />
      </GalleryCard>

      <GalleryCard
        title="BarChart"
        page="bar-chart"
        description="Value labels, per-bar color"
      >
        <BarChart
          series={barSeries}
          labels
          height={HEIGHT}
          legend={false}
          ariaLabel="Orders per quarter"
        />
      </GalleryCard>

      <GalleryCard
        title="ScatterChart"
        page="scatter-chart"
        description="Correlations, clusters"
      >
        <ScatterChart
          series={scatterSeries}
          height={HEIGHT}
          legend={false}
          ariaLabel="Two clusters of measurements"
        />
      </GalleryCard>

      <GalleryCard
        title="CandlestickChart"
        page="candlestick-chart"
        description="Open, high, low, close"
      >
        <CandlestickChart
          series={candleSeries}
          height={HEIGHT}
          legend={false}
          ariaLabel="Daily ACME prices"
        />
      </GalleryCard>

      <GalleryCard
        title="HeatmapChart"
        page="heatmap-chart"
        description="Values on a grid"
      >
        <HeatmapChart
          data={heatmapCells}
          xCategories={days}
          yCategories={slots}
          name="Load"
          radius={2}
          height={HEIGHT}
          ariaLabel="Load by weekday and hour"
        />
      </GalleryCard>

      <GalleryCard
        title="Sparkline"
        page="sparkline"
        description="Word-sized trends"
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <strong style={{ fontSize: 22 }}>$46k</strong> revenue
            <Sparkline
              data={revenueTrend}
              type="area"
              reference={30}
              name="Revenue"
              ariaLabel="Revenue trend"
            />
          </div>
          <div>
            <strong style={{ fontSize: 22 }}>2</strong> errors
            <Sparkline
              data={errorTrend}
              type="bar"
              name="Errors"
              color="var(--danger-color)"
              ariaLabel="Errors trend"
            />
          </div>
        </div>
      </GalleryCard>

      <GalleryCard title="PieChart" page="pie-chart" description="Shares">
        <PieChart
          data={browsers}
          height={HEIGHT}
          legend={false}
          format={compactPercent}
          ariaLabel="Browser share"
        />
      </GalleryCard>

      <GalleryCard
        title="DonutChart"
        page="pie-chart"
        description="Shares with a total"
      >
        <DonutChart
          data={plans}
          height={HEIGHT}
          labels="none"
          centerValue="8.4k"
          centerLabel="users"
          legend={{ position: "bottom" }}
          ariaLabel="Users per plan"
        />
      </GalleryCard>

      <GalleryCard
        title="RadarChart"
        page="radar-chart"
        description="Profiles over several axes"
      >
        <RadarChart
          indicators={skills}
          series={vendors}
          height={HEIGHT}
          legend={false}
          ariaLabel="Vendor comparison"
        />
      </GalleryCard>

      <GalleryCard
        title="GaugeChart"
        page="gauge-chart"
        description="One value against a target"
      >
        <GaugeChart
          value={78}
          label="Uptime score"
          bands={gaugeBands}
          height={HEIGHT}
          ariaLabel="Uptime score"
        />
      </GalleryCard>

      <GalleryCard
        title="FunnelChart"
        page="funnel-chart"
        description="Stages and conversion"
      >
        <FunnelChart
          data={stages}
          height={HEIGHT}
          legend={false}
          ariaLabel="Sign-up funnel"
        />
      </GalleryCard>

      <GalleryCard
        title="TreemapChart"
        page="treemap-chart"
        description="Hierarchical parts of a whole"
      >
        <TreemapChart
          data={budget}
          height={HEIGHT}
          ariaLabel="Budget per department"
        />
      </GalleryCard>

      <GalleryCard
        title="QuadrantChart"
        page="quadrant-chart"
        description="Priority matrix"
      >
        <QuadrantChart
          points={tasks}
          quadrants={regions}
          showTicks={false}
          height={HEIGHT}
          ariaLabel="Tasks by urgency and importance"
        />
      </GalleryCard>
    </div>
  );
}
