import { h } from "vue";
import { Button } from "../../components/Button";
import type { HookScenario } from "./types";

const Icon = () => h("svg", { "aria-hidden": "true" });

export default [
  { name: "default", render: () => h(Button, null, () => "Save") },
  {
    name: "icons, active, every key",
    render: () =>
      h(
        Button,
        {
          active: true,
          shape: "rounded",
          size: "small",
          variant: "ghost",
          color: "danger",
        },
        { default: () => "Delete", "start-icon": Icon, "end-icon": Icon },
      ),
  },
  {
    name: "loading",
    render: () => h(Button, { loading: true }, () => "Saving"),
  },
  {
    name: "disabled",
    render: () => h(Button, { disabled: true }, () => "Save"),
  },
] satisfies HookScenario[];
