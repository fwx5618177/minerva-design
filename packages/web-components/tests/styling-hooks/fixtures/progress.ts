import type { WcHookScenario } from "../types";

export default [
  { name: "default", html: `<minerva-progress></minerva-progress>` },
  {
    name: "icon, label, every key",
    html: `<minerva-progress variant="dottedBar" size="small" color="neutral" label="Uploading"><svg slot="icon"></svg></minerva-progress>`,
  },
  {
    name: "determinate value",
    html: `<minerva-progress variant="bar" color="success" value="40" show-value></minerva-progress>`,
  },
] satisfies WcHookScenario[];
