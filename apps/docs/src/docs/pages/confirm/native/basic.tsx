import { useState } from "react";
import { Text, View } from "react-native";
import { ConfirmProvider, useConfirm, Button } from "minerva-design/native";
export default function Basic() {
  return (
    <ConfirmProvider>
      <ConfirmExample />
    </ConfirmProvider>
  );
}
function ConfirmExample() {
  const confirm = useConfirm();
  const [result, setResult] = useState("");
  return (
    <View>
      <Button
        onPress={async () =>
          setResult(
            (await confirm({
              title: "Archive record?",
              description: "You can restore it later.",
            }))
              ? "Archived"
              : "Cancelled",
          )
        }
      >
        Archive
      </Button>
      <Text>{result}</Text>
    </View>
  );
}
