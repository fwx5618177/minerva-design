import type { WcHookScenario } from "../types";

export default [
  {
    name: "open, left, large",
    html: `<minerva-drawer open label="Title" description="Description" side="left" size="large">
      Body
      <div slot="footer">Footer</div>
    </minerva-drawer>`,
  },
  {
    name: "open, top, small",
    html: `<minerva-drawer open label="Title" side="top" size="small">Body</minerva-drawer>`,
  },
  {
    name: "open, bottom, full",
    html: `<minerva-drawer open label="Title" side="bottom" size="full">Body</minerva-drawer>`,
  },
  {
    name: "closed (right, medium)",
    html: `<minerva-drawer label="Title">Body</minerva-drawer>`,
  },
] satisfies WcHookScenario[];
