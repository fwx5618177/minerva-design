import { defineHooks } from "../types";

export default defineHooks({
  description:
    "An editable list of key / value rows (headers, metadata, variables)",
  react: ["KeyValueEditor"],
  wc: "minerva-key-value-editor",
  parts: {
    root: { description: "The container" },
    row: {
      description: "Each row (key field, value field and remove button)",
    },
    "remove-button": {
      description:
        "The remove button of a row (web components only: React renders an IconButton, styled with its own hooks)",
      only: "wc",
    },
    "add-button": {
      description:
        "The add button (web components only: React renders a Button, styled with its own hooks)",
      only: "wc",
    },
  },
  states: {
    disabled: true,
  },
});
