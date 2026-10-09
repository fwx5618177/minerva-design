import { useState } from "react";
import { Text, View } from "react-native";
import { TabBar, TabBarItem, useTheme } from "minerva-design/native";

const TABS = [
  { value: "home", label: "Home", icon: "🏠" },
  { value: "search", label: "Search", icon: "🔍" },
  { value: "orders", label: "Orders", icon: "🧾" },
  { value: "me", label: "Me", icon: "👤" },
];

export default function Basic() {
  const { colors } = useTheme();
  const [tab, setTab] = useState("home");
  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Current screen: {tab}
      </Text>
      <TabBar value={tab} onChange={setTab} safeAreaInsetBottom={false}>
        {TABS.map((item) => (
          <TabBarItem
            key={item.value}
            value={item.value}
            label={item.label}
            icon={(active) => (
              <Text style={{ fontSize: 20, opacity: active ? 1 : 0.5 }}>
                {item.icon}
              </Text>
            )}
          />
        ))}
      </TabBar>
      <TabBar
        defaultValue="discover"
        activeColor={colors["danger-color"]}
        safeAreaInsetBottom={false}
      >
        <TabBarItem value="discover" label="Discover" />
        <TabBarItem value="deals" label="Deals" />
        <TabBarItem value="saved" label="Saved" disabled />
      </TabBar>
    </View>
  );
}
