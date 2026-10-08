import { defineHooks } from "../types";

export default defineHooks({
  description:
    "An inline message with an icon, a title, a description, an action and optional close / collapse buttons",
  react: ["Alert"],
  wc: "minerva-alert",
  parts: {
    root: {
      description:
        "The alert (role=alert for danger / warning, status otherwise); state open / closed only while collapsible",
    },
    icon: { description: "The icon (role=img)" },
    title: { description: "The title (holds the collapse button)" },
    trigger: {
      description: "The expand / collapse button of a collapsible alert",
    },
    description: { description: "The message" },
    action: { description: "The action wrapper" },
    "close-button": { description: "The close button" },
  },
  states: {
    state: ["open", "closed"],
    size: ["small", "medium", "large"],
    variant: ["subtle", "outline", "solid"],
    color: ["info", "success", "warning", "danger"],
  },
});
