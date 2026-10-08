import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";
import type { MinervaMonthCalendar } from "../../../src/components/month-calendar/month-calendar";

const withEvents = (root: HTMLElement) => {
  root.querySelector<MinervaMonthCalendar>("minerva-month-calendar")!.events = [
    { id: "1", date: "2026-01-05", title: "Launch" },
  ];
};

export default [
  {
    name: "selected day with events",
    html: `<minerva-month-calendar month="2026-01" value="2026-01-05"></minerva-month-calendar>`,
    setup: withEvents,
  },
  {
    name: "selected day without events, disabled",
    html: `<minerva-month-calendar month="2026-01" value="2026-01-06" disabled></minerva-month-calendar>`,
    setup: withEvents,
  },
  {
    name: "keyboard: today, selected, outside days (current month)",
    html: `<minerva-month-calendar></minerva-month-calendar>`,
    setup: async (root) => {
      const user = userEvent.setup();
      // the grid's tab stop is today; Enter selects it
      root
        .querySelector("minerva-month-calendar")!
        .shadowRoot!.querySelector<HTMLElement>(
          '[role="gridcell"][tabindex="0"]',
        )!
        .focus();
      await user.keyboard("{Enter}");
    },
  },
] satisfies WcHookScenario[];
