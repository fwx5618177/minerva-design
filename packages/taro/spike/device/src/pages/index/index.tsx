import { useState } from "react";
import { View, Text } from "@tarojs/components";
import {
  Button,
  ConfigProvider,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  LoadingState,
  HtmlPreview,
} from "@minerva/taro";
export default function Index() {
  const [count, setCount] = useState(0);
  return (
    <ConfigProvider>
      <View>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Text>{count}</Text>
        <Tabs defaultValue="one">
          <TabList>
            <Tab value="one">One</Tab>
            <Tab value="two">Two</Tab>
          </TabList>
          <TabPanel value="one">First</TabPanel>
          <TabPanel value="two">Second</TabPanel>
        </Tabs>
        <LoadingState loading={false}>Ready</LoadingState>
        <HtmlPreview html="<p>Native safe source</p>" />
      </View>
    </ConfigProvider>
  );
}
