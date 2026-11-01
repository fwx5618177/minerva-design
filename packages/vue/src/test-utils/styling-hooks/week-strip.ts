import { h } from "vue";
import { WeekStrip } from "../../components/WeekStrip";
import type { HookScenario } from "./types";

const markers = { "2026-01-05": 3, "2026-01-07": true };

export default [
  {
    name: "selected day, today, markers, navigation",
    render: () =>
      h(WeekStrip, {
        defaultValue: "2026-01-06",
        today: "2026-01-07",
        markers,
        showNavigation: true,
      }),
  },
  {
    name: "disabled",
    render: () =>
      h(WeekStrip, {
        defaultValue: "2026-01-06",
        today: "2026-01-06",
        showNavigation: true,
        disabled: true,
      }),
  },
  {
    name: "sizes",
    render: () => [
      h(WeekStrip, { today: "2026-01-06", size: "small" }),
      h(WeekStrip, { today: "2026-01-06", size: "large" }),
    ],
  },
] satisfies HookScenario[];
