import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A scrollable, focusable block of source text with optional syntax highlighting, line numbers, language label, character-range marks and copy button",
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
    "line-number": {
      description:
        "The number of a line, in the gutter (with showLineNumbers; aria-hidden, generated content)",
    },
    language: {
      description: "The language label (with showLanguage and a language)",
    },
    "code-mark": {
      description:
        "A <mark> wrapping a marked character range (with marks; one per run, cut at line breaks with line numbers and around later overlapping marks)",
    },
    "copy-button": {
      description:
        "The copy button (while copyable). Web components only: React renders an IconButton, which has its own hooks",
      only: "wc",
    },
  },
  states: {},
});
