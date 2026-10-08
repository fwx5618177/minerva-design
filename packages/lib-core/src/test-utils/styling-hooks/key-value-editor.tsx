import { KeyValueEditor } from "../../components/KeyValueEditor";
import type { HookScenario } from "./types";

export default [
  {
    name: "rows",
    element: (
      <KeyValueEditor
        aria-label="Headers"
        defaultEntries={[{ id: "a", key: "Accept", value: "*/*" }]}
      />
    ),
  },
  {
    name: "disabled",
    element: <KeyValueEditor aria-label="Headers" disabled />,
  },
] satisfies HookScenario[];
