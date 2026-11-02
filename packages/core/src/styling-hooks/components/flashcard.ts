import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A two-sided study card that flips between a front (prompt) and a back (answer)",
  react: ["Flashcard"],
  wc: "minerva-flashcard",
  parts: {
    root: { description: "The outermost element (card and footer)" },
    card: {
      description:
        "The flipping card (role=button while flipOnClick); holds both faces",
      states: ["state", "disabled"],
    },
    front: { description: "The front face (the prompt)" },
    back: { description: "The back face (the answer)" },
    label: { description: "The small caption of a face" },
    hint: { description: "The flip hint on the front face (with showHint)" },
    footer: { description: "The footer below the card (not flipped)" },
  },
  states: {
    state: ["active", "inactive"],
    disabled: true,
    variant: ["elevated", "outline", "filled"],
    size: ["small", "medium", "large"],
  },
});
