import { Tab, TabList, Tabs } from "../../components/Tabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "active, inactive, disabled, colored",
    element: (
      <Tabs defaultValue="a" variant="soft" orientation="vertical">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b" color="success">
            B
          </Tab>
          <Tab value="c" disabled>
            C
          </Tab>
        </TabList>
      </Tabs>
    ),
  },
] satisfies HookScenario[];
