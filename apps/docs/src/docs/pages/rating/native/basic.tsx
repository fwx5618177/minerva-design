import { useState } from "react";
import { View } from "react-native";
import { Rating, RatingScale } from "minerva-design/native";
export default function Basic() {
  const [scores, setScores] = useState({ quality: 8, speed: 6 });
  return (
    <View style={{ gap: 16 }}>
      <Rating defaultValue={7} showValue />
      <RatingScale
        dimensions={[
          { key: "quality", label: "Quality", value: scores.quality },
          { key: "speed", label: "Speed", value: scores.speed },
        ]}
        onChange={(key, value) =>
          setScores((current) => ({ ...current, [key]: value }))
        }
      />
    </View>
  );
}
