import { ProgressIndicator } from "@minerva/lib-core";

const types = ["spinner", "circle", "wave", "bar", "dottedBar"] as const;

export default function TypesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      {types.map((type) => (
        <ProgressIndicator
          key={type}
          type={type}
          ariaLabel={`Loading (${type})`}
        />
      ))}
    </div>
  );
}
