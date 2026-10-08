import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A small count or status indicator, standalone or attached to a corner of an element",
  react: ["Badge"],
  wc: "minerva-badge",
  parts: {
    root: {
      description:
        "The outermost element: the badge itself when standalone, the wrapper of the children when attached",
    },
    badge: {
      description:
        "The badge attached to a corner of the children (a standalone badge is the root)",
      states: ["size", "variant", "color"],
    },
    icon: { description: "The icon before the content" },
  },
  states: {
    size: ["small", "medium", "large"],
    variant: ["solid", "subtle", "outline"],
    color: ["primary", "neutral", "success", "warning", "danger", "info"],
  },
});
