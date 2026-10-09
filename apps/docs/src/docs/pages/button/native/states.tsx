import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button } from "minerva-design/native";
export default function States() {
  const [saving, setSaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function save() {
    setSaving(true);
    timer.current = setTimeout(() => setSaving(false), 1500);
  }
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button loading={saving} onPress={save}>
        {saving ? "Saving…" : "Save"}
      </Button>
      <Button disabled>Disabled</Button>
      <Button active>Active</Button>
    </View>
  );
}
