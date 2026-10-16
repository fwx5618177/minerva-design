import { DatePicker } from "../../components/DatePicker";
import type { HookScenario } from "./types";

export default [
  { name: "closed", element: <DatePicker aria-label="Date" /> },
  {
    name: "open",
    element: <DatePicker aria-label="Date" />,
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "keyboard: selected date, disabled days (min / max date)",
    element: (
      <DatePicker
        aria-label="Date"
        defaultValue="2026-01-15"
        minDate="2026-01-10"
        maxDate="2026-01-20"
      />
    ),
    setup: async ({ user, container }) => {
      container.querySelector("input")!.focus();
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "disabled, invalid, small",
    element: <DatePicker aria-label="Date" disabled invalid size="small" />,
  },
  { name: "read-only", element: <DatePicker aria-label="Date" readOnly /> },
] satisfies HookScenario[];
