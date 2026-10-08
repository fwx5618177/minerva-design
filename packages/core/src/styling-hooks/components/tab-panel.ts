import { defineHooks } from "../types";

export default defineHooks({
  description: "The role=tabpanel content of a tab",
  react: ["TabPanel"],
  wc: "minerva-tab-panel",
  parts: {
    root: { description: "The panel wrapper" },
  },
  states: {
    state: ["active", "inactive"],
    orientation: ["horizontal", "vertical"],
  },
});
