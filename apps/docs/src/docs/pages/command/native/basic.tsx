import { useState } from "react";
import { Text, View } from "react-native";
import { CommandDialog, Button } from "minerva-design/native";
export default function Basic() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");
  return (
    <View>
      <Button onPress={() => setOpen(true)}>Commands</Button>
      <Text>{choice}</Text>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={[
          { id: "settings", title: "Settings", keywords: "preferences" },
          { id: "profile", title: "Profile" },
        ]}
        onSelect={(item) => setChoice(item.title)}
      />
    </View>
  );
}
