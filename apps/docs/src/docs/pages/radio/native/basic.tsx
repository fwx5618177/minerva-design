import { Radio, RadioGroup } from "minerva-design/native";
export default function Basic() {
  return (
    <RadioGroup label="Favourite fruit" defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="banana" label="Banana" />
      <Radio value="cherry" label="Cherry" />
    </RadioGroup>
  );
}
