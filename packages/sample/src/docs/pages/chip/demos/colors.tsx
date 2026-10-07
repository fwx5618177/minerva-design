import { Chip } from "@minerva/lib-core";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
] as const;

export default function ColorsDemo() {
  return (
    <>
      {colors.map((color) => (
        <Chip key={color} label={color} color={color} />
      ))}
    </>
  );
}
