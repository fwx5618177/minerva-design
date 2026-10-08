import { defineHooks } from "../types";

const PLACEMENTS = [
  "top",
  "top-start",
  "top-end",
  "right",
  "right-start",
  "right-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
] as const;

export default defineHooks({
  description:
    "Informative content shown when the wrapped element is hovered or focused",
  react: ["Tooltip"],
  wc: "minerva-tooltip",
  parts: {
    trigger: {
      description:
        "The wrapper around the trigger (React: not rendered with asChild, the child keeps its own hooks)",
      states: ["state", "disabled"],
    },
    content: {
      description: "The positioned tooltip (role=tooltip, while shown)",
      states: [
        "state",
        "color",
        "variant",
        "shape",
        "side",
        "align",
        "placement",
      ],
    },
    arrow: { description: "The arrow pointing at the trigger (with arrow)" },
  },
  states: {
    state: ["open", "closed"],
    disabled: true,
    color: ["neutral", "info", "success", "warning", "danger"],
    variant: ["solid", "subtle", "glass"],
    shape: ["default", "rounded", "thought", "square"],
    side: ["top", "right", "bottom", "left"],
    align: ["start", "center", "end"],
    placement: PLACEMENTS,
  },
});
