import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Dialog } from "minerva-design/native";

export default function CustomFooter() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Rate the app
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size="small"
        title="Enjoying Minerva?"
        footer={
          <View style={{ gap: 8 }}>
            <Button fullWidth onPress={() => setOpen(false)}>
              Rate 5 stars
            </Button>
            <Button
              fullWidth
              variant="ghost"
              color="neutral"
              onPress={() => setOpen(false)}
            >
              Not now
            </Button>
          </View>
        }
      >
        <Text style={{ textAlign: "center" }}>A quick rating helps a lot.</Text>
      </Dialog>
    </>
  );
}
