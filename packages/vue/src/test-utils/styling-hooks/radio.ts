import { h } from "vue";
import { Radio } from "../../components/Radio";
import type { HookScenario } from "./types";

export default [
  {
    name: "label, helper text, checked, every key",
    render: () =>
      h(Radio, {
        label: "Card",
        helperText: "Visa, Mastercard",
        modelValue: true,
        size: "small",
        color: "success",
      }),
  },
  {
    name: "unchecked, invalid",
    render: () =>
      h(Radio, {
        "aria-label": "Cash",
        modelValue: false,
        error: true,
        errorMessage: "Pick one",
      }),
  },
  {
    name: "disabled",
    render: () => h(Radio, { "aria-label": "Cash", disabled: true }),
  },
] satisfies HookScenario[];
