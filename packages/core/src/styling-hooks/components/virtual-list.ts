import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A virtualized scrolling list that only renders the visible rows, with infinite loading",
  react: ["VirtualList"],
  wc: "minerva-virtual-list",
  parts: {
    root: { description: "The scroll container (role=region)" },
    list: { description: "The list (role=list) sized to all the rows" },
    item: { description: "A rendered row (role=listitem)" },
    loading: { description: "The loading indicator row (while loading)" },
  },
  states: {
    loading: true,
  },
});
