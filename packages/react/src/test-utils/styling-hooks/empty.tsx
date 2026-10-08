import { Empty } from "../../components/Empty";
import type { HookScenario } from "./types";

export default [
  {
    name: "every part, sized",
    element: (
      <Empty
        size="small"
        title="No orders"
        description="Create one to start"
        action={<a href="/new">New</a>}
      >
        Footer
      </Empty>
    ),
  },
] satisfies HookScenario[];
