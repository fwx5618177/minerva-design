import { Button, Tooltip } from "@minerva/lib-core";

const variants = [
  "dark",
  "light",
  "info",
  "success",
  "warning",
  "error",
  "auto",
  "fixedDark",
  "fixedLight",
] as const;

export default function VariantsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {variants.map((variant) => (
        <Tooltip
          key={variant}
          content={`A ${variant} tooltip`}
          variant={variant}
        >
          <Button variant="secondary" size="small">
            {variant}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
