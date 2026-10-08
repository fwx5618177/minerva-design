import { h } from "vue";
import { Alert } from "../../components/Alert";
import type { HookScenario } from "./types";

export default [
  {
    name: "every part, expanded",
    render: () =>
      h(
        Alert,
        {
          title: "Saved",
          collapsible: true,
          closable: true,
          color: "success",
          variant: "solid",
          size: "small",
        },
        {
          default: () => "Your changes were saved.",
          action: () => h("a", { href: "/undo" }, "Undo"),
        },
      ),
  },
  {
    name: "collapsed",
    render: () =>
      h(
        Alert,
        { title: "Details", collapsible: true, defaultExpanded: false },
        () => "More",
      ),
  },
] satisfies HookScenario[];
