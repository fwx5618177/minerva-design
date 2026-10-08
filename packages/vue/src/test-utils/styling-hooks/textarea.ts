import { h } from "vue";
import { Textarea } from "../../components/Textarea";
import type { HookScenario } from "./types";

export default [
  {
    name: "every key, required",
    render: () =>
      h(Textarea, {
        "aria-label": "Bio",
        size: "large",
        variant: "filled",
        required: true,
      }),
  },
  {
    name: "invalid, read-only",
    render: () =>
      h(Textarea, { "aria-label": "Bio", invalid: true, readOnly: true }),
  },
  {
    name: "disabled",
    render: () => h(Textarea, { "aria-label": "Bio", disabled: true }),
  },
] satisfies HookScenario[];
