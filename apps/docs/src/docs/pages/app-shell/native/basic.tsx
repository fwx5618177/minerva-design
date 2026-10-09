import { useState } from "react";
import { Text, View } from "react-native";
import { AppShell, Button } from "minerva-design/native";
export default function Basic() {
  const [route, setRoute] = useState("Overview");
  return (
    <View style={{ height: 400 }}>
      <AppShell
        brand="Minerva"
        navigationKey={route}
        navigation={({ closeNavigation }) => (
          <View>
            <Button
              onPress={() => {
                setRoute("Overview");
                closeNavigation();
              }}
            >
              Overview
            </Button>
            <Button
              onPress={() => {
                setRoute("Settings");
                closeNavigation();
              }}
            >
              Settings
            </Button>
          </View>
        )}
      >
        <Text>{route}</Text>
      </AppShell>
    </View>
  );
}
