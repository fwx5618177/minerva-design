import { defineHooks } from "../types";

export default defineHooks({
  description: "The secondary text below a card title",
  react: ["CardDescription"],
  wc: "minerva-card-description",
  parts: {
    root: { description: "The paragraph" },
  },
  states: {},
});
