import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Cell, PullRefresh, useTheme } from "minerva-design/native";

const DEALS = ["Pizza -30%", "Free delivery", "Sushi 2 for 1", "Tacos -20%"];

export default function Basic() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [round, setRound] = useState(1);
  const reload = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRound((n) => n + 1);
      setRefreshing(false);
    }, 1500);
  };
  return (
    <View style={{ gap: 12 }}>
      <Button size="small" onPress={reload} disabled={refreshing}>
        Refresh deals
      </Button>
      <PullRefresh
        refreshing={refreshing}
        onRefresh={reload}
        loadingText="Finding new deals..."
        successText="Deals updated"
        successDuration={1200}
        style={{ height: 300 }}
      >
        <Text style={{ color: colors["text-muted-color"], padding: 12 }}>
          Pull down to refresh · update #{round}
        </Text>
        {DEALS.map((deal) => (
          <Cell key={deal} title={deal} value={`Round ${round}`} />
        ))}
      </PullRefresh>
    </View>
  );
}
