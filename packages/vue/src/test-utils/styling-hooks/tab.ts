import { h } from "vue";
import { Tab, TabList, Tabs } from "../../components/Tabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "active, inactive, disabled, colored",
    render: () =>
      h(
        Tabs,
        { defaultValue: "a", variant: "soft", orientation: "vertical" },
        () =>
          h(TabList, null, () => [
            h(Tab, { value: "a" }, () => "A"),
            h(Tab, { value: "b", color: "success" }, () => "B"),
            h(Tab, { value: "c", disabled: true }, () => "C"),
          ]),
      ),
  },
] satisfies HookScenario[];
