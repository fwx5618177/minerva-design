import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A sandboxed iframe preview of sanitized HTML, at desktop or mobile width",
  react: ["HtmlPreview"],
  wc: "minerva-html-preview",
  parts: {
    root: { description: "The scrolling container" },
    frame: { description: "The sandboxed <iframe>" },
  },
  states: {},
});
