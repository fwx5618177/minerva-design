import { Toolbar } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: (
      <Toolbar aria-label="Filters" density="compact">
        <span>Control</span>
      </Toolbar>
    ),
  },
] satisfies HookScenario[];
