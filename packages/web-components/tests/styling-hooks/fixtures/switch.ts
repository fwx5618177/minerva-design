import type { WcHookScenario } from "../types";

export default [
  {
    name: "label, icon in the thumb, checked, every key",
    html: `<minerva-switch label="Wi-Fi" checked size="small" color="success" shape="square"><svg slot="icon"></svg></minerva-switch>`,
  },
  {
    name: "side labels, icon after the slider, loading",
    html: `<minerva-switch aria-label="Mode" off-label="Off" on-label="On" icon-placement="end" loading><svg slot="icon"></svg></minerva-switch>`,
  },
  {
    name: "segmented, invalid, required, read-only",
    html: `<minerva-switch aria-label="Source" variant="segmented" off-label="A" on-label="B" invalid required readonly></minerva-switch>`,
  },
  {
    name: "disabled",
    html: `<minerva-switch aria-label="Wi-Fi" disabled></minerva-switch>`,
  },
] satisfies WcHookScenario[];
