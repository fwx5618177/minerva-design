import { Text } from "react-native";
import { Tabs, useTheme } from "minerva-design/native";

const CATEGORIES = [
  "For you",
  "Burgers",
  "Sushi",
  "Pizza",
  "Salads",
  "Desserts",
  "Drinks",
  "Vegan",
];

export default function Scrollable() {
  const { colors } = useTheme();
  return (
    <Tabs
      defaultValue="Sushi"
      listLabel="Food categories"
      items={CATEGORIES.map((name) => ({
        value: name,
        label: name,
        content: (
          <Text style={{ color: colors["text-secondary-color"], padding: 16 }}>
            Top {name.toLowerCase()} restaurants near you
          </Text>
        ),
      }))}
    />
  );
}
