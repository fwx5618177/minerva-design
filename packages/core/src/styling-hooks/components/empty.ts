import { defineHooks } from "../types";

export default defineHooks({
  description:
    "An empty state: icon, title, description, actions and footer content",
  react: ["Empty"],
  wc: "minerva-empty",
  parts: {
    root: {
      description:
        "The region (role=status); size only for the unframed sized layout",
    },
    icon: { description: "The icon wrapper" },
    title: { description: "The title (accessible name of the region)" },
    description: { description: "The description" },
    actions: { description: "The actions row" },
    footer: { description: "The footer content" },
  },
  states: {
    size: ["small", "medium", "large"],
  },
});
