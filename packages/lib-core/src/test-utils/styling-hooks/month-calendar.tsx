import { MonthCalendar } from "../../components/MonthCalendar";
import type { HookScenario } from "./types";

const month = new Date(2026, 0, 1);
const events = [{ id: "1", date: "2026-01-05", title: "Launch" }];

export default [
  {
    name: "selected day with events",
    element: (
      <MonthCalendar
        defaultMonth={month}
        defaultValue="2026-01-05"
        events={events}
        onEventClick={() => {}}
      />
    ),
  },
  {
    name: "selected day without events, disabled",
    element: (
      <MonthCalendar
        defaultMonth={month}
        defaultValue="2026-01-06"
        events={events}
        disabled
      />
    ),
  },
] satisfies HookScenario[];
