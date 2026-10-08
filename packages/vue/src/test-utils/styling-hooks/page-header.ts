import { h } from "vue";
import { PageHeader } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    render: () =>
      h(
        PageHeader,
        { title: "Title", description: "Description" },
        { actions: () => h("span", "Action") },
      ),
  },
  { name: "title only", render: () => h(PageHeader, { title: "Title" }) },
] satisfies HookScenario[];
