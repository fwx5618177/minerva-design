import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A click-triggered interactive panel (role=dialog) anchored to its trigger",
  react: ["PopoverTrigger", "PopoverContent"],
  wc: "minerva-popover",
  parts: {
    trigger: {
      description:
        "The trigger <button> (React only: the web component's trigger is the slotted element, style it directly; not rendered with asChild, the child keeps its own hooks)",
      states: ["state"],
      only: "react",
    },
    content: {
      description: "The positioned panel (role=dialog)",
      states: ["state", "side", "align", "placement"],
    },
    arrow: { description: "The arrow pointing at the anchor (with arrow)" },
  },
  states: {
    state: ["open", "closed"],
    side: ["top", "right", "bottom", "left"],
    align: ["start", "center", "end"],
    placement: [
      "top",
      "top-start",
      "top-end",
      "right",
      "right-start",
      "right-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
    ],
  },
});
