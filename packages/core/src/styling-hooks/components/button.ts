import { defineHooks } from "../types";

export default defineHooks({
  description: "A native button with a color, a variant, a size and states",
  react: ["Button"],
  wc: "minerva-button",
  parts: {
    root: { description: "The native <button>" },
    label: { description: "The label wrapper" },
    "start-icon": { description: "The icon before the label" },
    "end-icon": { description: "The icon after the label" },
    spinner: { description: "The loading spinner (while loading)" },
  },
  states: {
    state: ["active", "inactive"],
    disabled: true,
    loading: true,
    size: ["xsmall", "small", "medium", "large", "xlarge"],
    variant: ["solid", "outline", "ghost", "link"],
    color: ["primary", "neutral", "success", "warning", "danger", "info"],
    shape: ["square", "rounded", "circle"],
  },
});
