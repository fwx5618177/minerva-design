import { useState } from "react";
import { ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Button,
  Dialog,
  MinervaProvider,
  useTheme,
} from "minerva-design/native";

function Home() {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors["canvas-color"] }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
    >
      <Text style={{ color: colors["text-color"], fontSize: 22 }}>
        Minerva Native
      </Text>
      <Button onPress={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Hello"
        description="minerva-design/native on Expo SDK 57"
        onConfirm={() => {}}
      />
    </ScrollView>
  );
}

function Root() {
  const insets = useSafeAreaInsets();
  return (
    <MinervaProvider theme="system" insets={insets}>
      <StatusBar style="auto" />
      <Home />
    </MinervaProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
