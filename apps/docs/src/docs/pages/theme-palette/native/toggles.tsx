import { Text, View } from "react-native";
import {
  Button,
  MinervaProvider,
  PaletteToggle,
  Switch,
  Tag,
  ThemeToggle,
  useTheme,
} from "minerva-design/native";
function Preview() {
  const { colors, mode, palette } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors["border-color"],
        backgroundColor: colors["background-color"],
      }}
    >
      <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
        <ThemeToggle />
        <PaletteToggle />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button color="primary">Primary</Button>
        <Button color="neutral" variant="outline">
          Secondary
        </Button>
        <Tag color="primary">{palette ?? "default"}</Tag>
        <Tag color="info">{mode}</Tag>
        <Switch label="Switch" defaultChecked />
      </View>
      <Text style={{ color: colors["text-muted-color"] }}>
        Theme: {mode}; palette: {palette ?? "default"}
      </Text>
    </View>
  );
}
export default function Toggles() {
  return (
    <MinervaProvider theme="system" palette="editorial">
      <Preview />
    </MinervaProvider>
  );
}
