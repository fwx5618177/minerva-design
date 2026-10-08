import { Input } from "../../components/Input";
import type { HookScenario } from "./types";

export default [
  {
    name: "addons, clear button, counter, every key",
    element: (
      <Input
        aria-label="Name"
        prefix="@"
        suffix="kg"
        clearable
        defaultValue="Ada"
        showCharCount
        maxLength={10}
        size="small"
        variant="filled"
        required
      />
    ),
  },
  {
    name: "password, invalid, read-only",
    element: <Input aria-label="Password" type="password" invalid readOnly />,
  },
  { name: "disabled", element: <Input aria-label="Name" disabled /> },
] satisfies HookScenario[];
