import { ResponsiveGrid } from "../../components/ResponsiveGrid";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: <ResponsiveGrid columns={{ base: 1, md: 3 }}>A</ResponsiveGrid>,
  },
] satisfies HookScenario[];
