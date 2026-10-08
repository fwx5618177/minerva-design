import type { WcHookScenario } from "../types";

export default [
  { name: "default", html: `<minerva-divider></minerva-divider>` },
  {
    name: "with text, every key",
    html: `<minerva-divider variant="dashed" text-align="left">Or</minerva-divider>`,
  },
  {
    name: "vertical",
    html: `<minerva-divider orientation="vertical"></minerva-divider>`,
  },
] satisfies WcHookScenario[];
