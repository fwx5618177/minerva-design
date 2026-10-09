import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button, Cell, usePullRefresh, useTheme } from "minerva-design/native";

const wait = (ms: number) => new Promise((done) => setTimeout(done, ms));

export default function UsePullRefresh() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState(["Anna: See you at 7?"]);
  const { refreshControl, refresh, status } = usePullRefresh(
    async () => {
      await wait(1200);
      setMessages((list) => [`New message #${list.length + 1}`, ...list]);
    },
    { successDuration: 1000 },
  );
  const label = {
    idle: "Pull the list or press the button",
    loading: "Checking for messages...",
    success: "Inbox up to date",
  }[status];
  return (
    <View style={{ gap: 12 }}>
      <Button size="small" onPress={refresh} loading={status === "loading"}>
        Check messages
      </Button>
      <Text style={{ color: colors["text-secondary-color"] }}>{label}</Text>
      <FlatList
        style={{ height: 260 }}
        data={messages}
        keyExtractor={(item) => item}
        refreshControl={refreshControl}
        renderItem={({ item }) => <Cell title={item} isLink />}
      />
    </View>
  );
}
