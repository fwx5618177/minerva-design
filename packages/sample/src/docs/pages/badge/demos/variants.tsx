import { Badge } from "@minerva/lib-core";
import { FaBell } from "react-icons/fa";

const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "error",
  "info",
  "light",
  "dark",
] as const;

export default function VariantsDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {variants.map((variant, index) => (
        <Badge
          key={variant}
          variant={variant}
          content={index + 1}
          ariaLabel={`${variant} badge`}
        >
          <FaBell size={24} title={variant} />
        </Badge>
      ))}
    </div>
  );
}
