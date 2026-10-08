import { h } from "vue";
import { SkeletonText } from "../../components/Skeleton";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(SkeletonText, { lines: 2 }) },
] satisfies HookScenario[];
