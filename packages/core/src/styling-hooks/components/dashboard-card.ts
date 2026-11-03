import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A card of a DashboardColumn, keyed by its value; a focusable button that a draggable DashboardColumns can move",
  react: ["DashboardCard"],
  wc: "minerva-dashboard-card",
  parts: {
    root: {
      description:
        "The card wrapper (a focusable role=button described by the drag instructions in a draggable board)",
    },
  },
  states: {},
});
