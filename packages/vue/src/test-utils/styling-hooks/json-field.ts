import { h } from "vue";
import { JsonField } from "../../components/JsonField";
import type { HookScenario } from "./types";

export default [
  {
    name: "toolbar, invalid JSON, required",
    render: () =>
      h(JsonField, {
        "aria-label": "Config",
        defaultValue: "{",
        required: true,
      }),
  },
  {
    name: "disabled, read-only",
    render: () =>
      h(JsonField, {
        "aria-label": "Config",
        defaultValue: "{}",
        disabled: true,
        readOnly: true,
      }),
  },
] satisfies HookScenario[];
