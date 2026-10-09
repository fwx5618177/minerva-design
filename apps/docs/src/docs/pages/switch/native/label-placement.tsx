import { View } from "react-native";
import { Switch } from "minerva-design/native";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <View style={{ gap: 12 }}>
      {placements.map((placement) => (
        <Switch
          key={placement}
          label={`Label at ${placement}`}
          labelPlacement={placement}
          defaultChecked
        />
      ))}
    </View>
  );
}
