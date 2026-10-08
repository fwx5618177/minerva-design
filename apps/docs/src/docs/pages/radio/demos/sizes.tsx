import { Radio, RadioGroup } from "minerva-design";

const sizes = ["small", "medium", "large"] as const;

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {sizes.map((size) => (
        <RadioGroup
          key={size}
          name={`size-${size}`}
          aria-label={`${size} options`}
          defaultValue="a"
          direction="horizontal"
          size={size}
        >
          <Radio value="a" label={`${size} A`} />
          <Radio value="b" label={`${size} B`} />
        </RadioGroup>
      ))}
    </div>
  );
}
