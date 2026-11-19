import { HeartIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

const colors = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function ColorsDemo() {
  return (
    <>
      {colors.map((color) => (
        <IconButton
          key={color}
          icon={<HeartIcon size="1em" />}
          color={color}
          label={color}
        />
      ))}
    </>
  );
}
