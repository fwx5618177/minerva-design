import { defineHooks } from "../types";

export default defineHooks({
  description: "A role=tab trigger of a tabs group",
  react: ["Tab"],
  wc: "minerva-tab",
  parts: {
    root: { description: "The visual tab trigger" },
  },
  states: {
    state: ["active", "inactive"],
    disabled: true,
    orientation: ["horizontal", "vertical"],
    variant: ["line", "enclosed", "soft", "pills"],
    color: ["primary", "neutral", "success", "warning", "danger", "info"],
  },
});
