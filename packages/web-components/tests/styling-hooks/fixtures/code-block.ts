import type { WcHookScenario } from "../types";

export default [
  {
    name: "plain",
    html: `<minerva-code-block code="const a = 1;"></minerva-code-block>`,
  },
  {
    name: "copyable, language",
    html: `<minerva-code-block code="{}" language="json" copyable show-language show-line-numbers></minerva-code-block>`,
  },
] satisfies WcHookScenario[];
