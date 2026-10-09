import { Text, View } from "react-native";
import {
  Button,
  Cell,
  MinervaProvider,
  PresetToggle,
  useTheme,
} from "minerva-design/native";

function Screen() {
  const { colors, design, tokens } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors["background-color"],
      }}
    >
      <PresetToggle />
      <PresetToggle
        size="small"
        presets={["compact", "touch"]}
        labels={{ compact: "Dense", touch: "Comfortable" }}
      />
      <Cell title="Delivery address" value="Home" />
      <Button fullWidth>Place order</Button>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Preset {design.preset}: density {design.density}, radius {design.radius}
        , controls {tokens.sizes["control-height-md"]}px high
      </Text>
    </View>
  );
}

export default function Preset() {
  return (
    <MinervaProvider preset="touch">
      <Screen />
    </MinervaProvider>
  );
}
