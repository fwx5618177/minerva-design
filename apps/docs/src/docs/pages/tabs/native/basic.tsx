import { Text } from "react-native";
import { Tabs, Tab, TabList, TabPanel, useTheme } from "minerva-design/native";
export default function Basic() {
  const { colors } = useTheme();
  const style = { color: colors["text-color"], paddingVertical: 16 };
  return (
    <Tabs defaultValue="overview">
      <TabList aria-label="Book sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="reviews">Reviews</Tab>
        <Tab value="similar" disabled>
          Similar books
        </Tab>
      </TabList>
      <TabPanel value="overview">
        <Text style={style}>
          A desert planet, a noble family and a precious spice.
        </Text>
      </TabPanel>
      <TabPanel value="reviews">
        <Text style={style}>“A masterpiece of world building.”</Text>
      </TabPanel>
      <TabPanel value="similar">
        <Text style={style}>Coming soon.</Text>
      </TabPanel>
    </Tabs>
  );
}
