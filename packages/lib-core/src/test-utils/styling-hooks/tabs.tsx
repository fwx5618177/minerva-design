import { Tab, TabList, TabPanel, Tabs } from "../../components/Tabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: (
      <Tabs defaultValue="a">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>
    ),
  },
  {
    name: "vertical pills, colored",
    element: (
      <Tabs
        defaultValue="a"
        orientation="vertical"
        variant="pills"
        color="danger"
      >
        <TabList>
          <Tab value="a">A</Tab>
        </TabList>
      </Tabs>
    ),
  },
] satisfies HookScenario[];
