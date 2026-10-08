import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A scrollable, focusable block of source text with an optional copy button",
  react: ["CodeBlock"],
  wc: "minerva-code-block",
  parts: {
    root: {
      description:
        "The positioned outer wrapper of the region and its actions (only when copyable, or with a language label)",
    },
    region: {
      description:
        "The <pre> scroll region (role=region): the visible box of the code",
    },
    code: { description: "The <code> element" },
    language: {
      description:
        "The language label. Web components only: React's CodeBlock has no language prop",
      only: "wc",
    },
    "copy-button": {
      description:
        "The copy button (while copyable). Web components only: React renders an IconButton, which has its own hooks",
      only: "wc",
    },
  },
  states: {},
});
