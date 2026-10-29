import { Text, View } from "react-native";
import { LineChart, useTheme } from "minerva-design/native";

const hours = Array.from({ length: 24 }, (_, i) => i);
const wave = (phase: number, base: number) =>
  hours.map(
    (hour) =>
      [
        hour,
        Math.round(base + 20 * Math.sin((hour + phase) / 3.5) + hour),
      ] as const,
  );

export default function Area() {
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <LineChart
        area
        height={220}
        crosshair
        ariaLabel="CPU and memory usage over the day"
        xAxis={{ format: (hour) => `${hour}h` }}
        yAxis={{ format: (value) => `${value}%` }}
        series={[
          { name: "CPU", data: wave(0, 35) },
          { name: "Memory", data: wave(4, 25) },
        ]}
      />
      <Text style={{ color: colors["text-secondary-color"] }}>
        Pinch to zoom, double tap to reset; tap the legend to hide a series.
      </Text>
    </View>
  );
}
