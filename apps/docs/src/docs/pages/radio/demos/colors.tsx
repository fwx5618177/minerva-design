import { Radio, RadioGroup } from "minerva-design";

const colors = ["primary", "success", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {colors.map((color) => (
          <Radio
            key={color}
            name={`color-${color}`}
            color={color}
            label={color}
            defaultChecked
          />
        ))}
      </div>
      <RadioGroup
        name="group-color"
        aria-label="Group color"
        defaultValue="approve"
        direction="horizontal"
        color="success"
      >
        <Radio value="approve" label="Approve" />
        <Radio value="later" label="Later" color="danger" />
      </RadioGroup>
    </div>
  );
}
