import { GaugeChart } from "minerva-design/charts";

// Resource usage of a server, in percent
const metrics = [
  { label: "CPU", value: 68, color: "var(--primary-color)" },
  { label: "Memory", value: 82, color: "var(--warning-color)" },
  { label: "Disk", value: 41, color: "var(--success-color)" },
];

const percent = (value: number) => `${Math.round(value)}%`;

export default function BasicDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {metrics.map((metric) => (
        <GaugeChart
          key={metric.label}
          value={metric.value}
          label={metric.label}
          color={metric.color}
          format={percent}
          height={200}
          ariaLabel={`${metric.label} usage`}
        />
      ))}
    </div>
  );
}
