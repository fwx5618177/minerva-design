import { View } from "react-native";
import { Radio, RadioGroup } from "minerva-design/native";

export default function DisabledDemo() {
  return (
    <View style={{ gap: 12 }}>
      <RadioGroup
        label="Partly disabled"
        defaultValue="a"
        direction="horizontal"
      >
        <Radio value="a" label="Available" />
        <Radio value="b" label="Sold out" disabled />
      </RadioGroup>
      <RadioGroup
        label="Disabled group"
        defaultValue="a"
        direction="horizontal"
        disabled
      >
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </View>
  );
}
