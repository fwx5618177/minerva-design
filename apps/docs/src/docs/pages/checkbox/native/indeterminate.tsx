import { View } from "react-native";
import { useState } from "react";
import { Checkbox } from "minerva-design/native";

const fruits = ["Apple", "Banana", "Cherry"];

export default function IndeterminateDemo() {
  const [selected, setSelected] = useState<string[]>(["Apple"]);
  const allChecked = selected.length === fruits.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggle = (fruit: string, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, fruit] : prev.filter((f) => f !== fruit),
    );

  return (
    <View style={{ gap: 8 }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(checked) => setSelected(checked ? fruits : [])}
      />
      <View
        style={{
          gap: 8,
          paddingLeft: 24,
        }}
      >
        {fruits.map((fruit) => (
          <Checkbox
            key={fruit}
            label={fruit}
            checked={selected.includes(fruit)}
            onChange={(checked) => toggle(fruit, checked)}
          />
        ))}
      </View>
    </View>
  );
}
