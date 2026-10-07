import { Radio, RadioGroup } from "@minerva/lib-core";

export default function BasicDemo() {
  return (
    <RadioGroup name="fruit" defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="banana" label="Banana" />
      <Radio value="cherry" label="Cherry" />
    </RadioGroup>
  );
}
