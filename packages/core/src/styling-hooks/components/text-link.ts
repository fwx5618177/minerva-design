import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A styled native link (default inline link, subtle link with a chevron, action row)",
  react: ["TextLink"],
  wc: "minerva-text-link",
  parts: {
    root: {
      description: "The native <a> (React: the slotted child with asChild)",
    },
  },
  states: {
    variant: ["default", "subtle", "action"],
  },
});
