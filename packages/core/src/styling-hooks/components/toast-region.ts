import { defineHooks } from "../types";

export default defineHooks({
  description:
    "The fixed stack (role=region) rendering the toasts of the toast() API",
  react: ["ToastProvider"],
  wc: "minerva-toast-region",
  parts: {
    root: { description: "The fixed stack (role=region)" },
    toast: { description: "A toast (role=status, or alert for danger)" },
    icon: { description: "The icon of a toast (spinner while loading)" },
    title: { description: "The title of a toast" },
    description: { description: "The description of a toast" },
    action: { description: "The action button of a toast" },
    "close-button": { description: "The close (×) button of a toast" },
    progress: { description: "The countdown bar of a timed toast" },
  },
  states: {},
});
