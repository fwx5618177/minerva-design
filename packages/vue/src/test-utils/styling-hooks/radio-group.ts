import { h } from "vue";
import { Radio, RadioGroup } from "../../components/Radio";
import type { HookScenario } from "./types";

export default [
  {
    name: "label, helper text, every key",
    render: () =>
      h(
        RadioGroup,
        {
          label: "Payment",
          helperText: "Pick one",
          direction: "horizontal",
          size: "small",
          color: "success",
          required: true,
          defaultValue: "card",
        },
        () => [
          h(Radio, { value: "card", label: "Card" }),
          h(Radio, { value: "cash", label: "Cash" }),
        ],
      ),
  },
  {
    name: "vertical, invalid, disabled",
    render: () =>
      h(
        RadioGroup,
        { "aria-label": "Payment", error: true, disabled: true },
        () => h(Radio, { value: "card", label: "Card" }),
      ),
  },
] satisfies HookScenario[];
