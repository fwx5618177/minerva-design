import { BellIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

const colors = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {colors.map((color, index) => (
        <Badge
          key={color}
          color={color}
          content={index + 1}
          aria-label={`${color} badge`}
        >
          <BellIcon size={24} title={color} />
        </Badge>
      ))}
    </div>
  );
}
