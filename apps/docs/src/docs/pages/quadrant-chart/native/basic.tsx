import { useState } from "react";
import { Text, View } from "react-native";
import {
  QuadrantChart,
  useTheme,
  type QuadrantPoint,
} from "minerva-design/native";

// x: effort, y: impact (0-10)
const features: QuadrantPoint[] = [
  { label: "Dark mode", x: 2, y: 8 },
  { label: "Offline sync", x: 8, y: 9 },
  { label: "New icons", x: 2.5, y: 3 },
  { label: "Rewrite", x: 8.5, y: 2.5 },
  { label: "Search", x: 6, y: 7 },
];

export default function Basic() {
  const { colors } = useTheme();
  const [status, setStatus] = useState("Tap a feature");
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={300}
        points={features}
        xLabel="Effort"
        yLabel="Impact"
        quadrants={{
          topLeft: { label: "Quick wins" },
          topRight: { label: "Big bets" },
          bottomLeft: { label: "Fill-ins" },
          bottomRight: { label: "Money pits" },
        }}
        ariaLabel="Effort and impact of features"
        onPointClick={(point) =>
          setStatus(`${point.label}: effort ${point.x}, impact ${point.y}`)
        }
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status}
      </Text>
    </View>
  );
}
