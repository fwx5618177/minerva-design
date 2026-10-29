import { useState } from "react";
import { Text, View } from "react-native";
import { LineChart, useTheme } from "minerva-design/native";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const steps = [6200, 8400, 7100, 9800, 10400, 12800, 5600];

export default function Basic() {
  const { colors } = useTheme();
  const [status, setStatus] = useState("Tap or scrub the line");
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <LineChart
        height={220}
        ariaLabel="Steps per day"
        series={[
          {
            name: "Steps",
            data: days.map((day, i) => [day, steps[i]] as const),
          },
        ]}
        onHover={(event) => {
          const item = event?.items[0];
          if (event && item) setStatus(`${event.xLabel}: ${item.y} steps`);
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status}
      </Text>
    </View>
  );
}
