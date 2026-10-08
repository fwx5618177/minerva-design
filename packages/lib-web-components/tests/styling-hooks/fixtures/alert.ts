import type { WcHookScenario } from "../types";

export default [
  {
    name: "every part, expanded",
    html: `<minerva-alert heading="Saved" collapsible closable color="success" variant="solid" size="small">
      Your changes were saved.
      <a slot="action" href="/undo">Undo</a>
    </minerva-alert>`,
  },
  {
    name: "collapsed",
    html: `<minerva-alert heading="Details" collapsible collapsed>More</minerva-alert>`,
  },
] satisfies WcHookScenario[];
