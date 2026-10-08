import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A group of select options (role=group), labelled by a select-label",
  react: ["SelectGroup"],
  wc: "minerva-option-group",
  parts: {
    root: { description: "The group wrapper" },
  },
  states: {},
});
