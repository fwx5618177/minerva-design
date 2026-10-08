import { h } from "vue";
import { Checkbox } from "../../components/Checkbox";
import { FormControl } from "../../components/FormControl";
import type { HookScenario } from "./types";

export default [
  {
    name: "label, helper text, checked, every key",
    render: () =>
      h(Checkbox, {
        label: "Accept",
        helperText: "Required",
        defaultChecked: true,
        required: true,
        size: "small",
        color: "success",
        shape: "rounded",
      }),
  },
  {
    name: "indeterminate, invalid",
    render: () =>
      h(Checkbox, { "aria-label": "All", indeterminate: true, error: true }),
  },
  {
    name: "unchecked, read-only",
    render: () =>
      h(FormControl, { readOnly: true }, () =>
        h(Checkbox, { "aria-label": "Accept" }),
      ),
  },
  {
    name: "disabled",
    render: () => h(Checkbox, { "aria-label": "Accept", disabled: true }),
  },
] satisfies HookScenario[];
