import { BellIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Badge size="small" content="S">
        <BellIcon size={24} />
      </Badge>
      <Badge size="medium" content="M">
        <BellIcon size={24} />
      </Badge>
      <Badge size="large" content="L">
        <BellIcon size={24} />
      </Badge>
    </>
  );
}
