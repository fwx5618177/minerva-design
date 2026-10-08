import type { WcHookScenario } from "../types";

export default [
  {
    name: "with +N",
    html: `<minerva-avatar-group max="1">
      <minerva-avatar name="Ada"></minerva-avatar>
      <minerva-avatar name="Alan"></minerva-avatar>
    </minerva-avatar-group>`,
  },
] satisfies WcHookScenario[];
