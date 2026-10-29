import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Net Promoter Score: -100 (everyone detracts) to +100 (everyone promotes)
const bands: GaugeBand[] = [
  { to: 0, color: "var(--danger-color)" },
  { to: 30, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

const signed = (value: number) => {
  const rounded = Math.round(value);
  return rounded > 0 ? `+${rounded}` : `${rounded}`;
};

export default function BandsDemo() {
  return (
    <GaugeChart
      value={42}
      min={-100}
      max={100}
      bands={bands}
      needle
      label="Net Promoter Score"
      format={signed}
      height={280}
      ariaLabel="Net Promoter Score"
    />
  );
}
