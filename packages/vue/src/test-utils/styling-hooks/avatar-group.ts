import { h } from "vue";
import { Avatar, AvatarGroup } from "../../components/Avatar";
import type { HookScenario } from "./types";

export default [
  {
    name: "with +N",
    render: () =>
      h(AvatarGroup, { max: 1 }, () => [
        h(Avatar, { name: "Ada" }),
        h(Avatar, { name: "Alan" }),
      ]),
  },
] satisfies HookScenario[];
