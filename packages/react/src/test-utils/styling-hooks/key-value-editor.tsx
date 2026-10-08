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
    name: "an invalid row",
    element: (
      <KeyValueEditor
        aria-label="Headers"
        entries={[
          { id: "a", key: "Accept", value: "*/*" },
          { id: "b", key: "", value: "x" },
        ]}
        onChange={() => {}}
        errors={{ b: { key: "Key required" } }}
      />
    ),
  },
  {
    name: "disabled",
    element: <KeyValueEditor aria-label="Headers" disabled />,
  },
] satisfies HookScenario[];
