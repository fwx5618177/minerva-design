import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Button, Card, useTheme } from "minerva-design/native";

export default function Product() {
  const { colors } = useTheme();
  const [inCart, setInCart] = useState(0);
  return (
    <Card
      variant="elevated"
      cover={
        <Image
          source={{ uri: "https://picsum.photos/id/1080/600/400" }}
          style={{ width: "100%", height: 180 }}
          accessibilityLabel="Fresh strawberries"
        />
      }
      title="Organic strawberries"
      description="500 g · Farm Valley"
      extra={
        <Text style={{ color: colors["primary-color"], fontWeight: "600" }}>
          $5.90
        </Text>
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colors["text-secondary-color"] }}>
          {inCart ? `${inCart} in cart` : "★ 4.9 (1.2k reviews)"}
        </Text>
        <Button size="small" onPress={() => setInCart((n) => n + 1)}>
          Add to cart
        </Button>
      </View>
    </Card>
  );
}
