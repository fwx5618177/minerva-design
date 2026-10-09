import { useState } from "react";
import { Text, View } from "react-native";
import { PageTabs, PageTab } from "minerva-design/native";
export default function Basic() {
  const [active, setActive] = useState("overview");
  return (
    <View>
      <PageTabs activeValue={active}>
        <PageTab
          value="overview"
          label="Overview"
          onSelect={() => setActive("overview")}
        />
        <PageTab
          value="settings"
          label="Settings"
          onSelect={() => setActive("settings")}
        />
      </PageTabs>
      <Text>{active}</Text>
    </View>
  );
}
