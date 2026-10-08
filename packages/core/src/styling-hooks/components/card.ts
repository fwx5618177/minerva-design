import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A content container of header, content and footer sections; optionally a link or a button",
  react: ["Card"],
  wc: "minerva-card",
  parts: {
    root: {
      description: "The card root (div, article, section, a or button)",
    },
  },
  states: {
    variant: ["default", "outline", "elevated", "filled", "ghost"],
    disabled: true,
  },
});
