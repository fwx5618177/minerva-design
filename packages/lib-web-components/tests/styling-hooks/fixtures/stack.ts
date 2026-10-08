import type { WcHookScenario } from "../types";

export default [
  { name: "column", html: `<minerva-stack gap="2">A</minerva-stack>` },
  {
    name: "row, separator",
    html: `<minerva-stack direction="row-reverse" separator="·"><span>A</span><span>B</span></minerva-stack>`,
  },
] satisfies WcHookScenario[];
