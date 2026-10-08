import { useState } from "react";
import { Text } from "react-native";
import { Button, Dialog } from "minerva-design/native";

export default function Basic() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Show dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Notifications"
        description="Get order updates on this device."
      >
        <Text>You can change this later in Settings.</Text>
      </Dialog>
    </>
  );
}
