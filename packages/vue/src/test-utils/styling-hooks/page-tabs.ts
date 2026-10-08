import { h } from "vue";
import { PageTab, PageTabs } from "../../components/PageTabs";
import type { HookScenario } from "./types";

export default [
  {
    name: "with actions",
    render: () =>
      h(
        PageTabs,
        { "aria-label": "Open pages", activeValue: "a" },
        {
          default: () => h(PageTab, { value: "a", label: "A", active: true }),
          actions: () => h("button", { type: "button" }, "Menu"),
        },
      ),
  },
] satisfies HookScenario[];
