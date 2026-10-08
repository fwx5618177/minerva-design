import type { WcHookScenario } from "../types";

export default [
  {
    name: "every key, required",
    html: `<minerva-textarea aria-label="Bio" size="large" variant="filled" required></minerva-textarea>`,
  },
  {
    name: "invalid, read-only",
    html: `<minerva-textarea aria-label="Bio" invalid readonly></minerva-textarea>`,
  },
  {
    name: "disabled",
    html: `<minerva-textarea aria-label="Bio" disabled></minerva-textarea>`,
  },
] satisfies WcHookScenario[];
