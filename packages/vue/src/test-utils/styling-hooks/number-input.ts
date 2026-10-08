import { h } from "vue";
import { NumberInput } from "../../components/NumberInput";
import type { HookScenario } from "./types";

export default [
  {
    name: "stepper, every key, required",
    render: () =>
      h(NumberInput, {
        "aria-label": "Qty",
        defaultValue: 1,
        showStepper: true,
        size: "small",
        required: true,
      }),
  },
  {
    name: "invalid, read-only",
    render: () =>
      h(NumberInput, { "aria-label": "Qty", invalid: true, readOnly: true }),
  },
  {
    name: "disabled",
    render: () => h(NumberInput, { "aria-label": "Qty", disabled: true }),
  },
] satisfies HookScenario[];
