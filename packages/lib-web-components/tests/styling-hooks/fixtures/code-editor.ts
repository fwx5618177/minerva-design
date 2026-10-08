import type { WcHookScenario } from "../types";

export default [
  {
    name: "loading (no engine yet)",
    html: `<minerva-code-editor label="Source"></minerva-code-editor>`,
  },
  {
    name: "unavailable (fallback), disabled",
    html: `<minerva-code-editor label="Source" disabled></minerva-code-editor>`,
    setup: (root) => {
      // not an engine: the element falls back to the textarea
      root.querySelector<HTMLElement & { monaco: unknown }>(
        "minerva-code-editor",
      )!.monaco = {};
    },
  },
] satisfies WcHookScenario[];
