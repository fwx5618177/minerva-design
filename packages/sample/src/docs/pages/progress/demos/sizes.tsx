import { ProgressIndicator } from "@minerva/lib-core";

const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {sizes.map((size) => (
          <ProgressIndicator key={size} size={size} aria-label="Loading" />
        ))}
      </div>
      {sizes.map((size) => (
        <ProgressIndicator
          key={size}
          variant="bar"
          size={size}
          full
          aria-label="Loading"
        />
      ))}
    </div>
  );
}
