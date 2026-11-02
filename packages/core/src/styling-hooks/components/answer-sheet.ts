import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A grid of numbered pills to jump between the questions of a practice or exam session, grouped by section, each with a status",
  react: ["AnswerSheet"],
  wc: "minerva-answer-sheet",
  parts: {
    root: { description: "The outermost element (a nav landmark)" },
    total: {
      description: 'The "12 / 20 answered" summary (with showSummary)',
    },
    group: {
      description:
        "A section of questions (role=group when titled; the first one is untitled when items have no group)",
    },
    "group-label": { description: "The title of a section" },
    grid: { description: "The element holding the pills of a section" },
    item: {
      description:
        "A question pill (a button; aria-current=step when current). Item states: current, disabled, flagged, status",
      itemStates: {
        current: true,
        disabled: true,
        flagged: true,
        status: ["unanswered", "answered", "correct", "wrong", "skipped"],
      },
    },
    indicator: { description: "The flag dot of a flagged question" },
    legend: { description: "The legend of the statuses (with showLegend)" },
    "legend-item": { description: "An entry of the legend" },
  },
  states: {
    disabled: true,
    size: ["small", "medium"],
    layout: ["wrap", "scroll"],
  },
});
