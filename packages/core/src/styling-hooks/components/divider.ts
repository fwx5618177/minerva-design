import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A horizontal or vertical separator line, optionally with text (horizontal only)",
  react: ["Divider"],
  wc: "minerva-divider",
  parts: {
    root: {
      description:
        "The <hr>, or the role=separator element of a divider with text (align: position of the text)",
    },
    label: { description: "The text between the two halves of the line" },
  },
  states: {
    orientation: ["horizontal", "vertical"],
    variant: ["solid", "dashed", "dotted"],
    align: ["left", "center", "right"],
  },
});
