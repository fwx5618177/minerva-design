import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A range input: one thumb (or two with range) on a track, with optional marks, value label and tooltip",
  react: ["Slider"],
  wc: "minerva-slider",
  parts: {
    root: { description: "The outermost element" },
    control: {
      description:
        "The interactive area holding the rail, the marks and the thumbs",
    },
    rail: { description: "The full-length track" },
    range: {
      description:
        "The filled part of the track (up to the value, or between the thumbs)",
    },
    thumb: {
      description: "A thumb (role=slider). Item states: dragging, disabled",
      itemStates: { dragging: true, disabled: true },
    },
    tooltip: {
      description:
        "The value bubble of a thumb (with tooltip, while dragging or focused)",
    },
    mark: {
      description:
        "A tick of the scale. Item state: active (inside the filled range) / inactive",
      itemStates: { state: ["active", "inactive"] },
    },
    "mark-label": { description: "The label of a mark" },
    value: { description: "The inline value label (with showValue)" },
    input: {
      description:
        "The hidden form input(s) (with name). React only: the custom element is form-associated itself",
      only: "react",
    },
  },
  states: {
    disabled: true,
    readonly: true,
    invalid: true,
    dragging: true,
    size: ["small", "medium", "large"],
    color: ["primary", "success", "info", "warning", "danger"],
    orientation: ["horizontal", "vertical"],
    variant: ["single", "range"],
  },
});
