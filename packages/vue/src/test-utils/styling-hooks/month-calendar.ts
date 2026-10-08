import { h } from "vue";
import { MonthCalendar } from "../../components/MonthCalendar";
import type { HookScenario } from "./types";

const month = new Date(2026, 0, 1);
const events = [{ id: "1", date: "2026-01-05", title: "Launch" }];

export default [
  {
    name: "selected day with events",
    render: () =>
      h(MonthCalendar, {
        defaultMonth: month,
        defaultValue: "2026-01-05",
        events,
        onEventClick: () => {},
      }),
  },
  {
    name: "selected day without events, disabled",
    render: () =>
      h(MonthCalendar, {
        defaultMonth: month,
        defaultValue: "2026-01-06",
        events,
        disabled: true,
      }),
  },
  {
    name: "keyboard: today, selected, outside days (current month)",
    render: () => h(MonthCalendar),
    setup: async ({ user, container }) => {
      // the grid's tab stop is today; Enter selects it
      container
        .querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')!
        .focus();
      await user.keyboard("{Enter}");
    },
  },
  {
    name: "sizes",
    render: () => [
      h(MonthCalendar, { defaultMonth: month, size: "small" }),
      h(MonthCalendar, { defaultMonth: month, size: "large" }),
    ],
  },
] satisfies HookScenario[];
