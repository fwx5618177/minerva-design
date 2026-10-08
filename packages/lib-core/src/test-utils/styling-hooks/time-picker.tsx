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
    name: "disabled, invalid, small",
    element: <TimePicker aria-label="Time" disabled invalid size="small" />,
  },
  { name: "read-only", element: <TimePicker aria-label="Time" readOnly /> },
] satisfies HookScenario[];
