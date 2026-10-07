import { Switch } from "@minerva/lib-core";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <>
      {placements.map((placement) => (
        <Switch
          key={placement}
          label={`Label at ${placement}`}
          labelPlacement={placement}
          defaultChecked
        />
      ))}
    </>
  );
}
