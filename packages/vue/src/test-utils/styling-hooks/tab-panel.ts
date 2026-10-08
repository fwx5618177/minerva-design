import { h } from "vue";
import { Tab, TabList, TabPanel, Tabs } from "../../components/Tabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "active and inactive (forceMount)",
    render: () =>
      h(Tabs, { defaultValue: "a" }, () => [
        h(TabList, null, () => [
          h(Tab, { value: "a" }, () => "A"),
          h(Tab, { value: "b" }, () => "B"),
        ]),
        h(TabPanel, { value: "a" }, () => "Panel A"),
        h(TabPanel, { value: "b", forceMount: true }, () => "Panel B"),
      ]),
  },
] satisfies HookScenario[];
