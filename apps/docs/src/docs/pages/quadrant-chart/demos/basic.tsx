import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

const features: QuadrantPoint[] = [
  { label: "Dark mode", x: 2, y: 7.5 },
  { label: "SSO", x: 6.5, y: 9 },
  { label: "CSV export", x: 1.5, y: 6 },
  { label: "Offline sync", x: 9, y: 8 },
  { label: "New icons", x: 2.5, y: 2 },
  { label: "Plugin API", x: 8, y: 6.5 },
  { label: "Custom fonts", x: 7, y: 2.5 },
  { label: "Tooltips", x: 1, y: 3.5 },
];

const quadrants: QuadrantRegions = {
  topLeft: { label: "Quick wins" },
  topRight: { label: "Big bets" },
  bottomLeft: { label: "Fill-ins" },
  bottomRight: { label: "Time sinks" },
};

export default function BasicDemo() {
  return (
    <QuadrantChart
      points={features}
      quadrants={quadrants}
      xLabel="Effort"
      yLabel="Impact"
      name="Feature"
      height={320}
      ariaLabel="Features by effort and impact"
    />
  );
}
