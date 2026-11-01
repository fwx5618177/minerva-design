import { WeekStrip } from "../../components/WeekStrip";
import type { HookScenario } from "./types";

const markers = { "2026-01-05": 3, "2026-01-07": true };

export default [
  {
    name: "selected day, today, markers, navigation",
    element: (
      <WeekStrip
        defaultValue="2026-01-06"
        today="2026-01-07"
        markers={markers}
        showNavigation
      />
    ),
  },
  {
    name: "disabled",
    element: (
      <WeekStrip
        defaultValue="2026-01-06"
        today="2026-01-06"
        showNavigation
        disabled
      />
    ),
  },
  {
    name: "sizes",
    element: (
      <>
        <WeekStrip today="2026-01-06" size="small" />
        <WeekStrip today="2026-01-06" size="large" />
      </>
    ),
  },
] satisfies HookScenario[];
