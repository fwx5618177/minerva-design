import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A two-state toggle (role=switch): a slider, with optional side labels, or two segments",
  react: ["Switch"],
  wc: "minerva-switch",
  parts: {
    root: {
      description:
        "The outer element (<label>; a <span> with side labels; the group of segments)",
    },
    input: { description: 'The native <input type="checkbox" role="switch">' },
    control: { description: "The slider box (wraps the track and the thumb)" },
    track: { description: "The track" },
    thumb: { description: "The thumb" },
    icon: { description: "The icon (in the thumb or after the slider)" },
    label: { description: "The label text" },
    side: { description: "The off / on side labels (buttons)" },
    segment: {
      description: 'The off / on segments (buttons, variant="segmented")',
    },
  },
  states: {
    state: ["checked", "unchecked"],
    disabled: true,
    loading: true,
    invalid: true,
    readonly: true,
    required: true,
    size: ["small", "medium", "large"],
    color: ["primary", "success", "info", "warning", "danger"],
    shape: ["round", "square"],
    variant: ["slider", "segmented"],
  },
});
