import { Radio, RadioGroup } from "@minerva/lib-core";

export default function HorizontalDemo() {
  return (
    <RadioGroup name="shipping" defaultValue="standard" direction="horizontal">
      <Radio value="standard" label="Standard" />
      <Radio value="express" label="Express" />
      <Radio value="pickup" label="Store pickup" />
    </RadioGroup>
  );
}
