import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A button that only contains an icon, with a tooltip, toggle and loading states",
  react: ["IconButton"],
  wc: "minerva-icon-button",
  parts: {
    root: {
      description:
        "The native <button>; state active while a toggle button is pressed, inactive otherwise",
    },
    icon: {
      description: "The icon wrapper (hidden from assistive technologies)",
    },
    spinner: { description: "The loading indicator (while loading)" },
    tooltip: {
      description:
        "The tooltip (role=tooltip). Web components only: React wraps the button in a <Tooltip> component, which has its own hooks",
      only: "wc",
    },
  },
  states: {
    state: ["active", "inactive"],
    disabled: true,
    loading: true,
    size: ["xsmall", "small", "medium", "large"],
    variant: ["ghost", "solid", "outline"],
    color: ["primary", "neutral", "success", "warning", "danger", "info"],
    shape: ["circle", "square"],
  },
});
