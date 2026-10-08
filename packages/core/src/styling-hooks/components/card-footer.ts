import { defineHooks } from "../types";

export default defineHooks({
  description: "The bottom section of a card, e.g. for actions",
  react: ["CardFooter"],
  wc: "minerva-card-footer",
  parts: {
    root: { description: "The section box" },
  },
  states: {},
});
