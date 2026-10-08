import type { WcHookScenario } from "../types";

export default [
  { name: "default", html: `<minerva-progress></minerva-progress>` },
  {
    name: "icon, label, every key",
    html: `<minerva-progress variant="dottedBar" size="small" color="neutral" label="Uploading"><svg slot="icon"></svg></minerva-progress>`,
  },
] satisfies WcHookScenario[];
