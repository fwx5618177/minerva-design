import { defineHooks } from "../types";

export default defineHooks({
  description: "A wrapping row of related controls (role=group)",
  react: ["Toolbar"],
  wc: "minerva-toolbar",
  parts: {
    root: { description: "The group" },
  },
  states: {},
});
