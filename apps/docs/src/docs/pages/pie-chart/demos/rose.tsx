import { PieChart, type ShapeDatum } from "minerva-design/charts";

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
// Average rainfall per month, in millimeters
const rainfall = [78, 61, 72, 58, 49, 37, 28, 34, 52, 86, 97, 92];

// One color per season (Dec-Feb, Mar-May, Jun-Aug, Sep-Nov)
const seasons = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

const data: ShapeDatum[] = months.map((name, i) => ({
  name,
  value: rainfall[i],
  color: seasons[Math.floor(((i + 1) % 12) / 3)],
}));

const labelContent = ["name"] as const;
const format = (value: number) => `${value} mm`;

export default function RoseDemo() {
  return (
    <PieChart
      data={data}
      rose
      innerRadius={0.18}
      padAngle={2}
      cornerRadius={4}
      labelContent={labelContent}
      legend={false}
      format={format}
      height={360}
      ariaLabel="Average monthly rainfall"
    />
  );
}
