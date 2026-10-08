import type { WcHookScenario } from "../types";

export default [
  {
    name: "default",
    html: `<minerva-text-link href="/docs">Docs</minerva-text-link>`,
  },
  {
    name: "subtle",
    html: `<minerva-text-link href="/docs" variant="subtle">Docs</minerva-text-link>`,
  },
  {
    name: "action",
    html: `<minerva-text-link href="/docs" variant="action">Docs</minerva-text-link>`,
  },
] satisfies WcHookScenario[];
