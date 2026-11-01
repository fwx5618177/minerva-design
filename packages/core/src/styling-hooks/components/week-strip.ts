import { defineHooks } from "../types";

export default defineHooks({
  description:
    "The seven days of a week in a row, with a selected day, today, per-day markers and optional week navigation",
  react: ["WeekStrip"],
  wc: "minerva-week-strip",
  parts: {
    root: { description: "The outermost element" },
    heading: { description: "The month of the week (with showNavigation)" },
    "nav-button": {
      description: "The previous / next week buttons (with showNavigation)",
    },
    list: { description: "The role=listbox element holding the days" },
    day: {
      description:
        "A day (role=option). Item states: selected, today, disabled",
      itemStates: {
        selected: true,
        today: true,
        disabled: true,
      },
    },
    indicator: {
      description: "The marker of a day: empty, a count badge or a dot",
    },
  },
  states: {
    disabled: true,
    size: ["small", "medium", "large"],
  },
});
