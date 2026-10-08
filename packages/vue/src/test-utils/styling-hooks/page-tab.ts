import { h } from "vue";
import { PageTab, PageTabs } from "../../components/PageTabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "current, disabled, icon, action",
    render: () =>
      h(PageTabs, { "aria-label": "Open pages", activeValue: "a" }, () => [
        h(
          PageTab,
          { value: "a", label: "A", active: true },
          { icon: () => h("svg") },
        ),
        h(
          PageTab,
          { value: "b", label: "B", disabled: true },
          { action: () => h("button", { type: "button" }, "x") },
        ),
      ]),
  },
] satisfies HookScenario[];
