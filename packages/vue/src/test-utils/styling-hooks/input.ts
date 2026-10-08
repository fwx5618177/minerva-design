import { h } from "vue";
import { Input } from "../../components/Input";
import type { HookScenario } from "./types";

export default [
  {
    name: "addons, clear button, counter, every key",
    render: () =>
      h(Input, {
        "aria-label": "Name",
        prefix: "@",
        suffix: "kg",
        clearable: true,
        defaultValue: "Ada",
        showCharCount: true,
        maxLength: 10,
        size: "small",
        variant: "filled",
        required: true,
      }),
  },
  {
    name: "password, invalid, read-only",
    render: () =>
      h(Input, {
        "aria-label": "Password",
        type: "password",
        invalid: true,
        readOnly: true,
      }),
  },
  {
    name: "disabled",
    render: () => h(Input, { "aria-label": "Name", disabled: true }),
  },
] satisfies HookScenario[];
