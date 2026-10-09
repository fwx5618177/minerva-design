import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Dialog, useTheme } from "minerva-design/native";
export default function Basic() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button onPress={() => setOpen(true)}>Delete record</Button>
      {deleted && (
        <Text role="status" style={{ color: colors["text-color"] }}>
          Record deleted
        </Text>
      )}
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this record?"
        description="The record and its history are removed permanently."
        size="small"
        footer={
          <View
            style={{ gap: 8, flexDirection: "row", justifyContent: "flex-end" }}
          >
            <Button
              color="neutral"
              variant="outline"
              onPress={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => {
                setDeleted(true);
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </View>
        }
      >
        <Text style={{ color: colors["text-color"] }}>
          Other team members lose access immediately.
        </Text>
      </Dialog>
    </View>
  );
}
