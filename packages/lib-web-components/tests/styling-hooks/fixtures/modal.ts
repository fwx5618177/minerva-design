import type { WcHookScenario } from "../types";

export default [
  {
    name: "open",
    html: `<minerva-modal open label="Title" description="Description" size="large">
      Body
      <div slot="footer">Footer</div>
    </minerva-modal>`,
  },
  {
    name: "closed",
    html: `<minerva-modal label="Title">Body</minerva-modal>`,
  },
] satisfies WcHookScenario[];
