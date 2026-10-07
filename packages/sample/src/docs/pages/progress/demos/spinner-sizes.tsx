import { Spinner } from "@minerva/lib-core";

const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

export default function SpinnerSizesDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {sizes.map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  );
}
