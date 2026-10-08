import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Sidebar navigation with sections, nested expandable branches, an active item and a compact mode",
  react: ["NavTree"],
  wc: "minerva-nav-tree",
  parts: {
    root: { description: "The <nav> landmark" },
    group: { description: "A section of items" },
    "group-label": { description: "The title of a section" },
    item: {
      description:
        "A link / button row (aria-current=page when active, aria-expanded on branches; not rendered by renderLink)",
    },
    icon: { description: "The icon of an item" },
    label: { description: "The label of an item" },
    description: { description: "The secondary text of an item" },
  },
  states: {},
});
