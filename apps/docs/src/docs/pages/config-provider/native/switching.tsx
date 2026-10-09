import { useState } from "react";
import { Text, View } from "react-native";
import { Button, MinervaProvider, useTheme } from "minerva-design/native";

const THEMES = ["light", "dark"] as const;
const PALETTES = [null, "tech", "editorial", "cool"] as const;

function Content() {
  const { colors, mode, palette } = useTheme();
  return (
    <View
      style={{
        gap: 8,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors["background-color"],
      }}
    >
      <Text style={{ color: colors["text-color"], fontSize: 17 }}>
        Weekend in Lisbon
      </Text>
      <Text style={{ color: colors["text-secondary-color"] }}>
        2 nights · {mode} mode · palette {palette ?? "default"}
      </Text>
      <Button fullWidth>Reserve from $240</Button>
    </View>
  );
}

export default function Switching() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("light");
  const [palette, setPalette] = useState<(typeof PALETTES)[number]>(null);
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {THEMES.map((value) => (
          <Button
            key={value}
            size="small"
            variant={theme === value ? "solid" : "outline"}
            onPress={() => setTheme(value)}
          >
            {value}
          </Button>
        ))}
        {PALETTES.map((value) => (
          <Button
            key={value ?? "default"}
            size="small"
            color="neutral"
            variant={palette === value ? "solid" : "outline"}
            onPress={() => setPalette(value)}
          >
            {value ?? "default"}
          </Button>
        ))}
      </View>
      <MinervaProvider theme={theme} palette={palette}>
        <Content />
      </MinervaProvider>
    </View>
  );
}
