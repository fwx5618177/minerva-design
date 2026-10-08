import type { WcHookScenario } from "../types";

export default [
  {
    name: "image",
    html: `<minerva-avatar src="a.png" name="Ada Lovelace"></minerva-avatar>`,
  },
  {
    name: "initials, every key",
    html: `<minerva-avatar name="Ada Lovelace" size="small" shape="square"></minerva-avatar>`,
  },
  {
    name: "pixel size",
    html: `<minerva-avatar name="Ada" size="40"></minerva-avatar>`,
  },
] satisfies WcHookScenario[];
