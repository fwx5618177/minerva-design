import { Text } from "react-native";
import { Collapse, CollapseItem, useTheme } from "minerva-design/native";

const FAQ = [
  {
    name: "cancel",
    q: "How do I cancel an order?",
    a: "Open Orders, pick the order and tap Cancel before it ships.",
  },
  {
    name: "pay",
    q: "Which payment methods work?",
    a: "Cards, Apple Pay, Google Pay and PayPal.",
  },
  {
    name: "track",
    q: "Where is my package?",
    a: "Tracking appears in Orders as soon as the parcel leaves the warehouse.",
  },
];

export default function Accordion() {
  const { colors } = useTheme();
  return (
    <Collapse accordion defaultValue="cancel">
      {FAQ.map((item) => (
        <CollapseItem key={item.name} name={item.name} title={item.q}>
          <Text style={{ color: colors["text-secondary-color"] }}>
            {item.a}
          </Text>
        </CollapseItem>
      ))}
    </Collapse>
  );
}
