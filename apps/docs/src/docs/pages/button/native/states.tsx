import { useState } from "react";
import { View } from "react-native";
import { Button } from "minerva-design/native";

export default function States() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button loading={saving} loadingText="Saving..." onPress={save}>
        Save
      </Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" active>
        Active
      </Button>
    </View>
  );
}
