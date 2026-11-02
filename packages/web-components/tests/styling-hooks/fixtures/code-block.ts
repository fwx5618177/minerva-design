import type { WcHookScenario } from "../types";

export default [
  {
    name: "plain",
    html: `<minerva-code-block code="const a = 1;"></minerva-code-block>`,
  },
  {
    name: "copyable, language",
    html: `<minerva-code-block code="{}" language="json" copyable show-language show-line-numbers marks='[{"start":0,"end":2}]'></minerva-code-block>`,
  },
] satisfies WcHookScenario[];
