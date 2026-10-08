import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Placeholder shapes shown while content loads (lines, avatar, title, paragraph, card)",
  react: ["Skeleton"],
  wc: "minerva-skeleton",
  parts: {
    root: {
      description:
        "The busy region (role=status), or the single block of a decorative skeleton",
    },
    avatar: { description: "The avatar placeholder" },
    title: { description: "The title placeholder" },
    line: { description: "Each line placeholder (also the paragraph lines)" },
  },
  states: {
    variant: [
      "text",
      "circular",
      "rectangular",
      "rounded",
      "button",
      "image",
      "card",
    ],
  },
});
