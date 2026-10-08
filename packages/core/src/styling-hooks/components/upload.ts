import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A file picker with a drop zone, validation and a list of files with their status",
  react: ["Upload"],
  wc: "minerva-upload",
  parts: {
    root: { description: "The container (role=group)" },
    label: { description: "The visible label" },
    dropzone: { description: "The drop target" },
    "select-button": {
      description:
        "The select button (web components only: React renders a nested Button, style its hooks)",
      only: "wc",
    },
    error: {
      description:
        "The selection error (web components only: React renders a nested Alert, style its hooks)",
      only: "wc",
    },
    list: { description: "The file list" },
    item: {
      description: "A file. Item state: status of the file",
      itemStates: { status: ["uploading", "done", "error"] },
    },
    "retry-button": {
      description:
        "The retry button of a failed file (web components only: React renders a nested IconButton, style its hooks)",
      only: "wc",
    },
    "remove-button": {
      description:
        "The remove button of a file (web components only: React renders a nested IconButton, style its hooks)",
      only: "wc",
    },
  },
  states: {
    disabled: true,
    loading: true,
    dragging: true,
  },
});
