import { ProgressIndicator } from "@minerva/lib-core";

const variants = ["spinner", "circle", "wave", "bar", "dottedBar"] as const;

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      {variants.map((variant) => (
        <ProgressIndicator
          key={variant}
          variant={variant}
          ariaLabel={`Loading (${variant})`}
        />
      ))}
    </div>
  );
}
