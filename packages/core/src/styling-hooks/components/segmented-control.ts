import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A single-choice segmented switch for modes and filters, with a sliding thumb on the selected segment",
  react: ["SegmentedControl"],
  wc: "minerva-segmented-control",
  parts: {
    root: { description: 'The element with role="radiogroup" (the track)' },
    indicator: { description: "The sliding thumb under the selected segment" },
    item: {
      description: 'A segment (role="radio"). Item states: selected, disabled',
      itemStates: {
        selected: true,
        disabled: true,
      },
    },
    icon: { description: "The icon of a segment" },
    label: { description: "The text label of a segment" },
  },
  states: {
    disabled: true,
    size: ["small", "medium", "large"],
    color: ["neutral", "primary"],
  },
});
