import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Dialog, useTheme } from "minerva-design/native";

export default function Confirm() {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("No answer yet");
  return (
    <View style={{ gap: 12 }}>
      <Button color="danger" variant="outline" onPress={() => setOpen(true)}>
        Delete account
      </Button>
      <Text style={{ color: colors["text-secondary-color"] }}>{result}</Text>
      <Dialog
        role="alertdialog"
        open={open}
        onOpenChange={(next, reason) => {
          setOpen(next);
          if (!next) setResult(`Closed: ${reason}`);
        }}
        hideCloseButton
        title="Delete account?"
        description="Your orders and addresses will be removed. This cannot be undone."
        confirmLabel="Delete"
        confirmColor="danger"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </View>
  );
}
