import { Badge } from "@minerva/lib-core";
import { FaCheck, FaStar, FaUser } from "react-icons/fa";

export default function WithIconDemo() {
  return (
    <div style={{ display: "flex", gap: 48 }}>
      <Badge
        variant="success"
        icon={<FaCheck />}
        content="OK"
        ariaLabel="Verified"
      >
        <FaUser size={24} />
      </Badge>
      <Badge
        variant="warning"
        icon={<FaStar />}
        content="Top"
        ariaLabel="Top rated"
      >
        <FaUser size={24} />
      </Badge>
    </div>
  );
}
