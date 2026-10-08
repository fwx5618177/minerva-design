import { IconButton } from "minerva-design";
import { IoHeart } from "react-icons/io5";

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
          icon={<IoHeart />}
          color={color}
          label={color}
        />
      ))}
    </>
  );
}
