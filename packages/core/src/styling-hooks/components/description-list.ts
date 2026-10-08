import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Labeled metadata fields as a native <dl> of term / description rows",
  react: ["DescriptionList"],
  wc: "minerva-description-list",
  parts: {
    root: { description: "The <dl>" },
    row: { description: "Each row (one term / description pair)" },
    term: { description: "Each <dt>" },
    description: { description: "Each <dd>" },
  },
  states: {},
});
