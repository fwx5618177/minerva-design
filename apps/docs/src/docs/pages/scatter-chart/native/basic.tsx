import { useState } from "react";
import { Text, View } from "react-native";
import { ScatterChart, useTheme } from "minerva-design/native";

// Deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i) => {
    const a = Math.sin(seed * 97 + i * 12.9898) * 43758.5453;
    const b = Math.sin(seed * 31 + i * 78.233) * 12543.123;
    return [
      Math.round((cx + (a - Math.floor(a) - 0.5) * 20) * 10) / 10,
      Math.round((cy + (b - Math.floor(b) - 0.5) * 20) * 10) / 10,
    ] as const;
  });

export default function Basic() {
  const { colors } = useTheme();
  const [status, setStatus] = useState("Tap a dot");
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <ScatterChart
        height={240}
        ariaLabel="Session length against pages viewed"
        xAxis={{ title: "Minutes" }}
        yAxis={{ title: "Pages" }}
        series={[
          { name: "Free", data: cluster(20, 25, 1) },
          { name: "Pro", data: cluster(45, 50, 2) },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              `${item.seriesName}: ${event.xLabel} min, ${item.y} pages`,
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status}
      </Text>
    </View>
  );
}
