import { Radio, RadioGroup } from "../../components/Radio";
import type { HookScenario } from "./types";

export default [
  {
    name: "label, helper text, every key",
    element: (
      <RadioGroup
        label="Payment"
        helperText="Pick one"
        direction="horizontal"
        size="small"
        color="success"
        required
        defaultValue="card"
      >
        <Radio value="card" label="Card" />
        <Radio value="cash" label="Cash" />
      </RadioGroup>
    ),
  },
  {
    name: "vertical, invalid, disabled",
    element: (
      <RadioGroup aria-label="Payment" error disabled>
        <Radio value="card" label="Card" />
      </RadioGroup>
    ),
  },
] satisfies HookScenario[];
