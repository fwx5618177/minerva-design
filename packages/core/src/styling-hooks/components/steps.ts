import { defineHooks } from "../types";

export default defineHooks({
  description:
    "The stages of a workflow as an ordered list, navigable or read-only",
  react: ["Steps"],
  wc: "minerva-steps",
  parts: {
    root: { description: "The <ol>" },
    item: {
      description:
        "A step <li> (the current step has aria-current=step). Item states: current, disabled, status (complete / current / upcoming)",
      itemStates: {
        current: true,
        disabled: true,
        status: ["complete", "current", "upcoming"],
      },
    },
    button: {
      description:
        "The <button> of a step (navigable) or its static wrapper (read-only)",
    },
    indicator: { description: "The numbered indicator of a step" },
    label: { description: "The label of a step" },
  },
  states: {
    readonly: true,
  },
});
