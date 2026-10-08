import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Main content with an optional aside column that splits beside it at a container breakpoint",
  react: ["SplitLayout"],
  wc: "minerva-split-layout",
  parts: {
    root: { description: "The query container" },
    main: { description: "The main column" },
    aside: { description: "The aside column (when there is aside content)" },
  },
  states: {},
});
