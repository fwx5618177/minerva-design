import { JsonField } from "../../components/JsonField";
import type { HookScenario } from "./types";

export default [
  {
    name: "toolbar, invalid JSON, required",
    element: <JsonField aria-label="Config" defaultValue="{" required />,
  },
  {
    name: "disabled, read-only",
    element: (
      <JsonField aria-label="Config" defaultValue="{}" disabled readOnly />
    ),
  },
] satisfies HookScenario[];
