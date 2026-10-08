import { h } from "vue";
import { Tab, TabList, TabPanel, Tabs } from "../../components/Tabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () =>
      h(Tabs, { defaultValue: "a" }, () => [
        h(TabList, null, () => [
          h(Tab, { value: "a" }, () => "A"),
          h(Tab, { value: "b" }, () => "B"),
        ]),
        h(TabPanel, { value: "a" }, () => "Panel A"),
      ]),
  },
  {
    name: "vertical pills, colored",
    render: () =>
      h(
        Tabs,
        {
          defaultValue: "a",
          orientation: "vertical",
          variant: "pills",
          color: "danger",
        },
        () => h(TabList, null, () => h(Tab, { value: "a" }, () => "A")),
      ),
  },
] satisfies HookScenario[];
