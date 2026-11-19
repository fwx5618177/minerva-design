import { HeartIcon } from "minerva-design/icons";
import type { CSSProperties } from "react";
import { Checkbox } from "minerva-design";

// The --checkbox-* custom properties recolor the box; set them on className
// or on any ancestor (here an inline style on the wrapper).
const violet = {
  "--checkbox-checked-color": "#7c3aed",
  "--checkbox-checkmark-color": "#fde68a",
  "--checkbox-border-color": "#7c3aed",
} as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <>
      <span style={violet}>
        <Checkbox label="Custom colors" defaultChecked />
      </span>
      <Checkbox
        label="Custom icon"
        defaultChecked
        icon={<HeartIcon size="1em" color="#e11d48" />}
      />
    </>
  );
}
