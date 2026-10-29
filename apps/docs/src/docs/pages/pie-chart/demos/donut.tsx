import { useState } from "react";
import {
  DonutChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly recurring revenue by plan, in US dollars
const revenue: ShapeDatum[] = [
  { name: "Enterprise", value: 48200 },
  { name: "Business", value: 31500 },
  { name: "Pro", value: 22800 },
  { name: "Starter", value: 9400 },
];

const total = revenue.reduce((sum, d) => sum + d.value, 0);

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const format = (value: number) => currency.format(value);
const labelContent = ["name", "value"] as const;
// The total in the hole always covers every plan, so slices stay visible
const legend = { toggle: false } as const;

export default function DonutDemo() {
  // The hovered (or keyboard-highlighted) plan replaces the total in the hole
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  return (
    <DonutChart
      data={revenue}
      format={format}
      centerValue={format(hovered ? hovered.value : total)}
      centerLabel={
        hovered
          ? `${hovered.name} · ${Math.round(hovered.percent * 100)}%`
          : "Monthly revenue"
      }
      onHover={setHovered}
      tooltip={false}
      legend={legend}
      labelContent={labelContent}
      height={320}
      ariaLabel="Monthly recurring revenue by plan"
    />
  );
}
