import { useState } from "react";
import { Text, View } from "react-native";
import { Cell, CellGroup, Switch, useTheme } from "minerva-design/native";

export default function InsetGroups() {
  const { colors } = useTheme();
  const [push, setPush] = useState(true);
  const icon = (glyph: string) => <Text style={{ fontSize: 18 }}>{glyph}</Text>;
  return (
    <View
      style={{
        backgroundColor: colors["surface-muted-color"],
        marginHorizontal: -16,
        paddingBottom: 16,
      }}
    >
      <CellGroup
        inset
        title="Notifications"
        footer="Order updates are always sent."
      >
        <Cell icon={icon("🔔")} title="Push notifications">
          <Switch
            checked={push}
            onChange={setPush}
            accessibilityLabel="Push notifications"
          />
        </Cell>
        <Cell icon={icon("✉️")} title="Email" value="Weekly" isLink />
      </CellGroup>
      <CellGroup inset title="Privacy">
        <Cell icon={icon("📍")} title="Location" value="While using" isLink />
        <Cell icon={icon("🔒")} title="Face ID" isLink />
        <Cell
          title="Delete account"
          titleStyle={{ color: colors["danger-color"] }}
          clickable
        />
      </CellGroup>
    </View>
  );
}
