import { Badge } from "@minerva/lib-core";
import { FaBell } from "react-icons/fa";

export default function DotDemo() {
  return (
    <>
      <Badge dot variant="primary" ariaLabel="New activity">
        <FaBell size={24} />
      </Badge>
      <Badge dot variant="success" ariaLabel="Online">
        <FaBell size={24} />
      </Badge>
      <Badge dot variant="error" ariaLabel="Error">
        <FaBell size={24} />
      </Badge>
    </>
  );
}
