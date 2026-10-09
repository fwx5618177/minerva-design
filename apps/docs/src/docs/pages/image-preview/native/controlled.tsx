import { useState } from "react";
import { Text, View } from "react-native";
import { Button, ImagePreview, useTheme } from "minerva-design/native";

const IMAGES = [1040, 1043, 1044, 1047, 1050].map(
  (id) => `https://picsum.photos/id/${id}/600/400`,
);

export default function Controlled() {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(2);
  const [reason, setReason] = useState("-");
  return (
    <View style={{ gap: 12 }}>
      <Button onPress={() => setOpen(true)}>View review photos</Button>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Photo {index + 1} of {IMAGES.length} · last closed by: {reason}
      </Text>
      <ImagePreview
        images={IMAGES}
        open={open}
        onOpenChange={(next, why) => {
          setOpen(next);
          if (why) setReason(why);
        }}
        index={index}
        onChange={setIndex}
        closeOnPress={false}
      />
    </View>
  );
}
