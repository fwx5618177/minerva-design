import { Badge } from "@minerva/lib-core";
import { FaBell } from "react-icons/fa";

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
          ariaLabel={`${color} badge`}
        >
          <FaBell size={24} title={color} />
        </Badge>
      ))}
    </div>
  );
}
