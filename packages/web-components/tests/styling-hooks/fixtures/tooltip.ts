import type { WcHookScenario } from "../types";

export default [
  {
    name: "open, with arrow",
    html: `<minerva-tooltip open content="Hint" arrow placement="bottom-start" color="info" variant="subtle" shape="rounded">
      <button type="button">Trigger</button>
    </minerva-tooltip>`,
  },
  {
    name: "closed, disabled",
    html: `<minerva-tooltip content="Hint" disabled>
      <button type="button">Trigger</button>
    </minerva-tooltip>`,
  },
] satisfies WcHookScenario[];
