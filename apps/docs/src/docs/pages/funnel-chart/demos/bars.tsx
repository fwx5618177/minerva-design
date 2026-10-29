import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

type Sort = "descending" | "ascending" | "none";

// Weekly active users of each feature (not a sequential process)
const features: ShapeDatum[] = [
  { name: "Alerts", value: 3900 },
  { name: "Dashboards", value: 8400 },
  { name: "Integrations", value: 1600 },
  { name: "Reports", value: 5200 },
  { name: "Public API", value: 2100 },
];

export default function BarsDemo() {
  const [sort, setSort] = useState<Sort>("descending");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Sort order"
        direction="horizontal"
        value={sort}
        onChange={(value) => setSort(value as Sort)}
      >
        <Radio value="descending" label="Descending" />
        <Radio value="ascending" label="Ascending" />
        <Radio value="none" label="Data order" />
      </RadioGroup>
      <FunnelChart
        data={features}
        shape="bar"
        sort={sort}
        conversion={false}
        gap={6}
        legend={false}
        height={300}
        ariaLabel="Weekly active users per feature"
      />
    </div>
  );
}
