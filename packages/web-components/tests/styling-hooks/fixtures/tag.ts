import type { WcHookScenario } from "../types";

export default [
  {
    name: "icon, avatar, closable",
    html: `<minerva-tag closable><svg slot="icon"></svg><img slot="avatar" alt="" />Label</minerva-tag>`,
  },
  {
    name: "pressed toggle, every key",
    html: `<minerva-tag clickable toggle pressed size="small" variant="solid" color="danger" shape="circle">Filter</minerva-tag>`,
  },
  {
    name: "unpressed toggle, disabled",
    html: `<minerva-tag clickable toggle disabled>Filter</minerva-tag>`,
  },
  { name: "loading", html: `<minerva-tag loading>Saving</minerva-tag>` },
] satisfies WcHookScenario[];
