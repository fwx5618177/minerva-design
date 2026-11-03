import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A horizontally scrolling board of status columns (DashboardColumn), equal-width by default",
  react: ["DashboardColumns"],
  wc: "minerva-dashboard-columns",
  parts: {
    root: {
      description:
        "The role=region scroll container holding the columns (keyboard scrollable)",
    },
  },
  states: {},
});
