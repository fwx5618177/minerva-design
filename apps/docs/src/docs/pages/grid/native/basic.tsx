import { useState } from "react";
import { Text, View } from "react-native";
import { Grid, GridItem, useTheme } from "minerva-design/native";

const ENTRIES = [
  ["🍔", "Food"],
  ["🛒", "Grocery"],
  ["☕", "Coffee"],
  ["💊", "Pharmacy"],
  ["🌸", "Flowers"],
  ["🐶", "Pets"],
  ["🎁", "Gifts"],
  ["⋯", "More"],
];

export default function Basic() {
  const { colors } = useTheme();
  const [picked, setPicked] = useState("none");
  return (
    <View style={{ gap: 16 }}>
      <Grid>
        {ENTRIES.map(([icon, text]) => (
          <GridItem
            key={text}
            icon={<Text style={{ fontSize: 24 }}>{icon}</Text>}
            text={text}
            onPress={() => setPicked(text)}
          />
        ))}
      </Grid>
      <Grid columnNum={2} direction="horizontal" border={false}>
        <GridItem
          icon={<Text>🎟️</Text>}
          text="Coupons"
          onPress={() => setPicked("Coupons")}
        />
        <GridItem
          icon={<Text>⭐</Text>}
          text="Points"
          disabled
          onPress={() => setPicked("Points")}
        />
      </Grid>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Category: {picked}
      </Text>
    </View>
  );
}
