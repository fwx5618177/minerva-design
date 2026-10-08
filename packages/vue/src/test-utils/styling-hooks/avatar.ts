import { h } from "vue";
import { Avatar } from "../../components/Avatar";
import type { HookScenario } from "./types";

export default [
  {
    name: "image",
    render: () => h(Avatar, { src: "a.png", name: "Ada Lovelace" }),
  },
  {
    name: "initials, every key",
    render: () =>
      h(Avatar, { name: "Ada Lovelace", size: "small", shape: "square" }),
  },
  { name: "pixel size", render: () => h(Avatar, { name: "Ada", size: 40 }) },
] satisfies HookScenario[];
