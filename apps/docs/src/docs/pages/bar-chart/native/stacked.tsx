import { useState } from "react";
import { View } from "react-native";
import { BarChart, Switch } from "minerva-design/native";

const months = ["Jan", "Feb", "Mar", "Apr", "May"];
const channels = [
  { name: "Web", values: [40, 52, 48, 61, 70] },
  { name: "iOS", values: [28, 30, 35, 41, 44] },
  { name: "Android", values: [22, 27, 31, 30, 38] },
];

export default function Stacked() {
  const [stacked, setStacked] = useState(true);
  return (
    <View style={{ width: "100%", gap: 12 }}>
      <Switch
        checked={stacked}
        onChange={setStacked}
        label={stacked ? "Stacked" : "Grouped"}
      />
      <BarChart
        stacked={stacked}
        height={240}
        ariaLabel="Orders per channel and month"
        series={channels.map((channel) => ({
          name: channel.name,
          data: months.map((month, i) => [month, channel.values[i]] as const),
        }))}
      />
    </View>
  );
}
