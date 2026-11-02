import { h } from "vue";
import { SegmentedControl } from "../../components/SegmentedControl";
import type { HookScenario } from "./types";

export default [
  {
    name: "selected, disabled segment, icon and label",
    render: () =>
      h(SegmentedControl, {
        "aria-label": "View",
        defaultValue: "list",
        options: [
          { value: "list", label: "List", icon: () => h("svg") },
          { value: "grid", label: "Grid" },
          { value: "map", label: "Map", disabled: true },
        ],
      }),
  },
  {
    name: "disabled, primary, sizes",
    render: () => [
      h(SegmentedControl, {
        "aria-label": "Small",
        options: ["a", "b"],
        defaultValue: "a",
        size: "small",
        color: "primary",
        disabled: true,
      }),
      h(SegmentedControl, {
        "aria-label": "Large",
        options: ["a", "b"],
        defaultValue: "b",
        size: "large",
        fullWidth: true,
      }),
    ],
  },
] satisfies HookScenario[];
