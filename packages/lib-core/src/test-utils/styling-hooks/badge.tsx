import { Badge } from "../../components/Badge";
import type { HookScenario } from "./types";

export default [
  { name: "standalone", element: <Badge icon={<svg />}>5</Badge> },
  {
    name: "attached, every key",
    element: (
      <Badge content="3" size="small" variant="outline" color="danger">
        <button type="button">Inbox</button>
      </Badge>
    ),
  },
] satisfies HookScenario[];
