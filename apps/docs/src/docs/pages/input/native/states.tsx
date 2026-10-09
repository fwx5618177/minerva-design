import { View } from "react-native";
import { FormField, Input } from "minerva-design/native";

export default function StatesDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Invalid" invalid defaultValue="Invalid" />
      <Input accessibilityLabel="Disabled" disabled defaultValue="Disabled" />
      <Input accessibilityLabel="Read-only" readOnly defaultValue="Read-only" />
      <FormField label="Inside a FormField" errorMessage="Inherits the error">
        <Input />
      </FormField>
    </View>
  );
}
