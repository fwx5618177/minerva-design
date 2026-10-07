import { Badge } from "@minerva/lib-core";
import { FaBell } from "react-icons/fa";

export default function DotDemo() {
  return (
    <>
      <Badge dot color="primary" ariaLabel="New activity">
        <FaBell size={24} />
      </Badge>
      <Badge dot color="success" ariaLabel="Online">
        <FaBell size={24} />
      </Badge>
      <Badge dot color="danger" ariaLabel="Danger">
        <FaBell size={24} />
      </Badge>
    </>
  );
}
