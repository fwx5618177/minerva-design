import { useState } from "react";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Disk usage of a laptop, in gigabytes
const disk: TreemapNode[] = [
  {
    name: "Media",
    children: [
      { name: "Videos", value: 31.2 },
      { name: "Photos", value: 24.3 },
      { name: "Music", value: 6.4 },
    ],
  },
  {
    name: "Applications",
    children: [
      { name: "Xcode", value: 12.4 },
      { name: "Docker", value: 9.8 },
      { name: "Figma", value: 1.2 },
      { name: "Chrome", value: 1.1 },
      { name: "Slack", value: 0.6 },
    ],
  },
  {
    name: "Projects",
    children: [
      { name: "monorepo", value: 14.2 },
      { name: "design-assets", value: 4.3 },
      { name: "side-project", value: 1.6 },
    ],
  },
  {
    name: "System",
    children: [
      { name: "Library", value: 11.8 },
      { name: "Caches", value: 7.6 },
      { name: "Logs", value: 2.1 },
    ],
  },
  {
    name: "Downloads",
    children: [
      { name: "Installers", value: 5.3 },
      { name: "Archives", value: 3.9 },
    ],
  },
];

const gigabytes = (value: number) => `${value.toFixed(1)} GB`;

export default function BasicDemo() {
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={disk}
        format={gigabytes}
        onClick={setSelected}
        height={380}
        ariaLabel="Disk usage by folder"
      />
      <p role="status">
        {selected
          ? `${(selected.path ?? [selected.name]).join(" › ")}: ${gigabytes(
              selected.value,
            )} (${(selected.percent * 100).toFixed(1)}% of the disk)`
          : "Click a cell to see where it lives"}
      </p>
    </div>
  );
}
