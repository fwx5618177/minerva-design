import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A month grid of days with event counts, navigation and the events of the selected day",
  react: ["MonthCalendar"],
  wc: "minerva-month-calendar",
  parts: {
    root: { description: "The calendar <section>" },
    heading: { description: "The month heading" },
    "nav-button": { description: "The previous / today / next buttons" },
    grid: { description: "The role=grid element" },
    day: { description: "A day cell (role=gridcell)" },
    events: { description: "The events section of the selected day" },
    event: { description: "An event (a button when events are clickable)" },
    empty: { description: "The text shown when the selected day has no event" },
  },
  states: {
    disabled: true,
  },
});
