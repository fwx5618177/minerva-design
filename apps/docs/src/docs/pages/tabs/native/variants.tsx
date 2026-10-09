import { View } from "react-native";
import { Tabs, Tab, TabList } from "minerva-design/native";
const variants = ["line", "enclosed", "soft", "pills"] as const;
export default function Variants() {
  return (
    <View style={{ gap: 24 }}>
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant} defaultValue="hot">
          <TabList aria-label={`${variant} tabs`}>
            <Tab value="hot">Hot</Tab>
            <Tab value="new">New</Tab>
            <Tab value="completed">Completed</Tab>
          </TabList>
        </Tabs>
      ))}
    </View>
  );
}
