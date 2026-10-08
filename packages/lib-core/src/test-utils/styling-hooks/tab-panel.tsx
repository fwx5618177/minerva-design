import { Tab, TabList, TabPanel, Tabs } from "../../components/Tabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "active and inactive (forceMount)",
    element: (
      <Tabs defaultValue="a">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b" forceMount>
          Panel B
        </TabPanel>
      </Tabs>
    ),
  },
] satisfies HookScenario[];
