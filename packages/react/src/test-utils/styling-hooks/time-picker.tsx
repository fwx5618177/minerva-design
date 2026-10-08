import { TimePicker } from "../../components/TimePicker";
import type { HookScenario } from "./types";

export default [
  { name: "closed", element: <TimePicker aria-label="Time" /> },
  {
    name: "open",
    element: <TimePicker aria-label="Time" />,
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "keyboard: selected units, disabled units (min / max time)",
    element: (
      <TimePicker
        aria-label="Time"
        defaultValue={new Date(2024, 0, 1, 10, 30, 0)}
        minTime={new Date(2024, 0, 1, 9, 0, 0)}
        maxTime={new Date(2024, 0, 1, 17, 0, 0)}
      />
    ),
    setup: async ({ user, container }) => {
      container.querySelector("input")!.focus();
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "disabled, invalid, small",
    element: <TimePicker aria-label="Time" disabled invalid size="small" />,
  },
  { name: "read-only", element: <TimePicker aria-label="Time" readOnly /> },
] satisfies HookScenario[];
