import { defineHooks } from "../types";

export default defineHooks({
  description: "A quiet operational list of rows (role=list)",
  react: ["List"],
  wc: "minerva-list",
  parts: {
    root: {
      description: "The list (React: the <ul>; web components: its wrapper)",
    },
  },
  states: {},
});
