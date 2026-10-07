import { IconButton } from "@minerva/lib-core";
import { IoHeart } from "react-icons/io5";

const variants = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
] as const;

export default function VariantsDemo() {
  return (
    <>
      <IconButton icon={<IoHeart />} ariaLabel="Default" />
      {variants.map((variant) => (
        <IconButton
          key={variant}
          icon={<IoHeart />}
          variant={variant}
          ariaLabel={variant}
        />
      ))}
    </>
  );
}
