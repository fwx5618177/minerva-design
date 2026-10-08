import { h } from "vue";
import { DescriptionList } from "../../components/DescriptionList";
import type { HookScenario } from "./types";

export default [
  {
    name: "rows",
    render: () =>
      h(DescriptionList, {
        items: [
          { key: "a", label: "Status", value: "Active" },
          { key: "b", label: "Owner", value: "Ada" },
        ],
      }),
  },
] satisfies HookScenario[];
