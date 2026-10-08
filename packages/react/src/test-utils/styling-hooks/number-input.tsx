import { NumberInput } from "../../components/NumberInput";
import type { HookScenario } from "./types";

export default [
  {
    name: "stepper, every key, required",
    element: (
      <NumberInput
        aria-label="Qty"
        defaultValue={1}
        showStepper
        size="small"
        required
      />
    ),
  },
  {
    name: "invalid, read-only",
    element: <NumberInput aria-label="Qty" invalid readOnly />,
  },
  { name: "disabled", element: <NumberInput aria-label="Qty" disabled /> },
] satisfies HookScenario[];
