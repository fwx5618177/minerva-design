import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A status column of a DashboardColumns: a header (accent, title, count, actions), a vertically scrolling list of cards and an optional footer",
  react: ["DashboardColumn"],
  wc: "minerva-dashboard-column",
  parts: {
    root: {
      description:
        "The role=group column, labelled by its title and count (data-color names a theme accent)",
    },
    header: { description: "The header row (accent, title, count, actions)" },
    indicator: { description: "The accent dot before the title" },
    title: { description: "The title of the column" },
    count: { description: "The count badge (when count is set)" },
    actions: { description: "The header actions (when provided)" },
    description: {
      description: "The supporting text under the header (when provided)",
    },
    list: {
      description:
        "The role=list body holding the cards (each card is a role=listitem); scrolls vertically within a bounded board",
    },
    empty: {
      description: "The empty content shown instead of the list (no cards)",
    },
    footer: { description: "The footer below the list (when provided)" },
  },
  states: {
    color: ["primary", "success", "warning", "danger", "info", "neutral"],
  },
});
