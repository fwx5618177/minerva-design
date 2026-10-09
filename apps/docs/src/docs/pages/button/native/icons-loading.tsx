import { View, Text } from "react-native";
import { useState } from "react";
import { Button } from "minerva-design/native";

export default function IconsLoadingDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <View style={{ gap: 12, maxWidth: 320 }}>
      <Button startIcon={<Text accessible={false}>+</Text>}>Add item</Button>
      <Button variant="outline" endIcon={<Text accessible={false}>→</Text>}>
        Continue
      </Button>
      <Button
        color="success"
        fullWidth
        loading={saving}
        loadingText="Saving..."
        onPress={save}
      >
        Save
      </Button>
    </View>
  );
}
