import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A small label for marking and categorizing, optionally clickable, toggleable or closable",
  react: ["Tag"],
  wc: "minerva-tag",
  parts: {
    root: {
      description:
        "The tag (a plain, non-interactive element); state active while a clickable tag is pressed, inactive otherwise",
    },
    action: { description: "The native <button> of a clickable tag" },
    label: { description: "The label wrapper" },
    icon: { description: "The icon before the label" },
    avatar: { description: "The avatar before the label" },
    spinner: { description: "The loading spinner (while loading)" },
    "close-button": { description: "The close button" },
  },
  states: {
    state: ["active", "inactive"],
    disabled: true,
    loading: true,
    size: ["small", "medium", "large"],
    variant: ["subtle", "outline", "solid"],
    color: ["primary", "neutral", "success", "warning", "danger", "info"],
    shape: ["square", "rounded", "circle"],
  },
});
