import { useState } from "react";
import { Image, View } from "react-native";
import { Button, ImagePreview } from "minerva-design/native";

const IMAGES = [1015, 1016, 1018, 1019].map(
  (id) => `https://picsum.photos/id/${id}/600/400`,
);

export default function Basic() {
  const [start, setStart] = useState<number | null>(null);
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {IMAGES.map((uri, i) => (
        <Button
          variant="ghost"
          style={{ paddingHorizontal: 0, paddingVertical: 0 }}
          key={uri}
          accessibilityRole="imagebutton"
          accessibilityLabel={`Hotel photo ${i + 1}`}
          onPress={() => setStart(i)}
        >
          <Image
            source={{ uri }}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
        </Button>
      ))}
      <ImagePreview
        images={IMAGES}
        open={start !== null}
        index={start ?? 0}
        onChange={setStart}
        onOpenChange={(open) => !open && setStart(null)}
      />
    </View>
  );
}
