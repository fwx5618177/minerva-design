import { h } from "vue";
import { Page } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () => h(Page, { maxWidth: 960 }, () => "Content"),
  },
] satisfies HookScenario[];
