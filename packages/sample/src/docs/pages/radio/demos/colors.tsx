import { Radio, RadioGroup } from "@minerva/lib-core";

const types = ["default", "primary", "success", "warning", "error"] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {types.map((type) => (
          <Radio
            key={type}
            name={`type-${type}`}
            type={type}
            label={type}
            defaultChecked
          />
        ))}
      </div>
      <RadioGroup
        name="custom-color"
        ariaLabel="Custom color"
        defaultValue="violet"
        direction="horizontal"
        color="#7c3aed"
      >
        <Radio value="violet" label="Custom color" />
        <Radio value="other" label="Other" />
      </RadioGroup>
    </div>
  );
}
