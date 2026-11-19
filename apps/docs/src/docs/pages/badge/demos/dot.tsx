import { BellIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function DotDemo() {
  return (
    <>
      <Badge dot color="primary" aria-label="New activity">
        <BellIcon size={24} />
      </Badge>
      <Badge dot color="success" aria-label="Online">
        <BellIcon size={24} />
      </Badge>
      <Badge dot color="danger" aria-label="Danger">
        <BellIcon size={24} />
      </Badge>
    </>
  );
}
