import { h } from "vue";
import { PageSection } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    render: () =>
      h(
        PageSection,
        { title: "Title", description: "Description" },
        {
          default: () => "Content",
          icon: () => h("svg"),
          actions: () => h("span", "Action"),
        },
      ),
  },
] satisfies HookScenario[];
