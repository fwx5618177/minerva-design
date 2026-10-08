import { SkeletonText } from "../../components/Skeleton";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <SkeletonText lines={2} /> },
] satisfies HookScenario[];
