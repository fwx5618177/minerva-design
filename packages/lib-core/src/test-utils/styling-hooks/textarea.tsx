import { Textarea } from "../../components/Textarea";
import type { HookScenario } from "./types";

export default [
  {
    name: "every key, required",
    element: (
      <Textarea aria-label="Bio" size="large" variant="filled" required />
    ),
  },
  {
    name: "invalid, read-only",
    element: <Textarea aria-label="Bio" invalid readOnly />,
  },
  { name: "disabled", element: <Textarea aria-label="Bio" disabled /> },
] satisfies HookScenario[];
