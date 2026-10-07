import { Radio, RadioGroup } from "@minerva/lib-core";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <RadioGroup
        name="partly-disabled"
        defaultValue="a"
        direction="horizontal"
      >
        <Radio value="a" label="Available" />
        <Radio value="b" label="Sold out" disabled />
      </RadioGroup>
      <RadioGroup
        name="all-disabled"
        defaultValue="a"
        direction="horizontal"
        disabled
      >
        <Radio value="a" label="Disabled group" />
        <Radio value="b" label="Disabled group" />
      </RadioGroup>
    </div>
  );
}
