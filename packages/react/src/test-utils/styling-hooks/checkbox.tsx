import { Checkbox } from "../../components/Checkbox";
import { FormControl } from "../../components/FormControl";
import type { HookScenario } from "./types";

export default [
  {
    name: "label, helper text, checked, every key",
    element: (
      <Checkbox
        label="Accept"
        helperText="Required"
        defaultChecked
        required
        size="small"
        color="success"
        shape="rounded"
      />
    ),
  },
  {
    name: "indeterminate, invalid",
    element: <Checkbox aria-label="All" indeterminate error />,
  },
  {
    name: "unchecked, read-only",
    element: (
      <FormControl readOnly>
        <Checkbox aria-label="Accept" />
      </FormControl>
    ),
  },
  { name: "disabled", element: <Checkbox aria-label="Accept" disabled /> },
] satisfies HookScenario[];
