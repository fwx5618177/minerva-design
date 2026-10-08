import { defineHooks } from "../types";

export default defineHooks({
  description: "A responsive column grid for form fields",
  react: ["FormLayout"],
  wc: "minerva-form-layout",
  parts: {
    root: {
      description:
        "The form layout box (React: the native <form>; web components: the grid's query container, inside your own <form>)",
    },
    layout: {
      description:
        "The grid. Web components only: React renders a nested ResponsiveGrid (style its `responsive-grid` hooks)",
      only: "wc",
    },
  },
  states: {},
});
