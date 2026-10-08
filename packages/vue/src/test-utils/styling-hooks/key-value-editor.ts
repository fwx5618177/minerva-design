import { h } from "vue";
import { KeyValueEditor } from "../../components/KeyValueEditor";
import type { HookScenario } from "./types";

export default [
  {
    name: "rows",
    render: () =>
      h(KeyValueEditor, {
        "aria-label": "Headers",
        defaultValue: [{ id: "a", key: "Accept", value: "*/*" }],
      }),
  },
  {
    name: "an invalid row",
    render: () =>
      h(KeyValueEditor, {
        "aria-label": "Headers",
        modelValue: [
          { id: "a", key: "Accept", value: "*/*" },
          { id: "b", key: "", value: "x" },
        ],
        "onUpdate:modelValue": () => {},
        errors: { b: { key: "Key required" } },
      }),
  },
  {
    name: "disabled",
    render: () =>
      h(KeyValueEditor, { "aria-label": "Headers", disabled: true }),
  },
] satisfies HookScenario[];
