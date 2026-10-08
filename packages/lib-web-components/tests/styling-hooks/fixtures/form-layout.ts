import type { WcHookScenario } from "../types";

export default [
  {
    name: "default",
    html: `<form><minerva-form-layout columns="1 2"><input aria-label="Name" /></minerva-form-layout></form>`,
  },
] satisfies WcHookScenario[];
