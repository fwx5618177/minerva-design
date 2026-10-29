import { useMemo, useState } from "react";
import { Checkbox, HStack, Radio, RadioGroup } from "minerva-design";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

type Placement = "outside" | "inside" | "none";
type Part = "name" | "value" | "percent";

// Support tickets opened this quarter, by channel
const tickets: ShapeDatum[] = [
  { name: "Email", value: 1240 },
  { name: "Live chat", value: 980 },
  { name: "Web form", value: 610 },
  { name: "Phone", value: 430 },
  { name: "Social", value: 150 },
  { name: "Community", value: 90 },
];

const PARTS: Part[] = ["name", "value", "percent"];

export default function LabelsDemo() {
  const [labels, setLabels] = useState<Placement>("outside");
  const [parts, setParts] = useState<Part[]>(["name", "percent"]);

  // Keep the array stable between renders: a new one would redraw the labels
  const labelContent = useMemo(
    () => PARTS.filter((part) => parts.includes(part)),
    [parts],
  );

  const togglePart = (part: Part, checked: boolean) =>
    setParts((current) =>
      checked ? [...current, part] : current.filter((p) => p !== part),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Label placement"
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Placement)}
      >
        <Radio value="outside" label="Outside" />
        <Radio value="inside" label="Inside" />
        <Radio value="none" label="None" />
      </RadioGroup>
      <HStack gap={16} role="group" aria-label="Label content">
        {PARTS.map((part) => (
          <Checkbox
            key={part}
            label={part}
            checked={parts.includes(part)}
            // at least one part stays selected
            disabled={
              labels === "none" || (parts.length === 1 && parts[0] === part)
            }
            onChange={(checked) => togglePart(part, checked)}
          />
        ))}
      </HStack>
      <PieChart
        data={tickets}
        labels={labels}
        labelContent={labelContent}
        height={340}
        ariaLabel="Support tickets by channel"
      />
    </div>
  );
}
