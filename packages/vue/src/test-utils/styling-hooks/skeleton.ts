import { h } from "vue";
import { Skeleton } from "../../components/Skeleton";
import type { HookScenario } from "./types";

export default [
  {
    name: "lines, avatar",
    render: () => h(Skeleton, { lines: 2, avatar: true }),
  },
  {
    name: "card",
    render: () =>
      h(Skeleton, {
        variant: "card",
        avatar: true,
        title: true,
        paragraph: true,
      }),
  },
  {
    name: "decorative",
    render: () => h(Skeleton, { decorative: true, variant: "circular" }),
  },
] satisfies HookScenario[];
