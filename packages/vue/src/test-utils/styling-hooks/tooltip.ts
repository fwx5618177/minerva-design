import { h } from "vue";
import { Tooltip } from "../../components/Tooltip";
import type { HookScenario } from "./types";

const trigger = () => h("button", { type: "button" }, "Trigger");

export default [
  {
    name: "open, with arrow",
    render: () =>
      h(
        Tooltip,
        {
          open: true,
          content: "Hint",
          arrow: true,
          placement: "bottom-start",
          color: "info",
          variant: "subtle",
          shape: "rounded",
        },
        trigger,
      ),
  },
  {
    name: "closed, disabled",
    render: () => h(Tooltip, { content: "Hint", disabled: true }, trigger),
  },
  {
    name: "open, asChild",
    render: () =>
      h(Tooltip, { open: true, asChild: true, content: "Hint" }, trigger),
  },
] satisfies HookScenario[];
