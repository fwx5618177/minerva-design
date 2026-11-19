import { CheckIcon, StarIcon, UserIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function WithIconDemo() {
  return (
    <div style={{ display: "flex", gap: 48 }}>
      <Badge
        color="success"
        icon={<CheckIcon size="1em" />}
        content="OK"
        aria-label="Verified"
      >
        <UserIcon size={24} />
      </Badge>
      <Badge
        color="warning"
        icon={<StarIcon size="1em" />}
        content="Top"
        aria-label="Top rated"
      >
        <UserIcon size={24} />
      </Badge>
    </div>
  );
}
