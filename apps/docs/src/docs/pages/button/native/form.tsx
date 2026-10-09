import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Input, useTheme } from "minerva-design/native";

export default function FormDemo() {
  const { colors } = useTheme();
  const [title, setTitle] = useState("Draft");
  const [log, setLog] = useState("Nothing yet");
  return (
    <View style={{ gap: 8 }}>
      <Input accessibilityLabel="Title" value={title} onChange={setTitle} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Button
          color="neutral"
          variant="outline"
          onPress={() => setLog("Preview opened (form not submitted)")}
        >
          Preview
        </Button>
        <Button
          color="neutral"
          variant="ghost"
          onPress={() => {
            setTitle("Draft");
            setLog("Reset");
          }}
        >
          Reset
        </Button>
        <Button onPress={() => setLog(`Submitted "${title}"`)}>Save</Button>
      </View>
      <Text role="status" style={{ color: colors["text-color"] }}>
        {log}
      </Text>
    </View>
  );
}
