import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Card, useTheme } from "minerva-design/native";
export default function Basic() {
  const [opened, setOpened] = useState(false);
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12 }}>
      <Card
        title="Project Apollo"
        description="Updated 2 hours ago"
        footer={
          <Button size="small" onPress={() => setOpened(true)}>
            Open
          </Button>
        }
      >
        <Text style={{ color: colors["text-color"] }}>
          A design system for building accessible, themeable interfaces.
        </Text>
      </Card>
      {opened && (
        <Text role="status" style={{ color: colors["text-color"] }}>
          Opened Project Apollo
        </Text>
      )}
    </View>
  );
}
