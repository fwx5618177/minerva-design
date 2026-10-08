import { Card } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  { name: "default", element: <Card>Content</Card> },
  {
    name: "disabled button card",
    element: (
      <Card as="button" variant="elevated" disabled>
        Content
      </Card>
    ),
  },
] satisfies HookScenario[];
