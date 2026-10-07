import { Badge } from "@minerva/lib-core";
import { FaBell } from "react-icons/fa";

export default function CustomStyleDemo() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <Badge
        content={1}
        bgColor="#7c3aed"
        textColor="#ffffff"
        borderRadius="12px"
      >
        <FaBell size={24} />
      </Badge>
      <Badge
        content={2}
        bgColor="#ff9800"
        textColor="#ffffff"
        borderWidth="2px"
        borderColor="#e65100"
      >
        <FaBell size={24} />
      </Badge>
    </div>
  );
}
