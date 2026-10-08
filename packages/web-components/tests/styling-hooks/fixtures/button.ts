import type { WcHookScenario } from "../types";

export default [
  { name: "default", html: `<minerva-button>Save</minerva-button>` },
  {
    name: "icons, active, every key",
    html: `<minerva-button active shape="rounded" size="small" variant="ghost" color="danger">
      <svg slot="start"></svg>Delete<svg slot="end"></svg>
    </minerva-button>`,
  },
  { name: "loading", html: `<minerva-button loading>Saving</minerva-button>` },
  { name: "disabled", html: `<minerva-button disabled>Save</minerva-button>` },
] satisfies WcHookScenario[];
