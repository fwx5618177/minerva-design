import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A labelled Monaco code editor on a local engine, degrading to a textarea with a retry action",
  react: ["MonacoCodeEditor"],
  wc: "minerva-code-editor",
  parts: {
    root: { description: "The role=group root" },
    label: { description: "The visible label" },
    surface: { description: "The editor surface (sized by the height)" },
    loading: { description: "The loading indicator (while the editor loads)" },
    error: {
      description:
        "The unavailable message and retry action (when the editor failed)",
    },
    fallback: {
      description: "The fallback <textarea> (when the editor failed)",
    },
    "retry-button": {
      description:
        "The retry button. Web components only: React renders a Button, which has its own hooks",
      only: "wc",
    },
  },
  states: {
    disabled: true,
    loading: true,
  },
});
