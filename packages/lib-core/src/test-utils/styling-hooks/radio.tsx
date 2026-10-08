import { Radio } from "../../components/Radio";
import type { HookScenario } from "./types";

export default [
  {
    name: "label, helper text, checked, every key",
    element: (
      <Radio
        label="Card"
        helperText="Visa, Mastercard"
        checked
        onChange={() => {}}
        size="small"
        color="success"
      />
    ),
  },
  {
    name: "unchecked, invalid",
    element: (
      <Radio
        aria-label="Cash"
        checked={false}
        onChange={() => {}}
        error
        errorMessage="Pick one"
      />
    ),
  },
  { name: "disabled", element: <Radio aria-label="Cash" disabled /> },
] satisfies HookScenario[];
