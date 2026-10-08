import type { WcHookScenario } from "../types";
import type { MinervaKeyValueEditor } from "../../../src/components/key-value-editor/key-value-editor";

export default [
  {
    name: "rows",
    html: `<minerva-key-value-editor aria-label="Headers" value='{"Accept":"*/*"}'></minerva-key-value-editor>`,
  },
  {
    name: "an invalid row",
    html: `<minerva-key-value-editor aria-label="Headers" value='[{"id":"a","key":"Accept","value":"*/*"},{"id":"b","key":"","value":"x"}]'></minerva-key-value-editor>`,
    setup: (root) => {
      const el = root.querySelector<MinervaKeyValueEditor>(
        "minerva-key-value-editor",
      )!;
      el.errors = { b: { key: "Key required" } };
    },
  },
  {
    name: "disabled",
    html: `<minerva-key-value-editor aria-label="Headers" disabled></minerva-key-value-editor>`,
  },
] satisfies WcHookScenario[];
