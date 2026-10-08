import type { WcHookScenario } from "../types";

export default [
  { name: "default", html: `<minerva-card>Content</minerva-card>` },
  {
    name: "disabled button card",
    html: `<minerva-card as="button" variant="elevated" disabled>Content</minerva-card>`,
  },
] satisfies WcHookScenario[];
