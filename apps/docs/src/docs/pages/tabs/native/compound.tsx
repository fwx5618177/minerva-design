import { Text } from "react-native";
import { Tab, TabList, TabPanel, Tabs, useTheme } from "minerva-design/native";

export default function Compound() {
  const { colors } = useTheme();
  const text = { color: colors["text-color"], paddingVertical: 16 };
  return (
    <Tabs defaultValue="menu">
      <TabList aria-label="Restaurant">
        <Tab value="menu">Menu</Tab>
        <Tab value="reviews" badge="4.8">
          Reviews
        </Tab>
        <Tab value="info">Info</Tab>
        <Tab value="group" disabled>
          Group
        </Tab>
      </TabList>
      <TabPanel value="menu">
        <Text style={text}>Margherita pizza, truffle fries, tiramisu...</Text>
      </TabPanel>
      <TabPanel value="reviews">
        <Text style={text}>"Hot and on time, the crust was perfect."</Text>
      </TabPanel>
      <TabPanel value="info">
        <Text style={text}>Open 11:00 - 23:00 · Delivery in 25 min</Text>
      </TabPanel>
    </Tabs>
  );
}
