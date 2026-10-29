import { useEffect, useRef, useState } from "react";
import { Button } from "minerva-design";
import {
  createShapeChart,
  type ShapeChartInstance,
  type ShapeChartOptions,
  type ShapeHoverEvent,
} from "minerva-design/charts/core";

const traffic = [
  { name: "Search", value: 4200 },
  { name: "Direct", value: 2600 },
  { name: "Social", value: 1500 },
  { name: "Email", value: 900 },
  { name: "Referral", value: 600 },
];

const views: Record<"pie" | "donut" | "funnel", ShapeChartOptions> = {
  pie: {
    type: "pie",
    data: traffic,
    ariaLabel: "Visits per source",
  },
  donut: {
    type: "pie",
    data: traffic,
    innerRadius: 0.62,
    padAngle: 2,
    cornerRadius: 4,
    centerValue: "9.8k",
    centerLabel: "visits",
    labels: "none",
    ariaLabel: "Visits per source",
  },
  funnel: {
    type: "funnel",
    data: [
      { name: "Visits", value: 9800 },
      { name: "Sign-ups", value: 3100 },
      { name: "Trials", value: 1400 },
      { name: "Customers", value: 520 },
    ],
    ariaLabel: "Conversion funnel",
  },
};
type View = keyof typeof views;

export default function ShapesDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ShapeChartInstance | null>(null);
  const [view, setView] = useState<View>("pie");
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createShapeChart(container, views.pie);
    chartRef.current = chart;
    const off = chart.on("click", setPicked);
    return () => {
      off();
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  const show = (next: View) => {
    setView(next);
    setPicked(null);
    // animates from the previous values
    chartRef.current?.setOptions(views[next]);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {(Object.keys(views) as View[]).map((name) => (
          <Button
            key={name}
            size="small"
            variant={view === name ? "solid" : "outline"}
            aria-pressed={view === name}
            onClick={() => show(name)}
          >
            {name}
          </Button>
        ))}
      </div>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        {picked
          ? `${picked.name}: ${picked.value} (${Math.round(picked.percent * 100)}%)`
          : "Click a slice or a stage"}
      </p>
    </div>
  );
}
