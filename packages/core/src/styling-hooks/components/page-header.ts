import { defineHooks } from "../types";

export default defineHooks({
  description: "The page heading (h1) with an optional description and actions",
  react: ["PageHeader"],
  wc: "minerva-page-header",
  parts: {
    root: { description: "The <header>" },
    title: { description: "The <h1>" },
    description: { description: "The description paragraph" },
    actions: { description: "The actions wrapper" },
  },
  states: {},
});
