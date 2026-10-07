import { Checkbox } from "@minerva/lib-core";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <>
      {placements.map((placement) => (
        <Checkbox
          key={placement}
          label={placement}
          labelPlacement={placement}
        />
      ))}
    </>
  );
}
