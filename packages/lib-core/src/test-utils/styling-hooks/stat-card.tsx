import { StatCard } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    element: (
      <StatCard
        label="Users"
        value={42}
        icon={<svg />}
        description="Last 30 days"
      />
    ),
  },
] satisfies HookScenario[];
