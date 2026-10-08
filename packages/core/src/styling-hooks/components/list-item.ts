import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A list row with primary / secondary text, a decorative icon and actions",
  react: ["ListItem"],
  wc: "minerva-list-item",
  parts: {
    root: { description: "The row" },
    icon: { description: "The decorative leading icon wrapper" },
    label: { description: "The primary text" },
    description: { description: "The secondary text" },
    actions: { description: "The trailing actions wrapper" },
  },
  states: {},
});
