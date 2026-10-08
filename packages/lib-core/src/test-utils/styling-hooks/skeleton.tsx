import { Skeleton } from "../../components/Skeleton";
import type { HookScenario } from "./types";

export default [
  { name: "lines, avatar", element: <Skeleton lines={2} avatar /> },
  { name: "card", element: <Skeleton variant="card" avatar title paragraph /> },
  {
    name: "decorative",
    element: <Skeleton decorative variant="circular" />,
  },
] satisfies HookScenario[];
