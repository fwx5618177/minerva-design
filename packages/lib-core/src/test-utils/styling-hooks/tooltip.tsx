import { Tooltip } from "../../components/Tooltip";
import type { HookScenario } from "./types";

export default [
  {
    name: "open, with arrow",
    element: (
      <Tooltip
        open
        content="Hint"
        arrow
        placement="bottom-start"
        color="info"
        variant="subtle"
        shape="rounded"
      >
        <button type="button">Trigger</button>
      </Tooltip>
    ),
  },
  {
    name: "closed, disabled",
    element: (
      <Tooltip content="Hint" disabled>
        <button type="button">Trigger</button>
      </Tooltip>
    ),
  },
  {
    name: "open, asChild",
    element: (
      <Tooltip open asChild content="Hint">
        <button type="button">Trigger</button>
      </Tooltip>
    ),
  },
] satisfies HookScenario[];
