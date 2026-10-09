import { useState } from "react";
import { Text, View } from "react-native";
import { Button, TabBar, TabBarItem, useTheme } from "minerva-design/native";

export default function Badges() {
  const { colors } = useTheme();
  const [cart, setCart] = useState(3);
  const [unread, setUnread] = useState(128);
  const glyph = (char: string) => (_active: boolean, color: string) => (
    <Text style={{ fontSize: 20, color }}>{char}</Text>
  );
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button size="small" onPress={() => setCart((n) => n + 1)}>
          Add to cart
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onPress={() => setUnread(0)}
        >
          Read all
        </Button>
      </View>
      <Text style={{ color: colors["text-secondary-color"] }}>
        {cart} items in cart · {unread} unread messages
      </Text>
      <TabBar defaultValue="shop" safeAreaInsetBottom={false}>
        <TabBarItem value="shop" label="Shop" icon={glyph("⌂")} dot />
        <TabBarItem
          value="chat"
          label="Chat"
          icon={glyph("✉")}
          badge={unread || undefined}
        />
        <TabBarItem
          value="cart"
          label="Cart"
          icon={glyph("🛒")}
          badge={cart}
          badgeMax={9}
        />
        <TabBarItem value="me" label="Me" icon={glyph("☺")} badge="New" />
      </TabBar>
    </View>
  );
}
